/**
 * The public route table, with each page's SEO record.
 *
 * This is the only list of public routes. The router spreads it; the
 * prerender (scripts/prerender.ts) walks it to write one HTML file per page,
 * the sitemap, robots.txt and llms.txt; the runtime applies the same records
 * on navigation. Every page carries a `body` built from src/data/site.ts, the
 * same copy the app renders, so a crawler reads the page without a browser.
 * The structured data a person site owns (the Book, the talks as
 * CreativeWorks, the recorded keynotes and podcast episodes) lives here as
 * route schema. No browser dependency: the prerender imports this under Node.
 */
import type { RouteRecordRaw } from 'vue-router'
import { creativeWorkNode, entityId, esc, truncate, type RouteSeo, type SiteConfig } from '@/seo'
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
  type Talk,
} from '@/data/site'
import { BOOK_ID } from '@/seo.site'

const srcUrl = (id: string) => sourceById(id)?.url
const talkPath = (t: Talk) => `/talks/${t.slug}`
const talkBySlug = (slug: string | undefined) => talks.find((t) => t.slug === slug)

/* ------------------------------ structured data ------------------------------ */

const bookNode = (s: SiteConfig) => ({
  '@type': 'Book',
  '@id': BOOK_ID,
  name: `${openSystem.title}: Redesigning Education and Reigniting Democracy`,
  author: [{ '@id': entityId(s) }, { '@type': 'Person', name: 'Doannie Tran' }],
  publisher: { '@type': 'Organization', name: openSystem.press },
  datePublished: openSystem.year,
  isbn: openSystem.isbn,
  numberOfPages: Number(openSystem.pages),
  image: `${s.siteUrl}${openSystem.cover}`,
  url: `${s.siteUrl}/book`,
  sameAs: srcUrl('hep'),
  description: truncate(openSystem.body[0] ?? '', 300),
})

const talkNode = (s: SiteConfig, t: Talk) =>
  creativeWorkNode(s, {
    path: talkPath(t),
    name: `${t.title}: ${t.subtitle}`,
    description: t.body,
    image: t.image,
    genre: 'Keynote',
    extra: {
      audience: { '@type': 'Audience', audienceType: t.audience },
      educationalLevel: t.level,
      teaches: t.outcomes,
      author: { '@id': entityId(s) },
    },
  })

const videoNodes = (s: SiteConfig) =>
  watch.map((w) => ({
    '@type': 'VideoObject',
    name: w.label,
    description: `${w.label}. ${w.host}.`,
    thumbnailUrl: `${s.siteUrl}/img/${w.poster}-c.jpg`,
    uploadDate: w.when ?? '2023',
    embedUrl: `https://www.youtube-nocookie.com/embed/${w.id}`,
    url: w.url,
    actor: { '@id': entityId(s) },
  }))

const podcastNodes = (s: SiteConfig) =>
  listen
    .filter((m) => m.platform !== 'link')
    .map((m) => ({
      '@type': 'PodcastEpisode',
      name: m.label,
      partOfSeries: { '@type': 'PodcastSeries', name: m.host },
      url: m.url,
      ...(m.when ? { datePublished: m.when } : {}),
      ...(m.duration ? { timeRequired: m.duration } : {}),
      about: { '@id': entityId(s) },
    }))

/* ------------------------------ page bodies ------------------------------ */

const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
const links = (items: { href: string; label: string }[]) => `<ul>${items.map((i) => `<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`).join('')}</ul>`

const nav = () =>
  `<nav><a href="/">${esc(site.name)}</a> <a href="/work">${esc(ui.nav.work)}</a> <a href="/talks">${esc(ui.nav.talks)}</a> <a href="/book">${esc(ui.nav.book)}</a> <a href="/about">${esc(ui.nav.about)}</a> <a href="${esc(site.substack.url)}">${esc(ui.nav.newsletter)}</a></nav>`
const foot = () =>
  `<footer><p>${esc(ui.sections.bookings)}: <a href="mailto:${esc(site.email)}">${esc(site.emailLabel)}</a>. ${esc(ui.sections.travelsFrom)} ${esc(site.travelsFrom)}. ${esc(ui.sections.representedBy)} <a href="${esc(site.agencyUrl)}">${esc(site.agency)}</a>.</p></footer>`

