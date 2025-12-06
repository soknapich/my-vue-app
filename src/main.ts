import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import  'primeicons/primeicons.css';   // <-- Correct path

import "@/assets/main.css";
import router from '@/router';
import '@/services/navigation-guard';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app');
