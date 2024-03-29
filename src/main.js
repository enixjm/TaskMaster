import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

import vClickOutside from 'click-outside-vue3'

const app = createApp(App)
app.use(vClickOutside)
app.mount('#app')
