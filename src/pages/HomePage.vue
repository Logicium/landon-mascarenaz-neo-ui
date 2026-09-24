<script setup lang="ts">
import { computed, ref } from 'vue'
import HeroScene from '@/components/HeroScene.vue'
import { clients, doors, hero, honors, openSystem, said, site, sourceById, stats, talks, values, valuesFor } from '@/data/site'
import { useStack } from '@/composables/useStack'
import { useHorizontal } from '@/composables/useHorizontal'
import { useSteps } from '@/composables/useSteps'

const marquee = [...clients, ...clients]
const saidSource = sourceById(said.source)

// Stacked spreads: the work, the book, the record.
const stack = ref<HTMLElement | null>(null)
const { active: spreadActive, inView: stackOn, progress: stackProgress, scrollTo: goSpread } = useStack(stack)
const spreads = [
  { n: '01', title: 'The work' },
  { n: '02', title: 'The book' },
  { n: '03', title: 'The record' },
]

// The session rail.
const rail = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const { progress } = useHorizontal(rail, track)
const active = computed(() => Math.min(talks.length, Math.round(progress.value * (talks.length - 1)) + 1))
const railHeight = `calc(100svh + ${talks.length * 58}vh)`

// The work spread stays pinned for extra scroll, and that scroll steps
// through the three doors. Hovering a step overrides the scroll pick.
const workWrap = ref<HTMLElement | null>(null)
const { index: doorScrolled, sub: doorSub, height: workHeight } = useSteps(workWrap, doors.length)
const doorHover = ref<number | null>(null)
const doorIndex = computed(() => doorHover.value ?? doorScrolled.value)
const door = computed(() => doors[doorIndex.value] ?? doors[0]!)

// The book spread steps from the argument to the details.
const bookWrap = ref<HTMLElement | null>(null)
const bookSteps = [
  { n: '01', short: 'The argument' },
  { n: '02', short: 'The details' },
]
const { index: bookScrolled, sub: bookSub, height: bookHeight } = useSteps(bookWrap, bookSteps.length)
const bookHover = ref<number | null>(null)
const bookIndex = computed(() => bookHover.value ?? bookScrolled.value)
const bookStats: [string, string][] = [
  [openSystem.pages, 'pages'],
  [openSystem.year, 'published'],
  [String(openSystem.taughtAt.length), 'universities teaching it'],
  ['2', 'authors'],
]

// Fill for a step bar: full when passed, live when current, empty when ahead.
const fill = (i: number, index: number, hover: number | null, s: number) => (index > i ? 1 : index === i ? (hover === null ? s : 1) : 0)
</script>

