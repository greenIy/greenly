<template >
<div>
  <div class="bg-white shadow rounded pt-3 border border-white" @click="showModalP()">
    <div>
      <h6 class="card-title ms-3">Encomenda <small class="text-muted">#{{element.id}}</small>, Item <small class="text-muted">#{{element.item.id}}</small></h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Produto: <span class="position-absolute end-0 me-3"> {{element.item.product.name}}</span> </li>
      </ul>     
    </div>
  </div>
  <div v-if="modalP != false">
    <ProductModal :element="element" @sendModalT="closeModalT" />
  </div>
</div>
</template>
<script>

import Draggable from "vuedraggable";
import ProductModal from "@/components/Transporter/ProductModal.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus , faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";


library.add(faPlus);
library.add(faUpRightAndDownLeftFromCenter);

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

