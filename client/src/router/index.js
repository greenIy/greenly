import { createRouter, createWebHistory } from 'vue-router';
//Não se pode apagar o HomeView para se manter os style do projeto
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import { createStore } from 'vuex';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductsView,
    redirect: '/produtos'
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
    path: '/painel',
    name: 'fornecedor',
    component() {
      return import(/* webpackChunkName: "supplier" */ '../views/SupplierView.vue');
    },
  },
  {
    path: '/painel/historico',
    name: 'fornecedor_historico',
    component() {
      return import(/* webpackChunkName: "supplier" */ '../views/SupplierView.vue');
    },
  },
  {
    path: '/painel',
    name: 'transportador',
    component() {
      return import(/* webpackChunkName: "transporter" */ '../views/TransporterView.vue');
    },
  },
  {
    path: '/painel/historico',
    name: 'transportador_historico',
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

// Criação da store VueX que irá albergar informação sobre o estado de autenticação e sobre o utilizador
let store = createStore({
  state: {
      isLoggedIn: false,
      user: {}
  },
  mutations: {
      UPDATE_STATUS(state, payload) {
          state.isLoggedIn = payload
      },
      SET_USER(state, payload) {
          state.user = payload
      }
  },
  actions: {
      setState(context, payload) {
          let isLoggedIn = context.state.isLoggedIn
          isLoggedIn = payload
          context.commit('UPDATE_STATUS', isLoggedIn)
      },
      setUser(context, payload) {
          context.commit('SET_USER', payload)
      }
  },
  getters: {
      getState: function (state) {
          return state.isLoggedIn
      },
      getUser: function (state) {
          return state.user
      }
  }
})



// Exportação da store para que possa ser utilizada pelo serviço de autenticação

export {
  router,
  store
} 