const homeBody = () => `<main>${nav()}<article>
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
${links(talks.map((t) => ({ href: talkPath(t), label: `${t.title}: ${t.subtitle}` })))}
<h2>${esc(ui.sections.person)}</h2>
<p>${esc(ui.home.personStatement)}</p>
<p>${esc(values.map((v) => v.word).join(', '))}</p>
<h2>${esc(ui.labels.request)}</h2>
<p>${esc(ui.home.contactLede)}</p>
</article>${foot()}</main>`

const workBody = () => `<main>${nav()}<article>
<h1>${esc(ui.work.title1)} ${esc(ui.work.title2)}</h1>
<p>${esc(ui.work.lede)}</p>
${doors.map((d) => `<section><h2>${esc(d.title)}</h2><p>${esc(d.body)}</p><p>${esc(ui.labels.for)} ${esc(d.audiences.join(', '))}</p></section>`).join('')}
<p>${esc(valuesStatement)}</p>
<h2>${esc(ui.work.formatsHeading)}</h2>
${formats.map((f) => `<h3>${esc(f.title)} (${esc(f.duration)})</h3><p>${esc(f.body)}</p>`).join('')}
</article>${foot()}</main>`

const talksBody = () => `<main>${nav()}<article>
<h1>${esc(ui.talks.title1)}, ${esc(ui.talks.title2)}</h1>
<p>${esc(ui.talks.lede)}</p>
${talks.map((t) => `<section><h2><a href="${talkPath(t)}">${esc(t.title)}: ${esc(t.subtitle)}</a></h2><p>${esc(t.body)}</p><p>${esc(t.audience)} · ${esc(t.level)} · ${esc(t.formats)}</p></section>`).join('')}
<h2>${esc(ui.sections.watch)}</h2>
${links(watch.map((w) => ({ href: w.url, label: `${w.label} (${w.host})` })))}
<h2>${esc(ui.sections.listen)}</h2>
${links(listen.map((m) => ({ href: m.url, label: `${m.label} (${m.host})` })))}
</article>${foot()}</main>`

const talkBody = (t: Talk) => {
  const d = doors.find((x) => x.id === t.door)
  const a = t.press ? sourceById(t.press) : undefined
  return `<main>${nav()}<article>
<p><a href="/talks">${esc(ui.nav.talks)}</a> · ${esc(t.n)}</p>
<h1>${esc(t.title)}</h1>
<p>${esc(t.subtitle)}</p>
<p>${esc(t.body)}</p>
<p>${esc(ui.sections.audience)}: ${esc(t.audience)}. ${esc(ui.sections.level)}: ${esc(t.level)}. ${esc(ui.sections.formats)}: ${esc(t.formats)}.${d ? ` ${esc(ui.sections.door)}: ${esc(d.title)}.` : ''}</p>
<h2>${esc(ui.talks.outcomes)}</h2>
${list(t.outcomes)}
${a ? `<h2>${esc(ui.sections.inPress)}</h2><p><a href="${esc(a.url)}">${esc(a.title)}</a>, ${esc(a.outlet)}${a.when ? `, ${esc(a.when)}` : ''}</p>` : ''}
<p><a href="/#contact">${esc(ui.labels.bookSession)}</a></p>
</article>${foot()}</main>`
}

const bookBody = () => `<main>${nav()}<article>
<h1>${esc(ui.book.title1)} ${esc(ui.book.title2)}</h1>
<p>${esc(ui.book.lede)}</p>
<p>${esc(openSystem.authors)}. ${esc(openSystem.press)}, ${esc(openSystem.year)}. ISBN ${esc(openSystem.isbn)}.</p>
<h2>${esc(openSystem.statement)}</h2>
${openSystem.body.map((p) => `<p>${esc(p)}</p>`).join('')}
<p>${esc(openSystem.pull)}</p>
<p>${esc(openSystem.moves)}</p>
<h2>${esc(ui.sections.taughtAt)}</h2>
${list(openSystem.taughtAt.map(([n, s]) => (s ? `${n}, ${s}` : n)))}
</article>${foot()}</main>`

