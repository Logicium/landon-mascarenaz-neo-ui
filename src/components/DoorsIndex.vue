<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { doors } from '@/data/site'

// Three doors into one body of work. The left column pins a large index
// numeral that ticks over as each door scrolls through the middle of the
// viewport, the way a gallery slider counts works.
const active = ref(0)
const items = ref<HTMLElement[]>([])
let io: IntersectionObserver | null = null

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = Number((e.target as HTMLElement).dataset.i)
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  )
  items.value.forEach((el) => io?.observe(el))
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section id="work" class="doors frame">
    <div class="layout">
      <aside class="pin">
        <div class="counter" aria-hidden="true">
          <div class="digits">
            <transition name="tick" mode="out-in">
              <span :key="active" class="num big">{{ doors[active]?.n }}</span>
            </transition>
          </div>
          <span class="of num">/{{ String(doors.length).padStart(2, '0') }}</span>
        </div>
        <p class="lede pin-copy" v-reveal>
          Different audiences meet this work from different directions. A workforce board and a democracy foundation are asking the same question from opposite ends of it.
        </p>
        <ol class="mini" aria-hidden="true">
          <li v-for="(d, i) in doors" :key="d.n" :class="{ on: i === active }">
            <span class="mono">{{ d.n }}</span>
            <span class="mini-t">{{ d.short }}</span>
          </li>
        </ol>
      </aside>

      <div class="list">
        <article
          v-for="(d, i) in doors"
          :key="d.n"
          :ref="(el) => { if (el) items[i] = el as HTMLElement }"
          :data-i="i"
          class="door"
          :class="{ on: i === active }"
        >
          <div class="door-top">
            <span class="mono idx">{{ d.n }}</span>
            <span class="serif who-serif">for {{ d.audiences[0] }}</span>
          </div>
          <figure class="door-img print" v-reveal>
            <picture>
              <source :srcset="`/img/${d.image}.avif`" type="image/avif" />
              <img :src="`/img/${d.image}.jpg`" :alt="d.imageAlt" loading="lazy" />
            </picture>
          </figure>
          <h3 class="door-title">{{ d.title }}</h3>
          <p class="door-body">{{ d.body }}</p>
          <ul class="aud">
            <li v-for="a in d.audiences" :key="a" class="mono">{{ a }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.doors {
  padding-block: 0 var(--band);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  column-gap: clamp(24px, 4vw, 96px);
}

.pin {
  position: sticky;
  top: calc(var(--header-h) + 40px);
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 4vw, 64px);
}

.counter {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  color: var(--clay);

  .digits {
    overflow: hidden;
    height: calc(var(--fs-num-xl) * 0.82);
    display: flex;
    align-items: flex-end;
  }

  .big {
    font-size: var(--fs-num-xl);
    display: block;
  }

  .of {
    font-size: var(--fs-sub);
    color: var(--mute);
    padding-bottom: 0.15em;
  }
}

.tick-enter-active,
.tick-leave-active {
  transition:
    transform 0.55s var(--ease-out),
    opacity 0.4s var(--ease-out);
}

.tick-enter-from {
  transform: translateY(60%);
  opacity: 0;
}

.tick-leave-to {
  transform: translateY(-60%);
  opacity: 0;
}

.pin-copy {
  max-width: 24em;
}

.mini {
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    display: flex;
    gap: 14px;
    align-items: baseline;
    color: var(--faint);
    transition: color 0.4s var(--ease-out);

    .mini-t {
      font-size: 13.5px;
    }

    .mono {
      color: inherit;
    }

    &.on {
      color: var(--ink);

      .mono {
        color: var(--clay);
      }
    }
  }
}

.list {
  display: flex;
  flex-direction: column;
}

.door {
  padding-block: clamp(40px, 6vw, 96px);
  border-top: 1px solid var(--line);
  display: grid;
  gap: 22px;
  transition: opacity 0.6s var(--ease-out);

  &:last-child {
    border-bottom: 1px solid var(--line);
  }

  .door-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
  }

  .idx {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--ink);

    &::before {
      content: '';
      width: 9px;
      height: 9px;
      background: var(--clay);
    }
  }

  .who-serif {
    font-size: 19px;
    color: var(--mute);
  }

  .door-img {
    aspect-ratio: 3 / 2;
    overflow: hidden;
    margin-block: 6px 10px;

    picture,
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .door-title {
    font-size: var(--fs-heading);
    font-weight: 360;
    letter-spacing: -0.036em;
    line-height: 1;
    max-width: 11em;
  }

  .door-body {
    font-size: clamp(16px, 1.25vw, 19px);
    line-height: 1.55;
    color: var(--ink-2);
    max-width: 34em;
    text-wrap: pretty;
  }

  .aud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    margin-top: 6px;

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
        background: var(--line-2);
        transition: background 0.4s var(--ease-out);
      }
    }
  }

  &.on .aud li::before {
    background: var(--clay);
  }
}

@media (hover: hover) {
  .list:hover .door:not(:hover) {
    opacity: 0.45;
  }
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
    row-gap: 40px;
  }

  .pin {
    position: static;
  }

  .mini {
    display: none;
  }
}
</style>
