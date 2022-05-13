<template>
  <div class="page-container">
    <div class="content-wrap">
      <the-navbar />
      <profile />
    </div>
    <the-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import Profile from '@/components/Profile/Profile.vue';

export default {
    name: 'ProfileView',
    components: {
        TheNavbar,
        TheFooter,
        Profile
    },
};

</script>


<style scoped>

</style>