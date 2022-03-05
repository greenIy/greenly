<template>
  <div class="home">
    <the-navbar />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  name: 'HomeView',
  components: {
    TheNavbar,
  },
};
</script>
