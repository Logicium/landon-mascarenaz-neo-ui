import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { path: '/work', name: 'work', component: () => import('@/pages/WorkPage.vue') },
    { path: '/talks', name: 'talks', component: () => import('@/pages/TalksPage.vue') },
    { path: '/talks/:slug', name: 'talk', component: () => import('@/pages/TalkPage.vue') },
    { path: '/book', name: 'book', component: () => import('@/pages/BookPage.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  // Scrolling after navigation is handled in App.vue through the Lenis
  // scroller, so the router only restores history positions.
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? false
  },
})

export default router
