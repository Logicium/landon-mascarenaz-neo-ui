<script setup lang="ts">
import { onMounted } from 'vue'
import DoorsIndex from '@/components/DoorsIndex.vue'
import { formats, site } from '@/data/site'

onMounted(() => {
  document.title = `The work · ${site.name}`
})
</script>

<template>
  <article class="work">
    <header class="frame head">
      <div class="crumbs mono">
        <span>The work</span>
        <span>01 / 03 doors</span>
      </div>
      <div class="head-grid">
        <h1 class="display lines">
          <span class="line" style="--i: 0"><span>One body</span></span>
          <span class="line" style="--i: 1"><span>of work<span class="serif">.</span></span></span>
        </h1>
        <p class="lede fade-in" style="--d: 700ms">Three doors into it. Different audiences meet this work from different directions, and the same underlying question waits behind each one: does the institution still listen to the people it serves?</p>
      </div>
    </header>

    <DoorsIndex />

    <section class="frame formats">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">04</span>
          <span class="mono">What you can book</span>
        </div>
        <h2 class="heading" v-reveal>Six formats, one conversation.</h2>
      </div>
      <div class="fmt-grid">
        <div v-for="(f, i) in formats" :key="f.title" class="fmt" v-reveal :style="{ '--reveal-delay': `${(i % 3) * 80}ms` }">
          <span class="mono fmt-d">{{ f.duration }}</span>
          <h3 class="fmt-t">{{ f.title }}</h3>
          <p class="fmt-b">{{ f.body }}</p>
        </div>
      </div>
    </section>

    <section class="frame cta">
      <router-link :to="{ name: 'home', hash: '#contact' }" class="btn">
        Request availability
        <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
      </router-link>
    </section>
  </article>
</template>

<style scoped lang="scss">
.work {
  padding-top: calc(var(--header-h) + clamp(40px, 6vw, 96px));
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
  padding-block: var(--gap-l) var(--band);

  .serif {
    color: var(--clay);
  }

  .lede {
    max-width: 26em;
    padding-bottom: 0.4em;
  }
}

.formats {
  padding-block: var(--band) 0;
}

.fmt-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  margin-top: var(--gap-l);
}

.fmt {
  padding: 28px 26px 34px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 250px;
  transition: background 0.5s var(--ease-out);

  &:hover {
    background: var(--paper-2);
  }

  .fmt-d {
    color: var(--turq-deep);
  }

  .fmt-t {
    font-size: var(--fs-title);
    font-weight: 380;
    letter-spacing: -0.03em;
    margin-top: auto;
  }

  .fmt-b {
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--mute);
    text-wrap: pretty;
  }
}

.cta {
  padding-block: var(--band);
}

@media (max-width: 960px) {
  .head-grid {
    grid-template-columns: 1fr;
    row-gap: 28px;
  }

  .fmt-grid {
    grid-template-columns: 1fr;
  }
}
</style>
