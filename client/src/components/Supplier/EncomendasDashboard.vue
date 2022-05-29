<template>
  <div class="d-flex justify-content-start my-4 mx-5">
    <div class="row g-0 overflow-horizontally">
    <div v-for="column in columns" :key="column.title" class="card d-inline-block col-lg-6 column-width me-4 rounded">
      <div class="card-header">
        <h6 class="my-auto"><font-awesome-icon class="fs-6 fa-fw mx-2 icon" :icon="['fas', column.logo]" /><small>{{column.title}}</small></h6>
      </div>
        <div role="button" class="card-body ">
          <draggable :list="column.tasks" :animation="200" group="tasks" :move="checkMove" :class="column.state">
                <template #item="{element}">
                  <order class="d-inline-block col-lg-6 w-100 my-3 cursor-move"  :element="element"></order>
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
import { faBoxesPacking, faTruck, faTruckFast} from "@fortawesome/free-solid-svg-icons";


library.add(faBoxesPacking);
library.add(faTruck);
library.add(faTruckFast);

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
          title: "EM PROCESSAMENTO",
          state: "PROCESSING",
          logo: "boxes-packing",
          tasks: [
            {
              "id": 27,
              "consumer": {
                      "id": 201,
                      "first_name": "João",
                      "email": "test@test.com",
                      "phone": null
              },
              "date": "2022-05-27T15:47:45.000Z",
              "observations": "This is a really cool testing order",
              "shipping_address": 201,
              "billing_address": 201,
              "items": [
                  {
                      "id": 1,
                      "status": "PROCESSING",
                      "order": 27,
                      "supply_price": 1342.19,
                      "transport_price": 28,
                      "quantity": 1,
                      "arrival_date": null,
                      "supplier_resource_usage": 42,
                      "supplier_renewable_resources": 6,
                      "transporter_resource_usage": 19.63,
                      "transporter_emissions": 169.75,
                      "product": 1,
                      "supplier": 181,
                      "warehouse": 2,
                      "transporter": 17,
                      "vehicle": 1
                  }
        ]
    },
            {
              id: 2,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              state: "PROCESSING"
            },
            {
              id: 3,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "PROCESSING"
            },
            
          ]
        },
        {
          title: "PRONTAS PARA TRANSPORTE",
          state: "AWAITING_TRANSPORT",
          logo: "truck",
          tasks: [
            {
              id: 4,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              state: "AWAITING_TRANSPORT"
            },
            {
              id: 5,
              title: "Test checkout flow",
              date: "Sep 15",
              state: "AWAITING_TRANSPORT"
            },
            {
              id: 6,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "AWAITING_TRANSPORT"
            },
          ]
        },
        {
          title: "PRESTES A SER LEVANTADAS",
          state: "TRANSPORT_IMMINENT",
          logo: "truck-fast",
          tasks: [
            {
              id: 7,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              state: "TRANSPORT_IMMINENT"
            },
            {
              id: 8,
              title: "Test checkout flow",
              date: "Sep 15",
              state: "TRANSPORT_IMMINENT"
            },
            {
              id: 9,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "TRANSPORT_IMMINENT"
            },
          ]
        },
      ]
    };
  },
  methods: {
    checkMove: function (evt) {
      let valid = false;
      let next;
      if(evt.from.className === 'PROCESSING') {
        next = 'AWAITING_TRANSPORT';
        valid = evt.to.className === next;
      } 
     if (valid) {
       // ESPERAR O ZÉ TERMINAR PARA CHAMAR A ENCOMENDA PELO ID E ALTERARMOS O ESTADO !!!!
      }

      return valid;
    },
  },
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
    color:#666666;
}
.overflow-horizontally{
  overflow-x:auto;
  flex-wrap:nowrap;
}
</style>
