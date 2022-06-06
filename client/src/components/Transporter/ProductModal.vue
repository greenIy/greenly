<template>
<div class="modal transp-modal-lg" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg modal-dialog-centered w-100">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h6 class="modal-title ">ENCOMENDA #{{this.element.id}}</h6> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa','xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="align-items-center">
          <div class="d-flex justify-content-between"> 
             <h6 class="card-title text-muted">ITEM #{{element.item.id}}</h6>
            <select v-if="complete != false" class="dropDownS disable-classe sucessOrder" id="selectState"  disabled>
              <option :value="getCurrentStatus()[0]"  selected="selected">{{ getCurrentStatus()[1] }}</option>
            </select>
             <select v-if="canceled != false" class="dropDownS disable-classe cancelOrder" id="selectState"  disabled>
              <option :value="getCurrentStatus()[0]"  selected="selected">{{ getCurrentStatus()[1] }}</option>
            </select>
             <select v-if="complete != true && canceled != true" class="dropDownS" id="selectState" v-on:change="changeStatus($event.target.value)">
              <option :value="getCurrentStatus()[0]"  selected="selected" style="background-color:#ffffff;color:#000000;">{{ getCurrentStatus()[1] }}</option>
              <option :value="getNextStatus()[0]"  style="background-color:#ffffff;color:#000000;">{{ getNextStatus()[1] }}</option>
            </select>
          </div>
        </div>
        <div>
          <ul class="nav nav-tabs mt-3">
            <li class="nav-item ">
              <a class="nav-link greenly-color" id="prod" @click="activate(1)" :class="{ active : active_el == 1 }" >Produto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link greenly-color" @click="activate(2)" :class="{ active : active_el == 2 }">Consumidor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link greenly-color" @click="activate(3)" :class="{ active : active_el == 3 }">Fornecedor </a>
            </li>
            <li class="nav-item">
              <a class="nav-link greenly-color" @click="activate(4)" :class="{ active : active_el == 4 }">Transportador </a>
            </li>
          </ul>

          <div class="mt-3" v-if="active_el==1" >
            <table class="table table-striped table-responsive">
              <tbody>
                <tr>
                  <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" /><small>Produto</small></span></th>
                  <td scope="row" class="textAlign-right"><span><small>{{element.item.product.name}}</small></span></td>
                </tr>
                <tr>
                  <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'plus-minus']" /><small>Quantidade</small></span></th>
                  <td scope="row" class="textAlign-right"><span><small>{{element.item.quantity}} un.</small></span></td>
                </tr>
                <tr>
                  <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'file-pen']" /><small>Observações</small></span></th>
                  <td scope="row" class="textAlign-right"><span><small>{{element.observations}}</small></span></td>
                </tr>
              </tbody>
            </table>
          </div>
            <div class="mt-3" v-if="active_el==2" >
              <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" /><small>Consumidor</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.consumer.first_name}} {{element.consumer.last_name}}</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'at']" /><small>E-mail</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.consumer.email}}</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Morada de Entrega</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{this.shippingAddress.street}} {{this.shippingAddress.postal_code}}</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'calendar']" /><small>Data da Encomenda</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{this.date}}</small></span></td>
                    </tr>
                  </tbody>
                </table>
            </div>

            <div class="mt-3" v-if="active_el==3" >
              <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" /><small>Fornecedor</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.supplier.name}}</small></span> </td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" /><small>Preço</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.supply_price}}€</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'industry']" /><small>Recursos de Armazenamento</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.supplier_resource_usage}} kWh/dia</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'sun']" /><small>Recursos Renováveis</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.supplier_renewable_resources}}%</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'warehouse']" /><small>Armazém</small></span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{this.warehouse.address.street}} {{this.warehouse.address.postal_code}}</small></span></td>
                    </tr>
                  </tbody>
                </table>
            </div>

            <div class="mt-3" v-if="active_el==4" >
              <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" /><small>Transportador</small> </span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.transporter.name}}</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" /><small>Preço</small> </span></th>
                      <td scope="row" class="textAlign-right"> <span><small>{{element.item.transport_price}}€</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'gas-pump']" /><small>Recursos de Transporte</small> </span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.transporter_resource_usage}} l/100km</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'sun']" /><small>Emissões Poluentes</small> </span></th>
                      <td scope="row" class="textAlign-right"><span><small>{{element.item.transporter_emissions}} CO₂ g/km/t</small></span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span class="d-flex align-items-center"><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'truck']" /><small>Veículo</small> </span></th>
                      <td scope="row" class="textAlign-right"><span><small>#{{element.item.vehicle}}</small></span></td>
                    </tr>
                  </tbody>
              </table>
          </div>
        </div>
          </div>
        </div>
    </div> 
</div>
</template>

<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark, faBox , faPlusMinus, faFilePen, faIndustry, faAt, faUser, faHouse, faCalendar 
, faMoneyBillWave, faWarehouse , faGasPump, faSun, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import http from "../../../http-common"


