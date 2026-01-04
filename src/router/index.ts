import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';
import HomeView from '@/views/HomeView.vue';
import ActualView from '@/views/ActualView.vue';
import LoginView from '@/views/LoginView.vue';
import EstimateView from '@/views/EstimateView.vue';

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
        component: HomeView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/estimate',
        name: 'estimate',
        component: EstimateView,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/actual',
        name: 'actual',
        component: ActualView,
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
