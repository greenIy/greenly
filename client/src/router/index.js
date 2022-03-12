import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component() {
      return import(/* webpackChunkName: "login" */ '../views/LoginView.vue');
    },
  },
  {
    path: '/register',
    name: 'register',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/RegisterView.vue');
    },
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
