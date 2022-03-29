<template>
<div class="page-container">
    <div class="content-wrap">
      <the-navbar />
      <ul>
        <li
          is="ProductCard"
          v-for="(product, index) in products"
          v-bind:key="product.id"
          v-bind:name="product.name"
          v-bind:description="product.description"
          v-bind:category="product.category"
          v-bind:highestPrice="product.highestPrice"
          v-bind:lowestPrice="product.lowestPrice"
          v-on:remove="todos.splice(index, 1)"
        ></li>
      </ul>
      <TheNextPage/>
    </div>
   <the-footer />
</div>
</template>

<script>

import ProductCard from '@/components/Product/ProductCard.vue';
import TheNextPage from '@/components/TheNextPage.vue';
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';

import http from "../../http-common";

export default {
  name: 'ProductView',
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
    hightestPrice: String,
    lowestPrice: String,
  },
  data() {
    return {
       products: [],
    };
  },
  created () {
    this.getProducts();
  },
  methods: {
    getProducts() {
      http.get("/store/product")
      .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
    }
  }
};
</script>
