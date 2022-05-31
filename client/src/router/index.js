import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
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
    path: '/profile',
    name: 'profile',
    redirect: '/profile/personalInfo',
    component: ProfileView,

    children: [
      { path: 'personalInfo',
        name: 'personalInfo',
        component: ProfileView,
        },
      { path: 'companyInfo',
        name: 'companyInfo',
        component: ProfileView,
        },
      { path: 'orders',
        name: 'orders',
        component: ProfileView,
        },
      { path: 'favoritos',
        name: 'wishlist',
        component: ProfileView,
      },
      { path: 'addresses',
        name: 'addresses',
        component: ProfileView,
      },
      { path: 'security',
        name: 'security',
        component: ProfileView,
      },
      { path: 'statistics',
        name: 'statistics',
        component: ProfileView,
      },
    ]
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
