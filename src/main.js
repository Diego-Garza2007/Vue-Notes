import './assets/reset.css'
import './assets/main.css'
import './assets/theme.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import Vuetify y estilos
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useDarkMode } from '../src/stores/useDarkmode'

const vuetify = createVuetify({
  components,
  directives
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // <-- aquí registramos Vuetify
app.mount('#app')
useDarkMode()