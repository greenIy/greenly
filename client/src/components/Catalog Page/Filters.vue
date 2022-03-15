<template>
  <h1>Filtros</h1>

  <p v-for="filter in filters" :key="filter" @click="() => filterProducts(filter)">
    {{ filter }}
  </p>
</template>

<script>
const filters = [
  'Todos',
  'Casa',
  'Eletrónica',
  'Moda',
  'Nicki Minaj',
  'Uh'
]

export default {
  props: [
    'filterProducts'
  ],
  data () {
    return {
        filters
    }
  }
}
</script>