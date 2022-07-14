<template>
  <div class="card m-3 product-card">
    <button
      class="btnH remove position-absolute top-0 end-0 p-2 pe-3 top-0 border-0"
    >
      <font-awesome-icon
        @click="removed(product.id)"
        class="icons fa-cog"
        :icon="['fa', 'xmark']"
      />
    </button>
    <div class="card-body d-flex flex-row">
      <router-link
        :to="'/produto/' + String(product.id)"
        style="text-decoration: none; color: black"
      >
        <img class="crop rounded border" :src="product.thumbnail" />

        <h4 class="card-title text-wrap text-start text-size mt-1">{{ product.name }}</h4>
        <h5 class="card-title text-wrap text-start">
          {{ product.category.name }}
        </h5>
        <p class="card-text fs-6 text-justify">{{ product.description }}</p>
        <span
        ><h4 class="card-text fs-6 text-end">{{ product.lowest_price }}€</h4></span
      >
      </router-link>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import http from "../../../http-common";
import { useToast } from "vue-toastification";

library.add(faXmark);
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    const toast = useToast();
    return {
      toast,
      isActive: false,
      user: {
        accept: false,
      },
    };
  },
  created() {
    this.updateProducts();
  },
  methods: {
    updateProducts() {
      this.$emit("getProducts");
    },
    removed(productId) {
      console.log("ola");
      let userId = JSON.parse(localStorage.getItem("userId"));
      //let productId = JSON.parse(product.id);
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      http
        .delete(`/user/${userId}/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          if (response.status == 200) {
            this.successRemoveSingleItem();
            this.updateProducts();
          }
        });
    },

    successRemoveSingleItem() {
      this.toast.success("O item foi removido com sucesso!", {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
  },
};
</script>
<style scoped>
h4 {
  font-size: 14px;
}
h5 {
  font-size: 10px;
}
.card {
  margin: auto;
  font-size: 11px;
}
.card:hover {
  box-shadow: 1px 8px 10px #d9d9d9;
}
.card-text:hover {
  color: black;
}
.card-title:hover {
  color: black;
}
.icons {
  width: 15px;
  height: auto;
}
.fa-cog {
  color: #b9bbb4;
  vertical-align: -0.3em;
}
.red {
  color: red !important;
}
.btnH {
  background: none;
  border: none;
  display: inline;
}
.glass {
  margin-left: 120px;
}
.div button,
.div label {
  font-size: 11px;
}
.div button {
  padding: 0 !important;
}
.product:hover {
  color: black;
}
.img-fluid {
  max-width: 55%;
  height: auto;
  margin: auto;
}
.center {
  margin-right: auto;
  margin-left: auto;
}
.card-group {
  border: none;
}
.product-card {
  min-height: 20em;
}
.text-justify {
  text-align: justify;
}
.crop {
  height: 15em;
  width: 40%;
  overflow: hidden;
  object-fit: cover;
}
.text-size {
  font-size: 1.5em;
}
</style>
