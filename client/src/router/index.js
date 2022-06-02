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
    path: '/profile',
    name: 'profile',
    component() {
      return import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue');
    },
  },
  {
    path: '/painel/fornecedor',
    name: 'fornecedor',
    component() {
      return import(/* webpackChunkName: "supplier" */ '../views/SupplierView.vue');
    },
  },
  {
    path: '/painel/transportador',
    name: 'transportador',
    component() {
      return import(/* webpackChunkName: "transporter" */ '../views/TransporterView.vue');
    },
  },
  {
    path: '/fornecedores',
    name: 'suppliers',
    component() {
      return import(/* webpackChunkName: "suppliers" */ '../views/SuppliersView.vue');
    },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
