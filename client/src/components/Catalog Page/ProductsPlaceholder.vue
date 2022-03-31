<template>
  <h1>Produtos</h1>

  <!--<div v-for="product in products" :key="product.id">
    <h2>nome: {{ product.name }}</h2>
    <p> categoria: {{product.category}}</p>
    <p>preço: {{ product.price }}</p>
  </div>-->
</template>

<script>
export default {
  props: [
    'products'
  ]
}
</script>