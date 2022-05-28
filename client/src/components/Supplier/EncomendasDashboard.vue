<template>
  <div class="container d-flex justify-content-center my-5">
    <div class="row g-0">
    <div v-for="column in columns" :key="column.title" class="card d-inline-block col-lg-6 column-width mx-3 rounded">
      <div class="card-header">
        <h6 class="my-auto"><font-awesome-icon class="fs-6 fa-fw mx-2 icon" :icon="['fas', column.logo]" /><small>{{column.title}}</small></h6>
      </div>
        <div role="button" class="card-body ">
          <draggable :list="column.tasks" :animation="200" group="tasks">
                <template #item="{element}">
                  <order class="d-inline-block col-lg-6 w-100 my-3 cursor-move" :element="element"></order>
                </template>
          </draggable>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import Order from "@/components/Supplier/Order.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faTruck} from "@fortawesome/free-solid-svg-icons";


library.add(faSpinner);
library.add(faTruck);

export default {
  name: "Dashboard",
  components: {
    Draggable,
    Order,
  },
  data() {
    return {
      columns: [
        {
          title: "ENCOMENDAS EM PROCESSAMENTO",
          logo: "spinner",
          tasks: [
            {
              id: 1,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 2,
              title: "Provide documentation on integrations",
              date: "Sep 12"
            },
            {
              id: 3,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 4,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 5,
              title: "Test checkout flow",
              date: "Sep 15",
              type: "QA"
            }
          ]
        },
        {
          title: "ENCOMENDAS PARA TRANSPORTE",
          logo: "truck",
          tasks: [
            {
              id: 6,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 7,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 8,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            },
            {
              id: 9,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            },
             {
              id: 10,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            },
          ]
        },
      ]
    };
  }
};
</script>

<style scoped>
.column-width {
  min-width: 380px;
  width: 380px;
}
.card{
    background-color:#ffffff;
}
.card-header{
    background-color:#ffffff;
}
.icon{
    color:#919090;
}
</style>
