<script setup lang="ts">
import HeroScene from '@/components/HeroScene.vue'
import DoorsIndex from '@/components/DoorsIndex.vue'
import {
  clients,
  formats,
  hero,
  openSystem,
  person,
  planners,
  record,
  site,
  stats,
  talks,
  testimonials,
  watch,
} from '@/data/site'

const marquee = [...clients, ...clients]
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
            <a href="#talks" class="btn ghost">See the talks</a>
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

    <!-- ============ DOORS ============ -->
    <DoorsIndex />

    <!-- ============ STATS ============ -->
    <section class="stats frame">
      <div class="stat-grid">
        <div v-for="([n, l], i) in stats" :key="l" class="stat" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }">
          <span class="num stat-n">{{ n }}</span>
          <span class="stat-l">{{ l }}</span>
        </div>
      </div>
    </section>

    <!-- ============ THE BOOK ============ -->
    <section id="book" class="book frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">02</span>
          <span class="mono">The connective framework</span>
        </div>
        <h2 class="heading" v-reveal>{{ openSystem.statement }}</h2>
      </div>

      <div class="book-grid">
        <div class="cover-col" v-reveal>
          <div class="cover">
            <div class="cover-face">
              <span class="cover-title">The Open<br />System</span>
              <span class="cover-meta mono">{{ openSystem.authors }}<br />{{ openSystem.press }}</span>
            </div>
            <div class="cover-spine"></div>
          </div>
          <span class="mono cover-note">Cover art to follow</span>
        </div>

        <div class="book-copy">
          <div class="prose" v-reveal>
            <p v-for="p in openSystem.body" :key="p">{{ p }}</p>
          </div>
          <p class="pull serif" v-reveal>{{ openSystem.pull }}</p>

          <div class="taught" v-reveal>
            <span class="mono taught-head">Taught at</span>
            <ul class="inst">
              <li v-for="[name, sub] in openSystem.taughtAt" :key="name">
                <span class="inst-n">{{ name }}</span>
                <span v-if="sub" class="inst-s">{{ sub }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TALKS ============ -->
    <section id="talks" class="talks frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">03</span>
          <span class="mono">Six sessions</span>
        </div>
        <div>
          <h2 class="heading" v-reveal>Six sessions, with the outcomes already written.</h2>
          <p class="lede talks-lede" v-reveal>Every proposal form asks for learning outcomes. They are published here so a program committee can lift them straight into the agenda.</p>
        </div>
      </div>

      <ol class="talk-list">
        <li v-for="t in talks" :key="t.slug" v-reveal>
          <router-link :to="{ name: 'talk', params: { slug: t.slug } }" class="talk">
            <span class="t-n num">{{ t.n }}</span>
            <span class="t-main">
              <span class="t-title">{{ t.title }}</span>
              <span class="t-sub serif">{{ t.subtitle }}</span>
            </span>
            <span class="t-meta">
              <span class="mono">{{ t.audience }}</span>
              <span class="mono">{{ t.formats }}</span>
            </span>
            <span class="t-go" aria-hidden="true">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </span>
          </router-link>
        </li>
      </ol>
    </section>

    <!-- ============ FORMATS ============ -->
    <section class="formats frame">
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

    <!-- ============ PROOF ============ -->
    <section class="proof frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">05</span>
          <span class="mono">See him work</span>
        </div>
        <h2 class="heading" v-reveal>On stage, on a panel, in an interview.</h2>
      </div>

      <div class="frames">
        <figure v-for="(w, i) in watch" :key="w.label" class="film" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }">
          <div class="slot film-slot">
            <span class="play" aria-hidden="true"></span>
            <span class="slot-tag">Video 16:9</span>
          </div>
          <figcaption>
            <span class="film-l">{{ w.label }}</span>
            <span class="mono">{{ w.note }}</span>
          </figcaption>
        </figure>
      </div>

      <div class="quotes">
        <blockquote v-for="(q, i) in testimonials" :key="i" class="quote" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }">
          <p class="q-text serif">“{{ q.quote }}”</p>
          <footer>
            <span class="q-name">{{ q.name }}</span>
            <span class="mono">{{ q.title }}</span>
          </footer>
        </blockquote>
      </div>
    </section>

    <!-- ============ PERSON ============ -->
    <section class="person frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">06</span>
          <span class="mono">The person</span>
        </div>
        <h2 class="heading" v-reveal>{{ person.title }}</h2>
      </div>

      <div class="person-grid">
        <div class="portrait-col" v-reveal>
          <div class="slot portrait">
            <span class="slot-tag">Portrait 4:5</span>
          </div>
        </div>
        <div class="prose person-copy" v-reveal>
          <p v-for="p in person.body" :key="p">{{ p }}</p>
          <router-link to="/about" class="link-line more">Full biography</router-link>
        </div>
        <div class="record-col" v-reveal>
          <span class="mono rec-head">Selected record</span>
          <ul class="record">
            <li v-for="[y, r] in record" :key="r">
              <span class="mono y">{{ y }}</span>
              <span class="r">{{ r }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ PLANNERS ============ -->
    <section class="planners frame">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">07</span>
          <span class="mono">For planners</span>
        </div>
        <h2 class="heading" v-reveal>Everything your committee will ask.</h2>
      </div>
      <dl class="plan-grid">
        <div v-for="([k, v], i) in planners" :key="k" class="plan" v-reveal :style="{ '--reveal-delay': `${(i % 4) * 70}ms` }">
          <dt class="mono">{{ k }}</dt>
          <dd>{{ v }}</dd>
        </div>
      </dl>
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
              <li><span class="mono">Represented by</span><span>{{ site.agency }}</span></li>
            </ul>
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
    color: var(--signal);
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
  font-size: clamp(18px, 1.7vw, 26px);
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

// ---------- stats ----------
.stats {
  padding-block: 0 var(--band);
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
    text-wrap: pretty;
  }
}

