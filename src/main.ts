import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { content } from './data/site'
import { resolveKitEnv } from './kit/env'
import { initApotomeAnalytics } from './kit/analytics'
import { applyDeep, initApotomeEditor, loadPublishedContent } from './kit/editor'
import './assets/main.scss'

const app = createApp(App).use(router).directive('reveal', reveal)

// Mount only once the first route's chunk has resolved, so the header, the
// page and the footer paint together instead of the footer arriving first.
router.isReady().then(() => {
  app.mount('#app')

  /* -----------------------------------------------------------------------
   * Apotome Labs: analytics and the in-situ content editor.
   *
   * Both are opt-in on environment (VITE_APOTOME_API_URL and
   * VITE_APOTOME_SITE_KEY). With them unset nothing below runs, so the site
   * builds and runs standalone exactly as before.
   *
   * The published overlay is merged onto the content tree before the editor
   * starts, so the editor edits what visitors actually see rather than the
   * defaults compiled into the bundle. Mounting happens first either way: a
   * slow or unreachable studio must never delay the site rendering.
   * -------------------------------------------------------------------- */
  const kit = resolveKitEnv()
  if (!kit) return

  // cookieless, and it fails silently: a counter must never break a page
  initApotomeAnalytics({ ...kit, router })

  void loadPublishedContent(kit).then((overlay) => {
    if (overlay) applyDeep(content, overlay)
    // the bar only appears for a signed-in owner, or behind #edit
    initApotomeEditor({ ...kit, config: content })
  })
})
