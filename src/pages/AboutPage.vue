<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SourceList from '@/components/SourceList.vue'
import { useHorizontal } from '@/composables/useHorizontal'
import { openSystem, person, planners, record, site, sourceById, sourceIndex, stats, timeline } from '@/data/site'

// The timeline runs sideways: a tall wrapper keeps it pinned while the
// track slides left, and the big year reads out whichever entry is nearest.
const tlWrap = ref<HTMLElement | null>(null)
const tlTrack = ref<HTMLElement | null>(null)
const { progress: tlProgress } = useHorizontal(tlWrap, tlTrack)
const tlActive = computed(() => Math.round(tlProgress.value * (timeline.length - 1)))
const tlHeight = `calc(100svh + ${timeline.length * 34}vh)`

const srcUrl = (id: string) => sourceById(id)?.url ?? '#sources'
const srcTitle = (id: string) => {
  const s = sourceById(id)
  return s ? `${s.outlet}: ${s.title}` : ''
}

onMounted(() => {
  document.title = `About · ${site.name}`
})
</script>

<template>
  <article class="about">
    <header class="frame head">
      <div class="head-grid">
        <div class="portrait-col fade-in" style="--d: 300ms">
          <figure class="portrait print">
            <picture>
              <source srcset="/img/portrait.avif" type="image/avif" />
              <img src="/img/portrait.jpg" alt="Portrait of Dr. Landon Mascareñaz." />
            </picture>
          </figure>
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
          <p v-for="p in person.body" :key="p.text">
            {{ p.text }}<span class="cites"><a v-for="c in p.cites" :key="c" :href="srcUrl(c)" target="_blank" rel="noopener noreferrer" class="cite" :title="srcTitle(c)">{{ sourceIndex(c) }}</a></span>
          </p>
          <p>{{ openSystem.pull }}</p>
        </div>
      </div>
    </section>

    <section class="frame nums">
      <div class="stat-grid">
        <div v-for="([n, l, s], i) in stats" :key="l" class="stat" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }">
          <span class="num stat-n">{{ n }}</span>
          <span class="stat-l">{{ l }}</span>
          <a v-if="s" :href="srcUrl(s)" target="_blank" rel="noopener noreferrer" class="mono ext stat-src" :title="srcTitle(s)">Source {{ String(sourceIndex(s)).padStart(2, '0') }}</a>
        </div>
      </div>
    </section>

    <section ref="tlWrap" class="tl-rail" :style="{ height: tlHeight }" aria-label="Timeline">
      <div class="tl-sticky">
        <div class="frame tl-head">
          <div class="tl-side">
            <span class="mono">Timeline</span>
            <span class="mono tl-note">Each entry links to the record it comes from</span>
          </div>
          <h2 class="heading">Twenty years, dated and sourced.</h2>
          <transition name="yr" mode="out-in">
            <span :key="tlActive" class="num tl-big" aria-hidden="true">{{ timeline[tlActive]?.year }}</span>
          </transition>
        </div>
        <div ref="tlTrack" class="tl-track">
          <article v-for="(m, i) in timeline" :key="m.year + i" class="tl-item" :class="{ on: i === tlActive, past: i < tlActive }">
            <span class="tl-dot" aria-hidden="true"></span>
            <span class="num tl-y">{{ m.year }}</span>
            <p class="tl-t">{{ m.text }}</p>
            <a :href="srcUrl(m.source)" target="_blank" rel="noopener noreferrer" class="mono ext" :title="srcTitle(m.source)">{{ sourceById(m.source)?.outlet }}</a>
          </article>
          <div class="tl-item tl-end">
            <span class="tl-dot" aria-hidden="true"></span>
            <span class="num tl-y">Now</span>
            <p class="tl-t">Founding CEO, Courageous Colorado. Keynotes, workshops and facilitation across the three doors.</p>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="mono ext">Request availability</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="frame rec">
      <div class="bio-grid">
        <span class="mono">Selected record</span>
        <ul class="record" v-reveal>
          <li v-for="[y, r, s] in record" :key="r">
            <span class="mono y">{{ y }}</span>
            <a v-if="s" :href="srcUrl(s)" target="_blank" rel="noopener noreferrer" class="r r-link" :title="srcTitle(s)">{{ r }}</a>
            <span v-else class="r">{{ r }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="sources" class="frame srcs">
      <div class="bio-grid">
        <div class="tl-side">
          <span class="mono">Sources</span>
          <span class="mono tl-note">The public record this page draws on</span>
        </div>
        <SourceList />
      </div>
    </section>

    <section id="planners" class="frame plan">
      <div class="bio-grid">
        <div class="tl-side">
          <span class="mono">For planners</span>
          <span class="mono tl-note">Everything a committee will ask</span>
        </div>
        <dl class="plan-grid" v-reveal>
          <div v-for="[k, v] in planners" :key="k" class="plan-item">
            <dt class="mono">{{ k }}</dt>
            <dd>{{ v }}</dd>
          </div>
        </dl>
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
  overflow: hidden;
  background: var(--paper-2);

  picture,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }
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
  padding-top: var(--band);
}

