<template>

  <div class="register">

    <the-navbar/>

    <register-pills/>

    <the-footer/>

  </div>

  
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import registerPills from '../components/registerPills.vue';

export default {
  name: 'RegisterView',
  components: {
    TheNavbar,
    TheFooter,
    registerPills,
  },
};

</script>


<style scoped>

</style>