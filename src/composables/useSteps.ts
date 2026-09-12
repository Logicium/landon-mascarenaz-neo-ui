import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// A pinned spread that steps through `count` states while its spacer, the
// empty block that follows it in the stack, scrolls through the viewport.
// The panel itself stays sticky in the shared stack the whole time, so the
// next spread still slides over it. `index` is the current step, `sub` the
// progress within it (0 to 1). On narrow screens the spacer is hidden and
// the first step is shown.
export function useSteps(spacer: Ref<HTMLElement | null>, count: number) {
  const index = ref(0)
  const sub = ref(0)
  let raf = 0

  const update = () => {
    raf = 0
    const el = spacer.value
    if (!el || window.innerWidth < 960) return
    // The spacer's top starts one viewport down when the panel pins, and
    // reaches the top of the viewport when the spacer has fully passed.
    const h = el.offsetHeight
    const p = h > 0 ? Math.min(0.9999, Math.max(0, (window.innerHeight - el.getBoundingClientRect().top) / h)) : 0
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

  // Spacer height: extra scroll per step after the first.
  const height = `${(count - 1) * 72}vh`

  return { index, sub, height }
}