<template>
  <div class="home">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <HeroScene />
      <div class="frame hero-grid">
        <h1 class="display lines hero-title">
          <span v-for="(l, i) in hero.lines" :key="l" class="line" :style="{ '--i': i }">
            <span :class="{ serif: l === 'open' }">{{ l }}</span>
          </span>
        </h1>

        <div class="hero-side fade-in" style="--d: 1100ms">
          <p class="lede">{{ hero.sub }}</p>
          <div class="hero-cta">
            <a href="#contact" class="btn">
              Request availability
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </a>
            <router-link to="/talks" class="btn ghost">See the talks</router-link>
          </div>
        </div>

        <div class="hero-foot fade-in" style="--d: 1400ms">
          <ul class="roles">
            <li v-for="r in site.roles" :key="r" class="mono">{{ r }}</li>
          </ul>
          <div class="scroll-cue">
            <span class="mono">Scroll</span>
            <span class="cue-line"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CLIENTS ============ -->
    <section class="clients" aria-label="Has spoken for">
      <div class="frame clients-head">
        <span class="mono">Has spoken for</span>
        <span class="mono">Selected</span>
      </div>
      <div class="marquee" aria-hidden="true">
        <div class="track">
          <span v-for="(c, i) in marquee" :key="i" class="client">{{ c }}<i></i></span>
        </div>
      </div>
    </section>

    <!-- ============ STACKED SPREADS ============ -->
    <nav class="stack-nav" :class="{ on: stackOn }" aria-label="Spreads">
      <span class="sn-line" aria-hidden="true"><i :style="{ transform: `scaleY(${stackProgress})` }"></i></span>
      <button v-for="(s, i) in spreads" :key="s.n" type="button" class="sn-item" :class="{ on: spreadActive === i }" @click="goSpread(i)">
        <span class="sn-mark" aria-hidden="true"></span>
        <span class="mono sn-n">{{ s.n }}</span>
        <span class="mono sn-t">{{ s.title }}</span>
      </button>
    </nav>

    <div ref="stack" class="stack">
      <!-- The work: pinned while its spacer scrolls, stepping through the doors -->
      <section class="panel">
        <div class="frame spread">
          <div class="spread-top">
            <span class="sec-idx"><span class="mono">01</span><span class="mono">The work</span></span>
            <span class="mono">Three doors in</span>
          </div>
          <div class="spread-body work-body">
            <div class="work-copy">
              <transition name="tl" mode="out-in">
                <h2 :key="door.n" class="display work-title">
                  <span v-for="(part, i) in door.title.split(' & ')" :key="part" class="wt-line">{{ part }}<span v-if="i === 0" class="serif wt-amp"> &amp;</span></span>
                </h2>
              </transition>
              <transition name="cap" mode="out-in">
                <div :key="door.n" class="work-meta">
                  <p class="lede">{{ door.body }}</p>
                  <ul class="aud">
                    <li v-for="a in door.audiences" :key="a" class="mono">{{ a }}</li>
                  </ul>
                </div>
              </transition>
              <ol class="steps" @mouseleave="doorHover = null" aria-label="Doors">
                <li v-for="(d, i) in doors" :key="d.n">
                  <button type="button" class="step" :class="{ on: doorIndex === i, past: doorIndex > i }" @mouseenter="doorHover = i" @focus="doorHover = i" @blur="doorHover = null">
                    <span class="step-bar" aria-hidden="true"><i :style="{ transform: `scaleX(${fill(i, doorIndex, doorHover, doorSub)})` }"></i></span>
                    <span class="step-row"><span class="mono">{{ d.n }}</span><span class="mono step-t">{{ d.short }}</span></span>
                  </button>
                </li>
              </ol>
            </div>
            <div class="work-plate">
              <div class="plate print">
                <transition name="tick" mode="out-in">
                  <span :key="door.n" class="num plate-n" aria-hidden="true">{{ door.n }}</span>
                </transition>
                <transition name="wipe">
                  <picture :key="door.image">
                    <source :srcset="`/img/${door.image}.avif`" type="image/avif" />
                    <img :src="`/img/${door.image}.jpg`" :alt="door.imageAlt" loading="lazy" />
                  </picture>
                </transition>
              </div>
              <transition name="cap" mode="out-in">
                <span :key="door.n" class="plate-cap">
                  <span class="mono">Held by</span>
                  <span class="serif plate-vals">{{ valuesFor(doorIndex).map((v) => v.word).join(' & ') }}</span>
                </span>
              </transition>
            </div>
          </div>
          <div class="spread-foot">
            <router-link to="/work" class="btn ghost">
              Explore the work
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </router-link>
            <span class="mono">{{ door.n }} / {{ String(doors.length).padStart(2, '0') }}</span>
          </div>
        </div>
      </section>
      <div ref="workWrap" class="spacer" :style="{ height: workHeight }" aria-hidden="true"></div>

      <!-- The book: pinned while its spacer scrolls, from the argument to the details -->
      <section class="panel">
        <div class="frame spread">
          <div class="spread-top">
            <span class="sec-idx"><span class="mono">02</span><span class="mono">The book</span></span>
            <span class="mono">{{ openSystem.press }}, {{ openSystem.year }}</span>
          </div>
          <div class="spread-body book-body">
            <figure class="book-cover" :class="{ turned: bookIndex === 1 }">
              <picture>
                <source srcset="/open-system-cover.avif" type="image/avif" />
                <img src="/open-system-cover.jpg" :alt="`${openSystem.title}, by ${openSystem.authors}.`" width="894" height="1342" loading="lazy" />
              </picture>
            </figure>
            <div class="book-right">
              <transition name="tl" mode="out-in">
                <div v-if="bookIndex === 0" key="argument" class="book-page">
                  <h2 class="heading sp-title">Closing looks like <span class="serif">competence</span>.</h2>
                  <p class="lede">{{ openSystem.body[0] }}</p>
                  <p class="lede pull-line serif">{{ openSystem.pull }}</p>
                </div>
                <div v-else key="details" class="book-page book-detail">
                  <h2 class="heading sp-title">Six moves to an <span class="serif">open</span> system.</h2>
                  <p class="lede">{{ openSystem.moves }}</p>
                  <dl class="book-stats">
                    <div v-for="[n, l] in bookStats" :key="l">
                      <dt class="mono">{{ l }}</dt>
                      <dd class="num">{{ n }}</dd>
                    </div>
                  </dl>
                  <div class="book-right-col">
                    <span class="mono">Taught at</span>
                    <ul class="book-taught">
                      <li v-for="[name] in openSystem.taughtAt" :key="name">{{ name }}</li>
                    </ul>
                    <span class="mono">{{ openSystem.authors }} · ISBN {{ openSystem.isbn }}</span>
                  </div>
                </div>
              </transition>
              <ol class="steps" @mouseleave="bookHover = null" aria-label="Book">
                <li v-for="(b, i) in bookSteps" :key="b.n">
                  <button type="button" class="step" :class="{ on: bookIndex === i, past: bookIndex > i }" @mouseenter="bookHover = i" @focus="bookHover = i" @blur="bookHover = null">
                    <span class="step-bar" aria-hidden="true"><i :style="{ transform: `scaleX(${fill(i, bookIndex, bookHover, bookSub)})` }"></i></span>
                    <span class="step-row"><span class="mono">{{ b.n }}</span><span class="mono step-t">{{ b.short }}</span></span>
                  </button>
                </li>
              </ol>
            </div>
          </div>
          <div class="spread-foot">
            <router-link to="/book" class="btn ghost">
              About the book
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </router-link>
            <span class="mono">{{ bookSteps[bookIndex]?.n }} / {{ String(bookSteps.length).padStart(2, '0') }}</span>
          </div>
        </div>
      </section>
      <div ref="bookWrap" class="spacer" :style="{ height: bookHeight }" aria-hidden="true"></div>

      <!-- The record -->
      <section class="panel">
        <div class="frame spread">
          <div class="spread-top">
            <span class="sec-idx"><span class="mono">03</span><span class="mono">The record</span></span>
            <span class="mono">Every figure sourced</span>
          </div>
          <div class="spread-body rec-body">
            <h2 class="heading sp-title">A builder who <span class="serif">kept the receipts</span>.</h2>
            <p class="lede rec-lede">Twenty years inside the institutions most speakers only analyze. Every figure below links to the public record it comes from.</p>
            <div class="stat-row">
              <div v-for="[n, l] in stats" :key="l" class="stat">
                <span class="num stat-n">{{ n }}</span>
                <span class="stat-l">{{ l }}</span>
              </div>
            </div>
            <ul class="honor-row">
              <li v-for="[org, what, src] in honors" :key="org">
                <a :href="sourceById(src)?.url" target="_blank" rel="noopener noreferrer" class="honor">
                  <span class="honor-org">{{ org }}</span>
                  <span class="mono">{{ what }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="spread-foot">
            <router-link to="/about" class="btn ghost">
              The full record
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </router-link>
            <span class="mono">03 / 03</span>
          </div>
        </div>
      </section>
    </div>

    <!-- ============ SESSION RAIL ============ -->
    <section ref="rail" class="rail" :style="{ height: railHeight }" aria-label="Talks">
      <div class="rail-sticky">
        <div class="frame rail-head">
          <span class="sec-idx"><span class="mono">04</span><span class="mono">Six sessions</span></span>
          <div>
            <h2 class="heading">Six sessions, outcomes <span class="serif">written</span>.</h2>
            <p class="lede rail-lede">Every proposal form asks for learning outcomes. They are published so a program committee can lift them straight into the agenda.</p>
          </div>
          <span class="counter num" aria-hidden="true">{{ String(active).padStart(2, '0') }}<i>/{{ String(talks.length).padStart(2, '0') }}</i></span>
        </div>
        <div ref="track" class="rail-track">
          <router-link v-for="t in talks" :key="t.slug" :to="{ name: 'talk', params: { slug: t.slug } }" class="card">
            <figure class="card-img tone">
              <picture>
                <source :srcset="`/img/${t.image}-c.avif`" type="image/avif" />
                <img :src="`/img/${t.image}-c.jpg`" :alt="t.title" loading="lazy" />
              </picture>
              <span class="mono card-n">{{ t.n }}</span>
            </figure>
            <span class="mono card-f">{{ t.formats }}</span>
            <span class="card-t">{{ t.title }}</span>
            <span class="card-s serif">{{ t.subtitle }}</span>
            <span class="pill">View session <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg></span>
          </router-link>
          <div class="card card-end">
            <span class="heading">All six, with <span class="serif">outcomes</span>.</span>
            <router-link to="/talks" class="btn">
              Browse the talks
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SAID ============ -->
    <section class="said frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">05</span>
          <span class="mono">On the record</span>
        </div>
        <div class="said-main">
          <p class="said-q serif" v-reveal>“{{ said.quote }}”</p>
          <a v-if="saidSource" :href="saidSource.url" target="_blank" rel="noopener noreferrer" class="mono ext" v-reveal>{{ saidSource.outlet }}, {{ saidSource.date }}</a>
        </div>
      </div>
    </section>

    <!-- ============ PERSON ============ -->
    <section class="person frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">06</span>
          <span class="mono">The person</span>
        </div>
        <div class="person-grid">
          <figure class="portrait tone" v-reveal>
            <picture>
              <source srcset="/img/portrait-c.avif" type="image/avif" />
              <img src="/img/portrait-c.jpg" alt="Portrait of Dr. Landon Mascareñaz." loading="lazy" />
            </picture>
          </figure>
          <div class="person-copy" v-reveal>
            <p class="subheading">A first-grade teacher on the Navajo Nation who went on to chair the board of a thirteen-college system, direct a sixty-district rural talent initiative, and found a statewide civic coalition.</p>
            <p class="lede">Born in California, raised in Littleton, Colorado, with family roots in Colorado and New Mexico that run back generations. He lives in Denver and keeps an office in Trinidad.</p>
            <ul class="words" aria-label="Values">
              <li v-for="v in values" :key="v.word" :class="{ shared: v.shared }">{{ v.word }}</li>
            </ul>
            <router-link to="/about" class="btn ghost">
              About Landon
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CONTACT ============ -->
    <section id="contact" class="contact">
      <div class="frame">
        <div class="contact-grid">
          <h2 class="display contact-title" v-reveal>Request<br />availability<span class="serif">.</span></h2>
          <div class="contact-side" v-reveal>
            <p class="lede">Tell us the audience, the date and the format. We answer the same day.</p>
            <a :href="`mailto:${site.email}`" class="btn">
              {{ site.emailLabel }}
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </a>
            <ul class="contact-meta">
              <li><span class="mono">Travels from</span><span>{{ site.travelsFrom }}</span></li>
              <li><span class="mono">Virtual</span><span>Available, 30 to 45 minutes</span></li>
              <li><span class="mono">Recording</span><span>Permitted, on demand</span></li>
              <li><span class="mono">Represented by</span><a :href="site.agencyUrl" target="_blank" rel="noopener">{{ site.agency }}</a></li>
            </ul>
            <router-link :to="{ path: '/about', hash: '#planners' }" class="mono ext">Everything a committee will ask</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
// ---------- hero ----------
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

.hero-grid {
  position: relative;
  z-index: 1;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  grid-template-rows: 1fr auto;
  column-gap: clamp(24px, 4vw, 80px);
  padding-top: calc(var(--header-h) + clamp(40px, 8vh, 96px));
  padding-bottom: clamp(28px, 4vh, 48px);
}

.hero-title {
  grid-column: 1;
  align-self: end;
  max-width: 8.4em;

  .serif {
    font-size: 1.08em;
    color: var(--clay);
  }
}

.hero-side {
  grid-column: 2;
  align-self: end;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 0.4em;
  max-width: 30em;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-foot {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-top: clamp(40px, 6vh, 80px);
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.roles {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 28px;

  li {
    color: var(--ink-2);
  }
}

.scroll-cue {
  display: flex;
  align-items: center;
  gap: 12px;

  .cue-line {
    width: 48px;
    height: 1px;
    background: var(--line-2);
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--ink);
      transform: translateX(-100%);
      animation: cue 2.4s var(--ease-in-out) infinite;
    }
  }
}

@keyframes cue {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

// ---------- clients ----------
.clients {
  position: relative;
  z-index: 2;
  background: var(--paper);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding-block: 18px 22px;
  overflow: hidden;
}

.clients-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
}

.marquee {
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.track {
  display: flex;
  width: max-content;
  animation: slide 48s linear infinite;
}

.client {
  display: inline-flex;
  align-items: center;
  gap: 32px;
  padding-right: 32px;
  font-size: var(--fs-title);
  font-weight: 380;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: var(--ink-2);

  i {
    width: 5px;
    height: 5px;
    background: var(--line-2);
  }
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}

// ---------- big type ----------
// Spread statements use the same display size as the hero and page titles.
.sp-title {
  max-width: 14em;

  .serif {
    color: var(--clay);
    font-size: 1.04em;
  }
}

.heading .serif {
  color: var(--clay);
  font-size: 1.04em;
}

// ---------- stacked spreads ----------
// Each panel is a full-viewport spread pinned to the top. The one behind
// blurs, shrinks and dims by `--cover` as the next slides over it.
.stack {
  position: relative;
  z-index: 1;
}

// Empty scroll after a pinned panel; the panel steps through its content
// while this passes, and the next panel slides over once it has.
.spacer {
  position: relative;
  pointer-events: none;
}

// Floating toolbar for the spreads. Fixed to the right edge, only present
// while the stack is on screen; a hairline fills with overall progress and
// each rotated label is a button that scrolls to its spread.
.stack-nav {
  position: fixed;
  right: clamp(10px, 1.4vw, 22px);
  top: 50%;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  transform: translate(0, -50%);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.7s var(--ease-out);

  &.on {
    opacity: 1;
    pointer-events: auto;
  }

  &:not(.on) {
    transform: translate(14px, -50%);
  }

  .sn-line {
    width: 1px;
    height: 72px;
    background: var(--line-2);
    position: relative;
    overflow: hidden;

    i {
      position: absolute;
      inset: 0;
      background: var(--clay);
      transform-origin: top;
      transform: scaleY(0);
    }
  }

  .sn-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 6px 4px;
    color: var(--faint);
    transition: color 0.4s var(--ease-out);

    .sn-mark {
      width: 7px;
      height: 7px;
      background: var(--line-2);
      transition: background 0.4s var(--ease-out), transform 0.4s var(--ease-out);
    }

    .sn-n,
    .sn-t {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      color: inherit;
      white-space: nowrap;
    }

    .sn-t {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition:
        max-height 0.5s var(--ease-out),
        opacity 0.4s var(--ease-out);
    }

    &:hover {
      color: var(--ink);
    }

    &.on {
      color: var(--ink);

      .sn-mark {
        background: var(--clay);
        transform: scale(1.3);
      }

      .sn-t {
        max-height: 120px;
        opacity: 1;
      }
    }
  }
}

.panel {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  background: var(--paper);
  display: flex;
  align-items: stretch;
  transform-origin: 50% 40%;
  transform: scale(calc(1 - var(--cover, 0) * 0.05));
  opacity: calc(1 - var(--cover, 0) * 0.45);
  will-change: transform;

  // The blur is only paid for while the next spread is sliding over, and
  // it eases in: almost none as the edge arrives, most of it once the next
  // spread is well on its way.
  &.covered {
    filter: blur(calc(var(--cover, 0) * var(--cover, 0) * 14px));
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 1px;
    background: var(--line);
  }
}

.spread {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-block: calc(var(--header-h) + 18px) clamp(24px, 4vh, 44px);
}

.spread-top,
.spread-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.spread-top {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.spread-foot {
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.sec-idx {
  display: inline-flex;
  gap: 14px;
}

.spread-body {
  flex: 1;
  min-height: 0;
  display: grid;
  align-items: center;
  padding-block: clamp(20px, 3vh, 40px);
}

// The work. The door's own title at display size on the left; on the right
// a black-and-white plate with a solid clay numeral printed over its edge.
// Scroll steps through the three doors and everything ticks over.
.work-body {
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  column-gap: clamp(24px, 4vw, 96px);
}

.work-copy {
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vh, 36px);
  min-height: 0;

  // The step row stops short of the numeral hanging beside the plate.
  .steps {
    max-width: calc(100% - var(--fs-num-xl) * 1.25);
  }
}

// The title is allowed to run out of its column and print over the plate,
// two lines for every door, the ampersand in clay. Ink multiplies into the
// photograph rather than sitting on top of it.
.work-title {
  display: flex;
  flex-direction: column;
  width: 150%;
  max-width: none;
  pointer-events: none;

  .wt-line {
    white-space: nowrap;
  }

  .wt-amp {
    color: var(--clay);
    font-size: 1.04em;
  }
}

.work-meta {
  display: flex;
  flex-direction: column;
  gap: 18px;

  .lede {
    max-width: 24em;
  }
}

.aud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;

  li {
    position: relative;
    padding-left: 12px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      width: 5px;
      height: 5px;
      background: var(--clay);
    }
  }
}

