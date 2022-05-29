<template >
<div>
  <div class="bg-white shadow rounded pt-3 border border-white" >
    <div>
      <h5 class="card-title ms-3">Encomenda #{{element.id}} </h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Produto: #6 Bacon</li>
        <li class="list-group-item">Quantidade: </li>
        <li class="list-group-item">Comprador: id nome</li>
        <li class="list-group-item">Armazém: </li>
      </ul>
      <div class="card-footer bg-white">
        <span class="plus me-3" @click="showModalP()"><u>Mostrar mais</u></span>
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
import { faPlus} from "@fortawesome/free-solid-svg-icons";


library.add(faPlus);

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
  color:#5e9f88;
}
</style>

