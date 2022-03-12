<template>

  <div class="register">

    <the-navbar/>

    <register-form/>

    <the-footer/>

  </div>

  
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import registerForm from '../components/registerForm.vue';

export default {
  name: 'RegisterView',
  components: {
    TheNavbar,
    TheFooter,
    registerForm,
  },
};

</script>

<style scoped>


</style>