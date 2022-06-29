<template>
  <div class="container-fluid px-5 tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-pill">
    <!--User info modals-->
    <TheOrderModal :currentOrder='this.currentOrder' />

    <!--Orders overview cards-->
    <div class="row px-5">

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='"Encomendas"' :amount='this.amountOrders' />
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5"> 
        <TheOverviewCard :title='"Vendas"' :amount='this.amountRevenue' :increment='this.incrementRevenue'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='"Lucros"' :amount='this.amountProfit' :increment='this.incrementProfit'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='"Gastos de armazenamento"' :amount='this.amountSupplierResources' :increment='this.incrementSupplierResources' />
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='"Gastos de transporte"' :amount='this.amountTransporterResources' :increment='this.incrementTransporterResources'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='"Emissões"' :amount='this.amountEmissions' :increment='this.incrementEmissions'/>
      </div>
    </div>

    <!--Orders list-->
    <div class="row px-5">
      <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
        <div class="card h-100 px-3">
          <!-- card header  -->
          <nav class="navbar py-4">
            <div class="container-fluid px-1">
              <h4>Encomendas </h4>


              <div class="input-group w-25 rounded-3">
                <input id="orders-input" class="form-control bg-light border-success border-end-0 super-round" type="search"
                  placeholder="Número, estado, consumidor...">
                <span class="input-group-text bg-light border-success border-start-0 super-round" @click="this.filterOrders()">
                  <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l" /></span>
              </div>

            </div>
          </nav>

          <!-- table  -->
          <div class="table-responsive" id="orders-table" style="max-height: 400px;">
            <table class="table text-nowrap px-3">
              <thead class="text-uppercase">
                <tr>
                  <th>Número</th>
                  <th>Consumidor</th>
                  <th>Recursos</th>
                  <th>Emissões</th>
                  <th>Data de encomenda</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="border-top-0 overflow-auto">
                <tr v-for="order in this.orders" :key="order">
                  <td class="align-middle">
                    <div class="d-flex align-items-center ">
                      <div>
                      </div>
                      <div class="lh-1">
                        <h5 class="order mb-1">#{{ order.id }}</h5>
                        <p class="order mb-0 text-secondary">{{ this.getOrderDetails(order.items, 'total_price') }}€</p>
                      </div>
                    </div>
                  </td>
                  <td class="order align-middle"> {{ order.consumer.first_name }} {{ order.consumer.last_name }} </td>
                  <td class="order align-middle"> {{ this.getOrderDetails(order.items, 'supplier_resource_usage') }} kWh/dia e
                    {{ this.getOrderDetails(order.items, 'transporter_resource_usage') }} L/100 km </td>
                  <td class="order align-middle"> {{ this.getOrderDetails(order.items, 'transporter_emissions') }}
                    CO<sub>2</sub> g/km/t</td>
                  <td class="order align-middle"> {{ this.formatDate(order.date) }} </td>

                  <td v-if="this.getOrderStatus(order) == 'Aguardando pagamento'" class="align-middle"><span class="badge bg-secondary text-uppercase">Aguardando pagamento</span></td>
                  <td v-else-if="this.getOrderStatus(order) == 'Em processamento'" class="align-middle"><span class="badge bg-warning text-uppercase">Em processamento</span></td>
                  <td v-else-if="this.getOrderStatus(order) == 'Completa'" class="align-middle"><span class="badge bg-226d53 text-uppercase">Completa</span></td>
                  <td v-else-if="this.getOrderStatus(order) == 'Cancelada'" class="align-middle"><span class="badge bg-danger text-uppercase">Cancelada</span></td>
                  <td v-else class="align-middle"><span class="order badge bg-dark text-uppercase"> Em transporte</span></td>
                  
                  <td class="align-middle">
                    <div class="dropdown dropstart">
                      <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-more-vertical icon-xxs">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                        <a @click="this.getCurrentOrder(order.id)" class="dropdown-item" data-bs-target="#order-details"
                          data-bs-toggle="modal">Ver detalhes</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheOverviewCard from '../TheOverviewCard.vue';
import TheOrderModal from './TheOrderModal.vue';

import http from "../../../../http-common";