const aboutBody = () => `<main>${nav()}<article>
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
</article>${foot()}</main>`

/* ------------------------------ talks ------------------------------ */

// A talk page's head comes from the record. The record is found by slug as
// well as taken from the expanded instance, so the runtime resolves the
// right head on navigation before the page mounts; a slug that matches no
// talk is a not-found page.
const talkSeo: RouteSeo<Talk | undefined> = {
  expand: () => talks.map((t) => ({ params: { slug: t.slug }, data: t })),
  title: ({ data, params }) => (data ?? talkBySlug(params.slug))?.title ?? 'Page not found',
  description: ({ data, params }) => {
    const t = data ?? talkBySlug(params.slug)
    return t ? truncate(`${t.body} For ${t.audience.toLowerCase()}. ${t.formats}.`, 160) : 'That page is not on landonmascarenaz.com.'
  },
  image: ({ data, params }) => (data ?? talkBySlug(params.slug))?.image,
  type: 'article',
  noindex: ({ data, params }) => !(data ?? talkBySlug(params.slug)),
  breadcrumb: ({ data, params }) => [{ name: ui.nav.talks, path: '/talks' }, { name: (data ?? talkBySlug(params.slug))?.title ?? 'Not found' }],
  schema: ({ site: s, data, params }) => {
    const t = data ?? talkBySlug(params.slug)
    return t ? talkNode(s, t) : undefined
  },
  body: ({ data, params }) => {
    const t = data ?? talkBySlug(params.slug)
    return t ? talkBody(t) : ''
  },
}

/* ------------------------------ the table ------------------------------ */

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      seo: {
        description:
          'Speaker and author Landon Mascareñaz: founding CEO of Courageous Colorado, co-author of The Open System, former chair of Colorado’s community college board.',
        schema: ({ site: s }) => bookNode(s),
        body: homeBody,
      },
    },
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/pages/WorkPage.vue'),
    meta: {
      seo: {
        title: 'The work: democracy, mobility, leadership',
        description:
          'Three doors into one body of work: democracy and civic renewal, economic mobility and regional prosperity, leadership and Latino America. Six bookable formats.',
        breadcrumb: [{ name: ui.sections.work }],
        body: workBody,
      },
    },
  },
  {
    path: '/talks',
    name: 'talks',
    component: () => import('@/pages/TalksPage.vue'),
    meta: {
      seo: {
        title: 'Keynotes and talks, with learning outcomes',
        description:
          'Six keynote and workshop sessions from Dr. Landon Mascareñaz, each with published learning outcomes, plus recorded keynotes, podcast appearances and press.',
        breadcrumb: [{ name: ui.nav.talks }],
        schema: ({ site: s }) => [...talks.map((t) => talkNode(s, t)), ...videoNodes(s), ...podcastNodes(s)],
        body: talksBody,
      },
    },
  },
  {
    path: '/talks/:slug',
    name: 'talk',
    component: () => import('@/pages/TalkPage.vue'),
    meta: { seo: talkSeo },
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/pages/BookPage.vue'),
    meta: {
      seo: {
        title: 'The Open System, the book',
        description:
          'The Open System, by Landon Mascareñaz and Doannie Tran (Harvard Education Press, 2023): why institutions stop listening, and the six moves that reopen them.',
        image: openSystem.cover,
        breadcrumb: [{ name: ui.nav.book }],
        schema: ({ site: s }) => bookNode(s),
        body: bookBody,
      },
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
    meta: {
      seo: {
        title: 'About: biography, honors and press kit',
        description:
          'From a first-grade classroom on the Navajo Nation to chairing thirteen colleges and founding Courageous Colorado: biography, honors, timeline and press kit.',
        type: 'profile',
        breadcrumb: [{ name: ui.nav.about }],
        body: aboutBody,
      },
    },
  },
]

/** The catch-all: a real not-found page, noindex, never a redirect home. */
export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('@/pages/NotFoundPage.vue'),
  meta: { seo: { title: 'Page not found', description: 'That page is not on landonmascarenaz.com.', noindex: true } },
}
