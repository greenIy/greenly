<template>
  <div class="product-card ml-2 mb-2 mr-2">
    <div class="card-group card h-100 d-flex">
      <div class="card h-100 hover-shadow d-flex">
        <router-link :to="'/produto/'+ String(product.id)" style="text-decoration:none;color:black;">
        <div class="d-flex">
        <img class="img-fluid mt-3" src="../../assets/Team/daniela.jpg" alt="Imagem do produto"  />
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ product.category.name }}</h5>
          <div>
            <h4 class="card-title">
              <!-- eslint-disable max-len -->
              {{ product.name }}
            </h4>
          </div>
          <p class="card-text text-truncate">{{ product.description }}</p>
        </div>
        </router-link>
        <div class="card-body py-0 position-relative mt-1 mb-1">
         <span class="position-absolute bottom-0"><h4 class="card-text sticky-bottom">{{ product.lowest_price }}€ - {{ product.highest_price }}€</h4></span>
        </div>
        <div class="div card-body py-0 position-relative mt-1 mb-3">
          <button class="btnH fav">
            <font-awesome-icon @click="liked($event)" class="icons fa-cog" :icon="['fa', 'heart']" size="xs" />
            Favoritos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
  data() {
    return {
      isActive: false,
      user: {
        accept: false,
      },
    };
  },
  methods: {
    liked(event){
      const svg = event.path[1]
      if (svg.classList.contains('red')) {
        svg.classList.remove("red");
      } else {
        svg.classList.add("red");
      } 
    },
  }
};
</script>
<style scoped>
h4 {
  font-size: 14px;
}
h5 {
  font-size: 10px;
}
.card {
  margin: auto;
  width: 14rem;
  font-size: 10px;
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
  margin-left: 4px;
  margin-right: 4px;
} 

</style>
