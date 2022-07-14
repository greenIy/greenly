<template>
  <div class="d-flex justify-content-start my-3 mx-5 container-history">
    <div
      v-for="column in this.columns"
      :key="column.status"
      class="card d-inline-block col-lg-6 column-width me-4 rounded"
    >
      <div class="card-header">
        <h6 class="my-auto title">
          <font-awesome-icon
            class="fs-6 fa-fw mx-2 icon"
            :icon="['fas', column.logo]"
          /><small>{{ column.title }}</small>
          <span class="badge rounded-pill bg-secondary itens"
            >{{ column.orders.length }}
            <span class="visually-hidden">numero de itens</span></span
          >
        </h6>
      </div>
      <div role="button" class="card-body draggable-host">
        <Draggable
          :class="column.status"
          :list="column.orders"
          group="orders"
          itemKey="item_id"
          :move="checkMove"
        >
          <template #item="{ element }">
            <order
              class="d-inline-block col-lg-6 w-100 my-2 cursor-move"
              :element="element"
            ></order>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import Order from "@/components/Transporter/Order.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faBoxOpen,
  faCircleXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);
library.add(faBoxOpen);
library.add(faCircleXmark);
library.add(faCircleExclamation);

export default {
  name: "History",
  components: {
    Draggable,
    Order,
  },
  props: {
    element: Object,
    receiveData: Array,
  },
  data() {
    return {
      columns: [
        {
          title: "CANCELADAS",
          status: "CANCELED",
          logo: "circle-xmark",
          orders: [],
        },
        {
          title: "FALHADAS",
          status: "FAILURE",
          logo: "circle-exclamation",
          orders: [],
        },
      ],
    };
  },
  mounted() {
    this.processData();
  },
  watch: {
    "$route.query.id_encomenda"() {
      this.processData();
    },
    receiveData() {
      this.processData();
    },
  },
  created() {
    this.changeTitle();
  },
  methods: {
    changeTitle() {
      window.document.title = "Greenly | Arquivo";
    },
    async processData() {
      let processedData = this.parseOrders(this.receiveData);

      this.cleanArray();

      for (let order of processedData) {
        let correspondingColumn;

        if (this.$route.query.id_encomenda) {
          // caso o utilizador tenha pesquisado por uma encomenda específica
          correspondingColumn = this.columns.findIndex(
            (column) =>
              column.status == order.item.status &&
              order.id == this.$route.query.id_encomenda
          );
        } else {
          correspondingColumn = this.columns.findIndex(
            (column) => column.status == order.item.status
          );
        }

        if (correspondingColumn != -1) {
          order.item_id = parseInt(`${order.id}${order.item.id}`);
          this.columns[correspondingColumn].orders.push(order);
        }
      }
    },
    checkMove: (evt) => {
      let valid = false;
      let next;

      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      if (valid) {
        http.put(
          `/store/orders/${evt.draggedContext.element.id}/${evt.draggedContext.element.item.id}`,
          JSON.stringify({ status: `${next}` }),
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }

      return valid;
    },
    parseOrders(orders) {
      // Esta função pega numa encomenda e divide-a em vários orderItems para que estes possam ser apresentados em cards separados
      let orderItems = [];

      if (orders.length) {
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
      return orderItems;
    },
    cleanArray() {
      for (let i = 0; i < 2; i++) {
        this.columns[i].orders = [];
      }
    },
  },
};
</script>

<style scoped>
.column-width {
  min-width: 18.3%;
  width: 18.3%;
}
.FAILURE,
.CANCELED {
  min-height: 45vh;
}
.card {
  background-color: #ffffff;
}

.card-header {
  background-color: #ffffff;
}

.card-body {
  padding: 0.1rem 1rem;
}

.icon {
  color: #666666;
}

.overflow-horizontally {
  overflow-x: auto;
  flex-wrap: nowrap;
  width: 105%;
}

.itens {
  float: right !important;
}

.title {
  font-size: 14px;
}
.container-history {
  flex-direction: row;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .container-history {
    flex-direction: column;
  }
}

@media (max-width: 991px) {
  .container-history {
    flex-direction: column;
    width: 80%;
    height: auto;
    right: 2em !important;
  }
  .card {
    width: 100%;
    margin-top: 1em;
  }
}
</style>
