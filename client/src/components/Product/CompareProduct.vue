<template>
<div>
<div class="compare-div position-fixed bottom-0 start-0 shadow">
    <div @click="close" class="me-3 close mt-2">
        <font-awesome-icon class="fa-cog" :icon="['fa', 'close']" />
    </div>
    <div class="container w-100">
        <div class="d-flex mt-2 comp-header">
            <p class="text">COMPARAR PRODUTOS </p>
        </div>
        <div class="d-flex comp-content">
            <div v-if="productsToCompare.length > 0" class="comp-content-product">
                <div class="d-inline-block">
                    <img class="img-fluid product-img" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela">
                </div>
                <div class="d-inline-block pt-2 pb-2 pe-3 ps-3">
                    <span><small>{{ productsToCompare[0].name }}</small>
                    <div @click="remove(0)"  class="bd-highlight">
                        <font-awesome-icon class="fa-cog" :icon="['fa', 'trash']" size="xs" /> <small>Remover</small>
                    </div>
                    </span>
                </div>
            </div>
            <div class="vl mb-4"></div>
            <div class="bd-highlight ms-5 text-muted pt-2 pb-2 pe-3 ps-3"  v-if="productsToCompare.length == 1">
                <p>Escolhe mais <b>1</b><br> para comparar </p>
            </div>
            <div v-if="productsToCompare.length > 1" class="me-4 ps-5">
                <div class="d-inline-block">
                    <img class="img-fluid product-img" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela">
                </div>
                <div class="d-inline-block pt-2 pb-2 pe-3 ps-3">
                    <span><small>{{ productsToCompare[1].name }}</small>
                    <div @click="remove(1)"  class="bd-highlight">
                        <font-awesome-icon class="fa-cog" :icon="['fa', 'trash']" size="xs" /> <small>Remover</small>
                    </div>
                    </span>
                </div>
            </div>
            <div class="pt-2 pb-2 pe-3 ps-4" id="compare-btn">
                <button  v-if="Object.keys(this.$route.query).length == 2" @click="openModal" type="button" class="btn" style="background-color: #5e9f88;color:white">Comparar</button>
                <button  v-else @click="openModal" type="button" class="btn" style="background-color: #5e9f88;color:white" disabled>Comparar</button>
            </div>
        </div>
    </div>
</div>
<div v-if="compareModal != false" class="compare-modal position-fixed bottom-0 start-0 shadow">
    <div @click="close" class="me-3 close">
        <font-awesome-icon class="fa-cog" :icon="['fa', 'close']" />
    </div>
    <div class="row mt-3">
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
                    <div class="p-2 bd-highlight"><span class="text ms-2"><small>{{ productsToCompare[0].name }}</small></span></div>
                </div>
                <div class="vl mb-4"></div>
                <div class="d-flex bd-highlight mb-3 ms-4">
                    <div class="p-2 bd-highlight"><img class="img-fluid" src="../../assets/Team/daniela.jpg" alt="Fotografia da Daniela"></div>
                    <div class="p-2 bd-highlight"><span class="text ms-2"><small>{{ productsToCompare[1].name }}</small></span></div>
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
            <p class="text-muted"><small>São apresentadas as informações do Fornecedor e do Transportador mais sustentáveis para comparação.</small></p>
            <div class="d-flex justify-content-start">
                <table class="table table-striped table-responsive">
                <tbody>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" />Fornecedor</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].supplier.name}}</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].supplier.name}}</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'sun']" />Recursos Renováveis</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].warehouse.renewable_resources}}%</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].warehouse.renewable_resources}}%</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'industry']" />Recursos de Armazenamento</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].warehouse.resource_usage}}kWh/dia</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].warehouse.resource_usage}}kWh/dia</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" />Preço Fornecedor</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].price}}€</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].price}}€</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'user']" />Transportador</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].transports[0].transporter.name}}</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].transports[0].transporter.name}}</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'skull-crossbones']" />Emissões Poluentes</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].transports[0].transporter.average_emissions}}CO₂ g/km/t</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].transports[0].transporter.average_emissions}}CO₂ g/km/t</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'gas-pump']" />Recursos de Transporte</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].transports[0].transporter.average_resource_usage}}l/100km</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].transports[0].transporter.average_resource_usage}}l/100km</small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" />Preço Transportador</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].transports[0].price}}€</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].transports[0].price}}€</small></span></td> 
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    <td scope="row"><span><small></small></span></td>
                    </tr>
                    <tr class="font-compare">
                    <th scope="col"><span class="d-flex align-items-center"><small><font-awesome-icon class="fs-6 fa-fw me-1 text-muted" :icon="['fas', 'money-bill-wave']" />Preço Total</small></span></th>
                    <td scope="row"><span><small>{{ productsToCompare[0].supplies[0].transports[0].price +  productsToCompare[0].supplies[0].price}}€</small></span></td>
                    <td scope="row"><span><small>{{ productsToCompare[1].supplies[0].transports[0].price +  productsToCompare[1].supplies[0].price}}€</small></span></td>
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
import { faTrash, faClose, faSun, faIndustry, faMoneyBillWave, faSkullCrossbones, faGasPump } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faClose, faSun, faIndustry, faMoneyBillWave, faSkullCrossbones, faGasPump);

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
        this.$emit('removeOneProduct', value);
    },
    close() {
        this.$emit('removeOneProduct', 3);
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
 height:17%;
}

.compare-modal{
 background-color: white;
 z-index: 3;
 width:100%;
 height:78%;
}

span:hover {
  color: #5e9f88;
}

.close{
    float: right;
    margin-right: 1em !important;
}

img{
    width:3em;
    height:auto;
}

.text{
    margin-top:0;
    position: relative
}

.vl {
  border-left: 1px solid #dbdad7;
}
.font-compare{
    font-size:15px;
}
.product-img {
    padding-bottom: 30px !important;
}

.comp-header {
    margin-right: 15% !important;
    margin-left: 15% !important;
}

.comp-content {
    margin-right: 15% !important;
    margin-left: 15% !important;
 }

#compare-btn {
    margin-left: 30%;
}
</style>
