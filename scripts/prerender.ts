// Post-build prerender. Writes a static HTML file per public route into
// dist/, each with its own head (title, description, canonical, Open Graph,
// Twitter, JSON-LD) and a crawler-readable snapshot of the page's content
// inside #app, which Vue replaces when it mounts. Also writes sitemap.xml.
//
//   npm run build         runs this through the postbuild hook
//   npx vite-node scripts/prerender.ts
//
// File layout matches Vercel's cleanUrls: /talks is dist/talks.html and
// /talks/open-democracy is dist/talks/open-democracy.html.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { OG_IMAGE, SITE_NAME, SITE_URL, routes } from '../src/routes'
import { talkMeta, truncate, type HeadMeta } from '../src/seo'
import {
  doors,
  formats,
  hero,
  honors,
  listen,
  openSystem,
  person,
  planners,
  record,
  site,
  sourceById,
  sources,
  stats,
  talks,
  timeline,
  ui,
  values,
  valuesStatement,
  watch,
} from '../src/data/site'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const abs = (p: string) => `${SITE_URL}${p}`
const srcUrl = (id: string) => sourceById(id)?.url

/* ------------------------------ structured data ------------------------------ */

const PERSON_ID = `${SITE_URL}/#person`
const BOOK_ID = `${SITE_URL}/#book`

const person_ld = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: site.name,
  honorificPrefix: 'Dr.',
  url: `${SITE_URL}/`,
  image: abs(site.portrait),
  jobTitle: 'Founding Chief Executive Officer',
  worksFor: { '@type': 'Organization', name: 'Courageous Colorado', url: 'https://www.courageouscolorado.org' },
  description: truncate(hero.sub, 300),
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Denver', addressRegion: 'CO', addressCountry: 'US' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Harvard Graduate School of Education' },
    { '@type': 'CollegeOrUniversity', name: 'Lewis & Clark College' },
  ],
  knowsAbout: ['Democracy and civic renewal', 'Economic mobility', 'Community colleges', 'Rural workforce development', 'Latino leadership', 'Open systems', 'Board governance'],
  award: honors.map(([org, what]) => `${what} (${org})`),
  author: { '@id': BOOK_ID },
  sameAs: ['linkedin', 'substack', 'cccs-bio', 'obama', 'pahara', 'osi', 'cc-staff'].map(srcUrl).filter(Boolean),
}

const book_ld = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': BOOK_ID,
  name: `${openSystem.title}: Redesigning Education and Reigniting Democracy`,
  author: [{ '@id': PERSON_ID }, { '@type': 'Person', name: 'Doannie Tran' }],
  publisher: { '@type': 'Organization', name: openSystem.press },
  datePublished: openSystem.year,
  isbn: openSystem.isbn,
  numberOfPages: Number(openSystem.pages),
  image: abs(openSystem.cover),
  url: `${SITE_URL}/book`,
  sameAs: srcUrl('hep'),
  description: truncate(openSystem.body[0] ?? '', 300),
}

const website_ld = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  about: { '@id': PERSON_ID },
}

const breadcrumbs = (...crumbs: { name: string; path?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    ...(c.path ? { item: abs(c.path) } : {}),
  })),
})

const talk_ld = (t: (typeof talks)[number]) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: `${t.title}: ${t.subtitle}`,
  genre: 'Keynote',
  description: t.body,
  audience: { '@type': 'Audience', audienceType: t.audience },
  educationalLevel: t.level,
  teaches: t.outcomes,
  image: abs(t.image),
  url: abs(`/talks/${t.slug}`),
  author: { '@id': PERSON_ID },
})

const video_ld = watch.map((w) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: w.label,
  description: `${w.label}. ${w.host}.`,
  thumbnailUrl: abs(`/img/${w.poster}-c.jpg`),
  uploadDate: w.when ?? '2023',
  embedUrl: `https://www.youtube-nocookie.com/embed/${w.id}`,
  url: w.url,
  actor: { '@id': PERSON_ID },
}))

const podcast_ld = listen
  .filter((m) => m.platform !== 'link')
  .map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: m.label,
    partOfSeries: { '@type': 'PodcastSeries', name: m.host },
    url: m.url,
    ...(m.when ? { datePublished: m.when } : {}),
    ...(m.duration ? { timeRequired: m.duration } : {}),
    about: { '@id': PERSON_ID },
  }))

/* ------------------------------ page bodies ------------------------------ */

const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
const links = (items: { href: string; label: string }[]) =>
  `<ul>${items.map((i) => `<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`).join('')}</ul>`

