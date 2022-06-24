<template>
<body>
  <div class="page-container">
     <TheNavbar @search-information="searchInformation"/>
    <div class="content-wrap mw-0">
      <div class="container">
        <TheUtilityBar :productAmount="productAmount" :productsInPage="productsInPage"
              :product="products"/>
        <div class="row content justify-content-center" v-if="rendered">
          <div class="col-sm-2 col-md-2 mb-2 filtros ">
            <div class="content d-flex">
              <TheFilters :categories="categories" :currentCategories="currentCategories"/>
            </div>
          </div>
          <div class="col-sm-10 col-md-9">
          <Transition name="fade">
            <div v-if="products.length" class="content d-flex w-100 ">
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
      <div v-if="this.compare.length">
        <CompareProduct :productsToCompare="compare" @removeOneProduct="removeProductFromCompareList"/>
      </div>
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
import CompareProduct from "@/components/Product/CompareProduct.vue";

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
    TheNoProduct,
    CompareProduct,
  },
  props: {
    product: Object,
    allSuppliers:Array,
  },
  data() {
    return {
      products: [],
      categories: [],
      productAmount: 0,
      currentCategories: [],
      productsInPage: 0,
      allSuppliers: [],
      rendered: false,
      quantityP:0,
      compare: [],
    };
  },
  beforeMount() {
    this.getProducts();
  },
  mounted() {
    this.getProducts();
    this.getCategories();
    if (this.$route.query.compare1 || this.$route.query.compare2) {
      this.getProductToCompare();
    }
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
    },
    '$route.query'() {
      this.getProductToCompare();
    },
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

      if (this.$route.query.pesquisa){
        request = request +  "&keywords=" + this.$route.query.pesquisa;
      }

      response = await http.get(request);
      this.products = response.data.products;
      this.productAmount = response.data.total_products;
      this.productsInPage = this.products.length;
      this.rendered = true;

      window.scrollTo(0, 0);
    },
  
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
    async getProductToCompare() {
        let productID1 = this.$route.query.compare1;
        let productID2 = this.$route.query.compare2;
        let response;

        if (productID1 && !this.compare.length && Object.keys(this.$route.query).length) {
          response = await http.get(`store/products/${productID1}`);
          this.compare.push(JSON.parse(JSON.stringify(response.data)));
        }

        if (productID2 && Object.keys(this.$route.query).length) {
          response = await http.get(`store/products/${productID2}`);
          this.compare.push(JSON.parse(JSON.stringify(response.data)));
        }
    },
    removeProductFromCompareList(value) {
      this.compare = [];
      let query = Object.assign({}, this.$route.query);
      
      if (value == 0) {
        let compare2 = this.$route.query.compare2;
      
        document.getElementById("input_" + this.$route.query.compare1).checked = false;
        delete query.compare1;
        this.$router.replace({ query });

        if (this.$route.query.compare2) {
          delete query.compare2;
          this.$router.replace({ query });

          this.$router.push({ query: Object.assign({}, query, { compare1: `${ compare2 }` }) });
        }
      } else if (value == 1){
        document.getElementById("input_" + this.$route.query.compare2).checked = false;
        delete query.compare2;
        this.$router.replace({ query });
      } else {
        document.getElementById("input_" + this.$route.query.compare1).checked = false;
        document.getElementById("input_" + this.$route.query.compare2).checked = false;

        delete query.compare1;
        delete query.compare2;
        
        this.$router.replace({ query });
      }
    }
  },
  computed: {
    getPageAmount: function () {
      let limit = this.$route.query.por_pag ? this.$route.query.por_pag : 12;
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
