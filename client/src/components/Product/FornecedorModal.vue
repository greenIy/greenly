<template>
<div class="modal forn-modal-xl mh-75" role="dialog" id="fornModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Selecionar Fornecedor</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="card-group">
          <div class="content d-flex justify-content-center">
            <CardFornecedor  @sendSupplierSelected="getSupplierSelected"  :targetSupplier="suppliers[idSupplier]" :suppliers="suppliers" :idSupplier="idSupplier"
             v-for="s in suppliers"
              :key="s.supplier.id"
              :supplier="s" />
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

import CardFornecedor from "@/components/Product/CardFornecedor.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faCubes);
library.add(faTruck);
library.add(faXmark);


export default {
  name: "FornecedorModal",
  components: {
  CardFornecedor,
  },
  data() {
    return { 
      suppliers: [],
      idS:0,
    }
  },
  props: {
    suppliers: Array,
    supplier: Object,
    idSupplier:Number,
    modal:Boolean,
    prod:Boolean,
    idS:Number,
    
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalF',params);
    },
    getSupplierSelected(event){
      this.idS = event;
    },
    saveChanges(){
    this.$emit('sendSupplierSelected', this.idS);
    this.$emit('saveF',"salva");
    }, 
  }
};
</script>

<style scoped>
.content {
  flex-wrap:wrap
}
.modal{
    display: block;
}
.save{
  background-color: #608072;
  color:white;
}
.modal-body{
    height: 18rem;
    overflow-y: auto;
}
</style>
