<template>
<div class="d-flex mt-2 h-100 flex-column card product">
  <div class="d-flex justify-content-between card-input">
    <div><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" />Transportador A</p></div>
      <div class="mx-2"><input type="radio"  v-model="transportadorCard" name="transportadorCard" active-class="active"  class="card-input-element"  /></div> 
    </div>
      <div class="d-flex flex-column card-input mt-0">
        <p class="text-p"><b>Gastos:</b> 32 CO₂/Kg</p>
        <p class="text-p"><b>Preço:</b> 32€</p>
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
  name: "CardTransportador",
  data() {
    return { 
    }
  },
  methods:{
 
  }
};
</script>
<style scoped>
.card-input-element {
    margin-left: 10px;
}
.card-input {
    margin: 10px;
    padding: 00px;
}
.product{
  border: 1px solid #e5e5e5!important;
}
</style>
