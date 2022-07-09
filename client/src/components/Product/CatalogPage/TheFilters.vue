<template>
  <p class="align-items-center pb-3 mb-3 fs-4 fw-bold ps-2">Filtros</p>
  <ul class="list-unstyled">
    <li>
      <div
        class="btn btn-toggle align-items-center rounded fs-6 fw-bold"
        @click="transformC()"
        data-bs-toggle="collapse"
        data-bs-target="#categories-collapse"
        aria-expanded="true"
      >
        <font-awesome-icon
          id="iconC"
          class="fs-6 fa-fw"
          :icon="['fas', 'angle-up']"
        />
        Categoria
      </div>
      <div class="collapse show" id="categories-collapse">
        <div class="list-group list-group-flush overflow-auto">
          <router-link
            v-if="categorySelected"
            :to="{ path: '/produtos' + urls, query: { ...$route.query } }"
            @click="goBack()"
            class="list-group-item list-group-item-action border-0"
            style="color: #5e9f88"
          >
            <font-awesome-icon
              id="iconC"
              class="fs-7 fa-fw"
              :icon="['fas', 'angle-left']"
            />
            {{ currentCategory.name }}
          </router-link>

          <router-link
            v-for="category in showCategories"
            :key="category"
            :to="{
              path: $route.path + '/' + category.id,
              query: { ...$route.query },
            }"
            @click="showProducts(category)"
            class="list-group-item list-group-item-action border-0"
          >
            &nbsp; {{ category.name }}
          </router-link>
        </div>
      </div>
    </li>
    <li>
      <div
        class="btn btn-toggle align-items-center rounded fs-6 fw-bold"
        @click="transformP()"
        data-bs-toggle="collapse"
        data-bs-target="#price-range-collapse"
        aria-expanded="true"
      >
        <font-awesome-icon
          id="iconP"
          class="fs-6 fa-fw"
          :icon="['fas', 'angle-up']"
        />
        Preço
      </div>

      <div class="collapse show" id="price-range-collapse">
        <div class="list-group list-group-flush pb-3">
          <span class="list-group-item border-0">
            <label for="price-min">Mínimo: &nbsp;</label>
            <input
              v-model="priceMin"
              min="0"
              class="form-control w-50 d-inline"
              id="min-price"
              type="number"
              @keyup.enter="updateProductsByMinPrice(this.priceMin)"
              onkeypress="return (event.charCode == 8 A|| event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
            />
          </span>
          <span class="list-group-item border-0">
            <label for="price-max">Máximo: &nbsp;</label>
            <input
              v-model="priceMax"
              :max="maxPrice"
              min="0"
              class="form-control w-50 d-inline"
              id="max-price"
              type="number"
              @keyup.enter="updateProductsByMaxPrice(this.priceMax)"
              onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
            />
          </span>
        </div>
      </div>
    </li>
    <li>
      <div
        class="btn btn-toggle align-items-center rounded fs-6 fw-bold"
        @click="transformF()"
        data-bs-toggle="collapse"
        data-bs-target="#fornecedores-collapse"
        aria-expanded="false"
      >
        <font-awesome-icon
          id="iconF"
          class="fs-6 fa-fw"
          :icon="['fas', 'angle-down']"
        />
        Fornecedor
      </div>
      <div class="collapse" id="fornecedores-collapse">
        <div class="list-group list-group-flush filtro-fornecedor">
          <div class="overflow-auto">
            <router-link
              v-for="supplier in this.suppliers"
              :key="supplier"
              append
              :to="{
                query: { ...$route.query, fornecedor: `${supplier.id}` },
              }"
              class="list-group-item list-group-item-action border-0"
            >
              &nbsp; {{ supplier.company.name }}
            </router-link>
          </div>
          <button
            type="button"
            class="btn remove-btn mt-2"
            @click="removeSupplierFilter()"
          >
            Limpar filtro
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp,
  faAngleLeft,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleUp);
library.add(faAngleLeft);
library.add(faAngleDown);

