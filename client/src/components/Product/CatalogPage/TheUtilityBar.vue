<template>
<div class="d-flex align-items-end my-3" style="width:90%">
    <div class="col-6">
    </div>
    <div class="col-3 text-end mx-1">
        <span class="text-secondary fs-6">
            {{ (productsInPage * currentPage) - productsInPage + 1 }} - {{ productsInPage * currentPage }} de {{ productAmount }} produtos 
        </span>
    </div>
    <div class="col-1 text-end mx-3">
        <div class="dropdown">
            <a class="btn rounded text-decoration-none" id="order-by-numbers" data-bs-toggle="dropdown" aria-expanded="false"> {{ limit }} 
                <font-awesome-icon  class="fa-cog mx-1 fa-sm" :icon="['fa', 'caret-down']" />
            </a>
            <ul class="dropdown-menu drop" aria-labelledby="order-by-numbers">
                <li><a class="dropdown-item" @click='productsPerPage(12)'>12</a></li>
                <li><a class="dropdown-item" @click='productsPerPage(24)'>24</a></li>
                <li><a class="dropdown-item" @click='productsPerPage(48)'>48</a></li>
            </ul>
        </div>
    </div>
    <div class="col-2">
        <div class="dropdown" >
            <a class="btn rounded text-decoration-none" id="order-by-filters" data-bs-toggle="dropdown" aria-expanded="false" style="width:12rem;text-align:left;">
                <span id="orderBy">Ordenar por</span>
                <span style="float:right!important;" ><font-awesome-icon  class="fa-cog mx-1 fa-sm" :icon="['fa', 'caret-down']" /></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="order-by-filters" >
                <li><a class="dropdown-item" @click='order("name")' style="width: 12rem;">Nome</a></li>
                <li><a class="dropdown-item" @click='order("id")' style="width: 12rem;">Novidade</a></li>
                <li><a class="dropdown-item" @click='order("priceMin")' style="width: 12rem;">Preço Ascendente</a></li>
                <li><a class="dropdown-item" @click='order("priceMax")' style="width: 12rem;">Preço Descendente</a></li>
            </ul>
        </div>
    </div>
   
 
</div>
</template>

<script>
import http from "../../../../http-common";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

library.add(faCaretDown);

  export default {
    props: {
        productAmount: Number,
        pageAmount: Number,
        currentPage: Number,
        limit: Number,
        product:Object,
        productsInPage: Number,
    },
    data() {
        return {
            lastPageProducts: 0,
            // totalProducts:0,
        };
    },
    methods: {
        getTotalProducts: function() {
            http.get("/store/products?page=" + this.pageAmount + "&limit="+ this.limit).then((response) => {
               this.lastPageProducts = response.data.products.length;
            });
        },
        productsPerPage: function (amount) {
            this.$emit("sendProductsPerPage", amount);
        },
        order: function(params) {
            this.$emit("sendProduct",params);
            if(params == "name"){
                document.getElementById("orderBy").innerHTML = "Nome"
            }
            else if(params == "id"){
                document.getElementById("orderBy").innerHTML = "Novidade"
            }
            else if(params == "priceMin"){
                document.getElementById("orderBy").innerHTML = "Preço Ascendente"
            }
            else{
                document.getElementById("orderBy").innerHTML = "Preço Descendente"
            }
            
        },
    }
  }
</script>

<style scoped>
.size{
    width:85%;
}
.btn{
  border: none;
  color: white;
  background-color: #7c9d8e;
  border-radius: 10px;
  box-shadow: none;
}
.drop{
    min-width: 62%!important
}
</style>