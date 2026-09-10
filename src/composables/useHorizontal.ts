import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// A horizontal rail driven by vertical scroll. `root` is a tall wrapper,
// its child stays sticky for the full viewport, and `track` slides left as
// the wrapper scrolls through. Below the desktop breakpoint the track is
// left alone so it can be a native horizontal scroller instead.
export function useHorizontal(root: Ref<HTMLElement | null>, track: Ref<HTMLElement | null>) {
  const progress = ref(0)
  let raf = 0
  let enabled = true

  const update = () => {
    raf = 0
    const el = root.value
    const t = track.value
    if (!el || !t) return
    if (window.innerWidth < 960 || !enabled) {
      t.style.transform = ''
      return
    }
    const vh = window.innerHeight
    const r = el.getBoundingClientRect()
    const total = el.offsetHeight - vh
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
    const dist = Math.max(0, t.scrollWidth - window.innerWidth)
    t.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`
    progress.value = p
  }

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  onMounted(() => {
    enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  return { progress }
}