// ---------- book ----------
.book {
  padding-block: 0 var(--band);
}

.book-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  column-gap: clamp(16px, 2vw, 32px);
  margin-top: clamp(48px, 6vw, 96px);
}

.cover-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 300px;
}

.cover {
  position: relative;
  aspect-ratio: 2 / 3;
  perspective: 1200px;

  .cover-face {
    position: absolute;
    inset: 0;
    background: var(--ink);
    color: var(--paper);
    padding: 24px 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: rotateY(-14deg);
    transform-origin: left;
    transition: transform 0.9s var(--ease-out);
    box-shadow: 30px 30px 60px -30px rgba(0, 0, 0, 0.35);
  }

  .cover-spine {
    position: absolute;
    left: -8px;
    top: 4px;
    bottom: 4px;
    width: 8px;
    background: var(--ink-2);
    transform: rotateY(-14deg);
    transform-origin: right;
  }

  &:hover .cover-face {
    transform: rotateY(-4deg);
  }

  .cover-title {
    font-size: clamp(26px, 2.4vw, 36px);
    font-weight: 360;
    line-height: 1;
    letter-spacing: -0.035em;
  }

  .cover-meta {
    color: var(--faint);
  }
}

.cover-note {
  color: var(--faint);
}

.book-copy {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
  column-gap: clamp(24px, 4vw, 80px);
  row-gap: 48px;
  align-content: start;
}

.pull {
  font-size: clamp(24px, 2.4vw, 36px);
  line-height: 1.2;
  color: var(--ink);
  max-width: 16em;
  padding-top: 6px;
}

.taught {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  column-gap: clamp(16px, 2vw, 32px);
  padding-top: 26px;
  border-top: 1px solid var(--line);
}

.inst {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px 24px;

  li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 14px;
    line-height: 1.4;
  }

  .inst-s {
    color: var(--mute);
    font-size: 12.5px;
  }
}

// ---------- talks ----------
.talks {
  padding-block: 0 var(--band);
}

.talks-lede {
  margin-top: 26px;
}

.talk-list {
  margin-top: clamp(40px, 5vw, 80px);
  border-top: 1px solid var(--line);
}