const nav = `<nav><a href="/">${esc(site.name)}</a> <a href="/work">${esc(ui.nav.work)}</a> <a href="/talks">${esc(ui.nav.talks)}</a> <a href="/book">${esc(ui.nav.book)}</a> <a href="/about">${esc(ui.nav.about)}</a> <a href="${esc(site.substack.url)}">${esc(ui.nav.newsletter)}</a></nav>`
const foot = `<footer><p>${esc(ui.sections.bookings)}: <a href="mailto:${esc(site.email)}">${esc(site.emailLabel)}</a>. ${esc(ui.sections.travelsFrom)} ${esc(site.travelsFrom)}. ${esc(ui.sections.representedBy)} <a href="${esc(site.agencyUrl)}">${esc(site.agency)}</a>.</p></footer>`

const homeBody = () => `<main>${nav}<article>
<h1>${esc(hero.lines.join(' '))}</h1>
<p>${esc(hero.sub)}</p>
${list(site.roles)}
<h2>${esc(ui.sections.work)}</h2>
${doors.map((d) => `<h3><a href="/work">${esc(d.title)}</a></h3><p>${esc(d.body)}</p>`).join('')}
<h2>${esc(openSystem.title)}</h2>
<p>${esc(openSystem.body[0] ?? '')}</p>
<p><a href="/book">${esc(ui.labels.aboutBook)}</a></p>
<h2>${esc(ui.sections.record)}</h2>
${list(stats.map(([n, l]) => `${n}: ${l}`))}
${list(honors.map(([org, what]) => `${org}: ${what}`))}
<h2>${esc(ui.sections.sessions)}</h2>
${links(talks.map((t) => ({ href: `/talks/${t.slug}`, label: `${t.title}: ${t.subtitle}` })))}
<h2>${esc(ui.sections.person)}</h2>
<p>${esc(ui.home.personStatement)}</p>
<p>${esc(values.map((v) => v.word).join(', '))}</p>
<h2>${esc(ui.labels.request)}</h2>
<p>${esc(ui.home.contactLede)}</p>
</article>${foot}</main>`

const workBody = () => `<main>${nav}<article>
<h1>${esc(ui.work.title1)} ${esc(ui.work.title2)}</h1>
<p>${esc(ui.work.lede)}</p>
${doors.map((d) => `<section><h2>${esc(d.title)}</h2><p>${esc(d.body)}</p><p>${esc(ui.labels.for)} ${esc(d.audiences.join(', '))}</p></section>`).join('')}
<p>${esc(valuesStatement)}</p>
<h2>${esc(ui.work.formatsHeading)}</h2>
${formats.map((f) => `<h3>${esc(f.title)} (${esc(f.duration)})</h3><p>${esc(f.body)}</p>`).join('')}
</article>${foot}</main>`

const talksBody = () => `<main>${nav}<article>
<h1>${esc(ui.talks.title1)}, ${esc(ui.talks.title2)}</h1>
<p>${esc(ui.talks.lede)}</p>
${talks.map((t) => `<section><h2><a href="/talks/${t.slug}">${esc(t.title)}: ${esc(t.subtitle)}</a></h2><p>${esc(t.body)}</p><p>${esc(t.audience)} · ${esc(t.level)} · ${esc(t.formats)}</p></section>`).join('')}
<h2>${esc(ui.sections.watch)}</h2>
${links(watch.map((w) => ({ href: w.url, label: `${w.label} (${w.host})` })))}
<h2>${esc(ui.sections.listen)}</h2>
${links(listen.map((m) => ({ href: m.url, label: `${m.label} (${m.host})` })))}
</article>${foot}</main>`

const talkBody = (t: (typeof talks)[number]) => {
  const d = doors.find((x) => x.id === t.door)
  const a = t.press ? sourceById(t.press) : undefined
  return `<main>${nav}<article>
<p><a href="/talks">${esc(ui.nav.talks)}</a> · ${esc(t.n)}</p>
<h1>${esc(t.title)}</h1>
<p>${esc(t.subtitle)}</p>
<p>${esc(t.body)}</p>
<p>${esc(ui.sections.audience)}: ${esc(t.audience)}. ${esc(ui.sections.level)}: ${esc(t.level)}. ${esc(ui.sections.formats)}: ${esc(t.formats)}.${d ? ` ${esc(ui.sections.door)}: ${esc(d.title)}.` : ''}</p>
<h2>${esc(ui.talks.outcomes)}</h2>
${list(t.outcomes)}
${a ? `<h2>${esc(ui.sections.inPress)}</h2><p><a href="${esc(a.url)}">${esc(a.title)}</a>, ${esc(a.outlet)}${a.when ? `, ${esc(a.when)}` : ''}</p>` : ''}
<p><a href="/#contact">${esc(ui.labels.bookSession)}</a></p>
</article>${foot}</main>`
}

