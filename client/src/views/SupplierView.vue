<template>
<div class="page-container">
    <TheNavbar />
        <body>
            <div class="content-wrap">
                <ul class="nav nav-pills mb-5 mt-4 justify-content-center" role="tablist">
                    <li role="button" class="nav-item" data-cy="dashboard-supplier-orders-pill">
                        <a class="nav-link" data-toggle="pill" role="tab" @click="activate(1)" :class="{ active : this.$route.name == 'fornecedor' || this.$route.name == 'fornecedor_historico' }">Encomendas</a>
                    </li>
                    <li role="button" class="nav-item" data-cy="dashboard-supplier-warehouses-pill">
                        <a class="nav-link" data-toggle="pill" role="tab"  @click="activate(2)" :class="{ active : this.$route.name == 'fornecedor_armazens' }">Armazéns</a>
                    </li>
                    <li role="button" class="nav-item" data-cy="dashboard-supplier-supplies-pill">
                        <a class="nav-link" data-toggle="pill" role="tab" @click="activate(3)" :class="{ active : this.$route.name == 'fornecedor_inventario' }">Inventário</a>
                    </li>
                    </ul>
                    <div v-if="this.$route.name == 'fornecedor' || this.$route.name == 'fornecedor_historico'" class="d-flex align-items-center">
                      <div class=" d-inline-block ms-5"> 
                        <div class="input-group">
                          <input type="text" v-model="search" class="form-control" placeholder="Procurar Encomenda" aria-label="" aria-describedby="basic-addon1" @input="onchange(this.search)">
                          <div class="input-group-prepend">
                            <button v-if="this.$route.query.id_encomenda" class="btn btn-secondary" type="button" v-on="onchange(this.search)"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'xmark']"/></button>
                            <button v-else class="btn btn-secondary" type="button" v-on="onchange(this.search)"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'magnifying-glass']"/></button>
                          </div>
                        </div>
                      </div>
                      <div class="d-inline-block ms-4">
                          <button type="button" class="btn btnHist" v-if="this.$route.name == 'fornecedor'" @click="showHistory()" data-cy="dashboard-supplier-orders-archive"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'clock-rotate-left']" />Arquivo</button>
                          <button type="button" class="btn btnHist" v-if="this.$route.name == 'fornecedor_historico'" @click="hideHistory()"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'box']" />Encomendas Em Curso </button>
                          <font-awesome-icon :icon="['fa', 'circle-question']" size="2xl" style="color: grey; cursor: pointer; margin-top: 8px; margin-left: 15px;" data-bs-toggle="modal" data-bs-target="#userHelper"/>
                      </div>
                    </div>

                    <div v-if="this.$route.name == 'fornecedor'"><EncomendasDashboard :receiveData="receiveData" @updateStatus="updateStatus"/></div>
                    <div v-if="this.$route.name == 'fornecedor_armazens'"><Warehouses :receiveData="receiveData" @updateStatus="updateStatus"/></div>
                    <div v-if="this.$route.name == 'fornecedor_inventario'"><Inventory :receiveData="receiveData" @updateStatus="updateStatus"/></div>

                    <History v-if="this.$route.name == 'fornecedor_historico'" :receiveData="receiveData"/>
            </div>

            <!-- Modal User Helper -->
            <div class="modal fade" id="userHelper" tabindex="-1" aria-labelledby="userHelperLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ajuda</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Como posso procurar por uma encomenda?
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Basta utilizar a barra de procura que se encontra no canto superior esquerdo da sua página. É necessário introduzir o ID da encomenda que procura.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Como posso gerir o estado de uma encomenda?
                            </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Existem duas maneiras de lidar com esta situação. Pode simplesmente arrastar a sua encomenda ou então clicar na mesma e mudar o seu estado. Ambas as opções têm o mesmo efeito.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Como posso visualizar encomendas já concluidas?
                            </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Basta clicar no botão "Arquivo". Desta forma irá ser apresentada uma lista de todas as encomendas que já não se encontram ativas.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
                </div>
            </div>
            </div>

        </body>
      <TheFooter />
</div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import History from "@/components/Supplier/History.vue";
import EncomendasDashboard from "@/components/Supplier/EncomendasDashboard.vue";
import Warehouses from "@/components/Supplier/Warehouses.vue";
import Inventory from "@/components/Supplier/Inventory.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faClockRotateLeft , faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
library.add(faClockRotateLeft, faMagnifyingGlass, faXmark);

import http from "../../http-common";


export default {
  name: 'SupplierView',
  components: {
    TheNavbar,
    TheFooter,
    History,
    EncomendasDashboard,
    Warehouses,
    Inventory
  },
  data() {
    return {
      user: {
        accept: false,
      },
      active_el: 1,
      receiveData: [],
    };
  },
  beforeMount(){
    this.getData();
  },
  created() {
    this.changeTitle();
  },
  methods: {
    changeTitle(){
      window.document.title = "Greenly | Painel";
    },
    async getData(){
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/orders", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.receiveData = JSON.parse(JSON.stringify(response.data));
    },
    activate:function(el){
      this.active_el = el;
      switch(this.active_el) {
        case 1:
          this.$router.push({ name: 'fornecedor'});
          break;
        case 2:
          this.$router.push({ name: 'fornecedor_armazens'});
          break;
        case 3:
          this.$router.push({ name: 'fornecedor_inventario'});
          break;
        default:
          this.$router.push({ name: 'fornecedor'});
      }
    },
    onchange(search) {
      if (search != undefined && search != '' && this.$route.name === 'fornecedor') {
        this.$router.push({ name: 'fornecedor', query: { id_encomenda: `${ search }` } });
      } else if (this.$route.name === 'fornecedor') {
        this.$router.push({ name: 'fornecedor' });
      } else if (search != undefined && search != '' && this.$route.name === 'fornecedor_historico') {
        this.$router.push({ name: 'fornecedor_historico', query: { id_encomenda: `${ search }` } });
      } else if (this.$route.name === 'fornecedor_historico') {
        this.$router.push({ name: 'fornecedor_historico' });
      }
    },
    showHistory(){
      this.$router.push({ name: 'fornecedor_historico'});
    },
    hideHistory(){
      this.$router.push({ name: 'fornecedor'});
    },
    updateStatus(value){
      this.getData();
    },
  },
};
</script>

<style scoped>
.nav-pills .nav-link.active {
  background-color:#5e9f88!important;
  color:#ffffff!important;
}

.nav-link {
  color:#5e9f88!important;
}

.btnHist {
  background-color:#5e9f88!important;
  color:#ffffff!important;
  outline: none;
}

input:focus {
  box-shadow: none;
}

button:focus {
  box-shadow: none !important;
}
.footerOverride {
  bottom: auto !important;
}

</style>