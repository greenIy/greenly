<template>
<div class="modal" role="dialog">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5> 
        <div id="close" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
         <div class="container">
        <div class="mt-4" >
            <span> Selecione um Fornecedor: </span>
                <div class=" card-group mt-2">
                    <div class="d-flex card product">
                        <label>
                            <input type="radio" v-model="fornecedor" name="fornecedor" active-class="active"  class="card-input-element" />
                                <div class="card-input">
                                    <div class="row">
                                        <div class="col-10">
                                            <div class="panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'cubes']" /> Fornecedor A <span class="dot"></span></p></div>
                                        </div>
                                        <div class="col-2">
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <p class="text-p"><b>Gastos:</b> 32 kWh/kg</p>
                                        <p class="text-p"><b>Stock:</b> 30 produtos</p>
                                        <p class="text-p"><b>Preço:</b> 32€</p>
                                    </div>
                                </div>
                        </label>
                        </div>
                        <div class="d-flex card product">
                         <label>
                            <input type="radio" active-class="active" v-model="fornecedor" name="fornecedor" class="card-input-element" />
                             <div class="panel panel-default card-input">
                               <div class="row">
                                <div class="col-10">
                                  <div class=" panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'cubes']" /> Fornecedor B <span class="dot my-auto"></span></p></div>
                                </div>
                                <div class="col-2">
                                </div>
                                </div>
                                  <div class="panel-body">
                                  <p class="text-p"><b>Gastos:</b> 32 kWh/kg</p>
                                  <p class="text-p"><b>Stock:</b> 30 produtos</p>
                                  <p class="text-p"><b>Preço:</b> 32€</p>
                                </div>
                              </div>
                        </label>
                        </div>
                         <div class="d-flex card product">
                         <label>
                            <input type="radio" active-class="active" v-model="fornecedor" name="fornecedor" class="card-input-element" />
                             <div class="panel panel-default card-input">
                               <div class="row">
                                <div class="col-10">
                                  <div class=" panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'cubes']" /> Fornecedor C <span class="dot my-auto"></span></p></div>
                                </div>
                                <div class="col-2">
                                </div>
                                </div>
                                  <div class="panel-body">
                                  <p class="text-p"><b>Gastos:</b> 32 kWh/kg</p>
                                  <p class="text-p"><b>Stock:</b> 30 produtos</p>
                                  <p class="text-p"><b>Preço:</b> 32€</p>
                                </div>
                              </div>
                        </label>
                        </div>
                      </div>
                    </div>
                    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Guardar Alterações</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
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
  name: "FornecedorModal",
  data() {
    return { 
    }
  },
  methods:{
    // closeModal(){
    //   this.modal=false;
    //   this.prod=true;
    //   console.log(this.modal);
    //   console.log(this.prod);
    // }
  }
};
</script>
<style scoped>
.modal{
    display: flex;
}

</style>
