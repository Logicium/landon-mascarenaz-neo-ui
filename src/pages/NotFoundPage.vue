<script setup lang="ts">
/**
 * The 404. A real page with a real status in the prerendered 404.html, never
 * a redirect home: a broken link should show up in Search Console, and a
 * visitor should land somewhere useful.
 */
import { ui } from '@/data/site'

const pages = [
  { to: '/work', label: ui.nav.work },
  { to: '/talks', label: ui.nav.talks },
  { to: '/book', label: ui.nav.book },
  { to: '/about', label: ui.nav.about },
]
</script>

<template>
  <article class="not-found">
    <header class="frame head">
      <div class="crumbs mono">
        <span>404</span>
        <span>Page not found</span>
      </div>
      <div class="head-grid">
        <h1 class="display lines">
          <span class="line" style="--i: 0"><span>Not this</span></span>
          <span class="line" style="--i: 1"><span><span>door</span><span class="serif">.</span></span></span>
        </h1>
        <p class="lede fade-in" style="--d: 700ms">That page is not on landonmascarenaz.com. It may have moved, or the link may have a typo. Every page on the site is one step from here.</p>
      </div>
    </header>

    <section class="frame ways">
      <nav aria-label="Main pages" class="nf-links">
        <router-link v-for="p in pages" :key="p.to" :to="p.to" class="link-line">{{ p.label }}</router-link>
      </nav>
      <router-link to="/" class="btn">
        Back to the home page
        <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
      </router-link>
    </section>
  </article>
</template>

<style scoped lang="scss">
.not-found {
  padding-top: calc(var(--header-h) + clamp(40px, 6vw, 96px));
  padding-bottom: var(--band);
}

.crumbs {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}

.head-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  column-gap: clamp(24px, 4vw, 80px);
  align-items: end;
  padding-block: var(--gap-l) var(--gap-l);

  .serif {
    color: var(--clay);
  }

  .lede {
    max-width: 26em;
    padding-bottom: 0.4em;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    row-gap: 28px;
  }
}

.ways {
  display: grid;
  gap: 32px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.nf-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  font-size: var(--fs-body-lg);
}
</style>
