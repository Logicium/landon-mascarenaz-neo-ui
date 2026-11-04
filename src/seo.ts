import type { RouteLocationNormalized } from 'vue-router'
import { OG_IMAGE, SITE_NAME, SITE_URL } from './routes'
import { talks } from './data/site'

export interface HeadMeta {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

export const truncate = (s: string, max = 158) => {
  const clean = s.replace(/\s+/g, ' ').trim()
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

// The head metadata for a talk page, built from the record.
export function talkMeta(slug: string): HeadMeta | null {
  const t = talks.find((x) => x.slug === slug)
  if (!t) return null
  return {
    title: `${t.title}: ${t.subtitle} · ${SITE_NAME}`,
    description: truncate(`${t.body} For ${t.audience.toLowerCase()}. ${t.formats}.`),
    path: `/talks/${t.slug}`,
    image: `${SITE_URL}${t.image}`,
    type: 'article',
  }
}

export function metaFor(route: RouteLocationNormalized): HeadMeta {
  if (route.meta.dynamic && typeof route.params.slug === 'string') {
    const m = talkMeta(route.params.slug)
    if (m) return m
  }
  return { title: route.meta.title, description: route.meta.description, path: route.path }
}

// Apply head tags in the browser on navigation. The prerendered HTML already
// carries the same tags for the first paint; this keeps them true as the
// visitor moves through the app.
export function applyHead(m: HeadMeta): void {
  if (typeof document === 'undefined') return
  document.title = m.title
  const set = (sel: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector<HTMLElement>(sel)
    if (!el) {
      el = create()
      document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
  }
  const meta = (name: string, value: string, key: 'name' | 'property' = 'name') =>
    set(`meta[${key}="${name}"]`, 'content', value, () => {
      const el = document.createElement('meta')
      el.setAttribute(key, name)
      return el
    })
  const url = `${SITE_URL}${m.path === '/' ? '/' : m.path}`
  meta('description', m.description)
  meta('og:title', m.title, 'property')
  meta('og:description', m.description, 'property')
  meta('og:url', url, 'property')
  meta('og:image', m.image ?? OG_IMAGE, 'property')
  meta('og:type', m.type ?? 'website', 'property')
  meta('twitter:title', m.title)
  meta('twitter:description', m.description)
  meta('twitter:image', m.image ?? OG_IMAGE)
  set('link[rel="canonical"]', 'href', url, () => {
    const el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    return el
  })
}
