<script setup lang="ts">
import { site } from '@/data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="frame">
      <div class="foot">
        <div class="col">
          <span class="mono">Represented by</span>
          <span class="val">{{ site.agency }}</span>
        </div>
        <div class="col">
          <span class="mono">Bookings</span>
          <a :href="`mailto:${site.email}`" class="val link-line">{{ site.emailLabel }}</a>
        </div>
        <div class="col">
          <span class="mono">Travels from</span>
          <span class="val">{{ site.travelsFrom }}</span>
        </div>
        <div class="col right">
          <span class="mono">© {{ year }} {{ site.honorific }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  border-top: 1px solid var(--line);
  padding-block: 34px 40px;
}

.foot {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .val {
    font-size: 14px;
    color: var(--ink);
  }

  &.right {
    align-items: flex-end;
    justify-content: flex-end;
  }
}

@media (max-width: 860px) {
  .foot {
    grid-template-columns: 1fr 1fr;
  }

  .col.right {
    align-items: flex-start;
  }
}
</style>