// Scroll steps. A bar per step; the current one fills with clay as you
// scroll through it, the ones behind stay filled, the ones ahead stay empty.
.steps {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 14px;
  margin-top: auto;
}

.step {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
  color: var(--faint);
  transition: color 0.4s var(--ease-out);

  .step-bar {
    display: block;
    height: 4px;
    background: var(--line);
    position: relative;
    overflow: hidden;

    i {
      position: absolute;
      inset: 0;
      background: var(--clay);
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.12s linear;
    }
  }

  .step-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .mono {
    color: inherit;
  }

  &:hover,
  &.on {
    color: var(--ink);
  }

  &.past {
    color: var(--mute);
  }
}

.work-plate {
  position: relative;
  align-self: stretch;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  .plate {
    position: relative;
    flex: 1;
    min-height: 0;
    aspect-ratio: 4 / 5;
    max-width: 100%;
  }

  // The photograph clips to the plate; the numeral may hang outside it.
  picture {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }



  picture,
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // The numeral lands against the plate, not on it: its right edge meets
  // the plate's left edge and its baseline sits on the plate's bottom edge,
  // clean clay in the gutter.
  .plate-n {
    position: absolute;
    z-index: 3;
    left: 0;
    bottom: 0;
    transform: translate(calc(-100% - 14px), 0.05em);
    font-size: var(--fs-num-xl);
    line-height: 0.74;
    color: var(--clay);
    pointer-events: none;
  }

  .plate-cap {
    align-self: flex-start;
    display: flex;
    align-items: baseline;
    gap: 12px;

    .plate-vals {
      font-size: var(--fs-title);
      color: var(--clay);
      line-height: 1;
    }
  }
}

