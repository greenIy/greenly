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
  import LoginForm from '@/components/Login/LoginForm.vue';


  export default {
    name: 'LoginView',
    components: {
      TheNavbar,
      TheFooter,
      LoginForm,
    },
  };
</script>

<style>
  .content-wrap {
    background-color: #EDEDED;
  }
</style>

