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
                                <p class="text-p"><b>Recursos Gastos:</b> {{ currentSupplier.resource_usage.toFixed(1) }}  kWh/kg</p>
                                <p class="text-p"><b>Stock:</b> {{ currentSupplier.quantity }} produtos</p>
                                <p class="text-p"><b>Preço:</b> {{ currentSupplier.price }}€</p>
                              </div>
                          </div>
                        </div>
                       <div class="mt-4 mx-auto" id="btnF">
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target=".forn-modal-lg" @click="showModalF()" :modalF="false">Escolher outro Fornecedor</button>
                      </div>
                      <FornecedorModal  v-if="modalF !=false" @sendModalF="getModalF" @saveF="closeModalF" @sendSupplierSelected="getSupplierSelected" :suppliers="suppliers" :idSupplier="idSupplier" />
                        </div>
                      <div class="col-6 d-flex flex-column mx-4" v-if="fornecedor != false" id="transportador">
                        <div class="d-flex flex-column flex-grow-1">
                          <span> Transportador: </span>
                          <h6 class="text-muted recomendado" id="txtT">(Recomendado por ser mais sustentável)</h6>
                          <div class="d-flex mt-2 h-100 flex-column card product marginr">
                                    <div class="d-flex justify-content-between card-input">
                                      <div><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" /> {{ currentTransporter.name }}</p></div>
                                    </div>
                                    <div class="d-flex flex-column card-input mt-0">
                                    <p class="text-p"><b>Emissões Médias:</b> {{ currentTransporter.average_emissions.toFixed(1) }} CO₂ g/km/t</p>
                                    <p class="text-p"><b>Recursos Gastos:</b> {{ currentTransporter.average_resource_usage.toFixed(1) }} l/100km</p>
                                    <p class="text-p"><b>Preço:</b> {{ currentTransporter.price }}€</p>
                                  </div>
                          </div>
                          </div>
                            <div class="mt-4 mx-auto" id="btnT">
                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target=".transp-modal-lg" @click="showModalT()" :modalT="false" >Escolher outro Transportador</button>
                          </div>
                          <TransportadorModal  v-if="modalT !=false" @sendModalT="getModalT" @saveT="closeModalT" :transporters="currentSupplier.transporters" :idTransporter="idTransporter" :idSupplier="idSupplier" @sendTransporterSelected="getTransporterSelected"/> 
                      </div>
                    </div>
                </div>
             </div>
            </div>
            <div class="d-flex">
              <div class="w-100 mx-4">
                <div class="card-body mt-1">
                  <hr class="center w-100" color="black" />
                </div>
                <div class="card-body">
                <ul class="nav nav-tabs" id='navList'>
                  <li class="nav-item">
                    <a class="nav-link text-dark" id="md" @click="activate(1)" :class="{ active : active_el == 1 }">
                      <font-awesome-icon class="icons mx-1"  :icon="['fas', 'list']" /> 
                      Mais Detalhes 
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-dark"  @click="activate(2)" :class="{ active : active_el == 2 }">
                      <font-awesome-icon class="icons mx-1"  :icon="['fas', 'clock-rotate-left']" />
                      Informação Histórica
                    </a>
                  </li>   
                </ul>
              </div>
              <div class="mx-3 mt-3 " id="detalhe" v-if="active_el==1" style="text-items:left" >
                <h6 class="my-3">Caterísticas</h6>
                <table class="table table-striped table-responsive">
                  <tbody>
                    <tr v-for="a in attributes" :key="a.id">
                      <th scope="col">{{a.title}}</th>
                      <td scope="row">{{a.content}}</td>
                    </tr>
               
                  </tbody>
                </table>
              </div>
              <div class="container mt-3" id="info" v-if="active_el==2" >
                <Chart :idSupplier="idSupplier" :suppliers="suppliers" ref="Chart" />
              </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="w-100 mx-4">
                <div class="card-body mt-1">
                  <hr class="center w-100" color="black" />
                </div>
                <div class="card-body">
                  <div class="row align-items-center justify-content-between">
                    <div class="d-inline-block p-0 col-md-4">
                      <div class="d-flex gap-3 mx-2 align-items-center text-center align-content-center">
                        <span class="fs-5">Quantidade:</span>
                          <div class="col-md-4">
                            <div class="d-flex justify-content-center align-items-center">
                              <font-awesome-icon class="fs-5 fa-fw" :icon="['fas', 'circle-minus']" @click="clickAction('minus')" id="decrement" />
                                <div class="w-50">
                                  <div class="mx-2">
                                    <input class="w-100 text-center align-self-center" name="quantity" :value="quantity" readonly="true"> 
                                  </div>
                                </div>
                                <font-awesome-icon class="fs-5 fa-fw" :icon="['fas', 'circle-plus']" @click="clickAction('plus')" id="increment" />
                            </div>
                          </div>
                          <div class="col-md-5"></div>
                      </div>
                    </div>
                    <div class="d-inline-block p-0 col-md-5" style="text-align:end;">
                      <h4 class="my-0 fs-2" >{{ this.totalPrice }} €</h4>
                    </div>
                    <div class="d-inline-block text-end col-md-2">
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
import Chart from "@/components/Product/Chart.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faCartPlus, faAngleDown, faCirclePlus, faCircleMinus, faList, faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
library.add(faCartPlus);
library.add(faAngleDown);
library.add(faCirclePlus);
library.add(faCircleMinus);
library.add(faList);
library.add(faClockRotateLeft);

import http from "../../http-common";

