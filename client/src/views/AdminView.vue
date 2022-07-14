<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap position-relative">
      
      <TheNavbar />

      <!--Background color-->
      <div class="underlay-banner bg-226d53">
      </div> 

      <!--Dashboard content-->
      <div class="position-relative overlay px-5">
        <div class="container-fluid px-5"> 
          <!--Dashboard navigation bar-->
          <div class="row px-5">
            <div class="col-lg-12 col-md-12 col-12 mt-4">
              <div>
                <div class="d-flex justify-content-between align-items-center">
                    <!--Admin pills-->
                    <TheDashboardPills />
                    
                  <div class="mb-2 mb-lg-0">
                    <button class="btn btn-success btn-lg bg-309c76 me-2 my-0" data-bs-target="#admin-registration" data-bs-toggle="modal">Criar administrador</button>
                    <button class="btn btn-success btn-lg bg-309c76 mx-2 my-0" data-bs-target="#category-creation" data-bs-toggle="modal">Criar categoria</button>
                    <button class="btn btn-success btn-lg bg-309c76 ms-2 my-0" data-bs-target="#product-creation" data-bs-toggle="modal">Criar produto</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--Admin tab content-->
        <div class="tab-content" id="pills-tab-content">
          <TheAdminRegistration />
          <TheCategoryCreation :categories='this.categories'/>
          <TheProductCreation :categories='this.categories'/>


          <TheGeneralTab :amountUsers='this.amountUsers' :increment='this.usersIncrement' :amountCategories='this.amountCategories' :amountProducts='this.amountProducts' :amountRequests='this.amountRequests' :amountOrders='this.amountOrders' :amountRevenue='this.amountRevenue' :incrementRevenue='this.incrementRevenue' :amountProfit='this.amountProfit' :incrementProfit='this.incrementProfit' :amountSupplierResources='this.amountSupplierResources' :incrementSupplierResources='this.incrementSupplierResources' :amountTransporterResources='this.amountTransporterResources' :incrementTransporterResources='this.incrementTransporterResources' :amountEmissions='this.amountEmissions' :incrementEmissions='this.incrementEmissions'/>
          <TheUsersTab :users='this.users' :amountUsers='this.amountUsers' :increment='this.usersIncrement'/>
          <TheProductsTab :categories='this.categories' :products='this.products' :requests='this.requests' 
                          :amountCategories='this.amountCategories' :amountProducts='this.amountProducts' :amountRequests='this.amountRequests'/>
          <TheOrdersTab :orders='this.orders' :amountOrders='this.amountOrders' :amountRevenue='this.amountRevenue' :incrementRevenue='this.incrementRevenue' :amountProfit='this.amountProfit' :incrementProfit='this.incrementProfit' :amountSupplierResources='this.amountSupplierResources' :incrementSupplierResources='this.incrementSupplierResources' :amountTransporterResources='this.amountTransporterResources' :incrementTransporterResources='this.incrementTransporterResources' :amountEmissions='this.amountEmissions' :incrementEmissions='this.incrementEmissions' />
          
          <div class="row mt-4">
                <div class="lc-block text-center">
                  <div editable="rich">
                      <h4 class="fw-bold display-2"  style="font-size: 40px !important;">Estatísticas</h4>
                  </div>
                </div>
            </div>
          <div v-if="loaded" class="container-fluid px-5 tab-pane fade show active" id="general-tab" role="tabpanel" aria-labelledby="general-pill">
            <div class="row px-5 justify-content-md-center">
              <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5 stats p-2">
                <Chart :informations='this.monthlyRevenue' :months='this.monthsNeeded' infoName="Vendas (€)"/>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5 stats ms-2  p-2">
               <Chart :informations='this.monthlyNewUsers' :months='this.monthsNeeded' infoName="Novos utilizadores"/>
              </div>
            </div>
            <div class="row px-5 justify-content-md-center">
              <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5 stats  p-2">
                <Chart :informations='this.monthlyEmissions' :months='this.monthsNeeded' infoName="Emissões (CO2 g/km/t)"/>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5 stats ms-2  p-2">
                <Chart :informations='this.monthlySupplyResourceUsage' :informationsPlus='this.monthlyTransportResourceUsage' :months='this.monthsNeeded' infoName="Recursos utilizados pelo fornecedor (kWh/dia)" infoNamePlus="Recursos utilizados pelo transportador (L/100km)"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
      
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import TheDashboardPills from '@/components/Administration/TheDashboardPills.vue';
import TheAdminRegistration from '@/components/Administration/Users/TheAdminRegistration.vue';
import TheGeneralTab from '@/components/Administration/General/TheGeneralTab.vue';
import TheUsersTab from '@/components/Administration/Users/TheUsersTab.vue';
import TheProductsTab from '@/components/Administration/Products/TheProductsTab.vue';
import TheOrdersTab from '@/components/Administration/Orders/TheOrdersTab.vue';
import TheCategoryCreation from '../components/Administration/Products/TheCategoryCreation.vue';
import TheProductCreation from '../components/Administration/Products/TheProductCreation.vue';
import Chart from '../components/Administration/Chart.vue';

