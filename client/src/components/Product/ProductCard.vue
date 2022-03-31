<template>
  <div>
    <div class="card-group card mt-2 h-100 d-flex">
      <div class="card h-100 hover-shadow d-flex">
        <img class="img-fluid mt-3" src="../../assets/Team/daniela.jpg" alt="imagem do produto" />
        <div class="card-body">
          <h5 class="card-title">{{ category }}</h5>
          <div>
            <h4 class="card-title">
              <!-- eslint-disable max-len -->
              {{ name }}
            </h4>
          </div>
          <p class="card-text">{{ description }}</p>
        </div>
        <div class="card-body py-0 position-relative mt-1 mb-1">
         <span class="position-absolute bottom-0"><h4 class="card-text sticky-bottom">{{ lowestPrice }}€ - {{ highestPrice }}€</h4></span>
        </div>
        <div class="div d-flex align-items-center justify-content-between fs-6 mb-3">
          <button class="btnH fav">
            <font-awesome-icon @click="liked($event)" class="icons fa-cog" :icon="['fa', 'heart']" size="xs" />
            Favoritos
          </button>
          <form>
            <div class="form-group form-check">
              <label class="form-check-label ms-2 product" for="accept">
                <input
                  type="checkbox"
                  v-model="user.accept"
                  id="accept"
                  class="form-check-input checkbox"
                />Comparar Produto</label
              >
            </div>
          </form>
        </div>
        <!--          <div class="d-inline-block mt-2 mb-3 center">
        <button class="btnS">
           <font-awesome-icon class="icons " :icon="['fa', 'cart-plus']" size="lg"/> Adicionar ao Carrinho </button>
        </div > -->
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
    name: String,
    description: String,
    category: String,
    highestPrice: Number,
    lowestPrice: Number,
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
      if(svg.tagName.toLowerCase()=='button'){
      }else{
      if (svg.classList.contains('red')) {
        svg.classList.remove("red");
      } else {
        svg.classList.add("red");
      }
      }
    },
  },
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
.div {
  margin: auto;
}

.div button,
.div label {
  font-size: 11px;
}

.fav {
  color: #2c3e50;
}

.fav:hover {
  color: black;
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
</style>
