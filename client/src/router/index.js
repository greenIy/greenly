import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
