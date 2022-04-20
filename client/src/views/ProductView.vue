<template>
  <div class="page-container">
    <TheNavbar />
    <body>
      <div v-if="prod !=false" class="content-wrap mw-0">
        <div class="d-flex center w-75">
          <div class="card h-100 mt-4 mb-4">
            <div class="row g-0">
              <div class="col-md-3">
                <img  src="../assets/Team/daniela.jpg" class="rounded mt-4 mb-4 ms-4" alt="Imagem do produto" style="width:90%" />
              </div>
              <div class="col-md-9 px-1">
                <div class="card-body mt-2">
                  <h5 v-if="!loading" class="card-title">
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
                  <div class="d-flex mt-4">  
                       <div class="col-6 d-flex flex-column"> 
                         <div class="d-flex flex-column flex-grow-1">
                          <span> Fornecedor: </span>
                          <h6 class="text-muted recomendado">(Recomendado por ser mais sustentável)</h6>
                                  <div class="d-flex mt-2 h-100 flex-column card product marginr">
                                                  <div class="d-flex card-input">
                                                      <div class="col-10">
                                                          <div class="card-title"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'cubes']" /> Fornecedor A</p></div>
                                                      </div>
                                                      <div class="col-2">
                                                      </div>
                                                  </div>
                                                  <div class="d-flex flex-column card-input">
                                                      <p class="text-p"><b>Gastos:</b> 32 kWh/kg</p>
                                                      <p class="text-p"><b>Stock:</b> 30 produtos</p>
                                                      <p class="text-p"><b>Preço:</b> 32€</p>
                                                  </div>
                                      </div>
                            </div>
                       <div class="mt-4 mx-auto">
                            <button type="button" class="btn btn-secondary" @click="showModal()" :modal="false">Escolher outro Fornecedor</button>
                          </div>
                    </div>
                      <div class="col-6 d-flex flex-column" v-if="fornecedor != false" id="transportador">
                      <div class="d-flex flex-column flex-grow-1">
                          <span> Transportador: </span>
                          <h6 class="text-muted recomendado">(Recomendado por ser mais sustentável)</h6>
                          <div class="d-flex mt-2 h-100 flex-column card product marginr">
                                <div class="d-flex card-input">
                                  <div class="col-10">
                                    <div class="card-title"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" />Transportador A</p></div>
                                  </div>
                                  <div class="col-2">     
                                  </div>
                                  </div>
                                    <div class="d-flex flex-column card-input">
                                    <p class="text-p"><b>Gastos:</b> 32 CO₂/Kg</p>
                                    <p class="text-p"><b>Preço:</b> 32€</p>
                                  </div>
                          </div>
                          </div>
                            <div class="mt-4 mx-auto">
                            <button type="button" class="btn btn-secondary" @click="showModal()" :modal="false">Escolher outro Transportador</button>
                          </div>
                      </div>
                    </div>
                    <hr style="width: 100%" class="center mt-5" color="black" />
                  <div class="container mt-3">
                    <h4 class="mt-2 mb-4" ><b>Sumário da Cadeia Logística:</b></h4>
                    <div class="row mt-4">
                      <div class="col-6 text-left">
                        <b>Fornecedor</b>
                      </div>
                      <div class="col-6 text-left">
                        <b>Transportador</b>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 text-left">Fornecedor X</div>
                      <div class="col-6 text-left">Transportador Y</div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-6 text-left">
                        <b>Gastos Médios em Armazenamento</b>
                      </div>
                      <div class="col-6 text-left">
                        <b>Gastos Médios em Transporte</b>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 text-left">3 kWh por Produto</div>
                      <div class="col-6 text-left">3 kg de CO₂ por Produto</div>
                    </div>
                  </div>
                </div>
                <hr style="width:96%" class="center mt-3" color="black" />
                <div class="card-body my-1">
                  <div class="row align-items-center justify-content-center">
                    <div class="d-inline-block p-0 col-md-5">
                      <div class="row">
                        <div class="col-4">
                          <span>Quantidade: </span>
                        </div>
                        <div class="col-4">
                          <div class="row">
                            <div class="col-3">
                              <button type="button" class="decrement rounded" aria-label="remove um" data-direction="-1" disabled="disabled"><span>&#8722;</span></button>
                            </div>
                            <div class="col-5">
                               <input class="w-100 text-center" data-min="1" data-max="0" type="text" name="quantity" value="1" readonly="true">
                            </div>
                            <div class="col-3">
                               <button type="button" class="increment rounded" aria-label="adiciona um" data-direction="1"><span>&#43;</span></button>
                            </div>
                            <div class="col-1">
                            </div>
                          </div>
                        </div>
                        <div class="col-4">
                        </div>
                      </div>
                    </div>
                    <div class="d-inline-block p-0 col-md-2">
                      <h4 class="my-0 fs-5">Preço €</h4>
                    </div>
                    <div class="d-inline-block text-end col-md-4">
                      <button class="btnS p-2">
                        <font-awesome-icon class="icons"  :icon="['fa', 'cart-plus']" size="lg" />  Adicionar ao Carrinho
                      </button>
                    </div>
                    <button class="d-inline-block text-start col-md-1 btnH p-8 fav">
                      <font-awesome-icon @click="liked($event)" class="icons fa-cog"  :icon="['fa', 'heart']"  size="lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FornecedorModal  v-if="modal !=false"/>
      <TransportadorModal  v-if="modal !=false"/>
    </body>
    <TheFooter />
  </div>
</template>
<script>
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";
import FornecedorModal from "@/components/Product/FornecedorModal.vue";
import TransportadorModal from "@/components/Product/TransportadorModal.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faCartPlus, faAngleDown} from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
library.add(faCartPlus);
library.add(faAngleDown);


import http from "../../http-common";

export default {
  name: "ProductView",
  components: {
    TheNavbar,
    TheFooter,
    FornecedorModal,
    TransportadorModal,
  },
  props: {
    modal:Boolean,
    prod:Boolean,
  },
  data() {
    return {
      user: {
        accept: false,
      },
      product: {},
      isActiveT: false,
      isActiveF: false,
      modal: false,   
      prod:true, 
    };
  },
  async created() {
    await this.getInfo();
  },
  methods: {
    liked(event) {
      const svg = event.path[1];
      if (svg.classList.contains("red")) {
        svg.classList.remove("red");
      } else {
        svg.classList.add("red");
      }
    },
    async getInfo() {
      this.loading = true;
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.product = response.data;
      //console.log(this.product);
      this.loading = false;
      window.scrollTo(0, 0);
    },
    showModal(){
    this.modal=true;
    this.prod=false;
    console.log(this.modal);
    console.log(this.prod);
    }
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
.recomendado{
  font-size: 14px;
  margin-bottom: 0;
}
.fa-cog {
  color: #b9bbb4;
}
.div {
  padding: 1rem 1rem;
}
.center {
  margin: 0 auto;
}
.about {
  margin: 0;
  text-align: justify;
}
.max {
  width: 100%;
}
.btn {
  border: none;
  color: white;
  background-color: #808080;
  border-radius: 10px;
  box-shadow: none;
}
.fav {
  background: #e6e6e6;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}
label {
    width: 100%;
}
.card-input-element {
    margin-left: 10px;
}
.card-input {
    margin: 10px;
    padding: 00px;
}
.product{
  border: 1px solid #e5e5e5!important;
}
.marginr{
  margin-right: 20px;
}
.card-input:hover {
    cursor: pointer;
}
.card:hover {
  box-shadow: 1px 8px 10px #d9d9d9;
}
.text-p {
  margin-bottom: 5px;
}
</style>
