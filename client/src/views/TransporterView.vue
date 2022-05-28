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
                    <div v-if="active_el==1"><EncomendasDashboard /></div>
                    <div v-if="active_el==2">Centros de distribuição INFO ... Por FAZER</div>
                    <div v-if="active_el==3">Veículos INFO ... Por FAZER</div>
            </div>
            <TheFooter />
        </body>
</div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import EncomendasDashboard from "@/components/Transporter/EncomendasDashboard.vue";

export default {
  name: 'equipa',
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
.nav-pills .nav-link.active{
    background-color:#5e9f88!important;
    color:#ffffff!important;
}
.nav-link{
    color:#5e9f88!important;
}
</style>
