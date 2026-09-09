<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
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
.page-enter-active {
  transition:
    opacity 0.55s var(--ease-out),
    transform 0.7s var(--ease-out);
}

.page-leave-active {
  transition:
    opacity 0.28s var(--ease-in-out),
    transform 0.28s var(--ease-in-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
