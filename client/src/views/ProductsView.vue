<template>
<body>
  <div class="page-container">
     <TheNavbar @search-information="searchInformation"/>
    <div class="content-wrap mw-0">
      <div class="container">
        <TheUtilityBar :productAmount="productAmount" :productsInPage="productsInPage"
              :product="products"/>
        <div class="row content justify-content-center" v-if="rendered">
          <div class="col-sm-2 col-md-2 filtros">
            <div class="content d-flex">
              <TheFilters :categories="categories" :currentCategories="currentCategories" :suppliers="suppliers"/>
            </div>
          </div>
          <div class="col-sm-10 col-md-9">
          <Transition name="fade">
            <div v-if="products.length" class="content d-flex w-100" data-cy="product-container">
              <ProductCard
              v-for="p in products"
              :key="p.id"
              :product="p" :productsToCompare="compare" @removeOneProduct="removeProductFromCompareList" @categoriesDiff="categoriesDiff"
              ></ProductCard>
            </div>
            <div v-else class="content d-flex w-100">
              <TheNoProduct></TheNoProduct>
            </div>
          </Transition>
          </div>
        </div>
      </div>
      <TheNextPage v-if="products.length" :pageAmount="getPageAmount"/>
    </div>
  </div>
  <div v-if="this.compare.length">
    <CompareProduct :productsToCompare="compare" @removeOneProduct="removeProductFromCompareList"/>
  </div>
  <TheFooter />
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
import {useToast} from 'vue-toastification';

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
  },
  data() {
    const toast = useToast();
    return {
      products: [],
      categories: [],
      productAmount: 0,
      currentCategories: [],
      productsInPage: 0,
      suppliers: [],
      rendered: false,
      quantityP:0,
      compare: [],
      categoryLoaded: false,
      toast,
    };
  },
  async beforeMount() {
    await this.getProducts();
    await this.getCategories();
    await this.getSuppliers();
  },
  async mounted() {
    if (this.$route.query.compare1 || this.$route.query.compare2) {
      this.getProductToCompare();
    }
    if (this.$route.params.categoria) {
      await this.getCategories();
      if (this.categoryLoaded) {
        this.getCurrentCategory(this.$route.params);
      }
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
  created() {
    this.changeTitle();
  },
  methods: {
    changeTitle(){
        window.document.title = "Greenly | Catálogo de Produtos";
    },
    async getProducts() {
      let response;
      let request;
      let sort;

      let limit = this.$route.query.por_pag ? this.$route.query.por_pag : 12;
      let page = this.$route.query.pag ? this.$route.query.pag : 1;
      let maxPrice = this.$route.query.preco_max ? this.$route.query.preco_max : 50000000;
      let minPrice = this.$route.query.preco_min ? this.$route.query.preco_min : 0;

      if (this.$route.query.ordenar_por) {
        sort = this.$route.query.ordenar_por;
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice + "&sort=" + sort;
      } else {
        request = "/store/products?page=" + page + "&limit=" + limit + "&min_price=" + minPrice + "&max_price=" + maxPrice;
      }

      if (this.$route.params.categoria) {
        request = request + "&category=" + this.$route.params.categoria[Object.keys(this.$route.params.categoria).length - 1];
      }

      if (this.$route.query.pesquisa){
        request = request +  "&keywords=" + this.$route.query.pesquisa;
      }

      if(this.$route.query.fornecedor) {
        request = request +  "&supplier=" + this.$route.query.fornecedor;
      }

      response = await http.get(request);
      this.products = response.data.products;
      this.productAmount = response.data.total_products;
      this.productsInPage = this.products.length;
      this.rendered = true;
      window.scrollTo(0, 0);
    },
    async getSuppliers() {
      let response = await http.get("/store/suppliers");
      this.suppliers = JSON.parse(JSON.stringify(response.data));
    },
    async getCategories() {
      let response = await http.get("/store/categories");
      this.categories = response.data;
      this.categoryLoaded = true;
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
      
      if (value == 0 || document.querySelectorAll('input[type="checkbox"]:checked').length == 1) {
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

      let compareMoreThan2 = document.querySelectorAll('input[type="checkbox"]:checked').length == 2;
      if(compareMoreThan2){
        document.getElementsByClassName('checkbox').forEach(e => { 
          if(!e.checked){
            e.disabled = true;
          }
        });
      }
      else{
        document.getElementsByClassName('checkbox').forEach(e => { 
          e.disabled = false;
        });
      }
    },
    categoriesDiff(value){
      this.toast.warning("Oops! Os produtos selecionados não são da mesma categoria. Tente novamente!", {
        position:"top-right", duration:10000})
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
  flex-wrap: wrap
}

.filtros{
  background-color: white;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  height: fit-content;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

#successToast {
        background-color: #E3C12B !important;
}

.toast-container{
  z-index:4;
}

.content-wrap{
    padding-bottom: 2rem !important;
}

.form-check-input:checked {
    background-color: #5e9f88!important;
    border-color: #5e9f88!important;
}
</style>
