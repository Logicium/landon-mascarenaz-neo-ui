import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import './assets/main.scss'

const app = createApp(App).use(router).directive('reveal', reveal)

// Mount only once the first route's chunk has resolved, so the header, the
// page and the footer paint together instead of the footer arriving first.
router.isReady().then(() => app.mount('#app'))
