<template>
  <div class="mt-2 card mx-2">
    <label>
      <div class=" d-flex justify-content-between card-input">
        <div><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" /> {{ transporter.transporter.name }}</p></div>
          <div class="mx-2"><input type="radio"  v-model="transportadorCard" name="transportadorCard" class="card-input-element"  /></div> 
      </div>
      <div class="d-flex flex-column card-input mt-0">
        <p class="text-p"><b>Emissões médias:</b> {{ transporter.transporter.average_emissions }} CO₂/Km</p>
        <p class="text-p"><b>Recursos gastos:</b> {{ transporter.transporter.average_resource_usage }} CO₂/Kg</p>
        <p class="text-p"><b>Preço:</b> {{ transporter.price }}€</p>
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
  name: "CardTransportador",
  props:{
  transporter: Object,
  },
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
.card{
  border: 1px solid #e5e5e5!important;
  width:15rem!important;
}
</style>
