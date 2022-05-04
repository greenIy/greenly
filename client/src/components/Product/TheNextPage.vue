<template>
<div class="d-flex justify-content-center mt-5">
  <nav aria-label="page navigation example" >
    <ul class="pagination">
      <li class="page-item disabled" id="previous">
        <button type="button" class="page-link" @click='prevPage()'>
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Anterior</span>
        </button>
      </li>
      <li class="page-item" v-for="n in getPages" :key="n" :id="'page-' + n"><button class="page-link" @click='definePage(n)'> {{ n }} </button></li>
      <li class="page-item" id="next">
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
  props: {
    pageAmount: Number,
  },
  data() {
    return {
      currentPage: 1,
      pages: this.pageAmount,
    };
  },
  updated() {
    this.setPageActive();
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        var page = document.getElementById("page-" + this.currentPage);
        page.classList.remove("active");
        this.currentPage--;
        page = document.getElementById("page-" + this.currentPage);
        page.classList.add("active");
        this.$emit("sendCurrentPage", this.currentPage);

        this.manageDisable();
      }
    },
    nextPage() {
      if (this.currentPage < 5) { // ajeitar
        var page = document.getElementById("page-" + this.currentPage);
        page.classList.remove("active");
        this.currentPage++;
        page = document.getElementById("page-" + this.currentPage);
        page.classList.add("active");
        this.$emit("sendCurrentPage", this.currentPage);

        this.manageDisable();
      }
    },
    definePage(num) {
        var page = document.getElementById("page-" + this.currentPage);
        page.classList.remove("active");
        this.currentPage = num;
        page = document.getElementById("page-" + this.currentPage);
        page.classList.add("active");

        this.$emit("sendCurrentPage", this.currentPage);
        this.manageDisable();
    },
    manageDisable() {
      var previous = document.getElementById("previous");
      var next = document.getElementById("next");
      if (this.currentPage != 1) {
        previous.classList.remove("disabled");
      } else {
        previous.classList.add("disabled");
      }

      if (this.currentPage == 5) {
        next.classList.add("disabled");
      } else {
        next.classList.remove("disabled");
      }
    },
    setPageActive() {
      document.getElementById("page-1").classList.add("active");
    },
  },
  computed: {
    getPages: function () {
      this.pages = this.pageAmount;
      return this.pages;
    }
  }
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

.page-item.active .page-link {
  color: #608072;
  background-color: #ededed;
  border: #dee2e6 1px solid;
}

</style>