.bio-copy {
  max-width: 44em;
  font-size: clamp(17px, 1.35vw, 21px);
  line-height: 1.6;
}

.nums {
  padding-top: var(--band);
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
    font-size: var(--fs-num-lg);
  }

  .stat-l {
    font-size: 14px;
    line-height: 1.5;
    color: var(--mute);
    max-width: 20em;
  }

  .stat-src {
    margin-top: auto;
    padding-top: 10px;
  }
}

.rec,
.srcs,
.plan,
.kit {
  padding-top: var(--band);
}

// ---------- horizontal timeline ----------
.tl-rail {
  position: relative;
  margin-top: var(--band);
}

.tl-sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(28px, 5vh, 56px);
  padding-top: var(--header-h);
}

.tl-head {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 6fr) minmax(0, 3fr);
  column-gap: clamp(16px, 2vw, 32px);
  align-items: end;
  padding-top: 22px;
  border-top: 1px solid var(--line);

  .tl-side {
    align-self: start;
  }

  .heading {
    max-width: 12em;
  }
}

.tl-big {
  justify-self: end;
  font-size: var(--fs-num-lg);
  color: var(--clay);
}

.yr-enter-active,
.yr-leave-active {
  transition:
    transform 0.45s var(--ease-out),
    opacity 0.35s var(--ease-out);
}

.yr-enter-from {
  transform: translateY(40%);
  opacity: 0;
}

.yr-leave-to {
  transform: translateY(-40%);
  opacity: 0;
}

.tl-track {
  display: flex;
  align-items: stretch;
  padding-inline: var(--gutter);
  will-change: transform;
}

.tl-item {
  position: relative;
  flex: none;
  width: clamp(260px, 23vw, 380px);
  padding: 28px clamp(20px, 2.4vw, 40px) 8px 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: opacity 0.5s var(--ease-out);

  .tl-dot {
    position: absolute;
    left: 0;
    top: -4px;
    width: 7px;
    height: 7px;
    background: var(--line-2);
    transition:
      background 0.4s var(--ease-out),
      transform 0.4s var(--ease-out);
  }

  .tl-y {
    font-size: var(--fs-num-md);
    color: var(--ink);
    transition: color 0.4s var(--ease-out);
  }

  .tl-t {
    font-size: clamp(15px, 1.1vw, 17px);
    line-height: 1.5;
    color: var(--ink-2);
    text-wrap: pretty;
    max-width: 30em;
  }

  &.past .tl-dot {
    background: var(--ink);
  }

  &.on {
    .tl-dot {
      background: var(--clay);
      transform: scale(1.4);
    }

    .tl-y {
      color: var(--clay);
    }
  }

  &.tl-end {
    border-top-color: var(--ink);

    .tl-dot {
      background: var(--ink);
    }
  }
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  max-width: 56em;
}

.plan-item {
  padding: 20px 22px 24px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 8px;

  dd {
    font-size: 14.5px;
    line-height: 1.5;
    text-wrap: pretty;
  }
}

.tl-side {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .tl-note {
    text-transform: none;
    letter-spacing: 0.01em;
    font-size: 12.5px;
    max-width: 16em;
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
  padding-block: var(--band);
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

  .kit-grid,
  .plan-grid {
    grid-template-columns: 1fr;
  }

  .tl-rail {
    height: auto !important;
  }

  .tl-sticky {
    position: static;
    height: auto;
    overflow: visible;
    padding-top: 0;
  }

  .tl-head {
    grid-template-columns: 1fr;
    row-gap: 18px;

    .tl-big {
      display: none;
    }
  }

  .tl-track {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 24px;
    transform: none !important;
    -webkit-overflow-scrolling: touch;
  }

  .tl-item {
    scroll-snap-align: start;
    width: 78vw;
  }
}
</style>
