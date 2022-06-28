<template>
        <div class="container-fluid px-5 tab-pane fade show active" id="general-tab" role="tabpanel" aria-labelledby="general-pill">
          <!--Tiny overview cards-->
          <div class="row px-5">
            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
              <TheOverviewCard :title='"Utilizadores"' :amount='this.amountUsers' :increment='this.increment' />
            </div>

            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
              <TheOverviewCard :title='"Categorias"' :amount='this.amountCategories'/>
            </div>

            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
              <TheOverviewCard :title='"Produtos"' :amount='this.amountProducts'/>
            </div>

            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
              <TheOverviewCard :title='"Pedidos"' :amount='this.amountRequests'/>
            </div>

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
        </div>
</template>

<script>
import TheOverviewCard from './TheOverviewCard.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins, faClipboardList } from '@fortawesome/free-solid-svg-icons';
library.add(faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins, faClipboardList);

export default {
  name: 'TheGeneralTab',
    components: {
      TheOverviewCard 
    },
  props: [
    'users',
    'amountUsers',
    'increment',
    'amountCategories',
    'amountProducts',
    'amountRequests',
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
  ]
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
  .fa-clipboard-list,
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