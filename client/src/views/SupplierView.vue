<template>
<div class="page-container">
    <TheNavbar />
        <body>
            <div class="content-wrap">
                <ul class="nav nav-pills mb-3 mt-3 justify-content-center" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" id="pills-armazem-tab" data-toggle="pill" role="tab" @click="activate(1)" :class="{ active : active_el == 1 }">Armazéns</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " id="pills-encomendas-tab" data-toggle="pill" role="tab"  @click="activate(2)" :class="{ active : active_el == 2 }">Encomendas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-inventarios-tab" data-toggle="pill" role="tab" @click="activate(3)" :class="{ active : active_el == 3 }">Inventários</a>
                    </li>
                    </ul>
                    <div  id="pills-armazem" v-if="active_el==1">Armazéns INFO ... Por FAZER</div>
                    <div  id="pills-encomendas" v-if="active_el==2" ><EncomendasDashboard /></div>
                    <div  id="pills-inventarios" v-if="active_el==3" >Inventários INFO ... Por FAZER</div>
            </div>
            <TheFooter />
        </body>
</div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import EncomendasDashboard from "@/components/Supplier/EncomendasDashboard.vue";

export default {
  name: 'equipa',
  components: {
    TheNavbar,
    TheFooter,
    EncomendasDashboard,
  },
  data() {
      console.log("adeus");
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
.nav-pills .nav-link.active{
    background-color:#5e9f88!important;
    color:#ffffff!important;
}
.nav-link{
    color:#5e9f88!important;
}
</style>
