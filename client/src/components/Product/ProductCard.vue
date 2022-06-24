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
              {{ product.name }}
            </h4>
          </div>
          <p class="card-text text-truncate">{{ product.description }}</p>
        </div>
        </router-link>
        <div class="card-body py-0 position-relative mt-1 mb-2">
         <span class="position-absolute bottom-0"><h4 class="card-text sticky-bottom">{{ product.lowest_price }}€ - {{ product.highest_price }}€</h4></span>
        </div>
        <div class="card-body py-0 div d-flex align-items-center justify-content-between fs-6 mb-2">
          <button class="btnH fav">
            <font-awesome-icon @click="liked($event)" class="icons fa-cog" :icon="['fa', 'heart']" />
            Favoritos
          </button>
          <form>
            <div class="form-group form-check">
              <label class="form-check-label product" :for="`input_${product.id}`">
                <input type="checkbox" v-model="user.accept" :id="`input_${product.id}`" @click="compare($event)" class="form-check-input checkbox"/>Comparar Produto</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);

export default {
  name: "ProductCard",
  props: {
    product: Object,
    quantityP:Number,
  },
  data() {
    return {
      isActive: false,
      quantity:0,
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
    compare(event){
      if (Object.keys(this.$route.query).length < 2){
        if (!this.$route.query.compare1) {
          this.$router.push({ query: Object.assign({}, this.$route.query, { compare1: `${ this.product.id }`  }) });
        } else if (!this.$route.query.compare2) {
          this.$router.push({ query: Object.assign({}, this.$route.query, { compare2: `${ this.product.id }`  }) });
        }
      }
      else{
        console.log("NAO POSSO ACRESCENTAR")
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
  margin-left: 4px;
  margin-right: 4px;
} 

</style>
