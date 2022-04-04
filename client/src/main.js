// Bootstrap imports
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fontawesome imports
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate'


const myApp = createApp(App);

myApp.component('font-awesome-icon', FontAwesomeIcon);
myApp.component('font-awesome-layers', FontAwesomeLayers);
myApp.component('font-awesome-layers-text', FontAwesomeLayersText);

myApp.use(router).mount('#app');