.tick-enter-active {
  transition:
    transform 0.9s var(--ease-out),
    opacity 0.6s var(--ease-out);
}

.tick-leave-active {
  transition:
    transform 0.4s var(--ease-in-out),
    opacity 0.3s var(--ease-in-out);
}

.tick-enter-from {
  transform: translateY(40%);
  opacity: 0;
}

.tick-leave-to {
  transform: translateY(-40%);
  opacity: 0;
}

.tl-enter-active {
  transition:
    transform 0.8s var(--ease-out),
    opacity 0.6s var(--ease-out);
}

.tl-leave-active {
  transition:
    transform 0.4s var(--ease-in-out),
    opacity 0.3s var(--ease-in-out);
}

.tl-enter-from {
  transform: translateY(28px);
  opacity: 0;
}

.tl-leave-to {
  transform: translateY(-18px);
  opacity: 0;
}

// The next plate wipes down over the last, which slowly drifts off.
.wipe-enter-active {
  transition:
    clip-path 1.15s var(--ease-out),
    transform 1.15s var(--ease-out);
  z-index: 2;
}

.wipe-leave-active {
  transition:
    opacity 0.7s var(--ease-out),
    transform 1.1s var(--ease-out);
}

.wipe-enter-from {
  clip-path: inset(0 0 100% 0);
  transform: translateY(-4%) scale(1.04);
}

