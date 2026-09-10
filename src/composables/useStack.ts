import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { scrollToY } from './useLenis'

// Stacked spreads. Every `.panel` inside `root` is sticky at the top of the
// viewport; the next one scrolls up over it. A panel may sit inside a
// taller `.panel-wrap` so it stays pinned for extra scroll (the work spread
// uses that room to step through its doors).
//
// Each scroll frame sets `--cover` (0 to 1) on every panel, how far the
// following panel has covered it, which the CSS turns into blur, scale and
// fade. It also reports which spread is current and whether the stack is
// on screen at all, for the floating toolbar.
export function useStack(root: Ref<HTMLElement | null>) {
  const active = ref(0)
  const inView = ref(false)
  const progress = ref(0)
  let raf = 0
  let panels: HTMLElement[] = []

  const anchorOf = (p: HTMLElement) => (p.parentElement?.classList.contains('panel-wrap') ? p.parentElement : p)

  const update = () => {
    raf = 0
    const el = root.value
    if (!el) return
    const vh = window.innerHeight
    let current = 0
    for (let i = 0; i < panels.length; i++) {
      const next = panels[i + 1]
      const cover = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0
      panels[i]!.style.setProperty('--cover', cover.toFixed(3))
      panels[i]!.classList.toggle('covered', cover > 0.004)
      if (anchorOf(panels[i]!).getBoundingClientRect().top <= vh * 0.5) current = i
    }
    active.value = current
    const r = el.getBoundingClientRect()
    inView.value = r.top <= vh * 0.35 && r.bottom >= vh * 0.65
    const total = el.offsetHeight - vh
    progress.value = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
  }

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  const scrollTo = (i: number) => {
    const p = panels[i]
    if (!p) return
    scrollToY(anchorOf(p).getBoundingClientRect().top + window.scrollY)
  }

  onMounted(() => {
    if (!root.value) return
    panels = Array.from(root.value.querySelectorAll<HTMLElement>('.panel'))
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  return { active, inView, progress, scrollTo }
}
