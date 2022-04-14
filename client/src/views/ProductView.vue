<template>
  <div class="page-container">
    <TheNavbar />
    <body>
      <div class="content-wrap mw-0">
        <div class="d-flex center w-75" > 
          <div class="card h-100 mt-4 mb-4">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="../assets/Team/daniela.jpg" class="rounded mt-4 mb-4 ms-4" alt="Imagem do produto" style="width:90%" />
              </div>
              <div class="col-md-9 px-1">
                <div class="card-body mt-2">
                  <h5 class="card-title">
                    {{ product.category.name }}
                  </h5>
                  <div>
                    <h4 class="card-title">
                      {{ product.name }}
                    </h4>
                  </div>
                  <p class="card-text about">
                    {{ product.description }}
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
                        3 Fornecedores
                      </div>
                      <div class="col-5 text-center">
                        3 kWh por Produto
                      </div>
                      <div class="col-4 text-center">
                        3 kg de CO₂ por Produto
                      </div>
                    </div>
                  </div>
                  
                  <div class="container">
                    <div class="row align-items-center mt-5">
                      <div class="col ">
                        <span> Quantidade: </span>
                      </div>
                      <div class="col">
                        <div class="input-group">
                          <input type="number" class="form-control max" min="1" max="5">
                        </div>
                      </div>
                    </div>
                    <div class="row align-items-center mt-2">
                      <div class="col ">
                        <span> Fornecedores: </span>
                      </div>
                      <div class="col ">
                        <select class="form-select max" aria-label="Default select example">
                          <option value selected="1">X</option>
                          <option value="2">Y</option>
                          <option value="3">Z</option>
                        </select>
                      </div>
                    </div>
                    <div class="row align-items-center  mt-2">
                      <div class="col ">
                        <span> Transportadores: </span>
                      </div>
                      <div class="col">
                        <select class="form-select max" >
                          <option value selected="1">X</option>
                          <option value="2">Y</option>
                          <option value="3">Z</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style="width:97%" class="center mt-3" color="black"> 
                <div class="card-body my-1">
                    <div class="row align-items-center justify-content-center">
                      <div class="d-inline-block p-0 col-md-7">
                        <h4 class="my-0 fs-5 ">
                              Preço €
                        </h4>
                      </div>
                      <div class="d-inline-block text-end col-md-4">
                        <button class="btnS p-2">
                          <font-awesome-icon class="icons " :icon="['fa', 'cart-plus']" size="lg"/> Adicionar ao Carrinho </button>
                      </div >
                      <button class="d-inline-block text-start col-md-1 btnH p-8 fav">
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

import http from "../../http-common";

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
      product: {},
    };
  },
  created() {
    this.getInfo();
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
    getInfo() {
      http.get("/store/products/" + this.$route.params.id).then((response) => {
        this.product = response.data;
        //console.log(response.data);
      });
      window.scrollTo(0, 0);
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
  border-radius: 10px;
}
.btnS:hover {
  background-color: #89a799;
} 
.btnH {
  border: none;
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
.btn{
  border: none;
  color: white;
  background-color: #808080;
  border-radius: 10px;
  box-shadow: none;
}
.fav{
  background:#e6e6e6;
  border-radius: 50%;
  width: 45px;
  height: 45px; 
}
</style>
