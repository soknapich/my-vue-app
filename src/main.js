import { createApp } from 'vue';
import "@/assets/main.css";
import App from '@/App.vue';
import router from '@/router';
import '@/services/navigation-guard';

const app = createApp(App);
app.use(router);
app.mount('#app');
