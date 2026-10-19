<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site, ui } from '@/data/site'
import { getLenis } from '@/composables/useLenis'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
let lastY = 0

// The phone menu: a full sheet of paper under the header. The page behind
// it stops scrolling while it is open, and any navigation closes it.
const menuOpen = ref(false)
const setMenu = (open: boolean) => {
  menuOpen.value = open
  const lenis = getLenis()
  if (open) lenis?.stop()
  else lenis?.start()
  document.documentElement.classList.toggle('menu-open', open)
}
watch(() => route.fullPath, () => setMenu(false))

const links = [
  { to: '/work', label: () => ui.nav.work },
  { to: '/talks', label: () => ui.nav.talks },
  { to: '/book', label: () => ui.nav.book },
  { to: '/about', label: () => ui.nav.about },
]

const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 12
  // Hide on scroll down past the hero, show on scroll up.
  hidden.value = y > lastY && y > window.innerHeight * 0.6
  lastY = y
}


onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  setMenu(false)
})

const home = (hash: string) => (route.name === 'home' ? { hash } : { name: 'home', hash })
</script>

<template>
  <header class="site-header" :class="{ scrolled, hidden: hidden && !menuOpen, open: menuOpen }">
    <div class="frame bar">
      <router-link to="/" class="wordmark">
        <span class="mark" aria-hidden="true"></span>
        {{ site.name }}
      </router-link>

      <nav class="nav">
        <router-link to="/work" class="nav-link" active-class="is-active">{{ ui.nav.work }}</router-link>
        <router-link to="/talks" class="nav-link" active-class="is-active">{{ ui.nav.talks }}</router-link>
        <router-link to="/book" class="nav-link" active-class="is-active">{{ ui.nav.book }}</router-link>
        <router-link to="/about" class="nav-link" active-class="is-active">{{ ui.nav.about }}</router-link>
        <a :href="site.substack.url" class="nav-link nav-ext" target="_blank" rel="noopener">{{ ui.nav.newsletter }}</a>
      </nav>

      <div class="right">
        <router-link :to="home('#contact')" class="btn small">{{ ui.labels.request }}</router-link>
        <button type="button" class="burger" :class="{ on: menuOpen }" :aria-label="menuOpen ? ui.labels.close : ui.labels.menu" :aria-expanded="menuOpen" @click="setMenu(!menuOpen)">
          <span></span><span></span>
        </button>
      </div>
    </div>

    <transition name="sheet">
      <div v-if="menuOpen" class="sheet" role="dialog" aria-modal="true">
        <nav class="sheet-nav">
          <router-link v-for="(l, i) in links" :key="l.to" :to="l.to" class="sheet-link" active-class="is-active" :style="{ '--i': i }">
            <span class="mono sheet-n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="sheet-t">{{ l.label() }}</span>
          </router-link>
          <a :href="site.substack.url" class="sheet-link" target="_blank" rel="noopener" :style="{ '--i': links.length }">
            <span class="mono sheet-n">{{ String(links.length + 1).padStart(2, '0') }}</span>
            <span class="sheet-t">{{ ui.nav.newsletter }}<svg class="sheet-out" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 12 12 2M4 2h8v8" /></svg></span>
          </a>
        </nav>
        <div class="sheet-foot">
          <router-link :to="home('#contact')" class="btn">
            {{ ui.labels.request }}
            <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
          </router-link>
          <a :href="`mailto:${site.email}`" class="mono sheet-mail">{{ site.emailLabel }}</a>
        </div>
      </div>
    </transition>
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

  &.open {
    background: var(--paper);
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
  font-size: var(--fs-small);
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
  font-size: var(--fs-small);
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

.nav-ext::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 8px;
  vertical-align: middle;
  background: var(--clay);
}

// Two hairlines that become a cross.
.burger {
  display: none;
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: -8px;

  span {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 1.5px;
    background: var(--ink);
    transition:
      transform 0.5s var(--ease-out),
      top 0.5s var(--ease-out);

    &:first-child {
      top: 16px;
    }

    &:last-child {
      top: 23px;
    }
  }

  &.on span {
    top: 19.5px;

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
  }
}

// The phone menu sheet.
.sheet {
  position: fixed;
  inset: var(--header-h) 0 0;
  z-index: 39;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(24px, 6vh, 48px) var(--gutter) max(24px, env(safe-area-inset-bottom));
  overflow-y: auto;
}

.sheet-nav {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--line);
}

.sheet-link {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: baseline;
  padding-block: 18px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  opacity: 0;
  transform: translateY(14px);
  animation: sheet-in 0.7s var(--ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 60ms + 80ms);

  .sheet-n {
    color: var(--faint);
  }

  .sheet-t {
    font-size: clamp(36px, 10vw, 48px);
    font-weight: 340;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  &.is-active .sheet-n {
    color: var(--clay);
  }

  .sheet-t {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.25em;
  }

  .sheet-out {
    flex: none;
    width: 0.36em;
    height: 0.36em;
    margin-top: 0.12em;
    color: var(--mute);
  }
}

@keyframes sheet-in {
  to {
    opacity: 1;
    transform: none;
  }
}

.sheet-foot {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  padding-top: 24px;
  opacity: 0;
  animation: sheet-in 0.7s var(--ease-out) forwards;
  animation-delay: 360ms;

  .sheet-mail {
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink);
  }
}

.sheet-enter-active {
  transition: opacity 0.35s var(--ease-out);
}

.sheet-leave-active {
  transition: opacity 0.25s var(--ease-in-out);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
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

  .nav {
    display: none;
  }

  .right {
    gap: 10px;
  }

  .burger {
    display: block;
  }
}

@media (max-width: 480px) {
  // The sheet carries the request button, so the bar keeps only the mark.
  .right .btn.small {
    display: none;
  }
}
</style>
