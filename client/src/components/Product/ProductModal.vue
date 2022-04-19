<template>
<div class="modal" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="container">
        <div class="mt-4" >
            <span> Selecione um Fornecedor: </span>
                <div class=" card-group mt-2">
                    <div class="d-flex card product">
                        <label>
                            <input type="radio" v-model="fornecedor" name="fornecedor" active-class="active"  class="card-input-element" />
                                <div class="panel panel-default card-input">
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
                    <div class="mt-4" v-if="fornecedor != false" id="transportador">
                        <span> Selecione um Transportador: </span>
                         <div class=" card-group mt-2">
                        <div class="d-flex card product">
                         <label>
                            <input type="radio" active-class="active" name="transportador" class="card-input-element" />
                             <div class="panel panel-default card-input">
                               <div class="row">
                                <div class="col-10">
                                  <div class="panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" />Transportador A <span class="dot"></span></p></div>
                                </div>
                                <div class="col-2">     
                                </div>
                                </div>
                                  <div class="panel-body">
                                  <p class="text-p"><b>Gastos:</b> 32 CO₂/Kg</p>
                                  <p class="text-p"><b>Preço:</b> 32€</p>
                                </div>
                              </div>
                        </label>
                        </div>
                        <div class="d-flex card product">
                         <label>
                            <input type="radio" active-class="active" name="transportador" class="card-input-element" />
                             <div class="panel panel-default card-input">
                               <div class="row">
                                <div class="col-10">
                                   <div class="panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" />Transportador B  <span class="dot"></span></p></div>
                                </div>
                                <div class="col-2">
                                </div>
                                </div>
                                  <div class="panel-body">
                                   <p class="text-p"><b>Gastos:</b> 32 CO₂/Kg</p>
                                   <p class="text-p"><b>Preço:</b> 32€</p>
                                </div>
                              </div>
                          </label>
                        </div>
                        <div class="d-flex card product">
                         <label>
                            <input type="radio" active-class="active" name="transportador" class="card-input-element" />
                             <div class="panel panel-default card-input">
                               <div class="row">
                                <div class="col-10">
                                   <div class="panel-heading"><p><font-awesome-icon class="fs-6 fa-fw" :icon="['fas', 'truck']" />Transportador C  <span class="dot"></span></p></div>
                                </div>
                                <div class="col-2">
                                </div>
                                </div>
                                  <div class="panel-body">
                                   <p class="text-p"><b>Gastos:</b> 32 CO₂/Kg</p>
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
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
   
</template>
<script>


import { library } from "@fortawesome/fontawesome-svg-core";
import { faCubes, faTruck } from "@fortawesome/free-solid-svg-icons";

library.add(faCubes);
library.add(faTruck);

export default {
  name: "ProductModal",
  data() {
    return {
    };
  },
};
</script>
<style scoped>
.modal{
    display: flex;
}

</style>
