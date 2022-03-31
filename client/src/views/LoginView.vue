<template>
  <div class="page-container">
    <div class="content-wrap">
      <TheNavbar/>
      <LoginForm/>
    </div>
    <TheFooter/>
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


</style>

