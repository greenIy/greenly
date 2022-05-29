<template>
  <div class="d-flex justify-content-start my-4 mx-5 ">
    <div class="row g-0 overflow-horizontally">
    <div v-for="column in columns" :key="column.title" class="card d-inline-block col-lg-6 column-width me-4 rounded">
      <div class="card-header">
        <h6 class="my-auto"><font-awesome-icon class="fs-5 fa-fw icon me-2" :icon="['fas', column.logo]" /><small>{{column.title}} </small></h6>
      </div>
        <div role="button" class="card-body ">
          <draggable :list="column.tasks" :animation="200" group="tasks" :move="checkMove" :class="column.state">
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
import Order from "@/components/Transporter/Order.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTruck , faCheck , faHourglass, faTruckRampBox, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

library.add(faTruck);
library.add(faCheck);
library.add(faHourglass);
library.add(faTruckRampBox);
library.add(faMapLocationDot);

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
          title: "PRESTES A SER LEVANTADAS",
          state: "AWAITING_TRANSPORT",
          logo: "truck-ramp-box",
          tasks: [
            {
              id: 1,
              title: "teste",
              date: "Sep 14",
              state: "AWAITING_TRANSPORT",
            },
            {
              id: 2,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              state: "AWAITING_TRANSPORT",
            },
            {
              id: 3,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "AWAITING_TRANSPORT",
            },
          ]
        },
         {
          title: "À ESPERA DE TRANSPORTE",
          state: "TRANSPORT_IMMINENT",
          logo: "hourglass",
          tasks: [
            {
              id: 4,
              title: "teste HHHH",
              date: "Sep 14",
              state: "TRANSPORT_IMMINENT",
            },
            {
              id: 5,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              state: "TRANSPORT_IMMINENT",
            },
            {
              id: 6,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "TRANSPORT_IMMINENT",
            },
          ]
        },
        {
          title: "EM TRANSPORTE",
          logo: "truck",
          state: "IN_TRANSIT",
          tasks: [
            {
              id: 7,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "IN_TRANSIT",
            },
            {
              id: 8,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              state: "IN_TRANSIT",
            },
            {
              id: 9,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              state: "IN_TRANSIT",
            },
          ]
        },
        {
          title: "PRESTES A SER ENTREGUES",
          logo: "map-location-dot",
          state: "LAST_MILE",
          tasks: [
            {
              id: 10,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "LAST_MILE",
            },
            {
              id: 11,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              state: "LAST_MILE",
            },
            {
              id: 12,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              state: "LAST_MILE",
            },
          ]
        },
         {
          title: "ENTREGUES",
          logo: "check",
          state: "COMPLETE",
          tasks: [
            {
              id: 13,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              state: "COMPLETE",
            },
            {
              id: 14,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              state: "COMPLETE",
            },
            {
              id: 15,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              state: "COMPLETE",
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
      if(evt.from.className === 'AWAITING_TRANSPORT') {
        next = 'IN_TRANSIT';
        valid = evt.to.className === next;
      } else if (evt.from.className === 'IN_TRANSIT') {
        next = 'COMPLETE';
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
  min-width: 300px;
  width: 300px;
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
