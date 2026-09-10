<script setup lang="ts">
import { onMounted } from 'vue'
import { openSystem, said, site, sourceById, talks } from '@/data/site'

const publisher = sourceById(openSystem.source)
const saidSource = sourceById(said.source)
const bookTalk = talks.find((t) => t.slug === 'the-open-system')

onMounted(() => {
  document.title = `${openSystem.title} · ${site.name}`
})
</script>

<template>
  <article class="book-page">
    <header class="frame head">
      <div class="crumbs mono">
        <span>The book</span>
        <span>{{ openSystem.press }}, {{ openSystem.year }}</span>
      </div>
      <div class="head-grid">
        <figure class="cover fade-in" style="--d: 200ms">
          <picture>
            <source srcset="/open-system-cover.avif" type="image/avif" />
            <img src="/open-system-cover.jpg" :alt="`${openSystem.title}, by ${openSystem.authors}.`" width="894" height="1342" />
          </picture>
        </figure>
        <div class="titles">
          <h1 class="display lines">
            <span class="line" style="--i: 0"><span>The Open</span></span>
            <span class="line" style="--i: 1"><span>System<span class="serif">.</span></span></span>
          </h1>
          <p class="lede fade-in" style="--d: 700ms">Redesigning Education and Reigniting Democracy. Written with Dr. Doannie Tran. A working framework for diagnosing why institutions stop listening, and reversing it.</p>
          <div class="meta fade-in" style="--d: 900ms">
            <span class="mono">{{ openSystem.authors }}</span>
            <span class="mono">ISBN {{ openSystem.isbn }}</span>
            <a v-if="publisher" :href="publisher.url" target="_blank" rel="noopener noreferrer" class="mono ext">Publisher page</a>
          </div>
        </div>
      </div>
    </header>

    <section class="frame body">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">01</span>
          <span class="mono">The argument</span>
        </div>
        <div>
          <h2 class="heading" v-reveal>{{ openSystem.statement }}</h2>
          <div class="prose body-copy" v-reveal>
            <p v-for="p in openSystem.body" :key="p">{{ p }}</p>
          </div>
          <p class="pull serif" v-reveal>{{ openSystem.pull }}</p>
        </div>
      </div>
    </section>

    <section class="frame taught">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">02</span>
          <span class="mono">Taught at</span>
        </div>
        <ul class="inst" v-reveal>
          <li v-for="[name, sub] in openSystem.taughtAt" :key="name">
            <span class="inst-n">{{ name }}</span>
            <span v-if="sub" class="inst-s">{{ sub }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="frame said">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">03</span>
          <span class="mono">On the record</span>
        </div>
        <div class="said-main">
          <p class="said-q serif" v-reveal>“{{ said.quote }}”</p>
          <a v-if="saidSource" :href="saidSource.url" target="_blank" rel="noopener noreferrer" class="mono ext" v-reveal>{{ saidSource.outlet }}, {{ saidSource.date }}</a>
        </div>
      </div>
    </section>

    <section v-if="bookTalk" class="frame cta">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">04</span>
          <span class="mono">Book the session</span>
        </div>
        <div class="cta-main" v-reveal>
          <h2 class="heading">{{ bookTalk.title }}<span class="serif sub">, {{ bookTalk.subtitle }}</span></h2>
          <div class="cta-row">
            <router-link :to="{ name: 'talk', params: { slug: bookTalk.slug } }" class="btn ghost">See the session</router-link>
            <router-link :to="{ name: 'home', hash: '#contact' }" class="btn">
              Request availability
              <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
.book-page {
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
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  column-gap: clamp(16px, 2vw, 32px);
  align-items: end;
  padding-block: var(--gap-l) var(--band);
}

.cover {
  max-width: 360px;
  box-shadow: 30px 30px 60px -30px rgba(0, 0, 0, 0.35);
  background: var(--ink);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: flex-start;

  .serif {
    color: var(--clay);
  }

  .lede {
    max-width: 28em;
  }
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  width: 100%;
}

.body,
.taught,
.said,
.cta {
  padding-block: 0 var(--band);
}

.body-copy {
  margin-top: 28px;
  max-width: 40em;
  font-size: clamp(17px, 1.3vw, 20px);
}

.pull {
  margin-top: 36px;
  font-size: var(--fs-sub);
  line-height: 1.2;
  color: var(--ink);
  max-width: 16em;
}

.inst {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px 24px;

  li {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 14px;
    border-top: 1px solid var(--line);
    font-size: 16px;
    line-height: 1.4;
  }

  .inst-s {
    color: var(--mute);
    font-size: 13px;
  }
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

.cta-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;

  .sub {
    color: var(--mute);
    font-size: 0.8em;
  }
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 960px) {
  .head-grid {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }

  .cover {
    max-width: 240px;
  }

  .inst {
    grid-template-columns: 1fr;
  }
}
</style>
