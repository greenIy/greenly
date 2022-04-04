<template>
  <div class="page-container">
    <TheNavbar />
    <body>
      <div class="content-wrap mw-0">
        <div class="d-flex center w-75">
          <div class="card h-100 mt-4 mb-3">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="../assets/Team/daniela.jpg" class="rounded w-75 mt-4 mb-4 ms-4" alt="Imagem do produto"  />
              </div>
              <div class="col-md-9">
                <div class="card-body mt-2">
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
                  <p class="card-text text-justify">
                    Descrição : Lorem ipsum per netus ultricies bibendum tellus potenti platea curabitur porta scelerisque felis, 
                    inceptos metus tortor condimentum etiam purus nisi interdum eros pretium. vulputate a arcu praesent vitae diam 
                    ultricies feugiat aptent, tincidunt aliquam et sit aenean litora tempus a urna, praesent tempor accumsan lacus primis
                    lacinia himenaeos. eget blandit eget fringilla pulvinar convallis fusce imperdiet platea feugiat risus molestie tristique 
                    laoreet, orci taciti sociosqu tristique enim ut sagittis diam ad venenatis aliquam in, non quisque facilisis senectus egestas 
                    hendrerit sem bibendum vivamus eget orci congue. dolor arcu vulputate purus gravida nunc libero posuere justo ut lacus,
                    cubilia proin condimentum vivamus himenaeos aliquam nullam libero. 
                    <!-- {{ product.description }} -->
                  </p>
                </div>
                <hr style="width:96%" class="center mt-3" color=black> 
                <div class="card-body py-0  mt-5 mb-1">
                    <div class="row">
                   <h4 class="d-inline-block col-md-6">
                      Preço
                      <!-- {{ product.lowest_price }}€ - {{ product.highest_price }}€ -->
                    </h4>
                  <div class="d-inline-block col-md-4">
                    <button class="btnS">
                      <font-awesome-icon class="icons " :icon="['fa', 'cart-plus']" size="lg"/> Adicionar ao Carrinho </button>
                  </div >
                   <button class="d-inline-block col-md-2 btnH fav">
                    <font-awesome-icon @click="liked($event)" class="icons fa-cog" :icon="['fa', 'heart']" size="lg" />
                  </button>
                 
                  </div > 
                 <!--      <form>
                    <div class="form-group form-check">
                      <label class="form-check-label ms-2 product" for="accept">
                       <input type="checkbox" v-model="user.accept" id="accept" class="form-check-input checkbox"
                     />Comparar Fornecedores</label
              >
            </div>
          </form>  -->
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
  data() {
    return {
      user: {
        accept: false,
      },
    };
  },
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
 .btnS {
  border: none;
  color: white;
  background-color: #7c9d8e;
  padding: 8px;
  border-radius: 10px;
}
.btnS:hover {
  background-color: #89a799;
} 
.btnH {
  background: none;
  border: none;
  display: inline;
  padding:0!important;
}
.red {
  color: red !important;
}
h4 {
  font-size: 15px;
}
h5 {
  font-size: 11px;
}
.fa-cog {
  color: #b9bbb4;
}
.div{
  padding: 1rem 1rem;
}
.center{
  margin:0 auto;
}

</style>
