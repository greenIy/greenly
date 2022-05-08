// Bootstrap imports
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './router/auth';
import { createStore } from 'vuex';
import GAuth from 'vue3-google-oauth2';





// Fontawesome imports
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const myApp = createApp(App);

myApp.component('font-awesome-icon', FontAwesomeIcon);
myApp.component('font-awesome-layers', FontAwesomeLayers);
myApp.component('font-awesome-layers-text', FontAwesomeLayersText);

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

myApp.use(store)

/* Antes da validação de cada pedido de navegação,
   verificar se o utilizador de facto pode visitar a página,
   tendo em conta o seu estado de autenticação. */
router.beforeEach(AuthService.authenticate);

myApp.use(router).mount('#app');

const gauthOption = {
    clientId: '569764819828-g3po196193avqfu9bc9puqp1ncihjipr.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}

myApp.use(GAuth, gauthOption);


// Exportação da store para que possa ser utilizada pelo serviço de autenticação
export default store;
