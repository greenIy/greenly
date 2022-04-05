<template>
<body>
  <div class="page-container">
     <TheNavbar />
    <div class="content-wrap mw-0">
      <div class="container">
        <TheUtilityBar />
        <div class="row content justify-content-center">
          <div class="col-sm-2 col-md-2 filtros mt-1">
            <div class="content d-flex">
              <TheFilters :categories="getCategories" :maxPrice="getMaxPrice" :minPrice="getMinPrice"/>
            </div>
          </div>
          <div class="col-sm-10 col-md-9 mt-1">
            <div class="content d-flex w-100 " @currentPage="getCurrentPage">
              <ProductCard
               v-for="p in products"
              :key="p.id"
              :product="p"
              ></ProductCard>
             </div>
            </div>
          </div>
      </div>
      <TheNextPage @sendCurrentPage="getCurrentPage"/>
    </div>
    <TheFooter />
  </div>
</body>
</template>

<script>
import ProductCard from "@/components/Product/ProductCard.vue";
import TheNextPage from "@/components/Product/TheNextPage.vue";
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";
import TheFilters from "@/components/Product/CatalogPage/TheFilters.vue";
import TheUtilityBar from "@/components/Product/CatalogPage/TheUtilityBar.vue";

import http from "../../http-common";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
    TheNextPage,
    TheNavbar,
    TheFooter,
    TheFilters,
    TheUtilityBar,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      categories: [],
      minPrice: Number,
      maxPrice: Number,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      http.get("/store/products?page=" + this.currentPage + "&limit=15").then((response) => {
        this.products = response.data.products;
        //console.log(response.data);
      });
      window.scrollTo(0, 0);
    },
    getCurrentPage: function(params) {
      this.currentPage = params;
      this.getProducts();
    }
  },
  computed: {
    getCategories: function () {
      return this.products.map(product => ({
          id: product.category.id, 
          name: product.category.name
          }));
    },
    getMaxPrice: function () {
      var maxPrices = this.products.map(product =>
          product.highest_price
      );

      return maxPrices.reduce((a, b) => Math.max(a,b), 0);
    },
    getMinPrice: function () {
      var minPrices = this.products.map(product =>
          product.lowest_price
      );
      return minPrices.reduce((a, b) => Math.min(a,b), 30000);
    },
  },
};
</script>

<style scoped>
.content {
  flex-wrap:wrap
}
.filtros{
  background-color: white;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
}
</style>
