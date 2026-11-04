import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes'
import { applyHead, metaFor } from '@/seo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Scrolling after navigation is handled in App.vue through the Lenis
  // scroller, so the router only restores history positions.
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? false
  },
})

// Titles, descriptions, canonical and social tags follow the route.
router.afterEach((to) => applyHead(metaFor(to)))

export default router
