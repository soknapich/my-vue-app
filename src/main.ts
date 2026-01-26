import { createApp } from 'vue';
import App from '@/App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primeuix/themes/aura';
import  'primeicons/primeicons.css';   // <-- Correct path
import { createPinia } from 'pinia';

import "@/assets/main.css";
import router from '@/router';
import '@/services/navigation-guard';

// PrimeVue Components
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const app = createApp(App);
// 1️⃣ Create Pinia instance
const pinia = createPinia();
// 2️⃣ Install Pinia
app.use(pinia);
app.use(router);

app.component('Dialog', Dialog);
app.component('Button', Button);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.mount('#app');
