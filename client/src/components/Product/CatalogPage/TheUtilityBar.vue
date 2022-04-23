<template>
<div class="container size">
<div class="d-flex justify-content-end mt-3">
        <div class="row">
            <div class="col-6 pt-2">
                <p class="text-secondary fs-6">
                    {{ (productsInPage * currentPage) - productsInPage + 1 }} - {{ productsInPage * currentPage }} de {{ productAmount }} produtos 
                </p>
            </div>
             <div class="dropdown col-2 justify-content-end pt-1">
                <a class="dropdown-toggle  btn rounded text-decoration-none" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">{{ limit }}</a>
                <ul class="dropdown-menu drop" aria-labelledby="order-by">
                    <li><a class="dropdown-item" @click='productsPerPage(12)'>12</a></li>
                    <li><a class="dropdown-item" @click='productsPerPage(24)'>24</a></li>
                    <li><a class="dropdown-item" @click='productsPerPage(48)'>48</a></li>
                </ul>
            </div>
            <div class="dropdown col-4 align-self-start justify-content-end pt-1">
                <a class="dropdown-toggle btn rounded text-decoration-none" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por</a>
                <ul class="dropdown-menu" aria-labelledby="order-by">
                    <li><a class="dropdown-item" @click='order("name")'>Nome</a></li>
                    <li><a class="dropdown-item" @click='order("id")'>Novidade</a></li>
                    <li><a class="dropdown-item" @click='order("priceMin")'>Preço Ascendente</a></li>
                    <li><a class="dropdown-item" @click='order("priceMax")'>Preço Descendente</a></li>
                </ul>
            </div>
        </div>
</div>
</div>
</template>

<script>
import http from "../../../../http-common";

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
    min-width: 80%!important
}
</style>