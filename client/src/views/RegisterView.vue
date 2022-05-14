<template>
  <div class="page-container">
    <div class="content-wrap">
      <TheNavbar/>
      <RegisterPills/>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import RegisterPills from '@/components/Register/RegisterPills.vue';

export default {
  name: 'RegisterView',
  components: {
    TheNavbar,
    TheFooter,
    RegisterPills,
  },
};

</script>
