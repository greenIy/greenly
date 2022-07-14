<template>
  <div class="product-card ml-2 mb-2 mr-2">
    <div class="card h-100 hover-shadow d-flex">
      <router-link
        :to="'/produto/' + String(product.id)"
        style="text-decoration: none; color: black"
      >
        <div class="d-flex">
          <img
            class="img-fluid crop"
            :class="{
              'img-fluid': true,
              crop: true,
              hidden: !this.imageLoaded,
            }"
            :src="product.thumbnail"
            alt="Imagem do produto"
            @load="this.imageLoaded = true"
          />

          <content-loader
            v-if="!this.imageLoaded"
            viewBox="0 0 222 250"
            :speed="1"
            animate="true"
            primaryColor="#f3f3f3"
            secondaryColor="#b5b5b5"
          >
            <rect x="0" y="0" rx="0" ry="0" width="222" height="250" />
          </content-loader>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ product.category.name }}</h5>
          <div>
            <h4 class="card-title">
              {{ product.name }}
            </h4>
          </div>
          <p class="card-text text-truncate">{{ product.description }}</p>
        </div>
      </router-link>
      <div class="card-body py-0 position-relative mt-1 mb-2">
        <span class="position-absolute bottom-0"
          ><h4 class="card-text sticky-bottom">
            {{ product.lowest_price }}€ - {{ product.highest_price }}€
          </h4></span
        >
      </div>
      <div
        class="card-body py-0 div d-flex align-items-center justify-content-between fs-6 mb-2"
      >
        <button
          v-if="userIsLoggedIn && user.type == 'CONSUMER'"
          class="btnH fav"
        >
          <font-awesome-icon
            v-if="isProductInWishlist(this.product)"
            v-on:click="removeFromWishlist"
            class="icons fa-cog text-danger"
            :icon="['fa', 'heart']"
            size="xs"
          />
          <font-awesome-icon
            v-else
            v-on:click="addToWishlist"
            class="icons fa-cog"
            :icon="['fa', 'heart']"
            size="xs"
          />
          Favoritos
        </button>
        <form>
          <div class="form-group form-check">
            <label
              class="form-check-label product"
              :for="`input_${product.id}`"
            >
              <input
                type="checkbox"
                v-model="compare"
                :id="`input_${product.id}`"
                @click="compare($event)"
                class="form-check-input checkbox"
              /><span>Comparar Produto</span></label
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ContentLoader } from "vue-content-loader";
import http from "../../../http-common";

library.add(faHeart);

import { useToast } from "vue-toastification";

export default {
  components: { ContentLoader },
  name: "ProductCard",
  props: {
    product: Object,
    productsToCompare: Array,
  },
  mounted() {
    this.getWishlist();
    this.getUserInfo();
  },
  data() {
    const toast = useToast();
    return {
      toast,
      isActive: false,
      quantity: 0,
      user: {
        accept: false,
      },
      wishlist: {},
      imageLoaded: false,
      userIsLoggedIn: this.$store.getters.getState,
    };
  },
  methods: {
    getWishlist() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));
      let userId = JSON.parse(localStorage.getItem('userId'));
      if (accessToken){
          http.get(`/user/${userId}/wishlist`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
              if (response.status == 200) {
                  this.wishlist = response.data
              }
          })
      }
    },
    isProductInWishlist(product) {
      var isProductIn = false;
      for (
        let produto = 0;
        produto < Object.keys(this.wishlist).length;
        produto++
      ) {
        if (this.wishlist[produto].id == product.id) {
          isProductIn = true;
        }
      }
      return isProductIn;
    },
    addToWishlist() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      if (accessToken) {
        http
          .post(
            `/user/${userId}/wishlist`,
            JSON.stringify({
              product: this.product.id,
            }),
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
          .then((response) => {
            if (response.status == 201) {
              this.getWishlist();
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("Failure!");
          });
      }
    },
    removeFromWishlist() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));

      if (accessToken) {
        http
          .delete(`/user/${userId}/wishlist/${this.product.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((response) => {
            if (response.status == 200) {
              this.successRemoveSingleItem();
              this.getWishlist();
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("Failure!");
          });
      }
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
    getUserInfo() {
      this.user = this.$store.getters.getUser;

      if (this.user && this.user.type == "CONSUMER") {
        this.getWishlist();
      }

      return this.user;
    },
    compare(event) {
      let query = Object.assign({}, this.$route.query);
      let compareMoreThan2 =
        document.querySelectorAll('input[type="checkbox"]:checked').length < 3;

      if (this.$route.query.compare1 == this.product.id) {
        document.getElementById("input_" + this.product.id).checked = false;
        this.$emit("removeOneProduct", 0);
      } else if (this.$route.query.compare2 == this.product.id) {
        document.getElementById("input_" + this.product.id).checked = false;
        this.$emit("removeOneProduct", 1);
      } else if (compareMoreThan2) {
        if (!this.$route.query.compare1) {
          this.$router.push({
            query: Object.assign({}, query, { compare1: `${this.product.id}` }),
          });
        } else if (!this.$route.query.compare2) {
          // it's only possible to compare products of same category
          if (
            this.product.category.id == this.productsToCompare[0].category.id &&
            this.product.id != this.productsToCompare[0].id
          ) {
            this.$router.push({
              query: Object.assign({}, query, {
                compare2: `${this.product.id}`,
              }),
            });
          } else {
            document.getElementById("input_" + this.product.id).checked = false;
            this.$emit("categoriesDiff", true);
          }
        }
      }

      compareMoreThan2 =
        document.querySelectorAll('input[type="checkbox"]:checked').length == 2;
      if (compareMoreThan2) {
        document.getElementsByClassName("checkbox").forEach((e) => {
          if (!e.checked) {
            e.disabled = true;
          }
        });
      } else {
        document.getElementsByClassName("checkbox").forEach((e) => {
          e.disabled = false;
        });
      }
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
  width: 16rem;
  font-size: 11px;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .card {
    width: 58.4rem;
  }
}

@media (max-width: 991px) {
  .card {
    width: 23.3rem;
  }
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
  margin-left: 4px;
  margin-right: 4px;
}
.crop {
  width: 100%;
  height: 250px;
  overflow: hidden;
  object-fit: cover;
}

.form-check-input:checked {
  background-color: #5e9f88 !important;
  border-color: #5e9f88 !important;
}

input[type="checkbox"]:disabled + span {
  color: #969595 !important;
}

.hidden {
  display: none;
}
</style>
