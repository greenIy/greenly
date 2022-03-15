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
    path: '/produtos',
    name: 'produtos',
    component() {
      return import(/* webpackChunkName: "login" */ '../views/FiltersView.vue');
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
