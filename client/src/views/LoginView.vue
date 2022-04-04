<template>
  <div class="page-container">
    <div class="content-wrap">
      <the-navbar/>
      <login-form/>
    </div>
    <the-footer/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
  import TheFooter from '@/components/Frontpage/TheFooter.vue';
  import loginForm from '@/components/Login/loginForm.vue';


  export default {
    name: 'LoginView',
    components: {
      TheNavbar,
      TheFooter,
      loginForm,
    },
  };
</script>

<style>


</style>

