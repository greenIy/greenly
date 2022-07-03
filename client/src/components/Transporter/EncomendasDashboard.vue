<template>
  <div class="d-flex justify-content-start my-3 mx-5">
    <div class="row g-0 overflow-horizontally">
    <div v-for="column in this.columns" :key="column.status" class="card d-inline-block col-lg-6 column-width me-4 rounded">
      <div class="card-header position-relative">
        <h6 class="my-auto title"><font-awesome-icon class="fs-6 fa-fw mx-2 icon" :icon="['fas', column.logo]" /><small>{{column.title}}</small>
        <span class="badge rounded-pill bg-secondary itens">{{ column.orders.length }} <span class="visually-hidden">numero de itens</span></span></h6>
      </div>
        <div role="button" class="card-body draggable-host my-2">
          <Draggable
              :class="column.status"
              :list="column.orders"
              group="orders"
              itemKey="item_id"
              :move="checkMove">
              <template #item="{ element }">
                  <order class="d-inline-block col-lg-6 w-100 my-2 cursor-move"  :element="element" @updateStatus="updateStatus"></order>
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

import {useToast} from 'vue-toastification';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTruck , faCircleCheck , faClock, faTruckRampBox, faHouseSignal } from "@fortawesome/free-solid-svg-icons";

import http from "../../../http-common";

library.add(faTruck);
library.add(faCircleCheck);
library.add(faClock);
library.add(faTruckRampBox);
library.add(faHouseSignal);

export default {
  name: "Dashboard",
  components: {
    Draggable,
    Order,
  },
  props: {
    receiveData: Array,
  },
  data() {
    const toast = useToast();
    return {
      columns: [
         {
          title: "À ESPERA DE TRANSPORTE",
          status: "TRANSPORT_IMMINENT",
          logo: "clock",
          next_status: "AWAITING_TRANSPORT",
          orders: [ ]
        },
        {
          title: "PRESTES A SER LEVANTADAS",
          status: "AWAITING_TRANSPORT",
          logo: "truck-ramp-box",
          next_status: "IN_TRANSIT",
          orders: [ ]
        },
        {
          title: "EM TRANSPORTE",
          logo: "truck",
          status: "IN_TRANSIT",
          next_status: "LAST_MILE",
          orders: [ ]
        },
        {
          title: "PRESTES A SER ENTREGUES",
          logo: "house-signal",
          status: "LAST_MILE",
          next_status: "COMPLETE",
          orders: [ ]
        },
         {
          title: "ENTREGUES",
          logo: "circle-check",
          status: "COMPLETE",
          next_status: "",
          orders: []
        },
      ],
      toast,
    };
  },
  mounted() {
    this.processData();
  },
  watch: {
    '$route.query.id_encomenda'() {
      this.processData();
    },
    'receiveData'() {
      this.processData();
    }
  },
  methods: {
    async processData(){
      let processedData = this.parseOrders(this.receiveData);

      this.cleanArray();

      for (let order of processedData) {
        let correspondingColumn;

        if (this.$route.query.id_encomenda) { // caso o utilizador tenha pesquisado por uma encomenda específica
          correspondingColumn = this.columns.findIndex((column) => (column.status == order.item.status && order.id == this.$route.query.id_encomenda));
        } else {
          correspondingColumn = this.columns.findIndex((column) => (column.status == order.item.status));
        }

        if (correspondingColumn != -1) {
          order.item_id = parseInt(`${order.id}${order.item.id}`)
          this.columns[correspondingColumn].orders.push(order)
        }
      }
    },
    checkMove: (evt) =>  {
      let valid = false;
      let next;
      if(evt.from.className === 'TRANSPORT_IMMINENT') {
        next = 'AWAITING_TRANSPORT';
        valid = evt.to.className === next;
      } else if (evt.from.className === 'AWAITING_TRANSPORT') {
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
    },
    cleanArray() {
      for(let i = 0; i < 5; i++) {
        this.columns[i].orders = [];
      }
    },
    updateStatus(value){
      this.$emit('updateStatus', value);
    },
  },
};
</script>

<style scoped>
.column-width {
  min-width: 18.3%;
  width: 18.3%;
}

.card {
    background-color:#ffffff;
}

.card-header {
    background-color:#ffffff;
}

.card-body {
  padding: 0.1rem 1rem;
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

.itens{
  float:right!important;
}
.title{
  font-size:14px;
}
</style>
