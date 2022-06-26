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
    path: '/registo',
    name: 'registo',
    component() {
      return import(/* webpackChunkName: "register" */ '../views/RegisterView.vue');
    },
  },
  {
    path: '/perfil',
    name: 'perfil',
    redirect: '/perfil/detalhes',
    component: ProfileView,

    children: [
      { path: 'detalhes',
        name: 'personalInfo',
        component: ProfileView,
        },
      { path: 'empresa',
        name: 'companyInfo',
        component: ProfileView,
        },
      { path: 'encomendas',
        name: 'orders',
        component: ProfileView,
        },
      { path: 'favoritos',
        name: 'wishlist',
        component: ProfileView,
      },
      { path: 'moradas',
        name: 'addresses',
        component: ProfileView,
      },
      { path: 'seguranca',
        name: 'security',
        component: ProfileView,
      },
      { path: 'estatisticas',
        name: 'statistics',
        component: ProfileView,
      },
    ]
    },
    {
      path: '/checkout',
      name: 'checkout',
      component() {
        return import(/* webpackChunkName: "checkout" */ '../views/CheckoutView.vue');
      },
    },
    {
      path: '/sucesso',
      name: 'sucesso',
      component() {
        return import(/* webpackChunkName: "sucesso" */ '../views/SuccessView.vue');
    },

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
