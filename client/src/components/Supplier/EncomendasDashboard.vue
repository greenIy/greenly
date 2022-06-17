<template>
  <div class="d-flex justify-content-start my-3 mx-5">
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
import Order from "@/components/Supplier/Order.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxesPacking, faTruck, faTruckFast} from "@fortawesome/free-solid-svg-icons";

import http from "../../../http-common";

library.add(faBoxesPacking);
library.add(faTruck);
library.add(faTruckFast);

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
    return {
      columns: [
        {
          title: "EM PROCESSAMENTO",
          status: "PROCESSING",
          logo: "boxes-packing",
          orders: []

        },
        {
          title: "PRONTAS PARA TRANSPORTE",
          status: "AWAITING_TRANSPORT",
          logo: "truck",
          orders: []
        },
        {
          title: "PRESTES A SER LEVANTADAS",
          status: "TRANSPORT_IMMINENT",
          logo: "truck-fast",
          orders: []
        },
      ],
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
    },
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
    checkMove: (evt) => {
    
      let valid = false;
      let next;
      if(evt.from.className === 'PROCESSING') {
        next = 'AWAITING_TRANSPORT';
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

      for (let order of orders) {
          for (let item of order.items) {
              // Deepcopying porque senão nada disto funciona
              let orderItem = JSON.parse(JSON.stringify(order));
              orderItem.item = item;
              delete orderItem.items;
              orderItems.push(orderItem);
          }
      }
      return orderItems
    },
    cleanArray() {
      for(let i = 0; i < 3; i++) {
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
  min-width: 19.3%;
  width: 19.3%;
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

.AWAITING_TRANSPORT, .PROCESSING, .TRANSPORT_IMMINENT {
  min-height: 45vh
}
</style>
