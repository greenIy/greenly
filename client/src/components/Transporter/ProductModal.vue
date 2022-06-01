<template>
<div class="modal transp-modal-lg" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-lg modal-dialog-centered w-100">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title ">Encomenda #{{this.element.id}}</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="align-items-center">
          <div class="d-flex justify-content-between"> 
             <h5 class="card-title"><small>Item #{{element.item.id}}</small></h5>
            <div class="dropdown me-0">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{element.item.status}}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
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
                  <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'box-open']" /><small>Produto</small></span></th>
                  <td scope="row"><span>{{element.item.product.name}}</span></td>
                </tr>
                <tr>
                  <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'plus-minus']" /><small>Quantidade</small></span></th>
                  <td scope="row"><span>{{element.item.quantity}} un.</span></td>
                </tr>
                <tr>
                  <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'file-pen']" /><small>Observações</small></span></th>
                  <td scope="row"><span>{{element.observations}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
            <div class="mt-3" v-if="active_el==2" >
              <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" /><small>Consumidor</small></span></th>
                      <td scope="row"><span>{{element.consumer.first_name}} {{element.consumer.last_name}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'at']" /><small>E-mail</small></span></th>
                      <td scope="row"><span>{{element.consumer.email}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Morada de Entrega</small></span></th>
                      <td scope="row"><span>#{{element.shipping_address}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Morada de Faturação</small></span> </th>
                      <td scope="row"><span>#{{element.billing_address}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'calendar']" /><small>Data da Encomenda</small></span></th>
                      <td scope="row"><span>{{element.date}}</span></td>
                    </tr>
                  </tbody>
                </table>
            </div>

            <div class="mt-3" v-if="active_el==3" >
              <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" /><small>Fornecedor</small></span></th>
                      <td scope="row"><span>{{element.item.supplier.name}}</span> </td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" /><small>Preço</small></span></th>
                      <td scope="row"><span>{{element.item.supply_price}}€</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Recursos</small></span></th>
                      <td scope="row"><span>{{element.item.supplier_resource_usage}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Recursos Renováveis</small></span></th>
                      <td scope="row"><span>{{element.item.supplier_renewable_resources}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'warehouse']" /><small>Armazém</small></span></th>
                      <td scope="row"><span>#{{element.item.warehouse}}</span></td>
                    </tr>
                  </tbody>
                </table>
            </div>

            <div class="mt-3" v-if="active_el==4" >
              <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" /><small>Transportador</small> </span></th>
                      <td scope="row"><span>{{element.item.transporter.name}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" /><small>Preço</small> </span></th>
                      <td scope="row"> <span>{{element.item.transport_price}}€</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Recursos</small> </span></th>
                      <td scope="row"><span>{{element.item.transporter_resource_usage}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'house']" /><small>Recursos Renováveis</small> </span></th>
                      <td scope="row"><span>{{element.item.transporter_emissions}}</span></td>
                    </tr>
                    <tr>
                      <th scope="col"><span><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'truck']" /><small>Veículo</small> </span></th>
                      <td scope="row"><span>#{{element.item.vehicle}}</span></td>
                    </tr>
                  </tbody>
              </table>
          </div>
        </div>
          </div>
           <div class="modal-footer">
        <button type="button" class="btn save" @click="saveChanges()">Guardar Alterações</button>
      </div>
        </div>
    </div> 
</div>
</template>

<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck, faXmark, faBoxOpen , faPlusMinus, faFilePen, faAt, faUser, faHouse, faCalendar 
, faMoneyBillWave, faWarehouse} from "@fortawesome/free-solid-svg-icons";

library.add(faCubes);
library.add(faTruck);
library.add(faXmark);
library.add(faBoxOpen);
library.add(faPlusMinus);
library.add(faFilePen);
library.add(faAt);
library.add(faUser);
library.add(faHouse);
library.add(faCalendar);
library.add(faMoneyBillWave);
library.add(faWarehouse);

export default {
  name: "TransportadorModal",
  props: {
    modal: Boolean,
    element: Object,
  },
  data() {
    return {
      active_el:1,
    }
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
    },
    saveChanges(){
    this.$emit('saveT',"salva");
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
     
  }
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
    height: 23rem!important;
    overflow-y: auto;
}
.greenly-color{
  color:#000000;
}
</style>
