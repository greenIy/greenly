<template>
<body>
  <div class="page-container">
     <TheNavbar />
    <div class="content-wrap mw-0">
      <div class="container">
        <div class="row">
          <div class="col filtros mt-4">
            <div class="content d-flex">
              <TheFilters />
            </div>
          </div>
          <div class="col">
            <div class="content justify-content-center d-flex w-100 mt-4" @currentPage="getCurrentPage">
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

import http from "../../http-common";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
    TheNextPage,
    TheNavbar,
    TheFooter,
    TheFilters,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      http.get("/store/products?page=" + this.currentPage + "&limit=15").then((response) => {
        this.products = response.data;
        //console.log(response.data);
      });
      window.scrollTo(0, 0);
    },
    getCurrentPage: function(params) {
      this.currentPage = params;
      this.getProducts();
    }
  },
  computed: {},
};
</script>

<style scoped>
.content {
  flex-wrap:wrap
}
.filtros{
  max-width:20%;
  background-color: white;
}
</style>
