<script setup lang="ts">
import { onMounted } from 'vue'
import { site, talks, testimonials, watch } from '@/data/site'

onMounted(() => {
  document.title = `Talks · ${site.name}`
})
</script>

<template>
  <article class="talks-page">
    <header class="frame head">
      <div class="crumbs mono">
        <span>Talks</span>
        <span>{{ String(talks.length).padStart(2, '0') }} sessions</span>
      </div>
      <div class="head-grid">
        <h1 class="display lines">
          <span class="line" style="--i: 0"><span>Six sessions<span class="serif">,</span></span></span>
          <span class="line" style="--i: 1"><span>outcomes written.</span></span>
        </h1>
        <p class="lede fade-in" style="--d: 700ms">Every proposal form asks for learning outcomes. They are published here so a program committee can lift them straight into the agenda.</p>
      </div>
    </header>

    <section class="frame list">
      <ol class="talk-list">
        <li v-for="t in talks" :key="t.slug" v-reveal>
          <router-link :to="{ name: 'talk', params: { slug: t.slug } }" class="talk">
            <span class="t-n num">{{ t.n }}</span>
            <figure class="t-img tone">
              <picture>
                <source :srcset="`/img/${t.image}-c.avif`" type="image/avif" />
                <img :src="`/img/${t.image}-c.jpg`" :alt="t.title" loading="lazy" />
              </picture>
            </figure>
            <span class="t-main">
              <span class="t-title">{{ t.title }}</span>
              <span class="t-sub serif">{{ t.subtitle }}</span>
              <span class="t-body">{{ t.body }}</span>
            </span>
            <span class="t-meta">
              <span class="mono">{{ t.audience }}</span>
              <span class="mono">{{ t.level }}</span>
              <span class="mono">{{ t.formats }}</span>
            </span>
            <span class="t-go" aria-hidden="true">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 12 12 2M4 2h8v8" /></svg>
            </span>
          </router-link>
        </li>
      </ol>
    </section>

    <section class="frame proof">
      <div class="sec-head">
        <div class="sec-idx">
          <span class="mono">07</span>
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

    <section class="frame cta">
      <router-link :to="{ name: 'home', hash: '#contact' }" class="btn">
        Request availability
        <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 12 2M4 2h8v8" /></svg>
      </router-link>
    </section>
  </article>
</template>

<style scoped lang="scss">
.talks-page {
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

.talk-list {
  border-top: 1px solid var(--line);
}

.talk {
  display: grid;
  grid-template-columns: 96px minmax(0, 3fr) minmax(0, 6fr) minmax(0, 2fr) 40px;
  column-gap: clamp(16px, 2vw, 32px);
  align-items: center;
  padding-block: 28px;
  border-bottom: 1px solid var(--line);
  position: relative;
  isolation: isolate;
  transition: padding 0.5s var(--ease-out);

  &::before {
    content: '';
    position: absolute;
    inset: 0 calc(var(--gutter) * -1);
    z-index: -1;
    background: color-mix(in srgb, var(--turq) 8%, var(--paper));
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.55s var(--ease-out);
  }

  .t-n {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: var(--fs-num-md);
    color: var(--faint);
    transition: color 0.4s var(--ease-out);

    &::before {
      content: '';
      flex: none;
      width: 9px;
      height: 9px;
      background: var(--turq);
    }
  }

  .t-img {
    aspect-ratio: 3 / 2;
    overflow: hidden;

    picture,
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .t-main {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .t-title {
    font-size: var(--fs-sub);
    font-weight: 380;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  .t-sub {
    font-size: clamp(17px, 1.5vw, 22px);
    color: var(--mute);
  }

  .t-body {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--ink-2);
    max-width: 40em;
    margin-top: 6px;
    text-wrap: pretty;
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
      color: var(--turq-deep);
    }

    .t-go {
      background: var(--turq-deep);
      color: var(--paper);
      box-shadow: inset 0 0 0 1px var(--turq-deep);

      svg {
        transform: translate(2px, -2px);
      }
    }
  }
}

.proof {
  padding-block: var(--band) 0;
}

.frames {
  margin-top: var(--gap-l) !important;
}

.frames {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 32px);
  margin-top: clamp(40px, 5vw, 80px);
}

.film {
  --tint: var(--clay);
  display: flex;
  flex-direction: column;
  gap: 14px;

  .film-slot {
    aspect-ratio: 16 / 9;
    background: color-mix(in srgb, var(--tint) 10%, var(--paper-2));
    border-color: color-mix(in srgb, var(--tint) 30%, var(--line));

    &::before {
      display: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, var(--tint) 0.9px, transparent 1.25px);
      background-size: 7px 7px;
      opacity: 0.2;
      mask-image: linear-gradient(160deg, #000 20%, transparent 85%);
      -webkit-mask-image: linear-gradient(160deg, #000 20%, transparent 85%);
    }

    .slot-tag {
      z-index: 1;
      color: color-mix(in srgb, var(--tint) 70%, var(--ink));
    }
  }

  .play {
    position: absolute;
    z-index: 1;
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
    font-size: var(--fs-title);
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

.cta {
  padding-block: var(--band);
}

@media (max-width: 960px) {
  .head-grid {
    grid-template-columns: 1fr;
    row-gap: 28px;
  }

  .talk {
    grid-template-columns: 68px minmax(0, 1fr) 36px;
    row-gap: 16px;

    .t-img {
      grid-column: 1 / -1;
      max-width: 420px;
    }

    .t-main {
      grid-column: 2;
    }

    .t-meta {
      display: none;
    }
  }

  .frames,
  .quotes {
    grid-template-columns: 1fr;
  }

  .quote {
    padding-right: 0;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--line);
  }
}
</style>
