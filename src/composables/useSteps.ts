import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// A pinned spread that steps through `count` states as its wrapper scrolls.
// `index` is the current step, `sub` the progress within it (0 to 1). On
// narrow screens the wrapper collapses and the first step is shown.
export function useSteps(wrap: Ref<HTMLElement | null>, count: number) {
  const index = ref(0)
  const sub = ref(0)
  let raf = 0

  const update = () => {
    raf = 0
    const el = wrap.value
    if (!el || window.innerWidth < 960) return
    const total = el.offsetHeight - window.innerHeight
    const p = total > 0 ? Math.min(0.9999, Math.max(0, -el.getBoundingClientRect().top / total)) : 0
    index.value = Math.floor(p * count)
    sub.value = p * count - index.value
  }

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  // Wrapper height: one viewport plus extra scroll per step after the first.
  const height = `calc(100svh + ${(count - 1) * 72}vh)`

  return { index, sub, height }
}
