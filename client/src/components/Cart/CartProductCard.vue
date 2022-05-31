<template>
    <div class="card product-card d-flex align-content-center justify-content-center" style="height:110px" >
        <button class="btnH remove position-absolute end-0 ms-0 ps-0 pe-2 border-0 ">
            <font-awesome-icon @click="removed(product.index)" class="icons fa-cog " :icon="['fa', 'xmark']" />
        </button>
        <router-link :to="'/produto/'+ String(product.index)" style="text-decoration:none;color:black;">
        <div class="">
            
            <div class=" ">
                <div class="card-body justify-content-between flex-row ">
                    <div class="row align-items-center h-100">
                    <div class="col-sm-2">
                        <div class="col position-relative">
                            <div class="product-image"></div>
                        </div>
                        <!-- <h5 class="card-title text-start text-wrap">
                        {{ product.category.name }}
                        </h5> -->
                    </div>    
                    <div class="col-sm-2">
                        <h4 class="card-title text-wrap">{{ product.product.name }}</h4>
                        <!-- <h3 class="card-title text-start text-wrap">{{ product.name }}</h3>
                        <h5 class="card-title text-start text-wrap">
                        {{ product.category.name }}
                        </h5> -->
                    </div>  
                    <div class="col-sm-2 justify-content-center">
                        <h4 class="card-title text-wrap"><font-awesome-icon :icon="['fa', 'sun']" style="color: orange"/>  <span class="ms-2">{{ product.supplier_renewable_resources }}</span> %</h4>
                        <h4 class="card-title text-wrap"><font-awesome-icon :icon="['fa', 'industry']" style="color: grey"/>  <span class="ms-2">{{ product.average_supplier_resource_usage }}</span> kWh</h4>
                        <h4 class="card-title text-wrap"><font-awesome-icon :icon="['fa', 'gas-pump']" style="color: "/>  <span class="ms-2">{{ product.average_transporter_resource_usage }}</span> l/100Km</h4>
                        <h4 class="card-title text-wrap"><font-awesome-icon :icon="['fa', 'skull-crossbones']" style="color: red"/>  <span class="ms-2">{{ product.average_transporter_emissions }}</span> CO2 g/Km/t</h4>
                        <!-- <p class="card-text  text-justify text-wrap fs-6">{{ product.description }}</p> -->
                    </div>
                    <div class="col-sm-1">
                        <h4 class="card-title  text-wrap">{{ product.price }} €</h4>
                        <!-- <span><h3 class="card-text text-wrap fs-5">{{ product.lowest_price }}€</h3></span> -->
                    </div>
                    <div class="col-sm-2">
                        <h4 class="card-title text-wrap ms-2">{{ product.transport_price }} €</h4>
                        <!-- <span><h3 class="card-text text-wrap fs-5">{{ product.lowest_price }}€</h3></span> -->
                    </div>
                    <div class="col-sm-2">
                        <!-- <h4 class="card-title text-wrap ms-4">{{ product.quantity }}</h4> -->
                        <div class="d-flex justify-content-center align-items-center">
                              <font-awesome-icon class="fs-5 fa-fw" :icon="['fas', 'circle-minus']" @click="clickAction('minus')" id="decrement" />
                                <div class="w-50">
                                  <div class="mx-2">
                                    <input class="w-100 text-center align-self-center" name="quantity" :value="product.quantity" readonly="true"> 
                                  </div>
                                </div>
                                <font-awesome-icon class="fs-5 fa-fw" :icon="['fas', 'circle-plus']" @click="clickAction('plus')" id="increment" />
                            </div>
                    </div>
                    <div class="col-sm-1">
                        <h4 class="card-title text-wrap">{{ product.quantity * product.price + product.transport_price}}€</h4>
                        <!-- <span><h3 class="card-text text-wrap fs-5">{{ product.lowest_price }}€</h3></span> -->
                    </div>
                    </div>  
                </div>
            </div>
        </div>
        </router-link>
    </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faTrash);
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import http from "../../../http-common";

library.add(faXmark);
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    return {
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
                this.updateProducts()
            }
        })
    },
    clickAction(signal) {
      if(signal=='minus'){
        if(this.quantity>1){
          this.quantity--;
          if(this.quantity==1){
            document.getElementById("decrement").style.color="#ededed";
          }
          if (this.quantity < this.suppliers[this.idSupplier].quantity ){
            document.getElementById("increment").style.color="#5E9F88";
          }
        }
      }
      else{
        if(this.quantity < this.suppliers[this.idSupplier].quantity){
          this.quantity++;
          if(this.quantity==2){
            document.getElementById("decrement").style.color="#5E9F88";
          }
          if (this.quantity== this.suppliers[this.idSupplier].quantity){
            document.getElementById("increment").style.color="#ededed";
          }
        }
      }
    }
    
  }
};
</script>
<style scoped>
.product-image{
  width:8em; 
  height:8em; 
  background-color: grey
  
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
</style>