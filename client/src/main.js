// Bootstrap imports
import { Toast } from 'bootstrap';
import mitt from 'mitt';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './router/auth';
import GAuth from 'vue3-google-oauth2';

// Fontawesome imports
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import { router, store } from './router/index';

// Axios imports
import axios from 'axios';
import VueAxios from 'vue-axios';

//Draggable
import VueDraggable from 'vuedraggable';

const myApp = createApp(App);
const emitter = mitt();
myApp.config.globalProperties.emitter = emitter;
myApp.use(VueAxios, axios);

myApp.component('font-awesome-icon', FontAwesomeIcon);
myApp.component('font-awesome-layers', FontAwesomeLayers);
myApp.component('font-awesome-layers-text', FontAwesomeLayersText);

myApp.use(store)

/* Antes da validação de cada pedido de navegação,
   verificar se o utilizador de facto pode visitar a página,
   tendo em conta o seu estado de autenticação. */
router.beforeEach(AuthService.authenticate);

/**
 * Decidir para que página de painel levar o utilizador consoante o seu tipo
 */

router.beforeResolve((to, from, next) => {
    let user = store.getters.getUser


    let validFrom = from.name == undefined

    if (to.path == "/painel" && validFrom) {
        
        let routeMap = {
            "CONSUMER":"profile",
            "SUPPLIER":"fornecedor",
            "TRANSPORTER":"transportador",
            "ADMINISTRATOR":"administrador"
        }
    
        let isCorrectRoute = to.name == routeMap[user.type]

        if (!isCorrectRoute) {
            next({name: routeMap[user.type]})
        } else {
            next()
        }

    } else if (to.path == "/painel/historico" && validFrom) {
        
        let routeMap = {
            "CONSUMER":"profile",
            "SUPPLIER":"fornecedor_historico",
            "TRANSPORTER":"transportador_historico",
            "ADMINISTRATOR":"administrador"
        }
    
        let isCorrectRoute = to.name == routeMap[user.type]

        if (!isCorrectRoute) {
            next({name: routeMap[user.type]})
        } else {
            next()
        }

    } else {
        next()
    } 
})

myApp.use(router).mount('#app');

window.document.title = "Greenly";

// Google authentication
const gauthOption = {
    clientId: '569764819828-g3po196193avqfu9bc9puqp1ncihjipr.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}

// Instanciação do componente GAuth
myApp.use(GAuth, gauthOption);

myApp.use(VueDraggable);

// Exportação da store para que possa ser utilizada pelo serviço de autenticação
export {store, Toast}
