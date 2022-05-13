<template>
<div class="d-flex align-items-end my-3" style="width:89.5%">
    <div class="col-6">
    </div>
    <div class="col-3 text-end mx-1">
        <span class="text-secondary fs-6">
            {{ getInitialAmountOfProducts }} - {{ getFinalAmountOfProducts }} de {{ productAmount }} produtos 
        </span>
    </div>
    <div class="col-1 text-end mx-3">
        <div class="dropdown">
            <a class="btn rounded text-decoration-none" id="order-by-numbers" data-bs-toggle="dropdown" aria-expanded="false"> {{ limit }} 
                <font-awesome-icon  class="fa-cog mx-1 fa-sm" :icon="['fa', 'caret-down']" />
            </a>
            <ul class="dropdown-menu drop" aria-labelledby="order-by-numbers">
                <li><router-link append :to="{ query: { ...$route.query, por_pag: 12 } }" class="dropdown-item" @click='productsPerPage(12)'>12</router-link></li>
                <li><router-link append :to="{ query: { ...$route.query, por_pag: 24 } }" class="dropdown-item" @click='productsPerPage(24)'>24</router-link></li>
                <li><router-link append :to="{ query: { ...$route.query, por_pag: 48 } }" class="dropdown-item" @click='productsPerPage(48)'>48</router-link></li>
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
                <li><router-link append :to="{ query: { ...$route.query, ordenar_por: 'nome' } }" class="dropdown-item" @click='order("name")' style="width: 12rem;">Nome</router-link></li>
                <li><router-link append :to="{ query: { ...$route.query, ordenar_por: 'novidade' } }" class="dropdown-item" @click='order("id")' style="width: 12rem;">Novidade</router-link></li>
                <li><router-link append :to="{ query: { ...$route.query, ordenar_por: 'preco_asc' } }" class="dropdown-item" @click='order("priceMin")' style="width: 12rem;">Preço Ascendente</router-link></li>
                <li><router-link append :to="{ query: { ...$route.query, ordenar_por: 'preco_desc' } }" class="dropdown-item" @click='order("priceMax")' style="width: 12rem;">Preço Descendente</router-link></li>
            </ul>
        </div>
    </div>
   
 
</div>
</template>

<script>

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
        };
    },
    methods: {
        productsPerPage: function (amount) {
            this.$emit("sendProductsPerPage", amount);
        },
        order: function(params) {
            this.$emit("sendProduct",params);
            if (params == "name") {
                document.getElementById("orderBy").innerHTML = "Nome";
            }
            else if (params == "id") {
                document.getElementById("orderBy").innerHTML = "Novidade";
            }
            else if (params == "priceMin") {
                document.getElementById("orderBy").innerHTML = "Preço Ascendente";
            }
            else {
                document.getElementById("orderBy").innerHTML = "Preço Descendente";
            }
            
        },
    },
    computed: {
        getInitialAmountOfProducts: function () {
            if (Math.ceil(this.productAmount / this.limit) == this.currentPage) {
                return this.limit * (this.currentPage - 1) + 1;
            } else if (this.productAmount === 0) {
                return 0;
            }
            return (this.productsInPage * this.currentPage) - this.productsInPage + 1;
        },
        getFinalAmountOfProducts: function () {
            if (Math.ceil(this.productAmount / this.limit) == this.currentPage) {
                return this.productAmount;
            }
            return this.productsInPage * this.currentPage;
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
  background-color: #64a991;
  border-radius: 10px;
  box-shadow: none;
}
.drop{
    min-width: 62%!important
}
</style>