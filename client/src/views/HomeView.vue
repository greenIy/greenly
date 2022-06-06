<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap">
      <TheNavbar @search-information="searchInformation" />
      <div class="img-container">
        <div class="img-title">
          <h2>Nós</h2>
          <h2>construímos um</h2>
          <h2>mundo melhor</h2>
        </div>
          <img alt="Logo do greenly" src="../assets/poster.png" id="front">
          <router-link to="/produtos" tag="button" class="btn">Explore os nossos produtos <span  id="arrow-icon"><font-awesome-icon :icon="['fas', 'arrow-right']" size="sm" /></span></router-link>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
export default {
  name: 'HomeView',
  components: {
    TheNavbar,
    TheFooter,
  },
  methods:{
   
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
 
</style>