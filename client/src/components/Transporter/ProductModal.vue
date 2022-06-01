<template>
<div class="modal transp-modal-xl" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-xl modal-dialog-centered w-100">
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
             <h5 class="card-title"><small class="text-muted">Item #{{element.item.id}}</small></h5>
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
              <a class="nav-link greenly-color" @click="activate(3)" :class="{ active : active_el == 3 }">Fornecedor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link greenly-color" @click="activate(4)" :class="{ active : active_el == 4 }">Transportador</a>
            </li>
          </ul>

          
            <div class="pt-3 " v-if="active_el==1" >
              <p class="card-text">Produto: {{element.item.product.name}}</p>
              <p class="card-text">Quantidade: {{element.item.product.name}}</p>
              <p class="card-text">Observações: {{element.observations}}</p>
            </div>

            <div class="pt-3" v-if="active_el==2">
              <p class="card-text">Consumidor: {{element.consumer.first_name}} {{element.consumer.last_name}}</p>
              <p class="card-text">E-mail: {{element.consumer.email}}</p>
              <p class="card-text">Morada: #{{element.shipping_address}}</p>
              <p class="card-text">Data da Encomenda: {{element.date}}</p>

            </div>
            <div class="pt-3" v-if="active_el==3">
              <p class="card-text">Fornecedor: {{element.item.supplier.name}}</p>
              <p class="card-text">Preço: {{element.item.supply_price}}€</p>
              <p class="card-text">Recursos Usados: {{element.item.supplier_resource_usage}}</p>
              <p class="card-text">Recursos Renováveis Usados:{{supplier_renewable_resources}}</p>
              <p class="card-text">Armazém: #{{element.item.warehouse}}</p>
            </div>

            <div class="pt-3" v-if="active_el==4">
              <p class="card-text">Transportador: {{element.item.transporter.name}}</p>
              <p class="card-text">Preço: {{element.item.transport_price}}€</p>
              <p class="card-text">Recursos Usados: {{element.item.transporter_resource_usage}}</p>
              <p class="card-text">Recursos Renováveis Usados: {{element.item.transporter_emissions}}</p>
              <p class="card-text">Veículo: #{{element.item.vehicle}}</p>
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
import { faCubes, faTruck, faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faCubes);
library.add(faTruck);
library.add(faXmark);


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
    height: 25rem!important;
    overflow-y: auto;
}
.greenly-color{
  color:#000000;
}

</style>
