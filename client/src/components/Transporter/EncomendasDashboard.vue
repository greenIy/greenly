<template>
  <div class="d-flex justify-content-start my-4 mx-5">
    <div class="row g-0 overflow-horizontally">
    <div v-for="column in this.columns" :key="column.status" class="card d-inline-block col-lg-6 column-width me-4 rounded">
      <div class="card-header">
        <h6 class="my-auto"><font-awesome-icon class="fs-6 fa-fw mx-2 icon" :icon="['fas', column.logo]" /><small>{{column.title}}</small></h6>
      </div>
        <div role="button" class="card-body draggable-host">
          <Draggable
              :class="column.status"
              :list="column.orders"
              group="orders"
              itemKey="item_id"
              :move="checkMove">
              <template #item="{ element }">
                  <order class="d-inline-block col-lg-6 w-100 my-3 cursor-move"  :element="element"></order>
              </template>
            </Draggable>
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

import http from "../../../http-common";

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
          status: "AWAITING_TRANSPORT",
          logo: "truck-ramp-box",
          orders: [ ]
        },
         {
          title: "À ESPERA DE TRANSPORTE",
          status: "TRANSPORT_IMMINENT",
          logo: "hourglass",
          orders: [ ]
        },
        {
          title: "EM TRANSPORTE",
          logo: "truck",
          status: "IN_TRANSIT",
          orders: [ ]
        },
        {
          title: "PRESTES A SER ENTREGUES",
          logo: "map-location-dot",
          status: "LAST_MILE",
          orders: [ ]
        },
         {
          title: "ENTREGUES",
          logo: "check",
          status: "COMPLETE",
          orders: []
        },
      ],
      receiveData: [],
    };
  },
   mounted(){
    this.processData();
  },
  
  methods: {
    async processData(){
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/orders", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.receiveData = JSON.parse(JSON.stringify(response.data));

      let processedData = this.parseOrders(this.receiveData);

      for (let order of processedData) {
        // TODO: Adicionar colunas no histórico, neste momento considera apenas colunas das principais

        let correspondingColumn = this.columns.findIndex((column) => (column.status == order.item.status))
        if (correspondingColumn != -1) {
          order.item_id = parseInt(`${order.id}${order.item.id}`)
          this.columns[correspondingColumn].orders.push(order)
        }
        // Quando tiverem colunas do arquivo (this.archiveColumns)
        // let correspondingArchiveColumn = this.archiveColumns.findIndex((column) => (column.status == order.item.status))
        // else {
        //   this.archiveColumns[correspondingArchiveColumn].orders.push(order)
        // }
      }
    },
    checkMove: (evt) =>  {
      let valid = false;
      let next;
      if(evt.from.className === 'AWAITING_TRANSPORT') {
        next = 'TRANSPORT_IMMINENT';
        valid = evt.to.className === next;
      } else if (evt.from.className === 'TRANSPORT_IMMINENT') {
        next = 'IN_TRANSIT';
        valid = evt.to.className === next;
      }
      else if (evt.from.className === 'IN_TRANSIT') {
        next = 'LAST_MILE';
        valid = evt.to.className === next;
      }
       else if (evt.from.className === 'LAST_MILE') {
        next = 'COMPLETE';
        valid = evt.to.className === next;
      }

      let accessToken = JSON.parse(localStorage.getItem('accessToken'));
      if (valid) {
        http.put(`/store/orders/${ evt.draggedContext.element.id }/${ evt.draggedContext.element.item.id }`, 
        JSON.stringify({ status: `${ next }` }), { headers: {"Authorization" : `Bearer ${ accessToken }`}});
      }

      return valid;
    },
    parseOrders(orders){

      // Esta função pega numa encomenda e divide-a em vários orderItems para que estes possam ser apresentados em cards separados
      let orderItems = []

      if(orders.length) {
        for (let order of orders) {
            for (let item of order.items) {
                // Deepcopying porque senão nada disto funciona
                let orderItem = JSON.parse(JSON.stringify(order));
                orderItem.item = item;
                delete orderItem.items;
                orderItems.push(orderItem);
            }
        }
      }
      return orderItems
    }
  },
};
</script>

<style scoped>
.column-width {
  min-width: 18.4%;
  width: 18.4%;
}

.card {
    background-color:#ffffff;
}

.card-header {
    background-color:#ffffff;
}

.icon {
    color:#666666;
}

.overflow-horizontally {
  overflow-x:auto;
  flex-wrap:nowrap;
  width: 105%;
}

.AWAITING_TRANSPORT, .PROCESSING, .TRANSPORT_IMMINENT, .IN_TRANSIT, .LAST_MILE, .COMPLETE {
  min-height: 45vh
}
</style>