.wipe-leave-to {
  opacity: 0;
  transform: translateY(4%) scale(0.98);
}

.cap-enter-active {
  transition:
    opacity 0.55s var(--ease-out),
    transform 0.75s var(--ease-out);
}

.cap-leave-active {
  transition:
    opacity 0.3s var(--ease-in-out),
    transform 0.35s var(--ease-in-out);
}

.cap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.cap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

// The book
.book-body {
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  column-gap: clamp(24px, 4vw, 96px);
}

.book-cover {
  align-self: stretch;
  display: flex;
  align-items: center;
  min-height: 0;
  perspective: 1400px;

  picture {
    display: block;
    height: min(100%, 62vh);
    aspect-ratio: 2 / 3;
    max-width: 100%;
    box-shadow: 30px 30px 60px -30px rgba(0, 0, 0, 0.35);
    background: var(--ink);
    transform-origin: left center;
    transition: transform 1.1s var(--ease-out);
  }

  // On the details step the cover turns a little, as if opened.
  &.turned picture {
    transform: rotateY(-16deg);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.book-right {
  align-self: stretch;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vh, 36px);
  align-items: stretch;

  .lede {
    max-width: 26em;
  }
}

.book-page {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.4vh, 28px);
  align-items: flex-start;
}

.pull-line {
  color: var(--ink);
}

