<template>
  <div class="page-container">
    <div class="content-wrap">
      <the-navbar />

        <div class="container">
            <div class="half">
                <Filters :filterProducts="filterProducts"/>
            </div>

            <div class="half">
                <ProductsPlaceholder :products="products"/>
            </div>
        </div>
    </div>
    <the-footer />
  </div>
</template>

<script>

// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import Filters from '../components/Catalog Page/Filters.vue'
import ProductsPlaceholder from '../components/Catalog Page/ProductsPlaceholder.vue'
import mock_prods from '../mock_prods.json'

export default {
  name: 'FiltersView',
  components: {
    TheNavbar,
    TheFooter,
    Filters,
    ProductsPlaceholder
  },
  data () {
    return {
      products: mock_prods,
    }
  },
  methods: {
    filterProducts (catName) {
      this.resetProducts()
      if (catName !== 'Todos') {
        this.products = this.products.filter((product) => {
          console.log("found match value")
          return product.category === catName
        })
      }
    },
    resetProducts () {
      this.products = mock_prods
    }
  }
};
</script>

<style>
  .page-container {
    position: relative;
    min-height: 100vh;
  }

  .content-wrap {
    padding-bottom: 7.5rem;
  }

  img {
    width: 100%;
  }
    .container { 
    display: flex;
    margin: 20px;
    }
    .half { 
    width: 50%;
    }
</style>
