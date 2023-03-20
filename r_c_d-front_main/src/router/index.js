import { createRouter, createWebHistory } from 'vue-router';
import UserLoginRegistration from '../views/UserLoginRegistration.vue';

// const Register = () => import('../views/UserRegistration.vue');

const routes = [
  {
    name: 'UserLogin',
    path: '/login',
    component: UserLoginRegistration,
    // alias: '/',
  },
  // {
  //   name: 'UserRegister',
  //   path: '/register',
  //   component: Register,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
