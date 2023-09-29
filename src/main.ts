import '@/assets/styles/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import formKitConfig from './formkit.config'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(plugin, formKitConfig)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
