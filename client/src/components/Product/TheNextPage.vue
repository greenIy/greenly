<template>
<div class="d-flex justify-content-center mt-5">
  <nav aria-label="page navigation example" >
    <ul class="pagination">
      <li class="page-item">
        <button class="page-link" @click='prevPage()'>
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Anterior</span>
        </button>
      </li>
      <li class="page-item" v-for="n in 5" :key="n"><button class="page-link" @click='definePage(n)'> {{ n }} </button></li>
      <li class="page-item">
        <button class="page-link" @click='nextPage()'>
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Seguinte</span>
        </button>
      </li>
    </ul>
  </nav>
</div>
</template>
<script>

export default {
  name: 'TheNextPage',
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("sendCurrentPage", this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < 5) {
        this.currentPage++;
        this.$emit("sendCurrentPage", this.currentPage);
      }
    },
    definePage(num) {
        this.currentPage = num;
        this.$emit("sendCurrentPage", this.currentPage);
    },
  },
};
</script>

<style scoped>

button {
  color: black;
}

button:hover {
  color: #608072;
}

button:focus {
  color: #608072;
  box-shadow: none;
}

</style>
