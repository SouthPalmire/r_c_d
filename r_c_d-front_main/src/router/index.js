import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const Register = () => import('../views/Register.vue');

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    alias: '/',
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
