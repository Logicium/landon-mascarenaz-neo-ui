import { createRouter, createWebHistory } from 'vue-router'
import { notFoundRoute, publicRoutes } from '@/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, notFoundRoute],
  // Scrolling after navigation is handled in App.vue through the Lenis
  // scroller, so the router only restores history positions.
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? false
  },
})

export default router
