<template>
<div class="modal transp-modal-xl" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn save" @click="saveChanges()">Guardar Alterações</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faCubes);
library.add(faTruck);
library.add(faXmark);


export default {
  name: "TransportadorModal",
  props: {
    modal:Boolean,
  },
  data() {
    return {
    
    }
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
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
  background-color: #5e9f88;
  color:white;
}
.modal-body{
    height: 15rem;
    overflow-y: auto;
}

</style>
