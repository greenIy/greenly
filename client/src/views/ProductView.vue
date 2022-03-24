<template>
<div class="page-container">
    <div class="content-wrap">
      <the-navbar />
      <ProductCard/>
      <TheNextPage/>
    </div>
   <the-footer />
</div>
</template>

<script>

import ProductCard from '@/components/Product/ProductCard.vue';
import TheNextPage from '@/components/TheNextPage.vue';
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';

export default {
  name: 'ProductView',
  components: {
    ProductCard,
    TheNextPage,
    TheNavbar,
    TheFooter,
  },
};
</script>
