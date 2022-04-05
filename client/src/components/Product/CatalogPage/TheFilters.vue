<template>
  <div class="d-flex-shrink-0 pt-3 pl-3 mr-0"> 
    <p class=" align-items-center pb-3 mb-3 fs-4 fw-bold ps-2">
      Filtros
    </p>

    <ul class="list-unstyled ">
      <li>
        <!-- Current category being displayed -->
        <div class="btn btn-toggle align-items-center rounded collapsed fs-6 fw-bold" data-bs-toggle="collapse" data-bs-target="#categories-collapse" aria-expanded="true">
          Categoria
        </div>
                
        <div class="collapse" id="categories-collapse">
          <div class="list-group list-group-flush">
            <!-- Parent category of the current category (if applicable) -->
            <a v-if="currentCategory" href="#" class="list-group-item list-group-item-action border-0">
              &larr; {{ currentCategory.name }}
            </a>

            <!-- Existing categories within the current category -->      
            <a v-for="category in categories" :key="category" @click='showProducts(category)' class="list-group-item list-group-item-action border-0">
              {{ category.name }} {{$route.params.id}} <!-- POR CADA CATEGORIA NO SCRIPT + AO CLICAR VAI PARA PAGINA/MUDA PAGINA!! -->
            </a> 
          </div>
        </div>
      </li>

      <li class="border-top my-3"></li>

      <li>
        <div class="btn btn-toggle align-items-center rounded collapsed fs-6 fw-bold" data-bs-toggle="collapse" data-bs-target="#price-range-collapse" aria-expanded="true">
          Preço
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
  export default {
    props: {
      categories: Array,
      minPrice: Number,
      maxPrice: Number,
      //'switchCurrentCategory',
      currentCategory: Object,
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
        currentCategory: 0,
        //currentMinPrice,
        //currentMaxPrice,
        //parentCategory
      }
    },
    methods: {
      showProducts(category) {
        this.currentCategory = category;
        this.$emit("sendCurrentCategory", this.currentCategory);
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