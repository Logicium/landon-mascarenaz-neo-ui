// Post-build: one HTML file per public route, sitemap.xml, robots.txt,
// llms.txt and 404.html, from the route table and site config through the
// vendored module in src/seo. Every route carries its own body, built from
// src/data/site.ts, so no browser is involved. The Apotome Labs SEO + AEO
// Standard, section 13.
//
//   npm run build         runs this through the postbuild hook
//   npx vite-node scripts/prerender.ts
import { prerender } from '../src/seo/node'
import { publicRoutes } from '../src/routes'
import { site } from '../src/seo.site'

await prerender({ site, routes: publicRoutes, root: new URL('..', import.meta.url) })
