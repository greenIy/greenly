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
  /* Container needed to position the button. Adjust the width as needed */
  .img-container {
    position: relative;
  }
  /* Make the image responsive */
  .img-container img {
    width: 100%;
    height: auto;
  }
  /* Style the button and place it in the middle of the container/image */
  .img-container .btn {
    position: absolute;
    top: 70%;
    left: 27%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
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
    top: 21%;
    left: 10%;
  }
  .img-title h2 {
    font-size: 70px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  .img-container .btn:hover {
    background-color: #35c492;
    color: #076142;
  }
  #arrow-icon {
   vertical-align: middle;
  }
</style>