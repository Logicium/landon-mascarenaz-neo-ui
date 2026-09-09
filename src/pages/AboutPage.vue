<script setup lang="ts">
import { onMounted } from 'vue'
import { openSystem, person, record, site, stats } from '@/data/site'

onMounted(() => {
  document.title = `About · ${site.name}`
})
</script>

<template>
  <article class="about">
    <header class="frame head">
      <div class="head-grid">
        <div class="portrait-col fade-in" style="--d: 300ms">
          <div class="slot portrait">
            <span class="slot-tag">Portrait 4:5</span>
          </div>
        </div>
        <div class="titles">
          <h1 class="display lines">
            <span class="line" style="--i: 0"><span>Not a</span></span>
            <span class="line" style="--i: 1"><span>commentator<span class="serif">.</span></span></span>
          </h1>
          <p class="lede fade-in" style="--d: 700ms">A builder who kept the receipts. Twenty years across education, workforce, rural and civic institutions, most of it from inside the room where the decision was made.</p>
          <ul class="roles fade-in" style="--d: 900ms">
            <li v-for="r in site.roles" :key="r" class="mono">{{ r }}</li>
          </ul>
        </div>
      </div>
    </header>

    <section class="frame bio">
      <div class="bio-grid">
        <span class="mono">Biography</span>
        <div class="prose bio-copy" v-reveal>
          <p v-for="p in person.body" :key="p">{{ p }}</p>
          <p>{{ openSystem.pull }}</p>
        </div>
      </div>
    </section>

    <section class="frame nums">
      <div class="stat-grid">
        <div v-for="([n, l], i) in stats" :key="l" class="stat" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }">
          <span class="num stat-n">{{ n }}</span>
          <span class="stat-l">{{ l }}</span>
        </div>
      </div>
    </section>

    <section class="frame rec">
      <div class="bio-grid">
        <span class="mono">Selected record</span>
        <ul class="record" v-reveal>
          <li v-for="[y, r] in record" :key="r">
            <span class="mono y">{{ y }}</span>
            <span class="r">{{ r }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="frame kit">
      <div class="bio-grid">
        <span class="mono">Press kit</span>
        <div class="kit-grid" v-reveal>
          <div class="kit-item">
            <span class="kit-t">Bios at three lengths</span>
            <span class="mono">50 · 150 · 400 words</span>
          </div>
          <div class="kit-item">
            <span class="kit-t">High-resolution headshot</span>
            <span class="mono">Print and screen</span>
          </div>
          <div class="kit-item">
            <span class="kit-t">Talk descriptions</span>
            <span class="mono">With learning outcomes</span>
          </div>
          <div class="kit-item">
            <span class="kit-t">Introduction script</span>
            <span class="mono">For the host</span>
          </div>
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
.about {
  padding-top: calc(var(--header-h) + clamp(40px, 6vw, 96px));
}

.head-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  column-gap: clamp(16px, 2vw, 32px);
  align-items: end;
}

.portrait {
  aspect-ratio: 4 / 5;
  max-width: 360px;
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;

  .serif {
    color: var(--signal);
  }
}

.roles {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 28px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  width: 100%;

  li {
    color: var(--ink-2);
  }
}

.bio-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  column-gap: clamp(16px, 2vw, 32px);
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.bio {
  padding-top: clamp(56px, 8vw, 128px);
}

.bio-copy {
  max-width: 44em;
  font-size: clamp(17px, 1.35vw, 21px);
  line-height: 1.6;
}

.nums {
  padding-top: clamp(56px, 8vw, 128px);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
}

.stat {
  padding: 28px 24px 30px 0;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 18px;

  &:not(:first-child) {
    padding-left: 24px;
  }

  &:last-child {
    border-right: 0;
  }

  .stat-n {
    font-size: clamp(56px, 6.6vw, 112px);
  }

  .stat-l {
    font-size: 14px;
    line-height: 1.5;
    color: var(--mute);
    max-width: 20em;
  }
}

.rec,
.kit {
  padding-top: clamp(56px, 8vw, 128px);
}

.record {
  border-top: 1px solid var(--line);
  max-width: 52em;

  li {
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 16px;
    padding-block: 14px;
    border-bottom: 1px solid var(--line);
    font-size: 15px;
    line-height: 1.45;
    align-items: baseline;
  }

  .y {
    color: var(--ink);
  }

  .r {
    color: var(--ink-2);
  }
}

.kit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.kit-item {
  padding: 22px 22px 28px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .kit-t {
    font-size: 17px;
    font-weight: 420;
    letter-spacing: -0.015em;
  }
}

.cta {
  padding-block: clamp(56px, 8vw, 128px) var(--band);
}

@media (max-width: 960px) {
  .head-grid,
  .bio-grid {
    grid-template-columns: 1fr;
    row-gap: 28px;
  }

  .portrait {
    max-width: 240px;
  }

  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .stat:nth-child(2) {
      border-right: 0;
    }

    .stat:nth-child(n + 3) {
      border-top: 1px solid var(--line);
    }

    .stat:nth-child(3) {
      padding-left: 0;
    }
  }

  .kit-grid {
    grid-template-columns: 1fr;
  }
}
</style>
