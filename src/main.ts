import '@/assets/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'

import App from './App.vue'
import router from './router'

library.add(fasStar,farStar)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig({
  theme: 'genesis'
}))
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
