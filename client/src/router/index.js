import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// Country and Region select
import CountrySelect from '@/components/Register/country-select.vue'
import RegionSelect from '@/components/Register/region-select.vue'

const install = function (Vue) {
  const components = { CountrySelect, RegionSelect }
  Object.keys(components).forEach(name => {
      Vue.component(name, components[name])
  })
}

const VueCountryRegionSelect = { CountrySelect, RegionSelect, install }

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
  VueCountryRegionSelect,

});

export default router;

export { CountrySelect, RegionSelect }