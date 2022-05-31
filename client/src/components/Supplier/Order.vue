<template >
<div>
  <div class="bg-white shadow rounded pt-3 border border-white" >
    <div>
      <h5 class="card-title ms-3">Encomenda #{{element.id}}, Item #{{element.item.id}} </h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Produto: <span class="position-absolute end-0 me-3"> {{element.item.product.name}}</span> </li>
        <li class="list-group-item">Quantidade: <span class="position-absolute end-0 me-3"> {{element.item.quantity}} un.</span></li>
        <li class="list-group-item">Comprador: <span class="position-absolute end-0 me-3"> {{element.consumer.first_name}} {{element.consumer.last_name}}</span></li>
        <li class="list-group-item">Armazém: <span class="position-absolute end-0 me-3"> #{{element.item.warehouse}}</span></li>
      </ul>
      <div class="card-footer bg-white ">
        <button class="plus rounded" @click="showModalP()"><font-awesome-icon class="fs-6 fa-fw me-2 icon" :icon="['fas', 'up-right-and-down-left-from-center']" />Expandir</button>
      </div>
      
    </div>
  </div>
  <div v-if="modalP != false">
    <ProductModal />
  </div>
</div>
</template>
<script>

import Draggable from "vuedraggable";
import ProductModal from "@/components/Supplier/ProductModal.vue";
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

