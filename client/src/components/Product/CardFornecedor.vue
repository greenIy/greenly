<template>
<div class="d-flex card product">
    <label>
        <input type="radio" v-model="fornecedor" name="fornecedor" active-class="active"  class="card-input-element" />
            <div class="card-input">
                <div class="panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'cubes']" /> Fornecedor A <span class="dot"></span></p></div>
                      <div class="panel-body">
                        <p class="text-p"><b>Gastos:</b> 32 kWh/kg</p>
                        <p class="text-p"><b>Stock:</b> 30 produtos</p>
                        <p class="text-p"><b>Preço:</b> 32€</p>
                      </div>
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
