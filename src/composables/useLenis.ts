import Lenis from 'lenis'

// One inertial scroller for the whole app. Native scrolling stays in place,
// Lenis eases the wheel and drives `scrollTo`, so every scroll-driven value
// on the page (the stacked spreads, the rails, the doors) inherits the same
// smoothing. Off when the visitor asks for reduced motion.
let lenis: Lenis | null = null
let raf = 0

export function startLenis() {
  if (lenis || typeof window === 'undefined') return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    smoothWheel: true,
  })
  const loop = (t: number) => {
    lenis?.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return lenis
}

export function stopLenis() {
  cancelAnimationFrame(raf)
  lenis?.destroy()
  lenis = null
}

export function getLenis() {
  return lenis
}

// Scroll to a document offset with the same easing as the wheel.
export function scrollToY(top: number, immediate = false) {
  if (lenis) lenis.scrollTo(top, { immediate, duration: 1.4 })
  else window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}