export default {
  name: "TheFilters",
  props: {
    categories: Array,
    currentCategories: Array,
    suppliers: Array,
    page: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  data() {
    return {
      categoryList: [],
      categorySelected: false,
      currentCategory: {},
      countC: 0,
      countP: 0,
      countF: 0,
      return: false,
    };
  },
  updated() {
    if (this.$route.params.categoria) {
      this.updateCategoriesList();
    }
  },
  watch: {
    urls: function () {
      this.$forceUpdate();
    },
    currentCategories: function () {
      this.updateCategoriesList();
    },
  },
  methods: {
    updateCategoriesList() {
      this.categoryList = this.currentCategories;
      this.currentCategory = this.categoryList.length
        ? this.categoryList[this.categoryList.length - 1]
        : { id: "", name: "" };
      this.categorySelected = this.categoryList.length ? true : false;
    },
    showProducts(category) {
      this.categoryList.push(category);
      this.currentCategory = category;
      this.categorySelected = true;
    },
    goBack() {
      this.categoryList.pop();
      this.currentCategory = this.categoryList.length
        ? this.categoryList[this.categoryList.length - 1]
        : { id: "", name: "" };
      this.categorySelected = this.categoryList.length ? true : false;
      this.return = true;
      this.$router.push({
        path: "/produtos" + this.getGoBackUrl(),
        query: { ...this.$route.query },
      });
    },
    transformC() {
      this.countC++;
      var deg = this.countC * 180;
      document.getElementById("iconC").style.transform =
        "rotate(" + deg + "deg)";
      return this.countC;
    },
    transformP() {
      this.countP++;
      var deg = this.countP * 180;
      document.getElementById("iconP").style.transform =
        "rotate(" + deg + "deg)";
      return this.countP;
    },
    transformF() {
      this.countF++;
      var deg = this.countF * 180;
      document.getElementById("iconF").style.transform =
        "rotate(" + deg + "deg)";
      return this.countF;
    },
    updateProductsByMinPrice(minPrice) {
      if (minPrice === "") {
        minPrice = 0;
      }

      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          preco_min: `${minPrice}`,
        }),
      });
    },
    updateProductsByMaxPrice(maxPrice) {
      if (maxPrice === "") {
        maxPrice = 9000000;
      }

      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          preco_max: `${maxPrice}`,
        }),
      });
    },
    getGoBackUrl() {
      let url = "";
      if (this.$route.params.categoria != undefined) {
        for (let i in this.$route.params.categoria) {
          url += "/" + this.$route.params.categoria[i];
        }
      }
      if (this.return) {
        let urlSeparated = url.split("/");
        url = "";
        urlSeparated.splice(0, 1);
        urlSeparated.splice(urlSeparated.length - 1, 1);

        for (let i = 0; i < urlSeparated.length; i++) {
          console.log(urlSeparated[i]);
          url += "/" + urlSeparated[i];
        }
      }

      this.return = false;
      return url;
    },
    removeSupplierFilter() {
      let query = Object.assign({}, this.$route.query);
      delete query.fornecedor;
      this.$router.replace({ query });
    },
  },
  computed: {
    showCategories: function () {
      if (this.categorySelected) {
        return this.categories.filter(
          (category) =>
            this.categoryList[this.categoryList.length - 1].id ==
              category.parent_category && category.total_products > 0
        );
      }
      return this.categories.filter(
        (category) => category.parent_category == null
      );
    },
    urls: function () {
      let url = "";
      if (this.$route.params.categoria != undefined) {
        for (let i in this.$route.params.categoria) {
          url += "/" + this.$route.params.categoria[i];
        }
      }
      if (this.return) {
        let urlSeparated = url.split("/");
        url = "";
        urlSeparated.splice(0, 1);
        urlSeparated.splice(urlSeparated.length - 1, 1);

        for (let i = 0; i < urlSeparated.length; i++) {
          console.log(urlSeparated[i]);
          url += "/" + urlSeparated[i];
        }
      }

      this.return = false;
      return url;
    },
  },
};
</script>

<style scoped>
.list-group {
  max-height: 300px;
}

.list-group-item {
  font-size: 12px;
}

.list-group-item input {
  font-size: 12px;
}

.form-control {
  padding: 0.3rem 0.2rem 0.3rem 0.4rem;
}

#iconC {
  color: #5e9f88;
}

#iconP {
  color: #5e9f88;
}

#iconF {
  color: #5e9f88;
}

#fornecedores-collapse .filtro-fornecedor {
  height: 298px;
}

.remove-btn {
  background-color: #5e9f88;
  color: white;
  font-size: 13px;
  float: right;
}

.remove-btn:hover {
  background-color: #73b898;
}

::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background-color: white;
  border-radius: 100px;
}
::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #5e9f88;
}
</style>
