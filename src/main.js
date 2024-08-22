import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'boxicons'
import errorMessage from './components/errorMessage.vue'
import Button from './components/Button.vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia);
app.use(router);
app.component('errorMessage',errorMessage);
app.component('Mybutton', Button);
app.component('boxicons','boxicons');
app.mount('#app')
