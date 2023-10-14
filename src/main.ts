import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/plugins/firebase.config'
import { plugin } from '@formkit/vue'
import formKitConfig from '@/plugins/formkit.config'
import App from './App.vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import '@/assets/styles/index.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

app.use(router)

app.use(plugin, formKitConfig)

app.use(Vue3Lottie)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(Vue3Toastify, {
  autoClose: false
} as ToastContainerOptions)

app.mount('#app')

// TODO: Solo apra contrastar de que estamos conectados se dejará el console, al final ELIMINARLO!
console.log(`Estas en modo: ${import.meta.env.MODE}`)
