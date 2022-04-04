<template>
  <div class="flex-shrink-0 p-3" style="width: 20%;"> <!--eu tinha a utility bar e produtos dentro de um div igual mas com width 80%. estes dois divs estavam dentro do container-->
    <p class="d-flex align-items-center pb-3 mb-3 fs-4 fw-bold ps-2">
      Filtros
    </p>

    <ul class="list-unstyled ">
      <li>
        <!-- Current category being displayed -->
        <div class="btn btn-toggle align-items-center rounded collapsed fs-6 fw-bold" data-bs-toggle="collapse" data-bs-target="#categories-collapse" aria-expanded="false">
          Categoria
        </div>
                
        <div class="collapse" id="categories-collapse">
          <div class="list-group list-group-flush">
            <!-- Parent category of the current category (if applicable) -->
            <a v-if="parentCategory" href="#" class="list-group-item list-group-item-action border-0">
              &larr; {{ parentCategory }}
            </a>

            <!-- Existing categories within the current category -->      
            <a v-for="category in categories" :key="category" @click="() => switchCurrentCategory(category)" class="list-group-item list-group-item-action border-0">
              {{ category }} <!--POR CADA CATEGORIA NO SCRIPT + AO CLICAR VAI PARA PAGINA/MUDA PAGINA!!-->
            </a>
          </div>
        </div>
      </li>

      <li class="border-top my-3"></li>

      <li>
        <div class="btn btn-toggle align-items-center rounded collapsed fs-6 fw-bold" data-bs-toggle="collapse" data-bs-target="#price-range-collapse" aria-expanded="false">
          Preço
        </div>

        <div class="collapse" id="price-range-collapse">
          <div class="list-group list-group-flush pb-3">
            <!-- Minimum value of the displayed products -->
            <span class="list-group-item border-0">
              <label for="price-min">Mínimo: &nbsp;</label>
                <input v-model.number:value="currentMinPrice" @keyup.enter="() => switchPriceRange(category)" class="form-control w-50 d-inline" id="min-price" type="number" min="0">
            </span>

            <!-- Maximum value of the displayed products -->
            <span class="list-group-item border-0">
              <label for="price-max">Máximo: &nbsp;</label>
              <input v-model.number:value="currentMaxPrice" :max="absoluteMaxPrice" @keyup.enter="() => switchPriceRange(category)" class="form-control w-50 d-inline" id="max-price" type="number" min="0">
            </span>
          </div>
        </div>
      </li>

      <li class="border-top my-3"></li>
    </ul>
  </div>
</template>

<script>
const parentCategory = 'eu'

  export default {
    props: [
      'categories',
      'switchCurrentCategory',
      'currentCategory',
      'parentCategory',
      'absoluteMaxPrice',
      'switchPriceRange'
    ],

    data () { //what im giving out from this page
      return {
        //currentMinPrice,
        //currentMaxPrice,
        parentCategory
      }
    }
  }
</script>