.talk {
  display: grid;
  grid-template-columns: 80px minmax(0, 7fr) minmax(0, 3fr) 40px;
  column-gap: clamp(16px, 2vw, 32px);
  align-items: center;
  padding-block: 26px;
  border-bottom: 1px solid var(--line);
  position: relative;
  isolation: isolate;
  transition: padding 0.5s var(--ease-out);

  &::before {
    content: '';
    position: absolute;
    inset: 0 calc(var(--gutter) * -1);
    z-index: -1;
    background: var(--paper-2);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.55s var(--ease-out);
  }

  .t-n {
    font-size: clamp(28px, 3vw, 44px);
    color: var(--faint);
    transition: color 0.4s var(--ease-out);
  }

  .t-main {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .t-title {
    font-size: clamp(22px, 2.3vw, 36px);
    font-weight: 380;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  .t-sub {
    font-size: clamp(17px, 1.5vw, 22px);
    color: var(--mute);
  }

  .t-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .t-go {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px var(--line-2);
    transition:
      background 0.45s var(--ease-out),
      color 0.45s var(--ease-out),
      box-shadow 0.45s var(--ease-out);

    svg {
      width: 13px;
      height: 13px;
      transition: transform 0.45s var(--ease-out);
    }
  }

  &:hover {
    padding-left: 12px;

    &::before {
      transform: scaleY(1);
      transform-origin: top;
    }

    .t-n {
      color: var(--signal);
    }

    .t-go {
      background: var(--ink);
      color: var(--paper);
      box-shadow: inset 0 0 0 1px var(--ink);

      svg {
        transform: translate(2px, -2px);
      }
    }
  }
}

// ---------- formats ----------
.formats {
  padding-block: 0 var(--band);
}

.fmt-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  margin-top: clamp(40px, 5vw, 80px);
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
    color: var(--signal);
  }

  .fmt-t {
    font-size: clamp(22px, 1.9vw, 30px);
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

// ---------- proof ----------
.proof {
  padding-block: 0 var(--band);
}

.frames {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 32px);
  margin-top: clamp(40px, 5vw, 80px);
}

.film {
  display: flex;
  flex-direction: column;
  gap: 14px;

  .film-slot {
    aspect-ratio: 16 / 9;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1px solid var(--ink);
    transform: translate(-50%, -50%);
    transition:
      background 0.45s var(--ease-out),
      transform 0.45s var(--ease-out);

    &::after {
      content: '';
      position: absolute;
      left: 55%;
      top: 50%;
      width: 0;
      height: 0;
      border-left: 12px solid var(--ink);
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      transform: translate(-50%, -50%);
      transition: border-left-color 0.45s var(--ease-out);
    }
  }

  &:hover .play {
    background: var(--ink);
    transform: translate(-50%, -50%) scale(1.08);

    &::after {
      border-left-color: var(--paper);
    }
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .film-l {
    font-size: 15px;
    font-weight: 450;
  }
}

.quotes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: clamp(16px, 2vw, 32px);
  margin-top: clamp(48px, 6vw, 96px);
  border-top: 1px solid var(--line);
}

.quote {
  padding-top: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;

  .q-text {
    font-size: clamp(21px, 1.8vw, 27px);
    line-height: 1.25;
    color: var(--ink);
    text-wrap: pretty;
  }

  footer {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .q-name {
    font-size: 14px;
    font-weight: 450;
  }
}

// ---------- person ----------
.person {
  padding-block: 0 var(--band);
}

.person-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 5fr) minmax(0, 4fr);
  column-gap: clamp(24px, 3vw, 64px);
  margin-top: clamp(48px, 6vw, 96px);
}

.portrait {
  aspect-ratio: 4 / 5;
}

.person-copy {
  .more {
    display: inline-block;
    margin-top: 28px;
    font-size: 14px;
    color: var(--ink);
  }
}

.record-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.record {
  border-top: 1px solid var(--line);

  li {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 16px;
    padding-block: 12px;
    border-bottom: 1px solid var(--line);
    font-size: 14px;
    line-height: 1.45;
    align-items: baseline;
    transition: background 0.4s var(--ease-out);
  }

  .y {
    color: var(--ink);
  }

  .r {
    color: var(--ink-2);
  }
}

// ---------- planners ----------
.planners {
  padding-block: 0 var(--band);
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  margin-top: clamp(40px, 5vw, 80px);
}

.plan {
  padding: 22px 22px 28px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 170px;

  dt {
    color: var(--mute);
  }

  dd {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--ink);
    text-wrap: pretty;
  }
}

// ---------- contact ----------
.contact {
  background: var(--ink);
  color: var(--paper);
  padding-block: var(--band);

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
    color: var(--signal);
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
@media (max-width: 1100px) {
  .person-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

    .portrait-col {
      grid-column: 1 / -1;
      max-width: 340px;
      margin-bottom: 32px;
    }
  }

  .plan-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

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

  .stat-grid {
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

  .book-grid {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }

  .cover-col {
    max-width: 220px;
  }

  .book-copy {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }

  .taught {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }

  .inst {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .talk {
    grid-template-columns: 56px minmax(0, 1fr) 36px;

    .t-meta {
      display: none;
    }
  }

  .fmt-grid,
  .frames,
  .quotes {
    grid-template-columns: 1fr;
  }

  .quote {
    padding-right: 0;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--line);
  }

  .person-grid {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    row-gap: 48px;
  }
}

@media (max-width: 600px) {
  .stat-grid {
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

  .plan-grid {
    grid-template-columns: 1fr;
  }

  .hero-foot {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
