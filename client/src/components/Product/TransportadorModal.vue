<template>
<div class="modal" role="dialog" style="display:none">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Transportador para o Fornecedor X</h5> 
        <div id="close" >
          <font-awesome-icon class="fs-6 fa-fw" :icon="['fa', 'xmark']" />
        </div>
      </div>
      <div class="modal-body">
         <div class="container">
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
  name: "TransportadorModal",
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
