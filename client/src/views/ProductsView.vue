<template>
<body>
  <div class="page-container">
     <TheNavbar @search-information="searchInformation"/>
    <div class="content-wrap mw-0">
      <div class="container">
        <TheUtilityBar :productAmount="productAmount" :productsInPage="productsInPage" :pageAmount="pageAmount" :currentPage="currentPage" :limit="limit" @sendProductsPerPage="productsPerPage"
              :product="products"/>
        <div class="row content justify-content-center">
          <div class="col-sm-2 col-md-2 mb-2 filtros ">
            <div class="content d-flex">
              <TheFilters :categories="categories" :maxPrice="getMaxPrice" :minPrice="getMinPrice" @sendCurrentCategory="getCurrentCategory" @sendGoBack="goBackPage"/>
            </div>
          </div>
          <div class="col-sm-10 col-md-9 ">
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
    TheUtilityBar
  },
  props: {
    product: Object,
    productAmount: Number,
    pageAmount: Number,
    currentPage: Number,
    limit: Number,
    productsInPage: Number,
    categories: Array,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      categories: [],
      minPrice: Number,
      maxPrice: Number,
      productAmount: 0,
      pageAmount: 0,
      currentCategory: {id: "", name: ""},
      limit: 12,
      productsInPage: 0,
    };
  },
  created() {
    this.getProducts();
    this.getCategories();
    //console.log(this.$route);
  },
  methods: {
    async getProducts(page=this.currentPage, limit=this.limit) {
      var response = await http.get("/store/products?page=" + page + "&limit="+limit);
      this.products = response.data.products;
      this.productAmount = response.data.total_products;
      this.productsInPage = this.products.length;
      //console.log(response.data);
      window.scrollTo(0, 0);
    },
    getCurrentPage: function(params) {
      this.currentPage = params;
      this.getProducts();
    },
    async getCategories() {
      var response = await http.get("/store/categories");
      this.categories = response.data;
      //console.log(response.data);
    },
    getCurrentCategory: function(params) {
      this.currentCategory = params;
      var productByCategory = http.get("/store/products?category=" + this.currentCategory.id + "&page=" + this.currentPage + "&limit=12").then((response) => {
        this.products = response.data.products;
      });
      this.products = Object.assign([], productByCategory);
    },
    goBackPage: function(params) {
      this.currentCategory = params;
      if (Object.keys(params).length === 0) {
        this.getProducts();
      } else {
        this.getCurrentCategory(this.currentCategory);
      }
    },
    productsPerPage: function (params) {
      this.limit = params;
      this.getProducts(this.currentPage, params);
    },
    searchInformation: function (params) {
      //console.log(this.$route.name);
      http.get("/store/products?page=" + this.currentPage + "&limit="+ this.limit + "&keywords=" + params).then((response) => {
        this.products = response.data.products;
        this.productAmount = response.data.total_products;
        //console.log(response.data);
      });
    }
  },
  computed: {
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
