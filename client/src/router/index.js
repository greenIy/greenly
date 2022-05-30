import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';

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
    // route level code-splitting
    // this generates a separate chunk (product.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ProductsView,
    children: [
      { path: ':categoria+',
      name: 'categoria',
      component: ProductsView,
      props: route => ({
        categoria: route.params.categoria.split('/')
      }) }
    ]
  },
  {
    path: '/produto/:id',
    name: 'produto',
    // route level code-splitting
    // this generates a separate chunk (product.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "product" */ '../views/ProductView.vue');
    },
  },
  {
    path: '/equipa',
    name: 'equipa',
    // route level code-splitting
    // this generates a separate chunk (product.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue');
    },
  },
  {
    path: '/registar',
    name: 'registar',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/RegisterView.vue');
    },
  },
  {
    path: '/favoritos',
    name: 'wishlist',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/WishlistView.vue');
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/ProfileView.vue');
    },
  },
  {
    path: '/carrinho',
    name: 'cart',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/CartView.vue');
    },
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