// The details page: hairline stats on the left, the rest set right.
.book-detail {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  column-gap: clamp(24px, 3vw, 64px);
  row-gap: clamp(16px, 2.4vh, 28px);
  align-items: start;

  .sp-title,
  > .lede {
    grid-column: 1 / -1;
  }
}

.book-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);

  div {
    padding: 14px 16px 16px 0;
    border-bottom: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  dd {
    font-size: var(--fs-num-md);
    color: var(--ink);
  }
}

.book-right-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.book-taught {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 15px;
  line-height: 1.4;
  color: var(--ink-2);
}

// The record
.rec-body {
  grid-template-rows: auto auto auto auto;
  align-content: center;
  row-gap: clamp(16px, 2.6vh, 36px);
}

.rec-lede {
  max-width: 30em;
}

// Honors under the figures: the same four columns, hairline, small.
.honor-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);

  li {
    border-right: 1px solid var(--line);
    padding: 14px 24px 4px 0;

    &:not(:first-child) {
      padding-left: 24px;
    }

    &:last-child {
      border-right: 0;
    }
  }

  .honor {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--ink);
    transition: color 0.35s var(--ease-out);

    .honor-org {
      font-size: 14px;
      font-weight: 450;
      letter-spacing: -0.01em;
    }

    &:hover {
      color: var(--clay);
    }
  }
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
}

