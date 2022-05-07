<template>
<body>
  <div class="page-container">
     <TheNavbar @search-information="searchInformation"/>
    <div class="content-wrap mw-0">
      <div class="container">
        <TheUtilityBar :productAmount="productAmount" :productsInPage="productsInPage" :currentPage="currentPage" :limit="limit" @sendProductsPerPage="productsPerPage"
              :product="products" @sendProduct="getProductsByChild" />
        <div class="row content justify-content-center">
          <div class="col-sm-2 col-md-2 mb-2 filtros ">
            <div class="content d-flex">
              <TheFilters :categories="categories" @sendCurrentCategory="getCurrentCategory" @sendGoBack="goBackPage" @sendMinPrice="showProductsByMinPrice" @sendMaxPrice="showProductsByMaxPrice"/>
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
      <TheNextPage @sendCurrentPage="getCurrentPage" :pageAmount="getPageAmount"/>
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
    params:String,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      categories: [],
      minPrice: 0,
      maxPrice: 50000000,
      productAmount: 0,
      pageAmount: 0,
      currentCategory: {id: "", name: ""},
      limit: 12,
      productsInPage: 0,
      newProducts: this.product,
      nameFilter:String
    };
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    async getProducts(page=this.currentPage, limit=this.limit, minPrice=this.minPrice, maxPrice=this.maxPrice) {
      this.nameFilter = "id";
      var response = await http.get("/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice);
      this.products = response.data.products;
      this.productAmount = response.data.total_products;
      this.productsInPage = this.products.length;
      //console.log(response.data);
      window.scrollTo(0, 0);
      return this.nameFilter
    },
    async getProductsByChild(params) {
      if( params == "name"){
        await http.get("/store/products?page=" + this.currentPage + "&limit="+ this.limit + "&sort=name_asc").then((response) => {
                this.newProducts = response.data.products;
            });
      this.products = Object.assign([], this.newProducts);
      this.nameFilter = "name";
      }
      else if( params == "id"){
        await http.get("/store/products?page=" + this.currentPage + "&limit="+ this.limit + "&sort=newest").then((response) => {
                this.newProducts = response.data.products;
            });
      this.products = Object.assign([], this.newProducts);
      this.nameFilter = "id";
      }
      else if( params == "priceMin"){
        await http.get("/store/products?page=" + this.currentPage + "&limit="+ this.limit + "&sort=price_asc").then((response) => {
                this.newProducts = response.data.products;
            });
      this.products = Object.assign([], this.newProducts);
      this.nameFilter = "priceMin";
  
      }
      else {
        await http.get("/store/products?page=" + this.currentPage + "&limit="+ this.limit + "&sort=price_desc").then((response) => {
                this.newProducts = response.data.products;
            });
      this.products = Object.assign([], this.newProducts);
      this.nameFilter = "priceMax";
      }
      return this.nameFilter
    },
    getCurrentPage: function(params) {
      this.currentPage = params;
      if (this.nameFilter == "id"){
        this.getProducts();
      }else {
        this.getProductsByChild(this.nameFilter);
      }
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
        this.productAmount = response.data.total_products;
        this.productsInPage = this.products.length;
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
      if (this.nameFilter == "id"){
        this.getProducts(this.currentPage, params);
      }else {
        this.getProductsByChild(this.nameFilter);
      }
    },
    searchInformation: function (params) {
      //console.log(this.$route.name);
      http.get("/store/products?page=" + this.currentPage + "&limit=" + this.limit + "&keywords=" + params).then((response) => {
        this.products = response.data.products;
        this.productAmount = response.data.total_products;
        this.productsInPage = this.products.length;
        //console.log(response.data);
      });
    },
    showProductsByMinPrice: function (params) {
      this.minPrice = params;
      this.getProducts();
    },
    showProductsByMaxPrice: function (params) {
      this.maxPrice = params;
      this.getProducts();
      console.log(this.products);
    },
  },
  computed: {
    getPageAmount: function () {
      return Math.ceil(this.productAmount / this.limit);
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