export default {
  name: "ProductView",
  components: {
    TheNavbar,
    TheFooter,
    FornecedorModal,
    TransportadorModal,
    Chart,
  },
  props: {
    modalT:Boolean,
    modalF:Boolean,
    prod:Boolean,
    numberSuppliers:Number,
    numberTransporters:Number,
    suppliers: Array,
    idSupplier:Number,
    idTransporter:Number,
    transporters: Array,
    totalPrice:Number,
    attributes:Array,
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
      idTransporter: 0,
      totalPrice:0,
      attributes:[],
      currentSupplier: {
        name: "",
        resource_usage: 0,
        quantity: 0,
        price: "",
        transporters: []
      },
      currentTransporter: {
        name: "",
        average_resource_usage: 0,
        average_emissions: 0,
        price: "",
      }
    };
  },
  created() {
    this.getInfo();
    this.getSuppliers();
    
    
  },
  /* mounted: function() {
    console.log(this.$refs.Chart);
}, */
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
      this.attributes = this.product.attributes;
      this.loading = false;
      window.scrollTo(0, 0);
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
        this.modalF=false;
        this.prod=true;
      }
    },
    closeModalT(value){
      if(value == "salva"){
        this.modalT=false;
        this.prod=true;
      }
    },
    activate:function(el){
      if(this.active_el == 2 ){
        document.getElementById("md").classList.remove("active");
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
          if (this.quantity < this.suppliers[this.idSupplier].quantity ){
            document.getElementById("increment").style.color="#7c9d8e";
          }
        }
      }
      else{
        if(this.quantity < this.suppliers[this.idSupplier].quantity){
          this.quantity++;
          if(this.quantity==2){
            document.getElementById("decrement").style.color="#7c9d8e";
          }
          if (this.quantity== this.suppliers[this.idSupplier].quantity){
            document.getElementById("increment").style.color="#ededed";
          }
        }
      }
    },
    async getSuppliers() {
      var response = await http.get("/store/products/" + this.$route.params.id);
      this.suppliers = response.data.supplies;
      //console.log(this.suppliers);
      this.showMostSustenaibleSuppliers();
      this.showCurrentSupplier();
      this.showMostSusteinableTransporters();
      this.showCurrentTransporter();
      this.getTotalPrice();
    },
    getSupplierSelected(event){
      var supplierSelected = event;
      this.idSupplier = this.suppliers.findIndex((supplier) => supplier.supplier.id == supplierSelected);
      this.idTransporter = 0;
      this.showCurrentSupplier();
      this.showCurrentTransporter();

    },
    getTransporterSelected(event){
      var transporterSelected = event;
      this.idTransporter = this.currentSupplier.transporters.findIndex((transporter) => transporter.transporter.id == transporterSelected);
      this.showCurrentTransporter();
    }, 
    getSuppliersandTransporterNumber() {
      this.numberSuppliers = this.suppliers.length; 
      this.numberTransporters = this.suppliers[this.idSupplier].transports.length;
    
      if(this.numberSuppliers == 1){
        document.getElementById("btnF").style.visibility = "hidden";
        document.getElementById("txtF").style.visibility = "hidden";
      }
      else{
        document.getElementById("btnF").style.visibility = "visible";
        if(this.suppliers[this.idSupplier] == this.suppliers[0]){
          document.getElementById("txtF").style.visibility = "visible";
        }
        else{
        document.getElementById("txtF").style.visibility = "hidden";
        } 
      } 

      if(this.numberTransporters == 1){
        document.getElementById("btnT").style.visibility = "hidden";
        document.getElementById("txtT").style.visibility = "hidden";
      }
      else{
        document.getElementById("btnT").style.visibility = "visible";
        if(this.suppliers[this.idSupplier].transports[this.idTransporter] == this.suppliers[this.idSupplier].transports[0]){
          document.getElementById("txtT").style.visibility = "visible";
        }
        else{
        document.getElementById("txtT").style.visibility = "hidden";
        } 
      }

    },
    showMostSustenaibleSuppliers() {
      this.suppliers.sort(function (x, y) {
        return x.warehouse.resource_usage - y.warehouse.resource_usage;
      });
    },
    showMostSusteinableTransporters() {
      this.currentSupplier.transporters.sort(function (x, y) {
        return x.transporter.average_emissions - y.transporter.average_emissions;
      });
    },
    showCurrentSupplier() {
      this.currentSupplier.name = this.suppliers[this.idSupplier].supplier.name;
      this.currentSupplier.resource_usage = this.suppliers[this.idSupplier].warehouse.resource_usage;
      this.currentSupplier.quantity = this.suppliers[this.idSupplier].quantity;
      this.currentSupplier.price = this.suppliers[this.idSupplier].price;
      this.currentSupplier.transporters = this.suppliers[this.idSupplier].transports;  
      this.getTotalPrice();
      this.getSuppliersandTransporterNumber();
      //this.$refs.Chart.showCharts();
    },
    showCurrentTransporter() {
      this.currentTransporter.name = this.currentSupplier.transporters[this.idTransporter].transporter.name;
      this.currentTransporter.average_resource_usage = this.currentSupplier.transporters[this.idTransporter].transporter.average_resource_usage;
      this.currentTransporter.average_emissions = this.currentSupplier.transporters[this.idTransporter].transporter.average_emissions;
      this.currentTransporter.price = this.currentSupplier.transporters[this.idTransporter].price;
      this.getTotalPrice();
      this.getSuppliersandTransporterNumber();
    },
    getTotalPrice(){
      this.totalPrice = parseInt(this.currentSupplier.price) + parseInt(this.currentTransporter.price);
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
