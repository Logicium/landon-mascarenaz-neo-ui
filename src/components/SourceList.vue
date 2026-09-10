<script setup lang="ts">
import { computed } from 'vue'
import { sources } from '@/data/site'

// The public record, numbered to match the superscript cites in the bio.
// Pass `ids` to show a subset; the numbering stays global so citations
// still line up.
const props = defineProps<{ ids?: string[] }>()

const list = computed(() =>
  sources
    .map((s, i) => ({ ...s, n: i + 1 }))
    .filter((s) => !props.ids || props.ids.includes(s.id)),
)
</script>

<template>
  <ol class="src-list">
    <li v-for="(s, i) in list" :key="s.id" v-reveal :style="{ '--reveal-delay': `${(i % 2) * 70}ms` }">
      <a :href="s.url" target="_blank" rel="noopener noreferrer" class="src">
        <span class="mono src-n">{{ String(s.n).padStart(2, '0') }}</span>
        <span class="src-main">
          <span class="src-t">{{ s.title }}</span>
          <span class="mono src-m">{{ s.outlet }}<template v-if="s.date"> · {{ s.date }}</template></span>
        </span>
        <span class="src-go" aria-hidden="true">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 12 12 2M4 2h8v8" /></svg>
        </span>
      </a>
    </li>
  </ol>
</template>

<style scoped lang="scss">
.src-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(24px, 3vw, 64px);
  border-top: 1px solid var(--line);
}

.src {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) 28px;
  column-gap: 14px;
  align-items: start;
  padding-block: 16px 18px;
  border-bottom: 1px solid var(--line);
  transition: color 0.35s var(--ease-out);

  .src-n {
    color: var(--turq-deep);
    padding-top: 3px;
  }

  .src-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .src-t {
    font-size: 15px;
    line-height: 1.35;
    letter-spacing: -0.01em;
    text-wrap: pretty;
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
      transition: transform 0.4s var(--ease-out);
    }
  }

  &:hover {
    color: var(--turq-deep);

    .src-go {
      background: var(--turq-deep);
      color: var(--paper);
      box-shadow: inset 0 0 0 1px var(--turq-deep);

      svg {
        transform: translate(1px, -1px);
      }
    }
  }
}

@media (max-width: 860px) {
  .src-list {
    grid-template-columns: 1fr;
  }
}
</style>
