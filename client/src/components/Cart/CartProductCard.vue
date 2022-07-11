<template>
    <div class="card mb-2 product-card d-flex align-content-center justify-content-center" >
        <button class="btnH remove position-absolute end-0 ms-0 ps-0 pe-2 border-0 ">
            <font-awesome-icon @click="removed(product.index)" class="icons fa-cog " :icon="['fa', 'xmark']" />
        </button>
                <div class="card-body justify-content-between flex-row ">
                    <div class="row align-items-center h-100">
                    <div class="col-sm-2">
                        <div class="col position-relative">
                          <router-link :to="'/produto/'+ String(product.index)" style="text-decoration:none;color:black;">
                              <img class="crop rounded border" :src="product.product.thumbnail">
                          </router-link>
                        </div>
                    </div>    
                    <div class="col-sm-2 mx-auto">
                        <router-link :to="'/produto/'+ String(product.index)" style="text-decoration:none;color:black;">
                          <h4 class="card-title text-wrap">{{ product.product.name }}</h4>
                        </router-link>
                        <h5 class="card-title text-wrap">Fornecedor: {{ product.supplier.name }}</h5>
                        <h5 class="card-title text-wrap">Transportador: {{ product.transporter.name }}</h5>
                    </div>  
                    <div class="col-sm-2 mx-auto">
                        <h4 class="card-title text-wrap" style="font-size:12px;"><font-awesome-icon :icon="['fa', 'sun']" style="color: orange; font-size:12px;"/>  <span class="ms-2">{{ product.supplier_renewable_resources.toFixed(2) }}</span> %</h4>
                        <h4 class="card-title text-wrap" style="font-size:12px;"><font-awesome-icon :icon="['fa', 'warehouse']" style="color: grey"/>  <span class="ms-2">{{ product.average_supplier_resource_usage.toFixed(2) }}</span> kWh</h4>
                        <h4 class="card-title text-wrap" style="font-size:12px;"><font-awesome-icon :icon="['fa', 'gas-pump']" style="color: "/>  <span class="ms-2">{{ product.average_transporter_resource_usage.toFixed(2) }}</span> l/100Km</h4>
                        <h4 class="card-title text-wrap" style="font-size:12px;"><font-awesome-icon :icon="['fa', 'skull-crossbones']" style="color: red"/>  <span class="ms-2">{{ product.average_transporter_emissions.toFixed(2) }}</span> CO2 g/Km/t</h4>
                    </div>
                    <div class="col-sm-1 mx-auto">
                        <h4 class="card-title text-wrap mx-auto">{{ round(product.price, 2) }} €</h4>
                    </div>
                    <div class="col-sm-2 mx-auto">
                        <h4 class="card-title text-wrap mx-auto">{{ product.transport_price }} €</h4>
                    </div>
                    <div class="col-sm-2 mx-auto">
                        <div class="d-flex justify-content-center align-items-center ">
                              <font-awesome-icon class="fs-5 fa-fw quantity-button" :icon="['fas', 'circle-minus']" @click="updateQuantity('minus', product.index)" id="decrement" />
                                <div class="w-50">
                                  <div class="mx-2">
                                    <input class="w-100 text-center align-self-center" name="quantity" :value="product.quantity" readonly="true"> 
                                  </div>
                                </div>
                                <font-awesome-icon class="fs-5 fa-fw quantity-button" :icon="['fas', 'circle-plus']" @click="updateQuantity('plus', product.index)" id="increment" />
                            </div>
                    </div>
                    <div class="col-sm-1 mx-auto">
                        <h4 class="card-title text-wrap">{{ round(product.quantity * product.price + product.transport_price, 2)}}€</h4>
                    </div>
                    </div>  
                </div>
    </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faTrash);
import { faXmark, faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import http from "../../../http-common";

import { useToast } from "vue-toastification";


library.add(faXmark, faCircleMinus, faCirclePlus);
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    const toast = useToast()
    return {
      toast,
      isActive: false,
      user: {
        accept: false,
      },
    };
  },
  created(){
    this.updateProducts();
  },
  methods: {
    updateProducts(){
      this.$emit("getProducts");
    }, 
    removed(index){
        let userId = JSON.parse(localStorage.getItem('userId'));
        //let productId = JSON.parse(product.id);
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        http.delete(`/user/${userId}/cart/${index}`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
            if (response.status == 200) {
                this.successRemoveSingleItem()
                this.updateProducts()
            }
        })
    },
    round(value, decimals) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }, 
    updateQuantity(signal, index) {
    
      let userId = JSON.parse(localStorage.getItem('userId'));
        
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let updatedQuantity = signal == 'plus' ? this.product.quantity + 1 : this.product.quantity - 1;

      updatedQuantity = updatedQuantity < 1 ? 1 : updatedQuantity

      http.put(`/user/${userId}/cart/${index}`,JSON.stringify({"quantity":updatedQuantity}), { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
          if (response.status == 200) {
              this.updateProducts()
          }
      }).catch(error=>{
        if (error.response.status == 400) {
              this.warningStock()
          }
      })
    },

    successRemoveSingleItem(){
        this.toast.success('O item foi removido com sucesso!', {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    },
    warningStock(){
        this.toast.warning('A quantidade requisitada não está disponível em stock!', {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    }
    
  }
};
</script>
<style scoped>
.product-image{
  width:10em; 
  height:100%;
  margin-right: auto;
  margin-left: auto;
  background-color: #b9bbb4;
}
h4 {
  font-size: 14px;
}
h5 {
  font-size: 10px;
}
.card {
  margin: auto;
  font-size: 11px;
}
.card:hover {
  box-shadow: 1px 8px 10px #d9d9d9;
}
.card-text:hover {
  color: black;
}
.card-title:hover {
  color: black;
}
.icons {
  width: 15px;
  height: auto;
}
.fa-cog {
  color: #b9bbb4;
  vertical-align: -0.3em;
}
.red {
  color: red !important;
}
.btnH {
  background: none;
  border: none;
  display: inline;
}
.glass {
  margin-left: 120px;
}
.div button,
.div label {
  font-size: 11px;
}
.div button{
  padding: 0!important;
}
.product:hover {
  color: black;
}
.img-fluid {
  max-width: 55%;
  height: auto;
  margin: auto;
}
.center {
  margin-right: auto;
  margin-left: auto;
}
.card-group {
  border: none;
}

.text-justify{
  text-align: justify;
}
.crop {
    height: 12em;
    width: 100%;
    overflow: hidden;
    object-fit: cover;
}
.quantity-button {
  z-index: 1000;
  cursor: pointer;
}
#increment{
  color:#5E9F88;
}
#decrement{
  color:#5E9F88;
}
</style>