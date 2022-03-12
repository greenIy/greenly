<template>
  <div class="product cardView">
    <ProductCard/>
    <TheNextPage/>
  </div>
</template>

<script>

import ProductCard from '@/components/Product/ProductCard.vue';
import TheNextPage from '@/components/TheNextPage.vue';

export default {
  name: 'ProductView',
  components: {
    ProductCard,
    TheNextPage,
  },
};
</script>
