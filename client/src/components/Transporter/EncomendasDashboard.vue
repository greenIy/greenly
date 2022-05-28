<template>
  <div class="container d-flex justify-content-center my-5">
    <div class="row g-0">
    <div v-for="column in columns" :key="column.title" class="card d-inline-block col-lg-6 d-flex align-items-stretch column-width mx-3 rounded">
      <div class="card-header">
        <h6><font-awesome-icon class="fs-6 fa-fw mx-1 icon" :icon="['fas', column.logo]" />{{column.title}} </h6>
      </div>
        <div role="button" class="card-body ">
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
                <template #item="{element}">
                <order class="d-inline-block col-lg-6 d-flex align-items-stretch content w-100 my-3 cursor-move" :class="{ 'not-draggable': !enabled }"
                :element="element"
                ></order>
                </template>
          </draggable>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Order from "@/components/Transporter/Order.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faTruck , faCheck , faHourglass} from "@fortawesome/free-solid-svg-icons";


library.add(faSpinner);
library.add(faTruck);
library.add(faCheck);
library.add(faHourglass);

export default {
  name: "Dashboard",
  components: {
    draggable,
    Order,
  },
  data() {
    return {
      columns: [
        {
          title: "Encomendas prontas para Transporte",
          logo: "hourglass",
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
          title: "Encomendas em Transporte",
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
         {
          title: "Encomendas Entregues",
          logo: "check",
          tasks: [
            {
              id: 11,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 12,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 13,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            },
            {
              id: 14,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            },
             {
              id: 15,
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
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
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
