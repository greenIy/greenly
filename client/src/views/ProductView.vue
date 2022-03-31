<template>
  <div class="page-container">
     <TheNavbar />
    <div class="content-wrap  mw-0">
     
      <div class=" content justify-content-center d-flex w-100 mt-4">
          <product-card
            v-for="product in products"
            v-bind:key="product.id"
            v-bind:name="product.name"
            v-bind:description="product.description"
            v-bind:category="product.category.name"
            v-bind:highestPrice="product.highest_price"
            v-bind:lowestPrice="product.lowest_price"
          ></product-card>
        
      </div>

      <TheNextPage />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import ProductCard from "@/components/Product/ProductCard.vue";
import TheNextPage from "@/components/TheNextPage.vue";
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";

import http from "../../http-common";

export default {
  name: "ProductView",
  components: {
    ProductCard,
    TheNextPage,
    TheNavbar,
    TheFooter,
  },
  props: {
    name: String,
    description: String,
    category: String,
    highestPrice: Number,
    lowestPrice: Number,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      http.get("/store/product").then((response) => {
        this.products = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>

<style scoped>
.content {
  flex-wrap:wrap
}
</style>
