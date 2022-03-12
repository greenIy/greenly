<template>
  <div class="page-container">
    <div class="content-wrap">
      <the-navbar />
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
</style>
