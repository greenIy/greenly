<template>
  <div class="home">
    <the-navbar />
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
