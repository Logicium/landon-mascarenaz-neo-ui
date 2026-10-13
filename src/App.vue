<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter, type RouteLocationNormalized } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { scrollToY, startLenis, stopLenis } from '@/composables/useLenis'

const router = useRouter()
const route = useRoute()

// After a route change settles, land on the hash target (or the top) with
// the scroller's own easing rather than the browser's jump.
const landOn = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  nextTick(() => {
    window.setTimeout(() => {
      if (to.hash) {
        const el = document.querySelector<HTMLElement>(to.hash)
        if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 72, to.path === from.path)
      } else if (to.path !== from.path) {
        scrollToY(0, true)
      }
    }, 60)
  })
}

router.afterEach(landOn)

onMounted(() => {
  startLenis()
  // The app mounts after the first navigation has already resolved, so the
  // hook above never saw it. Land on a deep-linked hash by hand.
  if (route.hash) landOn(route, route)
})
onBeforeUnmount(() => stopLenis())
</script>

<template>
  <SiteHeader />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <SiteFooter />
</template>

<style lang="scss">
// The page always fills the viewport, so the footer can never sit above the
// fold while a route is still arriving.
main {
  min-height: 100svh;
}

// Pages arrive the way the spreads do: from a soft blur, settling upward.
.page-enter-active {
  transition:
    opacity 0.7s var(--ease-out),
    transform 0.9s var(--ease-out);
}

.page-leave-active {
  transition:
    opacity 0.32s var(--ease-in-out),
    transform 0.32s var(--ease-in-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(22px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
