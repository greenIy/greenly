<template>
<div class="modal transp-modal-xl" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Selecionar Transportador</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="card-group">
          <div class="content d-flex justify-content-center">
            <CardTransportador @sendTransporterSelected="getTransporter" :idTransporter="idTransporter" :supplier="supplier" :targetTransporter="transporters[idTransporter]"
             v-for="t in transporters"
              :key="t.id"
              :transporter="t" />
          </div>
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
    idTransporter:Number,
    transporter: Object,
    transporters: Array,
    idT:Number,
    
  },
  data() {
    return {
      transporters: this.transporters, 
      idT:0,
    }
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
    },
    getTransporter(event){
      this.idT = event;
    },
    saveChanges(){
    this.$emit('sendTransporterSelected', this.idT);
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
.modal-body{
    height: 5rem;
    overflow-y: auto;
}

</style>
