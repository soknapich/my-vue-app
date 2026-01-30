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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import ContextMenu from 'primevue/contextmenu';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import TreeTable from 'primevue/treetable';
import { Form } from '@primevue/forms';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Checkbox from 'primevue/checkbox';

const app = createApp(App);
// 1️⃣ Create Pinia instance
const pinia = createPinia();
// 2️⃣ Install Pinia
app.use(pinia);
app.use(router);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('ContextMenu', ContextMenu);
app.component('Select', Select);
app.component('Toast', Toast);
app.component("TreeTable", TreeTable);
app.component('Form', Form);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Checkbox', Checkbox);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ConfirmationService);
app.use(ToastService);
app.mount('#app');
