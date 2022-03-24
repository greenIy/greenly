<template>
  <div class="page-container">
    <div class="content-wrap">
      <the-navbar />
      <router-link to="/products">
        <img alt="Logo do greenly" src="../assets/poster.png" id="front">
      </router-link>
    </div>
    <the-footer />
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
    TheFooter,
  },
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

  #front {
    width: 100%;
  }
</style>
