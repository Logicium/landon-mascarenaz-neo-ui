import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    // Head tags come from the record itself (the talk pages).
    dynamic?: boolean
  }
}

export const SITE_URL = 'https://www.landonmascarenaz.com'
export const SITE_NAME = 'Landon Mascareñaz'
export const OG_IMAGE = `${SITE_URL}/og.jpg`

const t = (s: string) => `${s} · ${SITE_NAME}`

// One route per page, with its head metadata. This is the single source
// for titles and descriptions: the runtime applies it on navigation and
// scripts/prerender.ts writes it into each route's static HTML. The module
// has no browser dependency so the prerender can import it under Node.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Landon Mascareñaz · Keynote speaker on democracy, economic mobility and leadership',
      description:
        'Dr. Landon Mascareñaz is a keynote speaker, facilitator and author. Founding CEO of Courageous Colorado, co-author of The Open System (Harvard Education Press) and former chair of Colorado’s community college board. Keynotes, workshops and retreats on democracy, economic mobility and Latino leadership.',
    },
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/pages/WorkPage.vue'),
    meta: {
      title: t('The work: democracy, economic mobility and Latino leadership'),
      description:
        'Three doors into one body of work: democracy and civic renewal, economic mobility and regional prosperity, leadership and Latino America. Six bookable formats from keynote to board retreat.',
    },
  },
  {
    path: '/talks',
    name: 'talks',
    component: () => import('@/pages/TalksPage.vue'),
    meta: {
      title: t('Keynotes and talks, with learning outcomes'),
      description:
        'Six keynote and workshop sessions from Dr. Landon Mascareñaz, each with published learning outcomes, plus recorded keynotes, podcast appearances and press.',
    },
  },
  {
    path: '/talks/:slug',
    name: 'talk',
    component: () => import('@/pages/TalkPage.vue'),
    meta: { title: t('Talk'), description: '', dynamic: true },
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/pages/BookPage.vue'),
    meta: {
      title: t('The Open System: Redesigning Education and Reigniting Democracy'),
      description:
        'The Open System, by Landon Mascareñaz and Doannie Tran (Harvard Education Press, 2023): a working framework for why institutions stop listening to the people they serve, and how to reverse it. Taught at Harvard, Columbia, Yale, Brown and more.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
    meta: {
      title: t('About: biography, honors, timeline and press kit'),
      description:
        'From a first-grade classroom on the Navajo Nation to chairing a thirteen-college system and founding Courageous Colorado. Biography, values, honors, a dated timeline and everything a program committee will ask, each fact linked to its source.',
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
