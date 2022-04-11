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
              <div class="col-md-9 px-1">
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
                  <p class="card-text about">
                    Lorem ipsum per netus ultricies bibendum tellus potenti platea curabitur porta scelerisque felis, 
                    inceptos metus tortor condimentum etiam purus nisi interdum eros pretium. vulputate a arcu praesent vitae diam 
                    ultricies feugiat aptent, tincidunt aliquam et sit aenean litora tempus a urna, praesent tempor accumsan lacus primis
                    lacinia himenaeos. eget blandit eget fringilla pulvinar convallis fusce imperdiet platea feugiat risus molestie tristique 
                    laoreet, orci taciti sociosqu tristique enim ut sagittis diam ad venenatis aliquam in, non quisque facilisis senectus egestas 
                    hendrerit sem bibendum vivamus eget orci congue. dolor arcu vulputate purus gravida nunc libero posuere justo ut lacus,
                    cubilia proin condimentum vivamus himenaeos aliquam nullam libero. 
                    <!-- {{ product.description }} -->
                  </p>
                  <div class="container">
                    <div class="row mt-4">
                      <div class="col-3 text-center">
                        <b>Cadeia Logística</b>
                      </div>
                      <div class="col-5 text-center">
                        <b>Gastos Médios em Armazenamento</b>
                      </div>
                      <div class="col-4 text-center">
                        <b>Gastos Médios em Transporte</b>
                      </div>
                    </div>
                    <div class="row ">
                      <div class="col-3 text-center">
                        Quantidade
                      </div>
                      <div class="col-5 text-center">
                        Quantidade
                      </div>
                      <div class="col-4 text-center">
                        Quantidade
                      </div>
                    </div>
                  </div>
                  
                  <div class="container">
                    <div class="row align-items-center mt-5">
                      <div class="col ">
                        <span> Quantidade: </span>
                      </div>
                      <div class="col">
                        <div class="dropdown justify-content-end">
                          <a class="dropdown-toggle btn btn-secondary rounded text-decoration-none max" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">1</a>
                          <ul class="dropdown-menu max" aria-labelledby="order-by">
                              <li><a class="dropdown-item " href="#">1</a></li>
                              <li><a class="dropdown-item" href="#">2</a></li>
                              <li><a class="dropdown-item" href="#">3</a></li>
                          </ul>
                      </div>
                      </div>
                    </div>
                    <div class="row align-items-center mt-2">
                      <div class="col ">
                        <span> Fornecedores: </span>
                      </div>
                      <div class="col ">
                        <div class="dropdown justify-content-end">
                          <a class="dropdown-toggle btn btn-secondary rounded text-decoration-none max" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">1</a>
                          <ul class="dropdown-menu max" aria-labelledby="order-by">
                              <li><a class="dropdown-item " href="#">1</a></li>
                              <li><a class="dropdown-item" href="#">2</a></li>
                              <li><a class="dropdown-item" href="#">3</a></li>
                          </ul>
                      </div>
                      </div>
                    </div>
                    <div class="row align-items-center  mt-2">
                      <div class="col ">
                        <span> Transportadores: </span>
                      </div>
                      <div class="col">
                        <div class="dropdown justify-content-end">
                          <a class="dropdown-toggle btn btn-secondary rounded text-decoration-none max" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">1</a>
                          <ul class="dropdown-menu max" aria-labelledby="order-by">
                              <li><a class="dropdown-item " href="#">1</a></li>
                              <li><a class="dropdown-item" href="#">2</a></li>
                              <li><a class="dropdown-item" href="#">3</a></li>
                          </ul>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style="width:97%" class="center mt-3" color="black"> 
                <div class="card-body py-0 my-3">
                    <div class="row align-items-center justify-content-center">
                      <div class="d-inline-block my-auto col-md-7">
                        <h4 class="my-0">
                            Preço
                            <!-- {{ product.lowest_price }}€ - {{ product.highest_price }}€ -->
                          </h4>
                      </div>
                      <div class="d-inline-block text-end col-md-4">
                        <button class="btnS">
                          <font-awesome-icon class="icons " :icon="['fa', 'cart-plus']" size="lg"/> Adicionar ao Carrinho </button>
                      </div >
                      <button class="d-inline-block text-start col-md-1 btnH fav">
                        <font-awesome-icon @click="liked($event)" class="icons fa-cog" :icon="['fa', 'heart']" size="lg" />
                      </button>
                  </div > 
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
    showDropDownTransportador(){
    var element = document.getElementById("transportador")
    element.classList.add("show");
    },
  },
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
.about {
  margin: 0;
  text-align:justify;
}
.max{
  width:100%
}

</style>
