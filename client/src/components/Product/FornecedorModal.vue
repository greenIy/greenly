<template>
<div class="modal forn-modal-lg" role="dialog" id="fornModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Selecionar Fornecedor</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="card-group">
            <CardFornecedor  @sendSupplierSelected="getSupplierSelected"
             v-for="s in suppliers"
              :key="s.supplier.id"
              :supply="s" />
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
      fornecedorCard: '',
    }
  },
  props: {
    suppliers: Array,
    supply: Object,
    modal:Boolean,
    prod:Boolean,
    currentPage: Number,
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalF',params);
    },
    getSupplierSelected(event){
      var idSupplier = event;
      console.log(idSupplier);
    },
    saveChanges(){
      console.log("entrei no salvar ");
      //this.getSupplierSelected();
      //this.$emit('sendSupplierSelected',this.idSupplier);
      this.$emit('save',"salva");
      //this.$emit('sendModalF',params);
    }, 
  }
};
</script>

<style scoped>
.modal{
    display: block;
}
.save{
  background-color: #608072;
  color:white;
}
</style>
