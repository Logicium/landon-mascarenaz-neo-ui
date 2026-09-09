<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Full-bleed WebGL layer behind the hero. The scene itself is lazy-loaded so
// three.js never blocks first paint.
const canvas = ref<HTMLCanvasElement | null>(null)
const host = ref<HTMLElement | null>(null)
let scene: {
  setScroll(p: number): void
  setPointer(x: number, y: number): void
  setInView(v: boolean): void
  dispose(): void
} | null = null
let raf = 0
let io: IntersectionObserver | null = null

const onScroll = () => {
  if (!scene || !host.value) return
  const h = host.value.clientHeight || window.innerHeight
  scene.setScroll(window.scrollY / (h * 0.9))
}

const onPointer = (e: PointerEvent) => {
  if (!scene) return
  scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1))
}

onMounted(async () => {
  if (!canvas.value) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { OpenSystemScene } = await import('@/three/openSystem')
  if (!canvas.value) return
  scene = new OpenSystemScene(canvas.value, { reducedMotion })
  window.addEventListener('scroll', onScroll, { passive: true })
  if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })
  onScroll()
  if (host.value) {
    io = new IntersectionObserver(([e]) => scene?.setInView(!!e?.isIntersecting), { threshold: 0 })
    io.observe(host.value)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('pointermove', onPointer)
  scene?.dispose()
  scene = null
})
</script>

<template>
  <div ref="host" class="hero-scene" aria-hidden="true">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped lang="scss">
.hero-scene {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
