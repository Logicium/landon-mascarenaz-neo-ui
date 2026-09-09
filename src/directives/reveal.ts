import type { Directive } from 'vue'

// v-reveal — fades and lifts an element in the first time it enters the viewport.
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
      )
    : null

export const reveal: Directive<HTMLElement> = {
  mounted(el) {
    if (!observer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.classList.add('reveal-init')
    observer.observe(el)
  },
  beforeUnmount(el) {
    observer?.unobserve(el)
  },
}
