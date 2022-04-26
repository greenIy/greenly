<template>
<div class="modal" role="dialog" id="fornModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Selecionar Transportador para o Fornecedor X</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
         <div class="d-flex container">
        <div class="mt-4" >
          <div class=" card-group mt-2">
            <CardTransportador 
             v-for="t in transporters"
              :key="t.id"
              :supply="t" />
        </div>
      </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn save">Guardar Alterações</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import CardTransportador from "@/components/Product/CardTransportador.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark} from "@fortawesome/free-solid-svg-icons";

import http from "../../../http-common";

library.add(faCubes);
library.add(faTruck);
library.add(faXmark);


export default {
  name: "TransportadorModal",
  components: {
  CardTransportador,
  },
  data() {
    return {
      transporters: [], 
    }
  },
  created() {
    this.getTransporters();
  },
  props: {
    modal:Boolean,
    prod:Boolean,
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
    },
    async getTransporters() {
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.transporters = response.data.supplies[0].transporters;
      console.log(this.transporters)
    },
  }
};
</script>
<style scoped>
.modal{
    display: flex;
}
.save{
  background-color: #608072;
  color:white;
}

</style>
