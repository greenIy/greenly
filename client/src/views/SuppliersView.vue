<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap">
      <TheNavbar @search-information="searchInformation" />
      <h2 class="text-center">PARCEIROS</h2>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';


export default {
  name: 'SuppliersView',
  components: {
    TheNavbar,
    TheFooter,
  },
  methods:{
   
  }
};
</script>

<style scoped>
 
</style>