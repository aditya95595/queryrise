export default async function handler(req, res) {
  const now = new Date().toISOString();
  const fallback = [
    {title:"Real Madrid vs Inter",category:"Sports",volume:"200K+",growth:"1,000%",summary:"A major football search surge is drawing attention as fans follow the latest match developments.",age:"fresh"},
    {title:"iPhone 18",category:"Technology",volume:"100K+",growth:"200%",summary:"Search interest is rising around the next iPhone generation, launch timing and specifications.",age:"fresh"},
    {title:"Bangladesh vs UAE",category:"Sports",volume:"100K+",growth:"1,000%",summary:"The cricket fixture is attracting searches for scores, squads, standings and match updates.",age:"fresh"}
  ];
  try {
    const url = process.env.TRENDS_RSS_URL;
    if (!url) return res.status(200).json({updatedAt:now,source:"fallback",trends:fallback});
    const r = await fetch(url, {headers:{"user-agent":"QueryRise/1.0"}});
    if (!r.ok) throw new Error("trend feed unavailable");
    const xml = await r.text();
    const items = [...xml.matchAll(/<item[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<\/item>/gi)]
      .slice(0,30).map(m=>({title:m[1].replace(/<!\[CDATA\[|\]\]>/g,"").trim(),category:"Worldwide",volume:"—",growth:"rising",summary:"A currently rising search topic detected in the configured trends feed.",age:"fresh"}));
    return res.status(200).json({updatedAt:now,source:"rss",trends:items.length?items:fallback});
  } catch(e) {
    return res.status(200).json({updatedAt:now,source:"fallback",trends:fallback,warning:"The latest feed could not be reached; the previous valid dataset should be retained in production."});
  }
}