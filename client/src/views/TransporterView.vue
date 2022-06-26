<template>
<div class="page-container">
    <TheNavbar />
        <body>
            <div class="content-wrap">
                <ul class="nav nav-pills mb-3 mt-3 justify-content-center" role="tablist">
                    <li role="button" class="nav-item">
                        <a class="nav-link" data-toggle="pill" role="tab" @click="activate(1)" :class="{ active : active_el == 1 }">Encomendas</a>
                    </li>
                    <li role="button" class="nav-item">
                        <a class="nav-link" data-toggle="pill" role="tab"  @click="activate(2)" :class="{ active : active_el == 2 }">Centros de Distribuição</a>
                    </li>
                    <li role="button" class="nav-item">
                        <a class="nav-link" data-toggle="pill" role="tab" @click="activate(3)" :class="{ active : active_el == 3 }">Veículos</a>
                    </li>
                    </ul>
                    <div v-if="active_el==1" class="d-flex align-items-center">
                      <div class=" d-inline-block ms-5"> 
                        <div class="input-group">
                          <input type="text" v-model="search" class="form-control" placeholder="Procurar Encomenda" aria-label="" aria-describedby="basic-addon1" @input="onchange(this.search)">
                          <div class="input-group-prepend">
                            <button v-if="this.$route.query.id_encomenda" class="btn btn-secondary" type="button"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'xmark']"/></button>
                            <button v-else class="btn btn-secondary" type="button" @click="removeFilter('')"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'magnifying-glass']"/></button>
                          </div>
                        </div>
                      </div>
                      <div class="d-inline-block ms-4">
                        <button type="button" class="btn btnHist" v-if="this.$route.name == 'transportador'" @click="showHistory()"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'clock-rotate-left']" />Arquivo</button>
                        <button type="button" class="btn btnHist" v-if="this.$route.name == 'transportador_historico'" @click="hideHistory()"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'box']" />Encomendas Em Curso </button>
                      </div>
                    </div>
                    <div v-if="active_el==1 && this.$route.name == 'transportador'"><EncomendasDashboard :receiveData="receiveData" @updateStatus="updateStatus"/></div>
                    <div v-if="active_el==2 && this.$route.name == 'transportador'">Centros de distribuição INFO ... Por FAZER</div>
                    <div v-if="active_el==3 && this.$route.name == 'transportador'">Veículos INFO ... Por FAZER</div>

                    <History v-if="this.$route.name == 'transportador_historico'" :receiveData="receiveData"/>
            </div>
            <TheFooter />
        </body>
</div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import EncomendasDashboard from "@/components/Transporter/EncomendasDashboard.vue";
import History from "@/components/Transporter/History.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faClockRotateLeft , faMagnifyingGlass, faBoxOpen, faXmark} from "@fortawesome/free-solid-svg-icons";

import http from "../../http-common";

library.add(faClockRotateLeft);
library.add(faMagnifyingGlass);
library.add(faBoxOpen);
library.add(faXmark);

export default {
  name: 'equipa',
  components: {
    TheNavbar,
    TheFooter,
    EncomendasDashboard,
    History,
  },
  data() {
    return {
      user: {
        accept: false,
      },
      active_el:1,
      receiveData: [],
    };
  },
  beforeMount(){
    this.getData();
  },
  methods: {
    async getData(){
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/orders", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.receiveData = JSON.parse(JSON.stringify(response.data));
    },
    activate:function(el){
      this.active_el=el;
    },
    onchange(search) {
      if (search != undefined && search != '' && this.$route.name === 'transportador') {
        this.$router.push({ name: 'transportador', query: { id_encomenda: `${ search }` } });
      } else if (this.$route.name === 'transportador') {
        this.$router.push({ name: 'transportador' });
      } else if (search != undefined && search != '' && this.$route.name === 'transportador_historico') {
        this.$router.push({ name: 'transportador_historico', query: { id_encomenda: `${ search }` } });
      } else if (this.$route.name === 'transportador_historico') {
        this.$router.push({ name: 'transportador_historico' });
      }
    },
    removeFilter(search) {
      this.$router.push({ name: 'transportador' });
    },
    showHistory() {
      this.$router.push({ name: 'transportador_historico'});
    },
    hideHistory(){
      this.$router.push({ name: 'transportador'});
    },
    updateStatus(value){
      this.getData();
    },
  },
};
</script>

<style scoped>
.nav-pills .nav-link.active{
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
</style>
