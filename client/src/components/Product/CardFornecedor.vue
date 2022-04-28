<template>
  <div class="mt-2 card mx-2">
    <label  @click="sendSuppliersSelected()">
      <div class="d-flex justify-content-between card-input">
        <div><p><font-awesome-icon class="fs-6 fa-fw mx-2" :icon="['fas', 'cubes']" />{{ supply.supplier.name }}</p></div>
          <div class="mx-2"><input type="radio" name="fornecedorCard" v-model="fornecedorCard"  :value="supply.supplier.id" class="card-input-element"
           /></div> 
      </div>
      <div class="card-input mt-0">
        <p class="text-p"><b>Gastos:</b> 32 kWh/kg</p>
        <p class="text-p"><b>Stock:</b> 30 produtos</p>
        <p class="text-p"><b>Preço:</b> 32€</p>
      </div>
    </label>
  </div>   
</template>
<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faCubes);
library.add(faTruck);
library.add(faXmark);


export default {
  name: "CardFornecedor",
  props: {
    supply: Object,
    fornecedorCard:String,
  },
  data() {
    return { 
      
    }
  },
  methods:{
     sendSuppliersSelected(){
      console.log(this.fornecedorCard);
      //this.$emit('sendModalF',params);
    },
  }
};
</script>
<style scoped>
.card-input-element {
    margin-left: 10px;
}
.card-input {
    margin: 10px;
    padding: 0px;
}
.card{
  border: 1px solid #e5e5e5!important;
  width:15rem!important;
  flex: unset;
}
</style>
