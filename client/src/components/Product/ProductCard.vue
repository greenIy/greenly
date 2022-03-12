<template>
<div >
<div class="card-group card hover-shadow">
  <div class="card">
    <img class="img-fluid " src='../../assets/logo.png' alt="" >
    <div class="card-body" style="text-align:left;">
        <h5 class="card-title">Categoria</h5>
        <div>
<h4 class="card-title">
  <!-- eslint-disable max-len -->
Nome
  </h4>
  </div>
      <p class="card-text">Lorem ipsum nisi suspendisse orci nullam dui neque convallis orci in fusce duis per.</p>
      <p class="card-text">00.00 - 00.00€</p>
    </div>
    <div class="div fs-6">
    <button class="btnH fav"  @click="liked">
    <font-awesome-icon class="icons fa-cog " id="like" :icon="['fa', 'heart']" size="lg"/> Favoritos</button>
      <form>
      <div class="form-group form-check">
          <label class="form-check-label ms-2 product" for="accept">
            <input type="checkbox" v-model="user.accept" id="accept" class="form-check-input checkbox">Comparar Produto</label>
      </div>
      </form>
       </div>
          <div class="d-inline-block mt-2 mb-3">
        <button class="btnS">
           <font-awesome-icon class="icons " :icon="['fa', 'cart-plus']" size="lg"/> Adicionar ao Carrinho </button>
        </div >
  </div>
</div>
</div>
 <!-- eslint-enable max-len -->
</template>
<script>
/* eslint-disable */

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);
library.add(faCartPlus);

export default {
 
  name: 'ProductCard',
  data() {
    return{
       isActive: false,
       user: {
         accept: false
       }
    };
  },
  methods: {
    liked() { 
      if (this.isActive == false){
        document.getElementById('like').classList.add("red");
        this.isActive = true;
      }else{
        document.getElementById('like').classList.remove("red");
        this.isActive = false;
      }
     },
  },
};
</script>

<style scoped>
    .card {
         margin: auto;
         width: 18rem;
    }
    .card:hover{ 
     box-shadow: 1px 8px 10px #d9d9d9;
    -webkit-transition:  box-shadow .6s ease-in;
    } 

    .card-text:hover{
      color:black;
    }
    .card-title:hover{
      color:black;
    }

    .icons {
        width:20px;
        height:auto;
    }

    .fa-cog {
      color:#b9bbb4;
    }

    .red{
      color:red!important;
    }

    .btnH{
      background: none;
      border: none;
      display: inline;
    }

    .glass{
      margin-left: 120px;
    }

    .btnS{
      border: none;
      color:white;
      background-color: #7c9d8e;
      padding: 10px;
      border-radius:10px;
      
    }

    .btnS:hover{
      background-color: #89a799;
    }

    .div{
      display: flex;
      margin: auto;
      justify-content: space-between;
      align-items: center;
    }

    .fav{
      color:#2c3e50;
    }

    .fav:hover{
      color:black;
    }

    .product:hover{
       color:black;
    }
    
    .img-fluid {
    max-width: 85%;
    height: auto;
    margin: auto;
    }
</style>
