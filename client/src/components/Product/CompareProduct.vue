<template>
<div>
<div class="compare-div position-fixed bottom-0 start-0 shadow">
    <div @click="close" class="me-3 close">
        <font-awesome-icon class="fa-cog" :icon="['fa', 'close']" />
    </div>
    <div class="row mt-1">
        <div class="col-2">
        </div>
        <div class="col-10">
            <p class="text"> COMPARAR PRODUTOS </p>
        </div>
    </div>
     <div class="row mt-1">
        <div class="col-2">
        </div>
        <div class="col-7">
            <div class="d-flex justify-content-start">
                <div class="d-flex bd-highlight mb-3 me-4">
                    <div class="p-2 bd-highlight"><img class="img-fluid" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela"></div>
                    <div class="p-2 bd-highlight"><span class="text ms-2"><small>{{ productsToCompare[0].name }}</small></span> <div @click="remove(0)"  class="p-2 bd-highlight">
                    <font-awesome-icon class="fa-cog" :icon="['fa', 'trash']" size="xs" /> <small>Remover</small></div></div>
                </div>
                <div class="vl mb-4"></div>
                <div class="d-flex bd-highlight mb-3 ms-5"  v-if="quantityP == 1">
                    <p>Escolhe mais <b>1</b><br> para comparar </p>
                </div>
                <div v-if="productsToCompare.length == 2" class="d-flex bd-highlight mb-3 ms-4">
                    <div class="p-2 bd-highlight"><img class="img-fluid" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela"></div>
                    <div class="p-2 bd-highlight"><span class="text ms-2"><small>{{ productsToCompare[1].name }}</small></span> <div @click="remove(1)" class="p-2 bd-highlight">
                    <font-awesome-icon class="fa-cog" :icon="['fa', 'trash']" size="xs" /> <small>Remover</small></div></div>
                </div>
            </div>
        </div>
        <div class="col-3">
            <button  v-if="productsToCompare.length == 2" @click="openModal" type="button" class="btn" style="background-color: #5e9f88;color:white">Comparar</button>
            <button  v-else @click="openModal" type="button" class="btn" style="background-color: #5e9f88;color:white" disabled>Comparar</button>
        </div>
    </div>
   
</div>
<div v-if="compareModal != false" class="compare-modal position-fixed bottom-0 start-0 shadow">
    <div @click="close" class="me-3 close">
        <font-awesome-icon class="fa-cog" :icon="['fa', 'close']" />
    </div>
    <div class="row mt-1">
        <div class="col-2">
        </div>
        <div class="col-10">
            <p class="text"> COMPARAR PRODUTOS </p>
        </div>
    </div>
     <div class="row mt-1">
        <div class="col-2">
        </div>
        <div class="col-7">
            <div class="d-flex justify-content-center">
                <div class="d-flex bd-highlight mb-3 me-4">
                    <div class="p-2 bd-highlight"><img class="img-fluid" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela"></div>
                    <div class="p-2 bd-highlight"><span class="text ms-2"><small>{{ productsToCompare[0].name }}</small></span> <div @click="remove(0)" class="p-2 bd-highlight">
                    <font-awesome-icon class="fa-cog" :icon="['fa', 'trash']" size="xs" /> <small>Remover</small></div></div>
                </div>
                <div class="vl mb-4"></div>
                <div class="d-flex bd-highlight mb-3 ms-5"  v-if="quantityP == 1">
                    <p>Escolhe mais <b>1</b><br> para comparar </p>
                </div>
                <div v-if="productsToCompare.length == 2" class="d-flex bd-highlight mb-3 ms-4">
                    <div class="p-2 bd-highlight"><img class="img-fluid" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela"></div>
                    <div class="p-2 bd-highlight"><span class="text ms-2"><small>{{ productsToCompare[1].name }}</small></span> <div @click="remove(1)" class="p-2 bd-highlight">
                    <font-awesome-icon class="fa-cog" :icon="['fa', 'trash']" size="xs" /> <small>Remover</small></div></div>
                </div>
            </div>
        </div>
        <div class="col-3"> 
        </div>
    </div>
    <div class="row mt-1">
        <div class="col-2">
        </div>
        <div class="col-7">
            <div class="d-flex justify-content-start">
                <table class="table table-striped table-responsive">
                <tbody>
                    <tr>
                    <th scope="col"><span class="d-flex align-items-center "><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Produto</small></span></th>
                    <td scope="row"><span><small>Marcelo</small></span></td>
                    <td scope="row"><span><small>Paulo</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Fornecedor</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Recursos Gastos</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                     <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Preço Fornecedor</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Transportadores</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Recursos Gastos</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                     <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Preço Transportador</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr>
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'shopping-bag']" />Preço Total</small></span></th>
                    <td scope="row"><span><small>P1</small></span></td>
                    <td scope="row"><span><small>P2</small></span></td>
                     <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div class="col-3"> 
        </div>
    </div>
</div>  
</div>
</template>
<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faClose} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faClose);

export default {
  name: "CompareProduct",
  props: {
   quantityP: Number,
   productsToCompare: Array,
  },
  data() {
    return { 
     quantity: 0,
     compareModal: false,
    }
  },
  methods: {
    remove(value){
        this.quantity = this.quantityP;
        this.quantity--;

        this.$emit('updateQuantity', this.quantity);
        this.$emit('removeOneProduct', value);
    },
    close() {
        this.quantity = this.quantityP;
        this.quantity = 0;
        this.$emit('updateQuantity', this.quantity);
    },
    openModal() {
        this.compareModal = true;
    }
  }
};
</script>

<style scoped>
.compare-div{
 background-color: white;
 z-index: 3;
 width:100%;
 height:19%;
}
.compare-modal{
 background-color: white;
 z-index: 3;
 width:100%;
 height:70%;
}
span:hover {
  color: #5e9f88;
}
.close{
    float: right;
    margin-right:1em!important;
}
img{
    width:2.5em;
    height:auto;
}
.text{
    margin-top:0;
    position: relative
}
.vl {
  border-left: 1px solid #dbdad7;
}
</style>
