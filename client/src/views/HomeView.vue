<template>
  <div class="home">
    <the-navbar />
    <the-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'HomeView',
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>
