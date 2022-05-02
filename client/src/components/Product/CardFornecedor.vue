<template>
  <div class="mt-2 card mx-2">
    <label  @change="sendSuppliersSelected($event)">
      <div class="d-flex justify-content-between card-input">
        <div><p><font-awesome-icon class="fs-6 fa-fw mx-2" :icon="['fas', 'cubes']" />{{ supply.supplier.name }}</p></div>
          <div class="mx-2"><input type="radio" name="fornecedorCard" v-model="fornecedorCard"  :value="supply.supplier.id" class="card-input-element"/></div> 
      </div>
      <div class="card-input mt-0">
        <p class="text-p"><b>Gastos:</b> {{ supply.warehouse.resource_usage }} kWh/kg</p>
        <p class="text-p"><b>Stock:</b> {{ supply.quantity }} produtos</p>
        <p class="text-p"><b>Preço:</b> {{ supply.price }}€</p>
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
    fornecedorCard: String,
  },
  data() {
    return { 
      fornecedorCard: "",
    }
  },
  methods:{
     sendSuppliersSelected(event){
      this.fornecedorCard = event.target.value;
      //this.$emit('sendModalF',this.fornecedorCard);
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
}
</style>
