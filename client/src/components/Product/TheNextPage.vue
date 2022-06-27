<template>
<div class="d-flex justify-content-center mt-4">
  <nav aria-label="page navigation example" v-if="getPages != 0">
    <ul class="pagination">
      <li class="page-item disabled" id="previous">
        <button type="button" class="page-link" @click='prevPage()'>
          <span aria-hidden="true"><font-awesome-icon id="iconC" class="fs-7 fa-fw" :icon="['fas', 'angle-left']" /></span>
          <span class="sr-only">Anterior</span>
        </button>
      </li>
      <li class="page-item" v-for="n in getPages" :key="n" :id="'page-' + n"><router-link append :to="{ query: { ...$route.query, pag: n } }"><button class="page-link"> {{ n }}</button></router-link></li>
      <li class="page-item" id="next">
        <button class="page-link" @click='nextPage()'>
          <span aria-hidden="true"><font-awesome-icon id="iconC" class="fs-7 fa-fw" :icon="['fas', 'angle-right']" /></span>
          <span class="sr-only">Seguinte</span>
        </button>
      </li>
    </ul>
  </nav>
</div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {faAngleLeft, faAngleRight  } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleLeft);
library.add(faAngleRight);

export default {
  name: 'TheNextPage',
  props: {
    pageAmount: Number,
  },
  data() {
    return {
      currentPage: -1,
      pages: this.pageAmount,
    };
  },
  mounted() {
    this.setPageActive();
  },
  updated() {
    this.setPageActive();
  },
  methods: {
    prevPage() {
      let page = this.$route.query.pag ? this.$route.query.pag - 1 : 1;
      if (page > 0) {
        this.$router.push({ query: Object.assign({}, this.$route.query, { pag: `${ page }` }) });

        let pageElement = document.getElementById("page-" + (page + 1));
        pageElement.classList.remove("active");
        pageElement = document.getElementById("page-" + page);
        pageElement.classList.add("active");

        this.manageDisable(page);
      }
    },
    nextPage() {
      let page = this.$route.query.pag ? parseInt(this.$route.query.pag) + 1 : 1;
      if (this.currentPage < this.pageAmount) {
        this.$router.push({ query: Object.assign({}, this.$route.query, { pag: `${ page }` }) });

        let pageElement = document.getElementById("page-" + (page - 1));
        pageElement.classList.remove("active");
        pageElement = document.getElementById("page-" + page);
        pageElement.classList.add("active");

        this.manageDisable(page);
      }
    },
    manageDisable(page) {
      let previous = document.getElementById("previous");
      let next = document.getElementById("next");

      if (page != 1) {
        previous.classList.remove("disabled");
      } else {
        previous.classList.add("disabled");
      }

      if (page == this.pages) {
        next.classList.add("disabled");
      } else {
        next.classList.remove("disabled");
      }
    },
    setPageActive() {
      let page = this.$route.query.pag ? this.$route.query.pag : 1;
      if(this.currentPage != -1) {
        document.getElementById("page-" + this.currentPage).classList.remove("active");
      }
      
      this.currentPage = page;
      document.getElementById("page-" + page).classList.add("active");
      this.manageDisable(page);
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

a {
  text-decoration: none;
}

button {
  color: black;
}

button:hover {
  color: #5e9f88;
}

button:focus {
  color: #5e9f88;
  box-shadow: none;
}

.page-item.active .page-link {
  color: #5e9f88;
  background-color: #ededed;
  border: #dee2e6 1px solid;
}

</style>
