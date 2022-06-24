<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap">
      <TheNavbar @search-information="searchInformation" />
      <div id="hero2">
        <div class="hero-container">
          <div class="img-title">
            <h2>Nós</h2>
            <h2>construímos um</h2>
            <h2>mundo melhor</h2>
          </div>
            <router-link to="/produtos" tag="button" class="btn">Explore os nossos produtos <span  id="arrow-icon"><font-awesome-icon :icon="['fas', 'arrow-right']" size="sm" /></span></router-link>
        </div>
    </div>
      <!-- <div class="img-container">
        <div class="img-title">
          <h2>Nós</h2>
          <h2>construímos um</h2>
          <h2>mundo melhor</h2>
        </div>
          <img alt="Logo do greenly" src="../assets/poster.png" class="img-fluid">
          <router-link to="/produtos" tag="button" class="btn">Explore os nossos produtos <span  id="arrow-icon"><font-awesome-icon :icon="['fas', 'arrow-right']" size="sm" /></span></router-link>
      </div> -->
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
 
  /* Style the button and place it in the middle of the container/image */
  .hero-container .btn {
    position: absolute;
    top: 70%;
    left: 15%;
    background-color: #41a984;
    color: white;
    font-size: 29px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .img-title {
    position: absolute;
    top: 22%;
    left: 10%;
  }

  .hero-container h2 {
    font-size: 445%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .hero-container .btn:hover {
    background-color: #35c492;
    color: #076142;
  }

  #arrow-icon {
   vertical-align: middle;
  }

  #hero2 {
    width: 100%;
    height: 100vh;
    background: url("../assets/poster.png") top center;
    background-attachment: scroll;
    background-size: auto;
    background-size: cover;
    position: relative;
    z-index: 9;
}

#hero2 .hero-container {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 15px;
}
</style>
