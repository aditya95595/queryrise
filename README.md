# QueryRise
Premium search-trends dashboard.

## Features
- QueryRise dark premium UI
- Search and category filtering
- Trend detail pages
- 30-minute automatic refresh architecture
- Live countdown timer
- Safe fallback data
- SEO metadata, robots and sitemap
- AdSense-ready ad placeholders

## Production data
Google Trends' official Trending Now supports RSS export and refreshes on average every 10 minutes. QueryRise intentionally snapshots at 30-minute intervals. Configure `TRENDS_RSS_URL` on the server with an approved/available feed source.

## Deployment
Works as a static frontend with a Vercel-style `/api/trends` serverless endpoint. Update the example domain in `index.html`, `robots.txt` and `sitemap.xml` before launch.