const bookBody = () => `<main>${nav}<article>
<h1>${esc(ui.book.title1)} ${esc(ui.book.title2)}</h1>
<p>${esc(ui.book.lede)}</p>
<p>${esc(openSystem.authors)}. ${esc(openSystem.press)}, ${esc(openSystem.year)}. ISBN ${esc(openSystem.isbn)}.</p>
<h2>${esc(openSystem.statement)}</h2>
${openSystem.body.map((p) => `<p>${esc(p)}</p>`).join('')}
<p>${esc(openSystem.pull)}</p>
<p>${esc(openSystem.moves)}</p>
<h2>${esc(ui.sections.taughtAt)}</h2>
${list(openSystem.taughtAt.map(([n, s]) => (s ? `${n}, ${s}` : n)))}
</article>${foot}</main>`

const aboutBody = () => `<main>${nav}<article>
<h1>${esc(ui.about.title1)} ${esc(ui.about.title2)}</h1>
<p>${esc(ui.about.lede)}</p>
${list(site.roles)}
<h2>${esc(ui.sections.biography)}</h2>
${person.body.map((p) => `<p>${esc(p.text)}</p>`).join('')}
<h2>${esc(ui.sections.values)}</h2>
<p>${esc(valuesStatement)}</p>
${values.map((v) => `<h3>${esc(v.word)}</h3><p>${esc(v.body)}</p>`).join('')}
<h2>${esc(ui.sections.honors)}</h2>
${links(honors.map(([org, what, src]) => ({ href: srcUrl(src) ?? '#', label: `${org}: ${what}` })))}
<h2>${esc(ui.sections.timeline)}</h2>
${list(timeline.map((m) => `${m.year}: ${m.text}`))}
<h2>${esc(ui.sections.selectedRecord)}</h2>
${list(record.map(([y, r]) => `${y}: ${r}`))}
<h2>${esc(ui.sections.planners)}</h2>
${planners.map(([k, v]) => `<h3>${esc(k)}</h3><p>${esc(v)}</p>`).join('')}
<h2>${esc(ui.sections.sources)}</h2>
${links(sources.map((s) => ({ href: s.url, label: `${s.title}, ${s.outlet}` })))}
</article>${foot}</main>`

/* ------------------------------ pages ------------------------------ */

interface Page extends HeadMeta {
  body: string
  jsonLd: object[]
}

const staticMeta = (name: string): HeadMeta => {
  const r = routes.find((x) => x.name === name)!
  return { title: r.meta!.title, description: r.meta!.description, path: r.path }
}

const pages: Page[] = [
  { ...staticMeta('home'), body: homeBody(), jsonLd: [website_ld, person_ld, book_ld] },
  { ...staticMeta('work'), body: workBody(), jsonLd: [breadcrumbs({ name: ui.sections.work, path: '/work' })] },
  { ...staticMeta('talks'), body: talksBody(), jsonLd: [breadcrumbs({ name: ui.nav.talks, path: '/talks' }), ...talks.map(talk_ld), ...video_ld, ...podcast_ld] },
  ...talks.map((t) => ({ ...talkMeta(t.slug)!, body: talkBody(t), jsonLd: [breadcrumbs({ name: ui.nav.talks, path: '/talks' }, { name: t.title, path: `/talks/${t.slug}` }), talk_ld(t)] })),
  { ...staticMeta('book'), body: bookBody(), jsonLd: [breadcrumbs({ name: ui.nav.book, path: '/book' }), book_ld] },
  { ...staticMeta('about'), body: aboutBody(), jsonLd: [breadcrumbs({ name: ui.nav.about, path: '/about' }), person_ld] },
]

/* ------------------------------ write ------------------------------ */

function head(p: Page): string {
  const url = abs(p.path === '/' ? '/' : p.path)
  const image = p.image ?? OG_IMAGE
  const tags = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${p.type ?? 'website'}">`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    ...p.jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.join('\n    ')
}

async function main() {
  const template = await readFile(path.join(dist, 'index.html'), 'utf8')
  const stripped = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta name="description"[^>]*>\s*/i, '')
  for (const p of pages) {
    const html = stripped
      .replace('</head>', `    ${head(p)}\n  </head>`)
      .replace('<div id="app"></div>', `<div id="app">${p.body}</div>`)
    const file = p.path === '/' ? 'index.html' : `${p.path.slice(1)}.html`
    const target = path.join(dist, file)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, html)
    console.log('prerendered', p.path, '->', file)
  }
  const today = new Date().toISOString().slice(0, 10)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.path === '/' ? '/' : p.path)}</loc><lastmod>${today}</lastmod><changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${p.path === '/' ? '1.0' : p.type === 'article' ? '0.7' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
  console.log('sitemap', pages.length, 'urls')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
