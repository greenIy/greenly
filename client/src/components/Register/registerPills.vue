<template>
    <div class="signin-area d-flex flex-column align-items-center justify-content-center py-5">

        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" @click="activeTab = 'consumidor'">
                <a class="nav-link" :class="(activeTab === 'consumidor') ? 'nav-link-active' : ''" id="pills-consumidor-tab"><font-awesome-icon :icon="['fa', 'user']" size="xl"/><br> Consumidor </a>
            </li>
            <li class="nav-item" @click="activeTab = 'fornecedor'">
                <a class="nav-link" :class="(activeTab === 'fornecedor') ? 'nav-link-active' : ''" id="pills-fornecedor-tab"><font-awesome-icon :icon="['fa', 'box-open']" size="xl"/><br> Fornecedor </a>
            </li>
            <li class="nav-item" @click="activeTab = 'transportador'">
                <a class="nav-link" :class="(activeTab === 'transportador') ? 'nav-link-active' : ''" id="pills-transportador-tab"><font-awesome-icon :icon="['fa', 'truck-fast']" size="xl"/><br> Transportador </a>
            </li>
        </ul>
      
        <div class="tab-content register-form" id="register-content" style="width: 45%; margin-top: 1.5%">
            <transition name="fade">
                <register-consumidor v-if="activeTab === 'consumidor'"/>
            </transition>
            
            <transition name="fade">
                <register-transportador v-if="activeTab === 'transportador'"/>
            </transition>
            
            <transition name="fade">
                <register-fornecedor v-if="activeTab === 'fornecedor'"/>
            </transition>
        </div>        

    </div>
</template>


<script>
// @ is an alias to /src
import RegisterConsumidor from '@/components/Register/RegisterConsumidor.vue';
import RegisterTransportador from '@/components/Register/RegisterTransportador.vue';
import RegisterFornecedor from '@/components/Register/RegisterFornecedor.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faTruckFast, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faTruckFast, faBoxOpen);

export default {
  name: 'registerPills',
  components: {
    RegisterConsumidor,
    RegisterTransportador,
    RegisterFornecedor,
  },
    data() {
       return {
           activeTab: 'consumidor'
       }   
    }
};

</script>

<style scoped>
    .nav-item {
        margin-left: 5px;
        margin-right: 5px;
    }
    .nav-link:hover {
        cursor: pointer;
    }
    .nav-link {
        color:black
    }
    .nav-link-active {
        color: white;
        background-color: #608072;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.1s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>