<template>
  <div class="mt-2 card mx-2">
    <label  @click="sendSuppliersSelected($event)">
      <div class="d-flex justify-content-between card-input">
        <div><p><font-awesome-icon class="fs-6 fa-fw mx-2" :icon="['fas', 'cubes']" />{{ supplier.supplier.name }}</p></div>
          <div class="mx-2"><input type="radio" :id="'s-'+supplier.supplier.id" name="fornecedorCard" v-model="fornecedorCard"  :value="supplier.supplier.id" class="card-input-element"/></div> 
      </div>
      <div class="card-input mt-0">
        <p class="text-p"><b>Recursos Gastos:</b> {{ supplier.warehouse.resource_usage.toFixed(1) }} kWh/kg</p>
        <p class="text-p"><b>Stock:</b> {{ supplier.quantity }} produtos</p>
        <p class="text-p"><b>Preço:</b> {{ supplier.price }}€</p>
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
    fornecedorCard: Number,
    targetSupplier: Number,
    supplier: Object,
    suppliers:Array,
    idSupplier:Number,
  },
  data() {
    return { 
      fornecedorCard:'',
    }
  },
   mounted() {
    this.addSelected();
  },
  methods:{
    sendSuppliersSelected(event){
      this.fornecedorCard = event.target.getAttribute('value');
      console.log(this.fornecedorCard)
      this.$emit('sendSupplierSelected',this.fornecedorCard);
    },
    addSelected(){
      if(this.targetSupplier == this.supplier ){
        let a = "s-"+this.supplier.supplier.id.toString()
        document.getElementById(a).checked = true;
      } 
      
    }
 
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
  width:17rem!important;
}
</style>
