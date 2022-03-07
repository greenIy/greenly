// Bootstrap imports
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const myApp = createApp(App);

myApp.component('font-awesome-icon', FontAwesomeIcon);

myApp.use(router).mount('#app');