import http from "../../http-common";

export default {
  name: 'AdminView',
  components: {
    TheNavbar,
    TheFooter,
    TheDashboardPills,
    TheGeneralTab,
    TheUsersTab,
    TheProductsTab,
    TheOrdersTab,
    TheAdminRegistration,
    TheCategoryCreation,
    TheProductCreation,
    Chart
},
  data() {
    return {
      loaded: false,
      users: [],
      amountUsers: 0,
      usersIncrement: 0,
      categories: [],
      amountCategories: 0,
      products: [],
      amountProducts: 0,
      requests: [],
      amountRequests: 0,
      orders: [],
      amountOrders: 0,
      amountRevenue: 0,
      incrementRevenue: 0,
      amountProfit: 0,
      incrementProfit: 0,
      amountSupplierResources: 0,
      incrementSupplierResources: 0,
      amountTransporterResources: 0,
      incrementTransporterResources: 0,
      amountEmissions: 0,
      incrementEmissions: 0,
      months: {"01": "Janeiro", 
        "02" : "Fevereiro", 
        "03": "Março",
        "04": "Abril",
        "05": "Maio",
        "06": "Junho",
        "07": "Julho",
        "08": "Agosto",
        "09": "Setembro",
        "10": "Outubro",
        "11": "Novembro",
        "12": "Dezembro"},
      monthsNeeded : [],
      monthlyEmissions: [],
      monthlyNewUsers: [],
      monthlySupplyResourceUsage: [],
      monthlyTransportResourceUsage: [],
      monthlyRevenue: [],
    };
  },
  mounted() {
    this.getUsers();
    this.getCategories();
    this.getProducts();
    this.getOrders();
    this.getStatistics();
  },
  methods: {
    async getUsers() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/user", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.users = response.data;
      this.amountUsers = response.data.length;
    },
    async getCategories() {
      let response = await http.get("/store/categories");
      this.categories = response.data;
      this.amountCategories = response.data.length;
    },
    async getProducts() {
      let response = await http.get("/store/products?include_unbuyable=true");
      this.products = response.data.products;
      this.amountProducts = response.data.total_products;
    },
    async getOrders() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/orders", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.orders = response.data;
      this.amountOrders = response.data.length;
    },
    async getStatistics() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/statistics", { headers: {"Authorization" : `Bearer ${accessToken}`}} );

      this.usersIncrement = response.data.users.last_month;
      this.amountRevenue = response.data.revenue.total.total.toFixed(2);
      this.incrementRevenue = response.data.revenue.last_month.total.toFixed(2);
      this.amountProfit = (response.data.revenue.total.total * 0.05).toFixed(2);
      this.incrementProfit = (response.data.revenue.last_month.total * 0.05).toFixed(2);
      this.amountSupplierResources = response.data.resource_usage.total.supply.toFixed(2);
      this.incrementSupplierResources = response.data.resource_usage.last_month.supply.toFixed(2);
      this.amountTransporterResources = response.data.resource_usage.total.transport.toFixed(2);
      this.incrementTransporterResources = response.data.resource_usage.last_month.transport.toFixed(2);
      this.amountEmissions = response.data.emissions.total.toFixed(2);
      this.incrementEmissions = response.data.emissions.last_month.toFixed(2);

      this.manageStatistics(response.data.history);
    },
    manageStatistics(data) {
      let filteredStatistics = data.slice(-6);
      
      for (let i = 0; i < filteredStatistics.length; i++) {
        let d = filteredStatistics[i].date.split("-")[1];

        this.monthsNeeded.push(this.months[d]);
        this.monthlyEmissions.push(filteredStatistics[i].emissions);
        this.monthlyNewUsers.push(filteredStatistics[i].new_users);
        this.monthlySupplyResourceUsage.push(filteredStatistics[i].resource_usage.supply);
        this.monthlyTransportResourceUsage.push(filteredStatistics[i].resource_usage.transport);
        this.monthlyRevenue.push(filteredStatistics[i].revenue.total);
      }
      this.loaded = true;
    },
  }
};
</script>

<style scoped>
.table-responsive {
  max-height: 400px;
}
  .bg-226d53 {
    background-color: #226d53;
  }

   .bg-309c76 {
    background-color: #5e9f88;
  }

  .text-309c76{
    color: #5e9f88;
  }

  .text-309c76:hover{
    color: #5abd9a!important;
  }

  .text-light:hover{
    color: #a4f3d7!important;
  }

.underlay-banner {
	padding-top: 4rem ;
	padding-bottom: 9.5rem;
}

.overlay {
  top: -150px;
}

.stats {
  background-color: white;
  border: 1px solid #d1d0d0;
}
</style>