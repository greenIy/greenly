<template>
<div class="d-flex justify-content-end size mt-3">
        <div class="row">
            <div class="col-6 pt-2">
                <p class="text-secondary fs-6">
                    {{ (productAmount * currentPage) - productAmount + 1 }} - {{ productAmount * currentPage }} de 60 produtos 
                </p>
            </div>
             <div class="dropdown col-2 justify-content-end">
                <a class="dropdown-toggle btn rounded text-decoration-none" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">Ver</a>
                <ul class="dropdown-menu" aria-labelledby="order-by">
                    <li><a class="dropdown-item" href="#">12</a></li>
                    <li><a class="dropdown-item" href="#">24</a></li>
                    <li><a class="dropdown-item" href="#">48</a></li>
                </ul>
            </div>
            <div class="dropdown col-4 align-self-start justify-content-end">
                <a class="dropdown-toggle btn rounded text-decoration-none" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por</a>
                <ul class="dropdown-menu" aria-labelledby="order-by">
                    <li><a class="dropdown-item" href="#">Nome</a></li>
                    <li><a class="dropdown-item" href="#">Novidade</a></li>
                    <li><a class="dropdown-item" href="#">Preço Ascendente</a></li>
                    <li><a class="dropdown-item" href="#">Preço Descendente</a></li>
                </ul>
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
    },
    data() {
        return {
            lastPageProducts: 0,
        };
    },
    methods: {
        getTotalProducts: function() {
            http.get("/store/products?page=" + this.pageAmount + "&limit="+ this.limit).then((response) => {
               this.lastPageProducts = response.data.products.length;
            });
        },
    }
  }
</script>

<style scoped>
.size{
    width:91%;
}

.btn{
  border: none;
  color: white;
  background-color: #7c9d8e;
  border-radius: 10px;
  box-shadow: none;
}
.dropdown-menu{
    min-width: 90%!important
}
</style>