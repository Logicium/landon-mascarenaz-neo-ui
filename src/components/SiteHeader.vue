<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
const clock = ref('')
let lastY = 0
let timer = 0

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 12
  // Hide on scroll down past the hero, show on scroll up.
  hidden.value = y > lastY && y > window.innerHeight * 0.6
  lastY = y
}

const tick = () => {
  clock.value = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  tick()
  timer = window.setInterval(tick, 15000)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.clearInterval(timer)
})

const home = (hash: string) => (route.name === 'home' ? { hash } : { name: 'home', hash })
</script>

<template>
  <header class="site-header" :class="{ scrolled, hidden }">
    <div class="frame bar">
      <router-link to="/" class="wordmark">
        <span class="mark" aria-hidden="true"></span>
        Landon Mascareñaz
      </router-link>

      <nav class="nav">
        <router-link :to="home('#work')" class="nav-link">Work</router-link>
        <router-link :to="home('#talks')" class="nav-link">Talks</router-link>
        <router-link :to="home('#book')" class="nav-link">The Book</router-link>
        <router-link to="/about" class="nav-link" active-class="is-active">About</router-link>
      </nav>

      <div class="right">
        <span class="mono clock">Denver <span class="t">{{ clock }}</span></span>
        <router-link :to="home('#contact')" class="btn small">Request availability</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 40;
  height: var(--header-h);
  display: flex;
  align-items: center;
  transition:
    transform 0.6s var(--ease-out),
    background-color 0.5s var(--ease-out);

  &::after {
    content: '';
    position: absolute;
    left: var(--gutter);
    right: var(--gutter);
    bottom: 0;
    height: 1px;
    background: var(--line);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.7s var(--ease-out);
  }

  &.scrolled {
    background: color-mix(in srgb, var(--paper) 84%, transparent);
    backdrop-filter: blur(16px) saturate(1.1);
    -webkit-backdrop-filter: blur(16px) saturate(1.1);

    &::after {
      transform: scaleX(1);
    }
  }

  &.hidden {
    transform: translateY(-100%);
  }
}

.bar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.012em;
  justify-self: start;
  white-space: nowrap;

  .mark {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1.5px solid var(--ink);
    position: relative;
    transition: transform 0.6s var(--ease-out);

    &::after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      background: var(--signal);
      transform: scale(0);
      transition: transform 0.5s var(--ease-out);
    }
  }

  &:hover .mark::after {
    transform: scale(1);
  }
}

.nav {
  display: flex;
  gap: clamp(18px, 2.6vw, 40px);
  font-size: 13.5px;
  font-weight: 450;
  color: var(--mute);

  .nav-link {
    position: relative;
    transition: color 0.35s var(--ease-out);

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4px;
      height: 1px;
      background: var(--ink);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.45s var(--ease-out);
    }

    &:hover,
    &.is-active {
      color: var(--ink);

      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
}

.right {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 22px;
}

.clock {
  color: var(--mute);

  .t {
    color: var(--ink);
  }
}

.btn.small {
  height: 38px;
  padding-inline: 18px;
  font-size: 12.5px;
}

@media (max-width: 960px) {
  .bar {
    grid-template-columns: 1fr auto;
  }

  .nav,
  .clock {
    display: none;
  }
}
</style>