.stat {
  padding: 22px 24px 8px 0;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 16px;

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
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--mute);
    max-width: 18em;
    text-wrap: pretty;
  }
}

// ---------- session rail ----------
.rail {
  position: relative;
  z-index: 2;
  background: var(--paper);
}

.rail-sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(24px, 4vh, 48px);
  padding-top: var(--header-h);
}

.rail-head {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 6fr) minmax(0, 3fr);
  column-gap: clamp(16px, 2vw, 32px);
  align-items: end;
  padding-top: 22px;
  border-top: 1px solid var(--line);

  > .sec-idx {
    align-self: start;
  }

  .heading {
    max-width: 14em;
  }
}

.rail-lede {
  margin-top: 22px;
}

.counter {
  justify-self: end;
  font-size: var(--fs-num-lg);
  color: var(--ink);

  i {
    font-style: normal;
    color: var(--faint);
  }
}

.rail-track {
  display: flex;
  align-items: stretch;
  gap: clamp(16px, 2vw, 32px);
  padding-inline: var(--gutter);
  will-change: transform;
}

.card {
  flex: none;
  width: clamp(300px, 30vw, 470px);
  display: flex;
  flex-direction: column;
  gap: 10px;

  .card-img {
    position: relative;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    margin-bottom: 8px;

    picture,
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      transform: scale(1.04);
      transition: transform 1.1s var(--ease-out);
    }

    .card-n {
      position: absolute;
      left: 12px;
      top: 10px;
      padding: 5px 9px;
      background: var(--paper);
      color: var(--ink);
    }
  }

  .card-f {
    color: var(--turq-deep);
  }

  .card-t {
    font-size: var(--fs-title);
    font-weight: 380;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  .card-s {
    font-size: clamp(16px, 1.25vw, 19px);
    color: var(--mute);
    line-height: 1.2;
  }

  .pill {
    margin-top: 8px;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 34px;
    padding: 0 14px 0 16px;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px var(--line-2);
    font-size: 12.5px;
    font-weight: 500;
    transition:
      background 0.4s var(--ease-out),
      color 0.4s var(--ease-out);

    svg {
      width: 11px;
      height: 11px;
    }
  }

  &:hover {
    .card-img img {
      transform: scale(1);
    }

    .pill {
      background: var(--ink);
      color: var(--paper);
    }
  }

  &.card-end {
    justify-content: center;
    gap: 28px;
    align-items: flex-start;
    width: clamp(320px, 34vw, 520px);
    padding-left: clamp(16px, 2vw, 32px);
    border-left: 1px solid var(--line);
  }
}

// ---------- said ----------
.said {
  padding-block: var(--band) 0;
}

.said-main {
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: flex-start;
}

.said-q {
  font-size: var(--fs-heading);
  line-height: 1.05;
  letter-spacing: -0.02em;
  max-width: 16em;
  text-wrap: balance;
  color: var(--ink);
}

