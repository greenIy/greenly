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
                          <input type="text" v-model="search" class="form-control" placeholder="Procurar Encomenda" aria-label="" aria-describedby="basic-addon1" @keyup.enter="submit(this.search)">
                          <div class="input-group-prepend">
                            <button class="btn btn-secondary" type="button" @click="submit(this.search)"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'magnifying-glass']"/></button>
                          </div>
                        </div>
                      </div>
                      <div class="d-inline-block ms-4">
                        <button type="button" class="btn btnHist" v-if="history == false" @click="showHistory()"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'clock-rotate-left']" />Histórico </button>
                        <button type="button" class="btn btnHist" v-if="history == true" @click="hideHistory()"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'box-open']" />Encomendas Atuais </button>
                      </div>
                    </div>
                    <div v-if="active_el==1 && history == false"><EncomendasDashboard /></div>
                    <div v-if="active_el==2 && history == false">Centros de distribuição INFO ... Por FAZER</div>
                    <div v-if="active_el==3 && history == false">Veículos INFO ... Por FAZER</div>

                    <History v-if="history!=false" />
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
import { faClockRotateLeft , faMagnifyingGlass, faBoxOpen} from "@fortawesome/free-solid-svg-icons";

library.add(faClockRotateLeft);
library.add(faMagnifyingGlass);
library.add(faBoxOpen);

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
      history:false,
    };
  },
    methods: {
      activate:function(el){
        this.active_el=el;
      },
      submit(search) {
        this.$router.push({ path: '/painel/transportador', query: { id_encomenda: `${ search }` } });
      },
      showHistory(){
        this.history=true;
      },
      hideHistory(){
        this.history=false;
      }
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
