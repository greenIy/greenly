<template>
  <div class="container-fluid px-5 tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-pill">
    <!--User info modals-->
    <TheOrderModal :currentOrder='this.currentOrder' />

    <!--Orders overview cards-->
    <div class="row px-5">

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.ordersTitle' :amount='this.amountOrders' />
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5"> 
        <TheOverviewCard :title='this.revenueTitle' :amount='this.amountRevenue' :increment='this.incrementRevenue'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.profitsTitle' :amount='this.amountProfit' :increment='this.incrementProfit'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.supplierResourcesTitle' :amount='this.amountSupplierResources' :increment='this.incrementSupplierResources' />
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.transporterResourcesTitle' :amount='this.amountTransporterResources' :increment='this.incrementTransporterResources'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.emissionsTitle' :amount='this.amountEmissions' :increment='this.incrementEmissions'/>
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
          <div class="table-responsive" style="max-height: 400px;">
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
                  <!--td class="align-middle"><span class="badge bg-dark text-uppercase">Enviada</span></td>
                                <td class="align-middle"><span class="badge bg-danger text-uppercase">Cancelada</span></td>
                                <td class="align-middle"><span class="badge bg-success text-uppercase">Entregue</span></td-->
                  <td class="align-middle"><span class="order badge bg-secondary text-uppercase">Sei la</span></td>
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

import http from "../../../../http-common";

export default {
    name: "TheOrdersTab",
    components: {
      TheOverviewCard 
    },
    data() {
        return {
            ordersTitle: 'Encomendas',
            revenueTitle: 'Vendas',
            profitsTitle: 'Lucros',
            supplierResourcesTitle: 'Gastos de armazenamento',
            transporterResourcesTitle: 'Gastos de transporte',
            emissionsTitle: 'Emissões',
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
        let i, value;
        let filter = document.getElementById("orders-input").value.toUpperCase();
        let orders = document.getElementsByClassName("order");

        console.log(filter);
        console.log(orders);

        for (i = 0; i < orders.length; i++) {
            value = orders[i].textContent || orders[i].innerText;
            if (value.toUpperCase().indexOf(filter) > -1) {
              orders[i].style.display = "";
            } else {
              orders[i].style.display = "none";
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
    background-color: #309c76;
  }

  .bg-secondary {
    background-color: rgb(177, 177, 177)!important;
  }
</style>