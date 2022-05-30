<template>
<div class="modal transp-modal-xl" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-xl modal-dialog-centered w-100 h-100">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title ">Encomenda #{{this.element.id}}</h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="d-flex align-items-center">
          <div class=" d-inline-block col-6"> 
             <h5 class="card-title">Item #{{element.item.id}}</h5>
          </div>
          <div class="d-inline-block col-6 ">
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
         <p class="card-text">Produto: {{element.item.product.name}}</p>
         <p class="card-text">Observações: {{element.observations}}</p>
         <p class="card-text">Quantidade: {{element.item.product.name}}</p>

          <p class="card-text">Fornecedor: {{element.item.supplier.name}}</p>
         <p class="card-text">Preço: {{element.item.supply_price}}</p>
         <p class="card-text">Recursos usados: {{element.item.supplier_resource_usage}}</p>
         <p class="card-text">Recursos renováveis usados:{{supplier_renewable_resources}}</p>
         <p class="card-text">Armazém: {{element.item.warehouse}}</p>

         <p class="card-text">Transportador: {{element.item.transporter.name}}</p>
         <p class="card-text">Recursos usados: {{element.item.transporter_resource_usage}}</p>
         <p class="card-text">Recursos renováveis usados: {{element.item.transporter_emissions}}</p>
         <p class="card-text">Veículo: #{{element.item.vehicle}}</p>
        
         <p class="card-text">Consumidor: {{element.consumer.first_name}} {{element.consumer.last_name}}</p>
         <p class="card-text">E-mail: {{element.consumer.email}}</p>
      </div>
      <div class="modal-footer mt-3">
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
    modal:Boolean,
    element:Object,
  },
  data() {
    return {
    
    }
  },
  methods:{
    closeModal(params){
      this.$emit('sendModalT',params);
    },
    saveChanges(){
    //this.$emit('sendTransporterSelected', this.idT);
    this.$emit('saveT',"salva");
    }, 
  }
};
</script>
<style scoped>
.modal{
    display: flex;
}
.save{
  background-color: #5e9f88;
  color:white;
}
.modal-body{
    height: 15rem;
    overflow-y: auto;
}

</style>
