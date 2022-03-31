<template>
  <div class="page-container">
     <TheNavbar />
    <div class="content-wrap  mw-0">
      <div class=" content justify-content-center d-flex w-100 mt-4">
          <ProductCard
            v-for="p in products"
            :key="p.id"
            :id="p.id"
            :name="p.name"
            :description="p.description"
            :category="p.category.name"
            :highestPrice="p.highest_price"
            :lowestPrice="p.lowest_price"
          ></ProductCard>
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
  name: "ProductsView",
  components: {
    ProductCard,
    TheNextPage,
    TheNavbar,
    TheFooter,
  },
  props: {
    key: Number,
    id: Number,
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
