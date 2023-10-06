import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { firebaseApp } from '@/plugins/firebase.config'
import { plugin } from '@formkit/vue'
import formKitConfig from '@/plugins/formkit.config'
import App from './App.vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/assets/styles/index.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(plugin, formKitConfig)

app.use(Vue3Lottie)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')

// TODO: Solo apra contrastar de que estamos conectados se dejará el console, al final ELIMINARLO!
console.log({firebaseApp})
console.log(import.meta.env.MODE)
