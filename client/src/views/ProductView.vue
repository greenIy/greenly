<template>
  <div class="page-container">
    <TheNavbar />
    <body>
      <div class="content-wrap mw-0">
        <div class="d-flex center w-75">
          <div class="card h-100 mt-4 mb-4">
            <div class="d-flex g-0 mx-3">
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
                          <h6 class="text-muted recomendado" id="txtF">(Recomendado por ser mais sustentável)</h6>
                          <div class="d-flex mt-2 h-100 flex-column card product marginr">
                                <div class="d-flex justify-content-between card-input">
                                  <div><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'cubes']" /> {{ currentSupplier.name }} </p></div>
                                </div>
                              <div class="d-flex flex-column card-input mt-0">
                                <p class="text-p"><b>Gastos:</b> {{ currentSupplier.resource_usage }}  kWh/kg</p>
                                <p class="text-p"><b>Stock:</b> {{ currentSupplier.quantity }} produtos</p>
                                <p class="text-p"><b>Preço:</b> {{ currentSupplier.price }}€</p>
                              </div>
                          </div>
                        </div>
                       <div class="mt-4 mx-auto" id="btnF">
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target=".forn-modal-lg" @click="showModalF()" :modalF="false">Escolher outro Fornecedor</button>
                      </div>
                      <FornecedorModal  v-if="modalF !=false" @sendModalF="getModalF" @save="closeModalF" @sendSupplierSelected="getSupplierSelected" :suppliers="suppliers"/>
                        </div>
                      <div class="col-6 d-flex flex-column mx-4" v-if="fornecedor != false" id="transportador">
                        <div class="d-flex flex-column flex-grow-1">
                          <span> Transportador: </span>
                          <h6 class="text-muted recomendado" id="txtT">(Recomendado por ser mais sustentável)</h6>
                          <div class="d-flex mt-2 h-100 flex-column card product marginr">
                                    <div class="d-flex justify-content-between card-input">
                                      <div><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" />Transportador A</p></div>
                                    </div>
                                    <div class="d-flex flex-column card-input mt-0">
                                    <p class="text-p"><b>Gastos:</b> 32 CO₂/Kg</p>
                                    <p class="text-p"><b>Preço:</b> 32€</p>
                                  </div>
                          </div>
                          </div>
                            <div class="mt-4 mx-auto" id="btnT">
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target=".transp-modal-lg" @click="showModalT()" :modalT="false" >Escolher outro Transportador</button>
                          </div>
                          <TransportadorModal  v-if="modalT !=false" @sendModalT="getModalT"/>
                          
                      </div>
                    </div>
                  <div class="container mt-3">
                    <hr class="center mt-3 w-100 " color="black" />
                    <ul class="nav nav-tabs mt-4" id='navList'>
                        <li class="nav-item">
                          <a class="nav-link text-dark" id="cd" @click="activate(1)" :class="{ active : active_el == 1 }">Cadeia Logística</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link text-dark" @click="activate(2)" :class="{ active : active_el == 2 }">Informação Histórica</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link text-dark" @click="activate(3)" :class="{ active : active_el == 3 }">Mais Detalhes</a>
                        </li>
                      </ul>
                  </div>
                  <div class="container mt-3" id="sumario" v-if="active_el==1">
                    <div class="row mt-4">
                      <div class="col-6 text-left">
                        <b>Fornecedor</b>
                      </div>
                      <div class="col-6 text-left">
                        <b>Transportador</b>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 text-left">{{ currentSupplier.name}}</div>
                      <div class="col-6 text-left">Transportador A</div>
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
                      <div class="col-6 text-left">{{ currentSupplier.resource_usage }} kWh por Produto</div>
                      <div class="col-6 text-left">3 kg de CO₂ por Produto</div>
                    </div>
                  </div>
                  <div class="container mt-3" id="info" v-if="active_el==2" >
                   <p> INFOOOO </p>
                  </div>
                  <div class="container mt-3" id="detalhe" v-if="active_el==3" >
                   <p> DETALHEEE </p>
                  </div>
                </div>
                <div class="card-body mt-1">
                <hr class="center w-100" color="black" />
                </div>
                <div class="card-body">
                  <div class="row align-items-center justify-content-between">
                    <div class="d-inline-block p-0 col-md-5">
                      <div class="d-flex gap-3 mx-2 align-items-center text-center align-content-center">
                          <span class="fs-5">Quantidade:</span>
          
                        <div class="col-md-4">
                          <div class="d-flex justify-content-center align-items-center">
                              <font-awesome-icon class="fs-5 fa-fw" :icon="['fas', 'circle-minus']" @click="clickAction('minus')" id="decrement" />
                            <div class="w-50">
                            <div class="mx-2">
                               <input class="w-100 text-center align-self-center" type="number" name="quantity" :value="quantity" readonly="true" > 
                            </div>
                            </div>
                              <font-awesome-icon class="fs-5 fa-fw" :icon="['fas', 'circle-plus']" @click="clickAction('plus')" id="increment" />
                          </div>
                        </div>
                        <div class="col-md-4">
                        </div>
                      </div>
                    </div>
                    <div class="d-inline-block p-0 col-md-2">
                      <h4 class="my-0 fs-5">Preço €</h4>
                    </div>
                    <div class="d-inline-block text-end col-md-4">
                      <button class="btnS p-2">
                        <font-awesome-icon class="icons"  :icon="['fa', 'cart-plus']" size="lg" />  Adicionar ao Carrinho {{modal}}
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
import { faHeart, faCartPlus, faAngleDown, faCirclePlus, faCircleMinus} from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
library.add(faCartPlus);
library.add(faAngleDown);
library.add(faCirclePlus);
library.add(faCircleMinus);

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
    modalT:Boolean,
    modalF:Boolean,
    prod:Boolean,
    numberSuppliers:Number,
    numberTransporters:Number,
    suppliers: Array,
    idSupplier:Number,
  },
  data() {
    return {
      user: {
        accept: false,
      },
      product: {},
      isActiveT: false,
      isActiveF: false,
      modalF: false,
      modalT: false,
      prod:true,
      quantity:1,
      active_el:1,
      numberSuppliers:0,
      numberTransporters:0,
      suppliers: [],
      idSupplier: 0,
      currentSupplier: {
        name: "",
        resource_usage: 0,
        quantity: 0,
        price: "",
        transporters: []
      }
    };
  },
  created() {
    this.getInfo();
    this.getSuppliers();
    this.getSuppliersandTransporterNumber();
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
      this.loading = false;
      window.scrollTo(0, 0);
    },
    async getSuppliersandTransporterNumber() {
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.numberSuppliers = response.data.supplies.length;
      //this.numberTransporters = response.data.supplies.transports.length;
      //console.log("EHHHHHHHHHHHHHH"+this.numberTransporters);

      if(this.numberSuppliers == 1){
        document.getElementById("btnF").style.visibility = "hidden";
        document.getElementById("txtF").style.visibility = "hidden";
      }
     /*  if(this.numberTransporters <2){
        document.getElementById("btnT").style.visibility = "hidden";
        document.getElementById("txtT").style.visibility = "hidden";
      } */
    },
    showModalF(){
      this.modalF=true;
      this.prod=false;
    },
    showModalT(){
      this.modalT=true;
      this.prod=false;
    },
    getModalF(params){
      if(params == "fecha"){
        this.modalF=false;
        this.prod=true;
      }
    },
    getModalT(params){
      if(params == "fecha"){
        this.modalT=false;
        this.prod=true;
      }
    },
    closeModalF(value){
      if(value == "salva"){
        console.log(value);
        this.modalF=false;
        this.prod=true;
      }
    },
    activate:function(el){
      if(this.active_el == 2 || this.active_el == 3 ){
        document.getElementById("cd").classList.remove("active");
        this.active_el = el;
      }
      else{
        this.active_el = el;
      }   
    },
    clickAction(signal) {
      if(signal=='minus'){
        if(this.quantity>1){
          this.quantity--;
          if(this.quantity==1){
            document.getElementById("decrement").style.color="#ededed";
          }
          if (this.quantity < this.suppliers[0].quantity ){
            document.getElementById("increment").style.color="#7c9d8e";
          }
        }
      }
      else{
        if(this.quantity < this.suppliers[0].quantity){
          this.quantity++;
          if(this.quantity==2){
            document.getElementById("decrement").style.color="#7c9d8e";
          }
          if (this.quantity== this.suppliers[0].quantity){
            document.getElementById("increment").style.color="#ededed";
          }
        }
      }
    },
    async getSuppliers() {
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.suppliers = response.data.supplies;
      this.showMostSustenaibleSuppliers();
      this.showCurrentSupplier();
      //console.log(this.suppliers)
    },
    async getTransporters() {
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.transporters = response.data.supplies;
      //console.log(response.data.supplies[0].transports[0].transporter)
    },
    getSupplierSelected(event){
      var supplierSelected = event;
      this.idSupplier = this.suppliers.findIndex((supplier) => supplier.supplier.id == supplierSelected);
      this.showCurrentSupplier();
      //console.log(this.suppliers.findIndex((supplier) => supplier.supplier.id == supplierSelected ));
    }, 
    showMostSustenaibleSuppliers() {
      this.suppliers.sort(function (x, y) {
        return x.warehouse.resource_usage - y.warehouse.resource_usage;
      });
    },
    showCurrentSupplier() {
      this.currentSupplier.name = this.suppliers[this.idSupplier].supplier.name;
      this.currentSupplier.resource_usage = this.suppliers[this.idSupplier].warehouse.resource_usage;
      this.currentSupplier.quantity = this.suppliers[this.idSupplier].quantity;
      this.currentSupplier.price = this.suppliers[this.idSupplier].price;
      this.currentSupplier.transporters = this.suppliers[this.idSupplier].transports;
     console.log(this.currentSupplier);
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
.card {
  box-shadow: 1px 8px 10px #d9d9d9;
}
.text-p {
  margin-bottom: 5px;
}
#increment{
  color:#7c9d8e;
}
#decrement{
  color:#ededed;
}
input[type='number']::-webkit-inner-spin-button, 
input[type='number']::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
}
</style>
