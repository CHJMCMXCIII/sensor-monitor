import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import socketPlugin from './plugins/socket.js'
import { host } from './config'

createApp(App)
.use(store)
.use(socketPlugin, {
    host
})
.mount('#app')
