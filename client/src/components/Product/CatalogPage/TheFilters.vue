<template>
  <div class="d-flex-shrink-0 pt-3 pl-3 mr-0"> 
    <p class=" align-items-center pb-3 mb-3 fs-4 fw-bold ps-2">
      Filtros
    </p>

    <ul class="list-unstyled ">
      <li>
        <!-- Current category being displayed -->
        <div class="btn btn-toggle align-items-center rounded collapsed fs-6 fw-bold" @click="transformC()" data-bs-toggle="collapse" data-bs-target="#categories-collapse" aria-expanded="false">
        <font-awesome-icon id="iconC" :icon="['fas', 'angle-up']" size="xs" /> Categoria
        </div>
                
        <div class="collapse" id="categories-collapse">
          <div class="list-group list-group-flush">
            <!-- Parent category of the current category (if applicable) -->
            <router-link v-if="categorySelected" to="/produtos" @click='goBack()' class="list-group-item list-group-item-action border-0">
              <font-awesome-icon :icon="['fas', 'arrow-left']" size="sm"/> {{ currentCategory.name }}
            </router-link>
            
            <router-link v-for="category in showCategories" :key="category" :to="{ name: 'categoria', params: { categoria : category.name } }" @click='showProducts(category)' class="list-group-item list-group-item-action border-0">
              {{ category.name }}
            </router-link>
            
            <!-- Existing categories within the current category -->      
            <!-- <a v-for="category in categories" :key="category" @click='showProducts(category)' class="list-group-item list-group-item-action border-0">
              {{ category.name }} {{$route.params.id}}
            </a>  -->
          </div>
        </div>
      </li>

      <li class="border-top my-3"></li>

      <li>
        <div class="btn btn-toggle align-items-center rounded collapsed fs-6 fw-bold"  data-bs-toggle="collapse" data-bs-target="#price-range-collapse" aria-expanded="false">
         <font-awesome-icon  id="iconP" @click="transformP()" :icon="['fas', 'angle-up']" size="xs" /> Preço
        </div>

        <div class="collapse" id="price-range-collapse">
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

      <li class="border-top my-3"></li>
    </ul>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faAngleUp } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleUp);
library.add(faArrowLeft);

  export default {
    name: "ProductsView",
    props: {
      categories: Array,
      minPrice: Number,
      maxPrice: Number,
      //'switchCurrentCategory',
      page: {
        type: String
      },
      category: {
        type: String
      },
      //'parentCategory',
      //'absoluteMaxPrice',
      //'switchPriceRange'
    },
    data () { 
      return {
        categoryList: [],
        categorySelected: false,
        currentCategory: {},
        //currentMinPrice,
        //currentMaxPrice,
        //parentCategory
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
         document.getElementById("iconC").style.transform = "rotate(180deg)";
        console.log("oiee");
      },
      transformP() {
         document.getElementById("iconP").style.transform = "rotate(180deg)";
        console.log("oiee");
      },
    },
    computed: {
      showCategories: function () {
        if (this.categorySelected) {
          return this.categories.filter(category => this.categoryList.some(c => c.id != category.id));
        }
        return this.categories;
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

</style>