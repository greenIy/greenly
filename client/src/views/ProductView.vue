<template>
  <div class="page-container">
    <TheNavbar />
    <body>
      <div class="content-wrap mw-0">
        <div class="d-flex w-100 justify-content-center">
          <div class="card h-100 mt-3 mb-3">
            <div class="row g-0">
              <div class="col-md-3">
                <img
                  src="../assets/Team/daniela.jpg"
                  class="rounded w-75 mt-4 mb-4 ms-4"
                  alt="imagem do produto"
                />
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">
                    Categoria
                    <!-- {{ product.category.name }} -->
                  </h5>
                  <div>
                    <h4 class="card-title">
                      Nome do Produto
                      <!--  {{ product.name }} -->
                    </h4>
                  </div>
                  <p class="card-text text-truncate">
                    Descrição
                    <!-- {{ product.description }} -->
                  </p>
                </div>
                <div class="card-body py-0 position-relative mt-4 mb-1">
                  <span class="position-absolute bottom-0"
                    ><h4 class="card-text sticky-bottom">
                      Preço
                      <!-- {{ product.lowest_price }}€ - {{ product.highest_price }}€ -->
                    </h4></span
                  >
                </div>
                <div class="div card-body py-0 position-relative mt-1 mb-3">
                  <button class="btnH fav">
                    <font-awesome-icon
                      @click="liked($event)"
                      class="icons fa-cog"
                      :icon="['fa', 'heart']"
                      size="xs"
                    />
                    Favoritos
                  </button>
                  <!--    <form>
                    <div class="form-group form-check">
                      <label class="form-check-label ms-2 product" for="accept">
                       <input type="checkbox" v-model="user.accept" id="accept" class="form-check-input checkbox"
                     />Comparar Fornecedores</label
              >
            </div>
          </form> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <TheFooter />
  </div>
</template>
<script>
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart,faCartPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
library.add(faCartPlus);

export default {
  name: "ProductView",
  components: {
    TheNavbar,
    TheFooter,
  },
  /*   props: {
    product: Object,
  },
  data() {
    return {
      products: [],
    };
  },
   methods: {
    getProducts() {
      http.get("/store/products").then((response) => {
        this.products = response.data;
        //console.log(response.data);
      });
    },
   }, */
    methods: {
    liked(event){
      const svg = event.path[1]
      if (svg.classList.contains('red')) {
        svg.classList.remove("red");
      } else {
        svg.classList.add("red");
      } 
    },
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
}
/* .btnS {
  border: none;
  color: white;
  background-color: #7c9d8e;
  padding: 10px;
  border-radius: 10px;
}

.btnS:hover {
  background-color: #89a799;
} */
.btnH {
  background: none;
  border: none;
  display: inline;
}
.red {
  color: red !important;
}
</style>
