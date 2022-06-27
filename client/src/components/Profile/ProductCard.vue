<template>
         
        <!-- <div class="card mb-0" style="max-width: 540px;">
          <button class="btnH remove position-relative top-0 start-0 border-0 ">
            <font-awesome-icon @click="removed($event)" class="icons fa-cog " :icon="['fa', 'xmark']" />
        </button>
          <div class="row g-0">
            <div class="col-md-2">
              <img src="../../assets/Team/daniela.jpg" style="object-fit: fill; width: 100%;" class="rounded-start" alt="...">
            </div>
            <div class="col-md-10">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div> -->

        <div class="card m-3 product-card d-flex justify-content-center">
          <button class="btnH remove position-absolute top-0 end-0 p-2 pe-3 top-0 border-0 ">
            <font-awesome-icon @click="removed(product.id)" class="icons fa-cog " :icon="['fa', 'xmark']" />
          </button>
          <router-link :to="'/produto/'+ String(product.id)" style="text-decoration:none;color:black;">
          <div class="row g-0 d-flex align-items-center align-self-center h-100 my-auto">
            <div class="col-md-3 position-relative align-items-center">
              <!-- <img class="w-100 rounded-start" src="../../assets/Team/daniela.jpg" alt="Imagem do produto"  /> -->
              <div class="product-image">
                <img class="crop rounded border" :src="product.thumbnail">
              </div>
            </div>
            <div class="col-md-9 d-flex">
                <div class="card-body">
                  <div class="row align-items-center h-100">
                    <div class="col-sm-3">
                      <h3 class="card-title text-start text-wrap">{{ product.name }}</h3>
                      <h5 class="card-title text-start text-wrap">
                        {{ product.category.name }}
                      </h5>
                    </div>     
                    <div class="col-sm-7">
                      <p class="card-text  text-justify text-wrap fs-6">{{ product.description }}</p>
                    </div>
                    <div class="col-sm-2">
                      <span><h3 class="card-text text-center text-wrap fs-5">{{ product.lowest_price }}€</h3></span>
                    </div>
                  </div>  
                </div>
            </div>
          </div>
          </router-link>
        </div>



        <!-- <div class="card h-100 hover-shadow d-flex align-items-stretch border-top-0">
            <router-link :to="'/produto/'+ String(product.id)" style="text-decoration:none;color:black;">
            <div class="d-flex">
                <img class="img-fluid mt-3" src="../../assets/Team/daniela.jpg" alt="Imagem do produto"  />
            </div>
                <div class="card-body">
                <h5 class="card-title">{{ product.category.name }}</h5>
                <div>
                    <h4 class="card-title">
                    {{ product.name }}
                    </h4>
                </div>
                <p class="card-text text-truncate">{{ product.description }}</p>
                </div>
            </router-link>
            <div class="card-body py-0 position-relative mt-1 mb-2">
                <span class="position-absolute bottom-0"><h4 class="card-text sticky-bottom">{{ product.lowest_price }}€</h4></span>
            </div>
        </div> -->
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import http from "../../../http-common";
import { useToast } from "vue-toastification";


library.add(faXmark);
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
      console.log("oi");
      this.$emit("getProducts");
    }, 
    removed(productId){
        console.log("ola")
        let userId = JSON.parse(localStorage.getItem('userId'));
        //let productId = JSON.parse(product.id);
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        http.delete(`/user/${userId}/wishlist/${productId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
            if (response.status == 200) {
              this.successRemoveSingleItem()
              this.updateProducts()
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
    }
    
  }
};
</script>
<style scoped>
.product-image{
  width:15em; 
  height:15em; 
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
.product-card {
  min-height: 20em;
} 
.text-justify{
  text-align: justify;
}
.crop {
    height: 15em;
    width: 100%;
    overflow: hidden;
    object-fit: cover;
}
</style>