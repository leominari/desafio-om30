import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { makeServer } from "./mock"
import FloatingVue from 'floating-vue'


import './index.css'
import 'floating-vue/dist/style.css'

const app = createApp(App)

if (import.meta.env.VITE_USER_NODE_ENV === "development") {
    makeServer()
}

app.use(createPinia())
app.use(router)
app.use(FloatingVue)
app.mount('#app')
