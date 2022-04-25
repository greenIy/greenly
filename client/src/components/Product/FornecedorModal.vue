<template>
<div class="modal" role="dialog" id="fornModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Selecionar Fornecedor</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
         <div class="container">
        <div class="mt-4" >
          <div class=" card-group mt-2">
            <CardFornecedor 
              />
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

import CardFornecedor from "@/components/Product/CardFornecedor.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark} from "@fortawesome/free-solid-svg-icons";

import http from "../../../http-common";

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
      products: [],
    }
  },
   created() {
    this.getProducts();
  },
   props: {
    product:Object,
    products:Object,
    modal:Boolean,
    prod:Boolean,
    currentPage: Number,
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalF',params);
    },
    async getProducts() {
      var response = await http.get("/store/products?page=" + 1);
      this.products = response.data.products;
      console.log(this.products)
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
