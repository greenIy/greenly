<template >
<div>
  <div class="bg-white shadow rounded pt-2 border border-white" @click="showModalP()">
    <div>
      <h6 class="card-title ms-3"><small >#{{element.id}}, Item #{{element.item.id}}</small></h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><span ><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'box-open']" /> <small class="text-muted">{{element.item.product.name}} </small></span> </li>
      </ul>     
    </div>
  </div>
  <div v-if="modalP != false">
    <ProductModal :element="element" @sendModalT="closeModalT" @updateStatus="updateStatus"/>
  </div>
</div>
</template>
<script>

import Draggable from "vuedraggable";
import ProductModal from "@/components/Transporter/ProductModal.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus , faBoxOpen } from "@fortawesome/free-solid-svg-icons";


library.add(faPlus);
library.add(faBoxOpen);

export default {
  name: "Order",
  components: {
    Draggable,
    ProductModal,
  },
  props: {
    element:Object,
    task: {
      type: Object,
      default: () => ({})
    }
  }, data() {
    return {
      modalP: false,
    };
  },
  methods:{
    showModalP(){
      this.modalP=true;
    },
    closeModalT(value){
      if(value == "fecha"){
        this.modalP=false;
      }
    },
    updateStatus(value){
      this.$emit('updateStatus', value);
    },
  },
};
</script>

<style scoped>
.plus{
  background-color:#5e9f88;
  color:white;
  border:none;
  font-size:17px;
}
.card-footer{
  text-align:right;
}
</style>

