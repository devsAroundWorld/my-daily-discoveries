import '@/assets/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig({
  theme: 'genesis'
}))
app.mount('#app')
