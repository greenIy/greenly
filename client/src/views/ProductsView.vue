<template>
<body>
  <div class="page-container">
     <TheNavbar @search-information="searchInformation"/>
    <div class="content-wrap mw-0">
      <div class="container">
        <TheUtilityBar :productAmount="productAmount" :productsInPage="productsInPage"
              :product="products" @sendProduct="getProductsByChild" />
        <div class="row content justify-content-center" v-if="rendered">
          <div class="col-sm-2 col-md-2 mb-2 filtros ">
            <div class="content d-flex">
              <TheFilters :categories="categories" :currentCategories="currentCategories" @sendMinPrice="showProductsByMinPrice" @sendMaxPrice="showProductsByMaxPrice"/>
            </div>
          </div>
          <div class="col-sm-10 col-md-9">
          <Transition name="fade">
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
          </Transition>
          </div>
          </div>
      </div>
      <TheNextPage v-if="products.length" :pageAmount="getPageAmount"/>
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

import { useRouter } from 'vue-router';

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
    allSuppliers:Array,
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
      currentCategories: [],
      limit: 12,
      productsInPage: 0,
      nameFilter: "id",
      allSuppliers: [],
      rendered: false,
    };
  },
  beforeMount() {
    this.getProducts();
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  watch: {
    $route(to, from) {
      if(to.name === "categoria") {
        this.getCurrentCategory(this.$route.params);
      } else {
        this.currentCategories = [];
        this.getProducts();
        this.getCategories();
      }
    }
  },
  updated() {
    if(this.$route.query.pesquisa) {
      this.searchInformation(this.$route.query.pesquisa);
    }
  },
  methods: {
    async getProducts() {
      let response;
      let request;
      let sort;

      let limit = this.$route.query.por_pag ? this.$route.query.por_pag : 12;
      let page = this.$route.query.pag ? this.$route.query.pag : 1;
      let maxPrice = this.$route.query.preco_max ? this.$route.query.preco_max : 50000000;
      let minPrice = this.$route.query.preco_min ? this.$route.query.preco_min : 0;

      if(this.$route.query.ordenar_por) {
        sort = this.$route.query.ordenar_por;
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&sort=" + sort;
      } else {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice;
      }
  
      if (this.currentCategories.length) {
        request = request + "&category=" + this.currentCategories[this.currentCategories.length - 1].id;
      }

      response = await http.get(request);
      this.products = response.data.products;
      this.productAmount = response.data.total_products;
      this.productsInPage = this.products.length;
      this.rendered = true;
      //console.log(response.data);
      window.scrollTo(0, 0);
    },
   /*  async getSuppliers() {
      let response;
      let request;
      request = "/store/suppliers";
      response = await http.get(request);
      this.allSuppliers = response.data;
      console.log(this.allSuppliers)

    }, */
    getProductsByChild(params) {
      this.nameFilter = params;
      this.getProducts();
    },
    /* getCurrentPage: function(params) {
      this.currentPage = params;
      if (this.nameFilter == "id"){
        this.getProducts();
      } else {
        this.getProductsByChild(this.nameFilter);
      }
    }, */
    async getCategories() {
      var response = await http.get("/store/categories");
      this.categories = response.data;
    },
    getCurrentCategory: function(params) {
      if (this.currentCategories.length) {
        this.currentCategories = [];
      }

      if (params.categoria != undefined) {
        for(let i in params.categoria) {
          let cat = this.categories.filter(category => category.id === parseInt(params.categoria[i]));
          this.currentCategories.push({id: cat[0].id, name: cat[0].name, parent_cat: cat[0].parent_category});
        }
        this.getProducts();
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
      let limit = 12;
      if(this.$route.query.por_pag) {
        limit = this.$route.query.por_pag;
      }
      return Math.ceil(this.productAmount / limit);
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
</style>
