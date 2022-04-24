<template>
  <div class="d-flex-shrink-0 pt-3 pl-3 mr-0"> 
    <p class=" align-items-center pb-3 mb-3 fs-4 fw-bold ps-2">
      Filtros
    </p>
    <ul class="list-unstyled ">
      <li>
        <div class="btn btn-toggle align-items-center rounded fs-6 fw-bold" @click="transformC()" data-bs-toggle="collapse" data-bs-target="#categories-collapse" aria-expanded="true">
        <font-awesome-icon id="iconC" class="fs-6 fa-fw" :icon="['fas', 'angle-up']" /> Categoria
        </div>   
        <div class="collapse show" id="categories-collapse">
          <div class="list-group list-group-flush">
            <router-link v-if="categorySelected" to="/produtos" @click='goBack()' class="list-group-item list-group-item-action border-0">
              &larr;  {{ currentCategory.name }}
            </router-link>
            
            <router-link v-for="category in showCategories" :key="category" :to="{ name: 'categoria', params: { categoria : category.name } }" @click='showProducts(category)' class="list-group-item list-group-item-action border-0">
              {{ category.name }}
            </router-link>
          </div>
        </div>
      </li>
      <li>
        <div class="btn btn-toggle align-items-center rounded fs-6 fw-bold" @click="transformP()" data-bs-toggle="collapse" data-bs-target="#price-range-collapse" aria-expanded="true">
         <font-awesome-icon  id="iconP" class="fs-6 fa-fw"  :icon="['fas', 'angle-up']"  /> Preço
        </div>

        <div class="collapse show" id="price-range-collapse">
          <div class="list-group list-group-flush pb-3">
            <span class="list-group-item border-0">
              <label for="price-min">Mínimo: &nbsp;</label>
                <input v-model.number:value="minPrice" :min="minPrice" class="form-control w-50 d-inline" id="min-price" type="number">
            </span>
            <span class="list-group-item border-0">
              <label for="price-max">Máximo: &nbsp;</label>
              <input v-model.number:value="maxPrice" :max="maxPrice" class="form-control w-50 d-inline" id="max-price" type="number">
            </span>
          </div>
        </div>
      </li>
  <!--     <li>
        <div class="btn btn-toggle align-items-center rounded fs-6 fw-bold" @click="transformF()" data-bs-toggle="collapse" data-bs-target="#fornecedores-collapse" aria-expanded="true">
        <font-awesome-icon id="iconF" class="fs-6 fa-fw" :icon="['fas', 'angle-up']" /> Fornecedor
        </div>   
        <div class="collapse show" id="fornecedores-collapse">
          <div class="list-group list-group-flush">
          
          </div>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {faAngleUp } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleUp);

  export default {
    name: "ProductsView",
    props: {
      categories: Array,
      minPrice: Number,
      maxPrice: Number,
      page: {
        type: String
      },
      category: {
        type: String
      },

    },
    data () { 
      return {
        categoryList: [],
        categorySelected: false,
        currentCategory: {},
        countC: 0,
        countP: 0,
        countF: 0,
      }
    },
    methods: {
      showProducts(category) {
        this.categoryList.push(category);
        this.currentCategory = category;
        this.categorySelected = true;
        this.$emit("sendCurrentCategory", this.currentCategory);
      },
      goBack() {
        this.categoryList.pop();
        this.currentCategory = (this.categoryList.length) ? this.categoryList[this.categoryList.length - 1] : {};
        this.categorySelected = (this.categoryList.length) ? true : false;
        this.$emit("sendGoBack", this.currentCategory);
      },
      transformC() {
        this.countC++;
        var deg=this.countC*180;
        document.getElementById("iconC").style.transform = "rotate("+deg+"deg)";
        return this.countC;
      },
      transformP() {
        this.countP++;
        var deg=this.countP*180;
        document.getElementById("iconP").style.transform = "rotate("+deg+"deg)";
        return this.countP;
      },
      transformF() {
        this.countF++;
        var deg=this.countF*180;
        document.getElementById("iconF").style.transform = "rotate("+deg+"deg)";
        return this.countF;
      },
    },
    computed: {
      showCategories: function () {
        if (this.categorySelected) {
          var filteredCategory = this.categories.filter(category => this.categoryList[this.categoryList.length-1].id == category.parent_category);
          return filteredCategory;
        }
        // show highest level of categories
        return this.categories.filter(category => category.parent_category == null);
      },
    },
  }
</script>

<style scoped>
.list-group-item {
  font-size: 12px;
}
.list-group-item input {
  font-size: 12px;
}
.form-control {
  padding: .300rem .20rem .300rem .40rem;
}
#iconC{
  color:#608072;
}
#iconP{
  color:#608072;
}
#iconF{
  color:#608072;
}
</style>