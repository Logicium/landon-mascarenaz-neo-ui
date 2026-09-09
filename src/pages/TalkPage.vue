<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doors, site, talks } from '@/data/site'

const route = useRoute()
const router = useRouter()

const index = computed(() => talks.findIndex((t) => t.slug === route.params.slug))
const talk = computed(() => talks[index.value])
const prev = computed(() => talks[(index.value - 1 + talks.length) % talks.length])
const next = computed(() => talks[(index.value + 1) % talks.length])
const door = computed(() => doors[talk.value?.door ?? 0])

watch(
  index,
  (i) => {
    if (i < 0) router.replace('/')
    else document.title = `${talk.value?.title} · ${site.name}`
  },
  { immediate: true },
)
</script>

<template>
  <article v-if="talk" class="talk-page" :key="talk.slug">
    <header class="frame head">
      <div class="crumbs mono">
        <router-link :to="{ name: 'home', hash: '#talks' }" class="link-line">Talks</router-link>
        <span>{{ talk.n }} / {{ String(talks.length).padStart(2, '0') }}</span>
      </div>

      <div class="head-grid">
        <span class="num big-n" aria-hidden="true">{{ talk.n }}</span>
        <div class="titles">
          <h1 class="display title lines">
            <span class="line" style="--i: 0; --base-delay: 80ms"><span>{{ talk.title }}</span></span>
          </h1>
          <p class="serif subtitle fade-in" style="--d: 400ms">{{ talk.subtitle }}</p>
        </div>
      </div>
    </header>

    <section class="frame body">
      <aside class="facts fade-in" style="--d: 500ms">
        <dl>
          <div><dt class="mono">Audience</dt><dd>{{ talk.audience }}</dd></div>
          <div><dt class="mono">Level</dt><dd>{{ talk.level }}</dd></div>
          <div><dt class="mono">Formats</dt><dd>{{ talk.formats }}</dd></div>
          <div><dt class="mono">Door</dt><dd>{{ door?.n }} {{ door?.title }}</dd></div>
        </dl>
        <a href="#contact" class="btn" @click.prevent="router.push({ name: 'home', hash: '#contact' })">
          Book this session
          <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
        </a>
      </aside>

      <div class="main">
        <p class="lede fade-in" style="--d: 550ms">{{ talk.body }}</p>

        <div class="outcomes" v-reveal>
          <h2 class="subheading">Participants leave able to</h2>
          <ol>
            <li v-for="(o, i) in talk.outcomes" :key="o">
              <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span>{{ o }}</span>
            </li>
          </ol>
        </div>

        <figure class="slot still" v-reveal>
          <span class="slot-tag">Session still 3:2</span>
        </figure>
      </div>
    </section>

    <nav class="frame pager" aria-label="Other talks">
      <router-link :to="{ name: 'talk', params: { slug: prev.slug } }" class="pg">
        <span class="mono">Previous</span>
        <span class="pg-t">{{ prev.title }}</span>
      </router-link>
      <router-link :to="{ name: 'talk', params: { slug: next.slug } }" class="pg right">
        <span class="mono">Next</span>
        <span class="pg-t">{{ next.title }}</span>
      </router-link>
    </nav>
  </article>
</template>

<style scoped lang="scss">
.talk-page {
  padding-top: calc(var(--header-h) + clamp(40px, 6vw, 96px));
}

.crumbs {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);

  a {
    color: var(--ink);
  }
}

.head-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  column-gap: clamp(16px, 2vw, 32px);
  align-items: end;
  padding-top: clamp(32px, 5vw, 80px);
}

.big-n {
  font-size: clamp(96px, 14vw, 240px);
  color: var(--line-2);
  line-height: 0.8;
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.title {
  font-size: clamp(40px, 6vw, 104px);
  max-width: 11em;
}

.subtitle {
  font-size: clamp(22px, 2.4vw, 36px);
  color: var(--mute);
  line-height: 1.15;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  column-gap: clamp(16px, 2vw, 32px);
  padding-block: clamp(48px, 6vw, 96px) var(--band);
  margin-top: clamp(32px, 4vw, 64px);
  border-top: 1px solid var(--line);
}

.facts {
  position: sticky;
  top: calc(var(--header-h) + 32px);
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 32px;

  dl {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-block: 12px;
      border-bottom: 1px solid var(--line);
      font-size: 14px;
    }
  }
}

.main {
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 6vw, 96px);
  max-width: 60em;
}

.outcomes {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  column-gap: clamp(24px, 3vw, 64px);
  padding-top: 26px;
  border-top: 1px solid var(--line);

  ol {
    display: flex;
    flex-direction: column;
  }

  li {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 16px;
    padding-block: 16px;
    border-bottom: 1px solid var(--line);
    font-size: clamp(16px, 1.25vw, 19px);
    line-height: 1.5;
    color: var(--ink-2);
    text-wrap: pretty;

    .mono {
      color: var(--signal);
      padding-top: 5px;
    }
  }
}

.still {
  aspect-ratio: 3 / 2;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--line);

  .pg {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-block: 32px 44px;
    transition: color 0.4s var(--ease-out);

    &.right {
      align-items: flex-end;
      text-align: right;
      border-left: 1px solid var(--line);
    }

    .pg-t {
      font-size: clamp(20px, 2vw, 30px);
      font-weight: 380;
      letter-spacing: -0.03em;
    }

    &:hover {
      color: var(--signal);
    }
  }
}

@media (max-width: 960px) {
  .head-grid,
  .body,
  .outcomes {
    grid-template-columns: 1fr;
    row-gap: 28px;
  }

  .facts {
    position: static;
  }

  .big-n {
    font-size: 72px;
  }
}
</style>
