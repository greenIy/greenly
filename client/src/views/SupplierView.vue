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
                        <a class="nav-link" data-toggle="pill" role="tab"  @click="activate(2)" :class="{ active : active_el == 2 }">Inventários</a>
                    </li>
                    <li role="button" class="nav-item">
                        <a class="nav-link" data-toggle="pill" role="tab" @click="activate(3)" :class="{ active : active_el == 3 }">Armazéns</a>
                    </li>
                    </ul>
                    <div v-if="active_el==1" class="d-flex align-items-center">
                    <div class=" d-inline-block ms-5"> 
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Procurar Encomenda" aria-label="" aria-describedby="basic-addon1">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary" type="button"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'magnifying-glass']" /></button>
                        </div>
                      </div>
                    </div>
                    <div class="d-inline-block ms-4">
                      <button type="button" class="btn btnHist"><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', 'clock-rotate-left']" />Histórico </button>
                    </div>
                    </div>
                    <div v-if="active_el==1"><EncomendasDashboard /></div>
                    <div v-if="active_el==2">Inventários INFO ... Por FAZER </div>
                    <div v-if="active_el==3">Armazéns INFO ... Por FAZER</div>
            </div>
            <TheFooter />
        </body>
</div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import EncomendasDashboard from "@/components/Supplier/EncomendasDashboard.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClockRotateLeft , faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

library.add(faClockRotateLeft);
library.add(faMagnifyingGlass);


export default {
  name: 'SupplierView',
  components: {
    TheNavbar,
    TheFooter,
    EncomendasDashboard,
  },
  data() {
    return {
      user: {
        accept: false,
      },
      active_el:1,
    };
  },
    methods: {
     activate:function(el){
         this.active_el=el;
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
}

</style>
