<template>
<div class="modal transp-modal-xl" role="dialog" id="transpModal" tabindex="-1" aria-hidden="true">
   <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class=" d-flex modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5> 
        <div class="mx-2" @click="closeModal('fecha')" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
        <div class="align-items-center">
          <div class="d-flex justify-content-between"> 
             <h5 class="card-title">Item #{{element.item.id}}</h5>
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
          <div class="pt-3">
            <h5>Sobre o produto</h5>
            <p class="card-text">Produto: {{element.item.product.name}}</p>
            <p class="card-text">Observações: {{element.observations}}</p>
            <p class="card-text">Quantidade: {{element.item.product.name}}</p>
     
            <h5 class="pt-3">Sobre o fornecedor</h5>
            <p class="card-text">Fornecedor: {{element.item.supplier.name}}</p>
            <p class="card-text">Preço: {{element.item.supply_price}}</p>
            <p class="card-text">Recursos usados: {{element.item.supplier_resource_usage}}</p>
            <p class="card-text">Recursos renováveis usados:{{supplier_renewable_resources}}</p>
            <p class="card-text">Armazém: {{element.item.warehouse}}</p>

            <h5 class="pt-3">Sobre a entrega</h5>
            <p class="card-text">Consumidor: {{element.consumer.first_name}} {{element.consumer.last_name}}</p>
            <p class="card-text">E-mail: {{element.consumer.email}}</p>
            <p class="card-text">Transportador: {{element.item.transporter.name}}</p>
            <p class="card-text">Recursos usados: {{element.item.transporter_resource_usage}}</p>
            <p class="card-text">Recursos renováveis usados: {{element.item.transporter_emissions}}</p>
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
    modal:Boolean,
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
    this.$emit('sendTransporterSelected', this.idT);
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
