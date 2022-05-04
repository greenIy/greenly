<template>
  <div class="mt-2 card mx-2">
    <label @change="sendTransporterSelected($event)">
      <div class=" d-flex justify-content-between card-input">
        <div><p><font-awesome-icon class="fs-6 fa-fw"  :icon="['fas', 'truck']" /> {{ transporter.transporter.name }}</p></div>
          <div class="mx-2"><input type="radio"  id="transp" v-model="transportadorCard" name="transportadorCard" :value="transporter.transporter.id" class="card-input-element"  /></div> 
      </div>
      <div class="d-flex flex-column card-input mt-0">
        <p class="text-p"><b>Emissões Médias:</b> {{ transporter.transporter.average_emissions.toFixed(1) }} CO₂ g/km/t</p>
        <p class="text-p"><b>Recursos Gastos:</b> {{ transporter.transporter.average_resource_usage.toFixed(1) }} l/100km</p>
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
    transportadorCard: String,
    idTransporter:Number,
  },
  data() {
    return { 
      transportadorCard: "",
    }
  },
  created() {
    this.addSelected();
  },
  methods:{
    sendTransporterSelected(event){
      this.transportadorCard = event.target.value;
      this.$emit('sendTransporterSelected', this.transportadorCard);
    },
    addSelected(){
      /* var valueT = getElementsByName("transportadorCard").value ;
      if(valueT == this.idTransporter ){
        console.log("match");
      } */
      
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
  padding: 00px;
}
.card{
  border: 1px solid #e5e5e5!important;
  width:20rem!important;
}
</style>
