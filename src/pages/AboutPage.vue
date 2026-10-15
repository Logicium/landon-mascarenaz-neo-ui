<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SourceList from '@/components/SourceList.vue'
import { useHorizontal } from '@/composables/useHorizontal'
import { avif, honors, openSystem, person, planners, record, site, sourceById, sourceIndex, stats, timeline, ui, values, valuesStatement } from '@/data/site'

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
              <source v-if="avif(site.portrait)" :srcset="avif(site.portrait)" type="image/avif" />
              <img :src="site.portrait" :alt="site.portraitAlt" />
            </picture>
          </figure>
        </div>
        <div class="titles">
          <h1 class="display lines">
            <span class="line" style="--i: 0"><span>{{ ui.about.title1 }}</span></span>
            <span class="line" style="--i: 1"><span><span>{{ ui.about.title2 }}</span><span class="serif">.</span></span></span>
          </h1>
          <p class="lede fade-in" style="--d: 700ms">{{ ui.about.lede }}</p>
          <ul class="roles fade-in" style="--d: 900ms">
            <li v-for="r in site.roles" :key="r" class="mono">{{ r }}</li>
          </ul>
        </div>
      </div>
    </header>

    <section class="frame bio">
      <div class="bio-grid">
        <span class="mono">{{ ui.sections.biography }}</span>
        <div class="prose bio-copy" v-reveal>
          <p v-for="p in person.body" :key="p.text">
            <span>{{ p.text }}</span><span class="cites"><a v-for="c in p.cites" :key="c" :href="srcUrl(c)" target="_blank" rel="noopener noreferrer" class="cite" :title="srcTitle(c)">{{ sourceIndex(c) }}</a></span>
          </p>
          <p>{{ openSystem.pull }}</p>
        </div>
      </div>
    </section>

    <section class="frame vals">
      <div class="bio-grid">
        <div class="tl-side">
          <span class="mono">{{ ui.sections.values }}</span>
          <span class="mono tl-note">{{ ui.about.valuesNote }}</span>
        </div>
        <div class="vals-main">
          <p class="serif vals-statement" v-reveal>{{ valuesStatement }}</p>
          <dl class="vals-grid" v-reveal>
            <div v-for="v in values" :key="v.word" :class="{ shared: v.shared }">
              <dt>{{ v.word }}</dt>
              <dd>{{ v.body }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="frame hon">
      <div class="bio-grid">
        <span class="mono">{{ ui.sections.honors }}</span>
        <ul class="honors" v-reveal>
          <li v-for="[org, what, src] in honors" :key="org">
            <a :href="srcUrl(src)" target="_blank" rel="noopener noreferrer" class="hon" :title="srcTitle(src)">
              <span class="hon-org">{{ org }}</span>
              <span class="hon-what">{{ what }}</span>
              <span class="src-go" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 12 12 2M4 2h8v8" /></svg></span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="frame nums">
      <div class="stat-grid">
        <div v-for="([n, l, s], i) in stats" :key="l" class="stat" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }">
          <span class="num stat-n">{{ n }}</span>
          <span class="stat-l">{{ l }}</span>
          <a v-if="s" :href="srcUrl(s)" target="_blank" rel="noopener noreferrer" class="mono ext stat-src" :title="srcTitle(s)"><span>{{ ui.labels.source }}</span> {{ String(sourceIndex(s)).padStart(2, '0') }}</a>
        </div>
      </div>
    </section>

    <section ref="tlWrap" class="tl-rail" :style="{ height: tlHeight }" aria-label="Timeline">
      <div class="tl-sticky">
        <div class="frame tl-head">
          <div class="tl-side">
            <span class="mono">{{ ui.sections.timeline }}</span>
            <span class="mono tl-note">{{ ui.about.timelineNote }}</span>
          </div>
          <h2 class="heading">{{ ui.about.timelineHeading }}</h2>
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
            <span class="num tl-y">{{ ui.about.now }}</span>
            <p class="tl-t">{{ ui.about.nowText }}</p>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="mono ext">{{ ui.labels.request }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="frame rec">
      <div class="bio-grid">
        <span class="mono">{{ ui.sections.selectedRecord }}</span>
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
          <span class="mono">{{ ui.sections.sources }}</span>
          <span class="mono tl-note">{{ ui.about.sourcesNote }}</span>
        </div>
        <SourceList />
      </div>
    </section>

    <section id="planners" class="frame plan">
      <div class="bio-grid">
        <div class="tl-side">
          <span class="mono">{{ ui.sections.planners }}</span>
          <span class="mono tl-note">{{ ui.labels.committee }}</span>
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
        <span class="mono">{{ ui.sections.pressKit }}</span>
        <div class="kit-grid" v-reveal>
          <div v-for="k in ui.about.kit" :key="k.title" class="kit-item">
            <span class="kit-t">{{ k.title }}</span>
            <span class="mono">{{ k.note }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="frame cta">
      <router-link :to="{ name: 'home', hash: '#contact' }" class="btn">
        {{ ui.labels.request }}
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
  font-size: var(--fs-lede);
  line-height: 1.6;
}

.vals,
.hon,
.nums {
  padding-top: var(--band);
}

.vals-main {
  display: flex;
  flex-direction: column;
  gap: var(--gap-l);
}

.vals-statement {
  font-size: var(--fs-sub);
  line-height: 1.25;
  color: var(--ink);
  max-width: 26em;
  text-wrap: pretty;
}

// Two rows of three. A dot pattern sits behind the sheet, the net from the
// hero seen from very far away; the three shared values carry a clay mark.
.vals-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(circle, var(--line-2) 0.8px, transparent 1.2px);
    background-size: 14px 14px;
    opacity: 0.5;
    mask-image: linear-gradient(160deg, #000 10%, transparent 80%);
    -webkit-mask-image: linear-gradient(160deg, #000 10%, transparent 80%);
  }

  div {
    position: relative;
    padding: 24px 24px 32px;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 220px;
  }

  dt {
    font-size: var(--fs-sub);
    font-weight: 360;
    letter-spacing: -0.035em;
    line-height: 0.95;
    padding-right: 24px;
  }

  .shared dt {
    color: var(--clay);
  }

  .shared::after {
    content: '';
    position: absolute;
    top: 24px;
    right: 24px;
    width: 9px;
    height: 9px;
    background: var(--clay);
  }

  dd {
    margin-top: auto;
    font-size: var(--fs-body);
    line-height: 1.5;
    color: var(--ink-2);
    text-wrap: pretty;
  }
}

.honors {
  border-top: 1px solid var(--line);
  max-width: 52em;

  li {
    border-bottom: 1px solid var(--line);
  }

  .hon {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 28px;
    gap: 16px;
    padding-block: 16px;
    align-items: center;
  }

  .hon-org {
    font-size: var(--fs-body-lg);
    font-weight: 450;
    letter-spacing: -0.015em;
  }

  .hon-what {
    font-size: var(--fs-body);
    color: var(--ink-2);
  }

  .src-go {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px var(--line-2);
    color: var(--mute);
    transition:
      background 0.4s var(--ease-out),
      color 0.4s var(--ease-out),
      box-shadow 0.4s var(--ease-out);

    svg {
      width: 11px;
      height: 11px;
    }
  }

  .hon:hover .src-go {
    background: var(--turq-deep);
    color: var(--paper);
    box-shadow: inset 0 0 0 1px var(--turq-deep);
  }
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
    font-size: var(--fs-small);
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
    font-size: var(--fs-body-lg);
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
    font-size: var(--fs-body);
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
    font-size: var(--fs-body-lg);
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

  .vals-grid {
    grid-template-columns: 1fr;
  }

  .honors .hon {
    grid-template-columns: minmax(0, 1fr) 28px;
    row-gap: 4px;

    .src-go {
      grid-row: 1 / span 2;
      grid-column: 2;
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