export default {
    name: "TheOrdersTab",
    components: {
      TheOverviewCard,
      TheOrderModal
    },
    data() {
        return {
            currentOrder: []
        };
    },
    props: [
        "orders",
        "amountOrders",
        "amountRevenue",
        "incrementRevenue",
        "amountProfit",
        "incrementProfit",
        "amountSupplierResources",
        "incrementSupplierResources",
        "amountTransporterResources",
        "incrementTransporterResources",
        "amountEmissions",
        "incrementEmissions"
    ],
    methods: {
      filterOrders: function () {
        let i, value1, value2, value3, value4, value5, value6, td1, td2, td3, td4, td5, td6;
        let filter = document.getElementById("orders-input").value.toUpperCase();
        let table = document.getElementById("orders-table");
        let tr = table.getElementsByTagName("tr");

        console.log(filter);
        console.log(tr);

        for (i = 0; i < tr.length; i++) {
          td1 = tr[i].getElementsByTagName("td")[0]; //collumns u search for
          td2 = tr[i].getElementsByTagName("td")[1];
          td3 = tr[i].getElementsByTagName("td")[2]; 
          td4 = tr[i].getElementsByTagName("td")[3];
          td5 = tr[i].getElementsByTagName("td")[4]; 
          td6 = tr[i].getElementsByTagName("td")[5];
          if (td1 || td2 || td3 || td4 || td5 || td6) {
            value1 = td1.textContent || td1.innerText;
            value2 = td2.textContent || td2.innerText;
            value3 = td3.textContent || td3.innerText;
            value4 = td4.textContent || td4.innerText;
            value5 = td5.textContent || td5.innerText;
            value6 = td6.textContent || td6.innerText;
            if (value1.toUpperCase().indexOf(filter) > -1 || 
                value2.toUpperCase().indexOf(filter) > -1 ||
                value3.toUpperCase().indexOf(filter) > -1 || 
                value4.toUpperCase().indexOf(filter) > -1 ||
                value5.toUpperCase().indexOf(filter) > -1 || 
                value6.toUpperCase().indexOf(filter) > -1  ) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            } 
          }      
        }
      },
        getCurrentOrder: function (orderId) {
            let accessToken = JSON.parse(localStorage.getItem("accessToken"));
            let userId = JSON.parse(localStorage.getItem("userId"));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            };
            if (accessToken && userId) {
                http.get(`/store/orders/${orderId}`, headers)
                    .then((response) => {
                    if (response.status == 200) {
                        this.currentOrder = response.data;
                    }
                }).catch((error) => {
                    console.log(error.response.data);
                    console.log("Failure!");
                });
            }
        },
        formatDate: function (timestamp) {
            let date = new Date(timestamp);
            return date.toLocaleString("pt-PT", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            });
        },
        getOrderDetails: function (items, scope) {
            switch (scope) {
                case "total_price":
                    return items.reduce((accumulator, item) => accumulator + (item.supply_price * item.quantity) + item.transport_price, 0).toFixed(2);
                case "renewable_resources":
                    return parseFloat((items.reduce((accumulator, item) => accumulator + item.supplier_renewable_resources, 0) / cartItems.length).toFixed(2));
                case "supplier_resource_usage":
                    return items.reduce((accumulator, item) => accumulator + item.supplier_resource_usage, 0).toFixed(2);
                case "transporter_resource_usage":
                    return items.reduce((accumulator, item) => accumulator + item.transporter_resource_usage, 0).toFixed(2);
                case "transporter_emissions":
                    return items.reduce((accumulator, item) => accumulator + item.transporter_emissions, 0).toFixed(2);
            }
        },
        getOrderStatus: function (order) {
            let stateMap = {
                "AWAITING_PAYMENT": "Aguardando pagamento",
                "PROCESSING": "Em processamento",
                "COMPLETED": "Completa",
                "CANCELED": "Cancelada",
                "IN_TRANSIT": "Em transporte"
            };

            for (let state in stateMap) {
                if (order.items.every((item) => item.status == state)) {
                    return stateMap[state];
                }
            }

            if (order.items.every((item) => ["IN_TRANSIT", "LAST_MILE"].includes(item.status))) {
                return stateMap["IN_TRANSIT"];
            }

            return stateMap["PROCESSING"];
        }
    }
};
</script>

<style scoped>
  .super-round{
    border-radius: 20px;
  }
  .bg-e4e6c3 {
    background-color: #e4e6c3;
  }
  .bg-226d53 {
    background-color: #226d53;
  }

  .fa-users,
  .fa-boxes-stacked,
  .fa-barcode,
  .fa-sitemap,
  .fa-magnifying-glass,
  .fa-coins{
    color: #226d53;
  }

     .fa-magnifying-glass:hover{
        color: #226d5393;
    }


  .bg-309c76 {
    background-color: #5e9f88;
  }

  .bg-secondary {
    background-color: rgb(177, 177, 177)!important;
  }
</style>