<template>
    <div class="signin-area d-flex flex-column align-items-center justify-content-center py-5">

        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link nav-link-active" id="pills-consumidor-tab" data-toggle="pill" href="#register-consumidor" role="tab" aria-controls="consumidor-pill" aria-selected="true">Consumidor</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-transportador-tab" data-toggle="pill" href="#register-transportador" role="tab" aria-controls="transportador-pill" aria-selected="false">Transportador</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-fornecedor-tab" data-toggle="pill" href="#register-fornecedor" role="tab" aria-controls="fornecedor-pill" aria-selected="false">Fornecedor</a>
            </li>
        </ul>
      
        <div class="tab-content register-form" id="register-content" style="width: 45%; margin-top: 1.5%">
            <div class="tab-pane fade show active" id="register-consumidor" role="tabpanel" aria-labelledby="consumidor-pill">
                <register-consumidor/>
            </div>

            <div class="tab-pane fade" id="register-transportador" role="tabpanel" aria-labelledby="transportador-pill">       
                <register-tranportador/>
            </div>
      
            <div class="tab-pane fade" id="register-fornecedor" role="tabpanel" aria-labelledby="fornecedor-pill">       
                <register-fornecedor/>
            </div>
        </div>

    </div>
</template>


<script>
// @ is an alias to /src
import registerConsumidor from './registerConsumidor.vue';
import registerTransportador from './registerTransportador.vue';
import registerFornecedor from './registerFornecedor.vue';

export default {
  name: 'registerPills',
  components: {
    registerConsumidor,
    registerTransportador,
    registerFornecedor,
  },
};

</script>

<style scoped>
    .nav-link {
        color:black
    }

    .nav-link-active {
        color: white;
        background-color: #608072;
    }

</style>