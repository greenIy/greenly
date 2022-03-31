<template>
    <div class="signin-area d-flex flex-column align-items-center justify-content-center py-5">

        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" @click="activeTab = 'consumidor'">
                <a class="nav-link"  :class="(activeTab === 'consumidor') ? 'nav-link-active' : ''" id="pills-consumidor-tab">Consumidor</a>
            </li>
            <li class="nav-item" @click="activeTab = 'transportador'">
                <a class="nav-link" :class="(activeTab === 'transportador') ? 'nav-link-active' : ''" id="pills-transportador-tab">Transportador</a>
            </li>
            <li class="nav-item" @click="activeTab = 'fornecedor'">
                <a class="nav-link" :class="(activeTab === 'fornecedor') ? 'nav-link-active' : ''" id="pills-fornecedor-tab">Fornecedor</a>
            </li>
        </ul>
      
        <div class="tab-content register-form" id="register-content" style="width: 45%; margin-top: 1.5%">
            <transition name="fade">
                <RegisterConsumidor v-if="activeTab === 'consumidor'"/>
            </transition>
            
            <transition name="fade">
                <RegisterTransportador v-if="activeTab === 'transportador'"/>
            </transition>
            
            <transition name="fade">
                <RegisterFornecedor v-if="activeTab === 'fornecedor'"/>
            </transition>
        </div>        

    </div>
</template>


<script>
// @ is an alias to /src
import RegisterConsumidor from '@/components/Register/RegisterConsumidor.vue';
import RegisterTransportador from '@/components/Register/RegisterTransportador.vue';
import RegisterFornecedor from '@/components/Register/RegisterFornecedor.vue';

export default {
  name: 'RegisterPills',
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
        margin-right: 10px;
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