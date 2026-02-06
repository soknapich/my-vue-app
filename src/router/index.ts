import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';
import HomeView from '@/views/HomeView.vue';
import ActualView from '@/views/ActualView.vue';
import LoginView from '@/views/LoginView.vue';
import EstimateView from '@/views/EstimateView.vue';
import BoqInputView from '@/views/BoqInputView.vue';
import SettingView from '@/views/SettingView.vue';
import Unauthorized from '@/components/Unauthorized.vue';

import { getUserInfoCookie } from '@/services/authentication';
const info = await getUserInfoCookie();
const userInfo = JSON.parse(info || '{}');

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: ['admin','manger','user'].includes(userInfo?.role) ? HomeView : Unauthorized,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/estimate',
        name: 'estimate',
        component: ['admin', 'manager'].includes(userInfo?.role) ? EstimateView : Unauthorized,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/actual',
        name: 'actual',
        component:  ['admin', 'manager','user'].includes(userInfo?.role) ? ActualView : Unauthorized,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/boq-input',
        name: 'boq-input',
        component: ['admin', 'manager', 'user'].includes(userInfo?.role) ? BoqInputView: Unauthorized,
        meta: {
          requiresAuth: true
        }
      },
            {
        path: '/setting',
        name: 'setting',
        component:['admin', 'manager'].includes(userInfo?.role) ? SettingView: Unauthorized,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
