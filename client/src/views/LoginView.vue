<template>

  <div class="login">

    <the-navbar/>

    <login-form/>

    <the-footer/>

  </div>

</template>

<script>
  // @ is an alias to /src
  import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
  import TheFooter from '@/components/Frontpage/TheFooter.vue';
  import loginForm from '@/components/loginForm.vue';


  export default {
    name: 'LoginView',
    components: {
      TheNavbar,
      TheFooter,
      loginForm,
    },
  };
</script>

<style scoped>


</style>

