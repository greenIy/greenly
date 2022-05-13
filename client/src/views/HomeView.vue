<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap">
      
      <TheNavbar @search-information="searchInformation"/>
      
      <router-link to="/produtos">
        <img alt="Logo do greenly" src="../assets/poster.png" id="front">
      </router-link>
    </div>
    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';

export default {
  name: 'HomeView',
  components: {
    TheNavbar,
    TheFooter
  },
  methods: {
    searchInformation: function (params) {
      console.log(this.$route.name);

      //current page??
      //limit??
      http.get("/store/products?page=1&limit=12&keywords=" + params).then((response) => {
        this.products = response.data.products;
        this.productAmount = response.data.total_products;
        console.log(response.data);
      });
    }
  }
};
</script>

<style>
  body {
    background:#ededed;
  }
  .page-container {
    position: relative;
    min-height: 100vh;
  }
  .content-wrap {
    padding-bottom: 7.5rem;
  }
  #front {
    width: 100%;
  }
</style>