// ---------- person ----------
.person {
  padding-block: var(--band) 0;
}

.person-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 6fr);
  column-gap: clamp(24px, 3vw, 64px);
  align-items: end;
}

.portrait {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  max-width: 320px;

  picture,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }
}

.person-copy {
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: flex-start;
  padding-bottom: 8px;

  .subheading {
    max-width: 22em;
    color: var(--ink);
  }

  .lede {
    max-width: 28em;
  }
}

// Six words he works by. The three he and his collaborators agreed on
// first are set in clay; the rest in ink.
.words {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 0;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: var(--fs-title);
  font-weight: 380;
  letter-spacing: -0.02em;
  line-height: 1.1;

  li {
    padding-right: 22px;
    margin-right: 22px;
    border-right: 1px solid var(--line);

    &:last-child {
      border-right: 0;
      margin-right: 0;
      padding-right: 0;
    }

    &.shared {
      color: var(--clay);
    }
  }
}

// ---------- contact ----------
.contact {
  background: var(--ink);
  color: var(--paper);
  padding-block: var(--band);
  margin-top: var(--band);

  .mono {
    color: var(--faint);
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  column-gap: clamp(24px, 4vw, 80px);
  align-items: end;
}

.contact-title {
  .serif {
    color: var(--clay);
  }
}

.contact-side {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;

  .lede {
    color: var(--faint);
  }

  .btn {
    --btn-bg: var(--paper);
    --btn-fg: var(--ink);

    &:hover {
      color: var(--paper);
    }
  }

  .ext {
    color: var(--faint);

    &:hover {
      color: var(--paper);
    }
  }
}

.contact-meta {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  margin-top: 8px;

  li {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 16px;
    padding-block: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    font-size: 14px;
  }
}

// ---------- responsive ----------
@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .hero-title,
  .hero-side {
    grid-column: 1;
  }

  .hero-side {
    margin-top: 40px;
  }

  // Panels stop stacking and simply flow.
  .panel {
    position: relative;
    height: auto;
    min-height: 0;
    filter: none;
    transform: none;
    opacity: 1;
  }

  .spread {
    padding-block: 40px 40px;
  }

  .spread-body {
    padding-block: 32px;
  }

  .work-body,
  .book-body,
  .book-detail {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }

  .book-right-col {
    align-items: flex-start;
    text-align: left;
  }

  .work-plate {
    align-items: stretch;

    .plate {
      aspect-ratio: 4 / 3;
      flex: none;
    }

    // Narrow screens: the numeral sits above the plate's top-left corner.
    .plate-n {
      left: 0;
      bottom: auto;
      top: 0;
      transform: translate(0, calc(-100% - 10px));
    }
  }

  .work-title {
    width: auto;

    .wt-line {
      white-space: normal;
    }
  }

  .spacer {
    display: none;
  }

  .stack-nav {
    display: none;
  }

  .book-cover picture {
    height: auto;
    width: min(100%, 260px);
  }

  .honor-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    li:nth-child(2) {
      border-right: 0;
    }

    li:nth-child(3) {
      padding-left: 0;
    }
  }

  .stat-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    .stat:nth-child(2) {
      border-right: 0;
    }

    .stat:nth-child(3) {
      padding-left: 0;
      border-top: 1px solid var(--line);
    }

    .stat:nth-child(4) {
      border-top: 1px solid var(--line);
    }
  }

  // The rail becomes a native horizontal scroller.
  .rail {
    height: auto !important;
    padding-block: var(--band) 0;
  }

  .rail-sticky {
    position: static;
    height: auto;
    padding-top: 0;
    overflow: visible;
  }

  .rail-head {
    grid-template-columns: 1fr;
    row-gap: 18px;

    .counter {
      display: none;
    }
  }

  .rail-track {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 24px;
    transform: none !important;
    -webkit-overflow-scrolling: touch;
  }

  .card {
    scroll-snap-align: start;
    width: 78vw;

    &.card-end {
      width: 78vw;
    }
  }

  .person-grid {
    grid-template-columns: 1fr;
    row-gap: 28px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    row-gap: 48px;
  }
}

@media (max-width: 600px) {
  .stat-row {
    grid-template-columns: 1fr;

    .stat {
      border-right: 0;
      padding-left: 0;
      border-top: 1px solid var(--line);

      &:first-child {
        border-top: 0;
      }
    }
  }

  .hero-foot {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