library.add(faCubes);
library.add(faTruck);
library.add(faXmark);
library.add(faBox);
library.add(faPlusMinus);
library.add(faFilePen);
library.add(faIndustry);
library.add(faAt);
library.add(faUser);
library.add(faHouse);
library.add(faCalendar);
library.add(faMoneyBillWave);
library.add(faWarehouse);
library.add(faGasPump);
library.add(faSun);
library.add(faShoppingBag);

export default {
  name: "TransportadorModal",
  props: {
    modal: Boolean,
    element: Object,
  },
   created() {
    console.log(this.element);
    this.getData(this.element);
    this.getMoreDetails();
  },
  mounted() {
     this.verify();
  },
  data() {
    return {
      active_el:1,
      date:String,
      shipping_address:Object,
      warehouse:Object,
      complete:false,
      canceled:false,
      status: [
        { 
          current_status: "TRANSPORT_IMMINENT",
          alias: "À ESPERA DE TRANSPORTE",
          next_status: [
            {
              name: "AWAITING_TRANSPORT", 
              alias: "PRESTE A SER LEVANTADA"
            }
          ]
        },
        {
          current_status: "AWAITING_TRANSPORT",
          alias: "PRESTE A SER LEVANTADA",
          next_status:[
            {
              name: "IN_TRANSIT",
              alias: "EM TRANSPORTE"
            }
          ]
        },
        {
          current_status: "IN_TRANSIT",
          alias: "EM TRANSPORTE",
          next_status:[
            {
              name: "LAST_MILE",
              alias: "PRESTES A SER ENTREGUES"
            }
          ]
        },
        {
          current_status: "LAST_MILE",
          alias: "EM TRANSPORTE",
          next_status:[
            {
              name: "COMPLETE",
              alias: "ENTREGUE"
            }
          ]
        },
        {
          current_status: "COMPLETE",
          alias: "ENTREGUE",
          next_status:[
            {
              name: "",
              alias: ""
            }
          ]
        },
        {
          current_status: "CANCELED",
          alias: "CANCELADA",
          next_status:[
            {
              name: "",
              alias: ""
            }
          ]
        },
        {
          current_status: "FAILURE",
          alias: "FALHADA",
          logo: "circle-exclamation",
          next_status:[
          {
            name: "",
            alias: ""
          }
          ]
        },
      ]
    }
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
    },
    activate:function(el){
      if(this.active_el != 1 ){
        document.getElementById("prod").classList.remove("active");
        this.active_el = el;
      }
      else{
        this.active_el = el;
      }   
    },
     getData(element){
      this.date = new Date(element.date);
      let yyyy = this.date.getFullYear();
      let mm = this.date.getMonth() + 1;
      let dd = this.date.getDate();

      this.date = dd + '/' + mm + '/' + yyyy;

    },
    changeStatus(event){
      let sel = document.getElementById("selectState");
      
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      http.put(`/store/orders/${ this.element.id }/${ this.element.item.id }`, 
        JSON.stringify({ status: `${ sel.value }` }), { headers: {"Authorization" : `Bearer ${ accessToken }`}}).then(
          (result) => {
            this.$router.push({ name: 'transportador' });
          }
        );
    },
    verify(){
      let x = document.getElementById("selectState").options[0].value;

      if (x == "COMPLETE") {
        this.complete = true;
      }
      else if(x == "CANCELED" || x == "FAILURE"){
        this.canceled = true;
      }
    },
    async getMoreDetails() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));
      let response = await http.get("/store/orders/"+ this.element.id, { headers: {"Authorization" : `Bearer ${accessToken}`}} );

      this.shippingAddress = JSON.parse(JSON.stringify(response.data.shipping_address));
      this.warehouse = JSON.parse(JSON.stringify(response.data.items[0].warehouse));
    },
    getNextStatus() {
      for (let curr of this.status) {
        if(this.element.item.status == curr.current_status) {
          return [curr.next_status[0].name, curr.next_status[0].alias];
        }
      }
    },
    getCurrentStatus() {
      for (let curr of this.status) {
        if(this.element.item.status == curr.current_status) {
          return [curr.current_status, curr.alias];
        }
      }
    },
  },
};
</script>
<style scoped>
.modal {
    display: flex;
}
.save {
  background-color: #5e9f88;
  color:white;
}
.modal-body{
    height: 24rem!important;
    overflow-y: auto;
}
.greenly-color{
  color:#000000;
  background-color:#ffffff!important;
}
.dropDownS{
  background-color:#E3C12B;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  color:#ffffff; 
  outline: none;
}
.textAlign-right{
  text-align:right!important;
}
.disable-classe {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}
.sucessOrder{
  background-color:#5e9f88!important;
}
.cancelOrder{
  background-color:#f42100!important;
}
</style>
