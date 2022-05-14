import { createRouter, createWebHistory } from 'vue-router';
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
  {
    path: '/wishlist',
    name: 'wishlist',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/WishlistView.vue');
  },
  {
    path: '/profile',
    name: 'profile',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/ProfileView.vue');
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
