<template >
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div>
      <p><b>#{{element.id}}</b></p>
      <p>Produto: Bacon</p>
      <p>Quantidade: 5</p>
      <p class="Plus"><a><u>Mostrar mais</u></a></p>
    </div>
  </div>
</template>
<script>

import Draggable from "vuedraggable";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus} from "@fortawesome/free-solid-svg-icons";


library.add(faPlus);

export default {
  name: "Order",
  components: {
    Draggable,
  },
  props: {
    element:Object,
    task: {
      type: Object,
      default: () => ({})
    }
  },
};
</script>

<style scoped>
.Plus{
  color:#5e9f88;
  text-align: right;
}
</style>

