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
          <div class="col-sm-10 col-md-9">
            <div v-if="products.length" class="content d-flex w-100 " @currentPage="getCurrentPage">
              <ProductCard
              v-for="p in products"
              :key="p.id"
              :product="p"
              ></ProductCard>
             </div>
             <div v-else class="content d-flex w-100 ">
               <TheNoProduct></TheNoProduct>
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
import TheNoProduct from "@/components/StandardMessages/TheNoProduct.vue";

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
    TheNoProduct
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
      nameFilter: "id",
    };
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    async getProducts(page=this.currentPage, limit=this.limit, minPrice=this.minPrice, maxPrice=this.maxPrice) {
      let response;
      let request;
      if (this.nameFilter === "name") {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&sort=name_asc";
      } else if (this.nameFilter === "priceMin") {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&sort=price_asc";
      } else if (this.nameFilter === "priceMax") {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&sort=price_desc";
      } else if (this.nameFilter === "id") {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&sort=newest";
      } else {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice ;
      }
      
      if (this.currentCategory.id != "") {
        request = request + "&category=" + this.currentCategory.id;
      }

      response = await http.get(request);
      this.products = response.data.products;
      this.productAmount = response.data.total_products;
      this.productsInPage = this.products.length;
      //console.log(response.data);
      window.scrollTo(0, 0);
    },
    getProductsByChild(params) {
      this.nameFilter = params;
      this.getProducts();
    },
    getCurrentPage: function(params) {
      this.currentPage = params;
      if (this.nameFilter == "id"){
        this.getProducts();
      } else {
        this.getProductsByChild(this.nameFilter);
      }
    },
    async getCategories() {
      var response = await http.get("/store/categories");
      this.categories = response.data;
    },
    getCurrentCategory: function(params) {
      this.currentCategory = params;
      this.getProducts();
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
      this.getProducts();
    },
    searchInformation: function (params) {
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
      //console.log(this.products);
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
