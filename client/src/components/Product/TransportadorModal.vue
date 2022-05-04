<template>
<div class="modal transp-modal-lg" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Selecionar Transportador</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="card-group">
            <CardTransportador @sendTransporterSelected="getTransporter"
             v-for="t in transporters"
              :key="t.id"
              :transporter="t" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn save" @click="saveChanges()">Guardar Alterações</button>
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
  props: {
    modal:Boolean,
    prod:Boolean,
    idSupplier:Number,
    transporter: Object,
    transporters: Array,
    t:Number
  },
  data() {
    return {
      transporters: [], 
      t:0,
    }
  },
  created() {
    this.getTransporters();
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
    },
    async getTransporters() {
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.transporters = response.data.supplies[this.idSupplier].transports;
    },
    getTransporter(event){
      this.t = event;
    },
    saveChanges(){
    this.$emit('sendTransporterSelected', this.t);
    this.$emit('saveT',"salva");
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
