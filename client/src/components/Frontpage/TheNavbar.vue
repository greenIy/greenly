<template>
  <nav>
    <div class="navmenu d-flex justify-content-center pt-2 pb-2">
      <div class="align-self-center mt-2 mb-2">
        <router-link to="/produtos" @click="reloadPage()" class="navbar-brand" data-cy="navbar-home">
          <img alt="Logo do greenly" src="../../assets/logo_dark.png" />
        </router-link>
      </div>
      <div class="input-group search-group align-self-center mt-2 mb-2 ms-4">
        <input
          class="form-control"
          type="search"
          placeholder="O que estás à procura?"
          aria-label="Search"
          v-model="search"
          @keyup.enter="submit(this.search)"
        />
        <button
          class="btn btnSearchBar btn-outline-success"
          type="submit"
          @click="submit(this.search)"
        >
          Pesquisar
        </button>
      </div>
      <div
        v-if="!userIsLoggedIn"
        class="align-self-center nav-links mt-2 mb-2 ml-2 ms-5"
      >
        <router-link to="/login">
          <font-awesome-icon :icon="['fas', 'user']" size="xl" />
        </router-link>
      </div>
      <div v-if="userIsLoggedIn" style="display: flex">
        <div class="align-self-center nav-links mt-3 mb-2 ms-3">
          <h6>{{ user.first_name }}</h6>
        </div>
        <div class="align-self-center nav-links mt-2 mb-2 ml-3">
          <div class="dropdown">
            <a
              class="dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-cy="navbar-dropdown"
            >
              <font-awesome-icon :icon="['fas', 'user']" size="xl" />
            </a>
            <ul
              class="dropdown-menu mt-3 drop"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <router-link
                  to="/perfil/detalhes"
                  style="margin-left: 0"
                  class="drop"
                  data-cy="navbar-profile"
                  ><a class="dropdown-item ms-0 drop"
                    ><font-awesome-icon :icon="['fa', 'id-card']" />&nbsp;
                    Perfil</a
                  ></router-link
                >
              </li>
              <li v-if="user.type == 'CONSUMER'">
                <router-link
                  to="/perfil/encomendas"
                  style="margin-left: 0"
                  class="drop"
                  ><a class="dropdown-item ms-0 drop"
                    ><font-awesome-icon :icon="['fa', 'box-archive']" />&nbsp;
                    Encomendas</a
                  ></router-link
                >
              </li>
              <li v-if="user.type == 'CONSUMER'">
                <router-link
                  to="/perfil/favoritos"
                  style="margin-left: 0"
                  class="drop"
                  ><a class="dropdown-item ms-0 drop"
                    ><font-awesome-icon :icon="['fa', 'heart']" />&nbsp;
                    Favoritos</a
                  ></router-link
                >
              </li>
              <li data-cy="navbar-dashboard-admin">
                <router-link
                  v-if="user.type === 'ADMINISTRATOR'"
                  to="/administracao"
                  style="margin-left: 0"
                  class="drop"
                  ><a class="dropdown-item ms-0 drop"
                    ><font-awesome-icon
                      :icon="['fa', 'table-columns']"
                      size=""
                    />&nbsp; Administração</a
                  ></router-link
                >
              </li>
              <li data-cy="navbar-dashboard-supplier">
                <router-link
                  v-if="user.type === 'SUPPLIER'"
                  :to="{ name: 'fornecedor' }"
                  style="margin-left: 0"
                  class="drop"
                  ><a class="dropdown-item ms-0 drop"
                    ><font-awesome-icon
                      :icon="['fa', 'box-archive']"
                      size=""
                    />&nbsp; Painel de Gestão</a
                  ></router-link
                >
              </li>
              <li data-cy="navbar-dashboard-transporter">
                <router-link
                  v-if="user.type === 'TRANSPORTER'"
                  :to="{ name: 'transportador' }"
                  style="margin-left: 0"
                  class="drop"
                  ><a class="dropdown-item ms-0 drop"
                    ><font-awesome-icon
                      :icon="['fa', 'box-archive']"
                      size=""
                    />&nbsp; Painel de Gestão</a
                  ></router-link
                >
              </li>
              <hr class="dropdown-divider" />
              <li>
                <router-link
                  to="/login"
                  v-on:click="logoutUser"
                  style="margin-left: 0"
                  class="drop"
                  ><a
                    class="dropdown-item ms-0 drop"
                    style="color: red !important"
                    ><font-awesome-icon
                      :icon="['fa', 'arrow-right-from-bracket']"
                    />&nbsp; Terminar sessão</a
                  ></router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        v-if="userIsLoggedIn"
        class="align-self-center nav-links mt-2 mb-2 ml-3"
      >
        <div class="dropdown">
          <span
            v-if="activeNotificationsLength() > 0"
            class="position-absolute top-0 start-100 translate-middle bg-custom badge rounded-pill bg-danger"
            style="padding: 6px"
          >
            {{ this.activeNotificationsLength() }}
            <span class="visually-hidden"></span>
          </span>
          <a
            class=""
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <font-awesome-icon :icon="['fas', 'bell']" size="xl" />
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end mt-3 drop"
            aria-labelledby="dropdownMenuLink"
            style="width: 400px"
          >
            <ul
              class="nav nav-pills mb-3 justify-content-center"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <font-awesome-icon
                    :icon="['fa', 'inbox']"
                  />&nbsp;Novas&nbsp;<span
                    v-if="activeNotificationsLength() > 0"
                    class="badge bg-custom"
                    >{{ this.activeNotificationsLength() }}</span
                  >
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <font-awesome-icon
                    :icon="['fa', 'clock-rotate-left']"
                  />&nbsp;Arquivadas
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                style="overflow-y: auto; max-height: 550px"
              >
                <div v-for="noti in this.notifications" :key="noti.id">
                  <div v-if="noti.dismissed == false">
                    <div class="list-group">
                      <div v-if="user.type == 'CONSUMER'">
                        <router-link
                          to="/perfil/encomendas"
                          style="margin-left: 0"
                        >
                          <span
                            role="button"
                            class="list-group-item list-group-item-action"
                          >
                            <h6
                              class="noitificationDismiss"
                              role="button"
                              v-on:click="
                                selectNotification(noti);
                                dismissNotification();
                              "
                            >
                              <font-awesome-icon
                                :icon="['fa', 'xmark']"
                                size="lg"
                              />
                            </h6>
                            <div class="w-100 justify-content-between mt-2">
                              <small>
                                <font-awesome-icon
                                  :icon="['fa', 'calendar']"
                                />&nbsp;{{
                                  `${new Date(noti.timestamp).getDate()}/${
                                    new Date(noti.timestamp).getMonth() + 1
                                  }/${new Date(
                                    noti.timestamp
                                  ).getFullYear()} &nbsp;`
                                }}&nbsp;<font-awesome-icon
                                  :icon="['fa', 'clock']"
                                />&nbsp;{{
                                  `${(
                                    "0" + new Date(noti.timestamp).getHours()
                                  ).slice(-2)}:${(
                                    "0" + new Date(noti.timestamp).getMinutes()
                                  ).slice(-2)}:${(
                                    "0" + new Date(noti.timestamp).getSeconds()
                                  ).slice(-2)}`
                                }}
                              </small>
                              <h5 class="mt-2">{{ noti.title }}</h5>
                            </div>
                            <p class="mt-2">{{ noti.content }}</p>
                          </span>
                        </router-link>
                      </div>
                      <div
                        v-if="
                          user.type == 'TRANSPORTER' || user.type == 'SUPPLIER'
                        "
                      >
                        <router-link to="/painel" style="margin-left: 0">
                          <span
                            role="button"
                            class="list-group-item list-group-item-action"
                          >
                            <h6
                              class="noitificationDismiss"
                              role="button"
                              v-on:click="
                                selectNotification(noti);
                                dismissNotification();
                              "
                            >
                              <font-awesome-icon
                                :icon="['fa', 'xmark']"
                                size="lg"
                              />
                            </h6>
                            <div class="w-100 justify-content-between mt-2">
                              <small>
                                <font-awesome-icon
                                  :icon="['fa', 'calendar']"
                                />&nbsp;{{
                                  `${String(
                                    new Date(noti.timestamp).getDate()
                                  ).padStart(2, "0")}/${String(
                                    new Date(noti.timestamp).getMonth() + 1
                                  ).padStart(2, "0")}/${new Date(
                                    noti.timestamp
                                  ).getFullYear()}`
                                }}&nbsp;<font-awesome-icon
                                  :icon="['fa', 'clock']"
                                />&nbsp;{{
                                  `${(
                                    "0" + new Date(noti.timestamp).getHours()
                                  ).slice(-2)}:${(
                                    "0" + new Date(noti.timestamp).getMinutes()
                                  ).slice(-2)}:${(
                                    "0" + new Date(noti.timestamp).getSeconds()
                                  ).slice(-2)}`
                                }}
                              </small>
                              <h5 class="mt-2">{{ noti.title }}</h5>
                            </div>
                            <p class="mt-2">{{ noti.content }}</p>
                          </span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="list-group" v-if="activeNotificationsLength() == 0">
                  <span class="list-group-item list-group-item-action">
                    <div class="w-100 justify-content-center p-5">
                      <h5 class="text-center">
                        Não existem notificações novas.
                      </h5>
                    </div>
                  </span>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  style="overflow-y: auto; max-height: 550px"
                >
                  <div v-for="noti in this.notifications" :key="noti.id">
                    <div v-if="noti.dismissed == true">
                      <div class="list-group">
                        <router-link
                          to="/perfil/encomendas"
                          style="margin-left: 0"
                        >
                          <span
                            role="button"
                            class="list-group-item list-group-item-action"
                          >
                            <div class="w-100 justify-content-between mt-2">
                              <small>
                                <font-awesome-icon
                                  :icon="['fa', 'calendar']"
                                />&nbsp;{{
                                  `${new Date(noti.timestamp).getDate()}/${
                                    new Date(noti.timestamp).getMonth() + 1
                                  }/${new Date(
                                    noti.timestamp
                                  ).getFullYear()} &nbsp;`
                                }}&nbsp;<font-awesome-icon
                                  :icon="['fa', 'clock']"
                                />&nbsp;{{
                                  `${(
                                    "0" + new Date(noti.timestamp).getHours()
                                  ).slice(-2)}:${(
                                    "0" + new Date(noti.timestamp).getMinutes()
                                  ).slice(-2)}:${(
                                    "0" + new Date(noti.timestamp).getSeconds()
                                  ).slice(-2)}`
                                }}
                              </small>
                              <h5 class="mt-2">{{ noti.title }}</h5>
                            </div>
                            <p class="mt-2">{{ noti.content }}</p>
                          </span>
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <div
                    class="list-group"
                    v-if="filedNotificationsLength() == 0"
                  >
                    <span class="list-group-item list-group-item-action">
                      <div class="w-100 justify-content-between p-5">
                        <h5 class="text-center">
                          Não existem notificações arquivadas.
                        </h5>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div class="align-self-center nav-links mt-2 mb-2">
        <router-link
          v-if="this.userIsLoggedIn && user.type === 'CONSUMER'"
          to="/carrinho"
          data-cy="navbar-cart"
        >
          <font-awesome-icon
            class="iconCar"
            :icon="['fas', 'cart-shopping']"
            size="xl"
          />
        </router-link>
      </div>
      <span
        v-if="cartItemsAmount() > 0"
        class="h-25 mt-3 translate-middle translate-middle bg-custom badge rounded-pill bg-danger"
      >
        {{ this.cartItemsAmount() }}
        <span class="visually-hidden"></span>
      </span>
      <router-link to="/login"> </router-link>
    </div>

    <div
      class="navmenu2 d-flex justify-content-center pb-3 text-uppercase nav-links pt-2"
    >
      <div class="pt-2">
        <router-link
          to="/produtos"
          :key="$route.fullPath"
          @click="reloadPage()"
          class="mb-2 mr-2"
        >
          produtos<span class="ms-3 black">| </span>
        </router-link>
      </div>
      <div class="pt-2">
        <router-link to="/fornecedores" class="mb-2">
          fornecedores<span class="ms-3">| </span>
        </router-link>
      </div>
      <div class="pt-2">
        <router-link to="/transportadores" class="mb-2 ml-2">
          transportadores
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCartShopping,
  faUser,
  faIdCard,
  faTableColumns,
  faBoxArchive,
  faClipboard,
  faHeart,
  faArrowRightFromBracket,
  faBell,
  faCalendar,
  faClock,
  faXmark,
  faInbox,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCartShopping,
  faUser,
  faIdCard,
  faTableColumns,
  faBoxArchive,
  faClipboard,
  faHeart,
  faArrowRightFromBracket,
  faBell,
  faCalendar,
  faClock,
  faXmark,
  faInbox,
  faClockRotateLeft
);

import http from "../../../http-common";
import AuthService from "../../router/auth";

export default {
  name: "TheNavbar",
  mounted() {
    this.getUserInfo();
    this.getUserNotifications();
    this.getUserCart();
    this.emitter.on("updateNotifications", () => {
      this.getUserNotifications();
    });
    this.emitter.on("updateCart", () => {
      this.getUserCart();
    });
  },
  data() {
    return {
      search: "",
      userIsLoggedIn: this.$store.getters.getState,
      user: {},
      notifications: [],
      selectedNotification: "",
      cartItems: [],
    };
  },
  methods: {
    submit(search) {
      this.$router.push({
        path: "/produtos",
        query: { pesquisa: `${search}` },
      });
    },
    reloadPage() {
      window.location.assign("/produtos");
    },
    getUserInfo() {
      this.user = this.$store.getters.getUser;
      return this.user;
    },
    getUserNotifications() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .get(`/user/${userId}/notifications`, headers)
          .then((response) => {
            if (response.status == 200) {
              this.notifications = response.data;
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log("Failure!");
          });
      }
    },
    getUserCart() {
      if (this.userIsLoggedIn && this.user && this.user.type == "CONSUMER") {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"));
        let userId = JSON.parse(localStorage.getItem("userId"));
        if (accessToken) {
          http
            .get(`/user/${userId}/cart`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              if (response.status == 200) {
                this.cartItems = response.data.items;
              }
            });
        }
      }
    },
    notificationsLength() {
      var size = Object.keys(this.notifications).length;
      return size;
    },
    activeNotificationsLength() {
      var size = 0;
      for (
        let noti = 0;
        noti < Object.keys(this.notifications).length;
        noti++
      ) {
        if (this.notifications[noti].dismissed == false) {
          size += 1;
        }
      }
      return size;
    },
    cartItemsAmount() {
      return this.cartItems.length;
    },
    filedNotificationsLength() {
      var size = 0;
      for (
        let noti = 0;
        noti < Object.keys(this.notifications).length;
        noti++
      ) {
        if (this.notifications[noti].dismissed == true) {
          size += 1;
        }
      }
      return size;
    },
    addressesLength() {
      var user = this.getUserInfo();
      var size = Object.keys(user.addresses).length;
      return size;
    },
    selectNotification(notification) {
      this.selectedNotification = notification;
    },
    dismissNotification() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      let notificationId = this.selectedNotification.id;
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .put(`/user/${userId}/notifications/${notificationId}`, {}, headers)
          .then((response) => {
            if (response.status == 200) {
              this.getUserNotifications();
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log("Failure!");
          });
      }
    },
    logoutUser() {
      AuthService.logoutUser();
      // TODO: Eventualmente fazer um pedido a /auth/logout aqui
    },
  },
};
</script>

<style scoped>
.navmenu {
  background-color: #5e9f88;
  color: #fcfaf9;
}
.navmenu2 {
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 2px 3px rgb(40 40 40 / 20%);
}
.navmenu a {
  color: #fcfaf9;
  text-decoration: none;
  margin-left: 20px;
}
.navmenu2 a {
  color: #000000;
  text-decoration: none;
  margin-left: 20px;
}
.navmenu a:active {
  color: #fcfaf9;
  text-decoration: none !important;
  margin-left: 20px;
}
.navmenu a:hover {
  color: #e4e4e4;
}
.navmenu2 a:hover {
  color: #5e9f88;
}
.nav-links {
  font-size: 12px;
}
.nav-link {
  color: black;
}
.nav-link.active {
  background-color: #5e9f88 !important;
}
.container {
  width: 100%;
}
img {
  width: 90px;
  height: 35px;
}
.search-group {
  width: 825px !important;
}
input,
.btnSearchBar {
  border-radius: 20px;
  line-height: 15px;
  font-size: 15px;
}
.btnSearchBar {
  background-color: #dce5e1;
  border: 0px;
  color: #5e9f88;
  box-shadow: none;
}
.btnSearchBar:hover {
  background-color: #dce5e1;
  border: 0px;
  color: #5e9f88;
}
.btn-outline-success {
  box-shadow: none;
}
.form-control {
  box-shadow: none;
}
.dropdown-header,
.dropdown-item,
.dropdown-item a {
  color: black !important;
}
.bg-custom {
  background-color: #e3c12b !important;
}
.noitificationDismiss {
  position: absolute;
  top: 16px;
  right: 15px;
}
.greenly-link {
  color: #5e9f88;
}
::-webkit-scrollbar {
  width: 17px;
}
::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}
::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #5e9f88;
}
.black {
  color: black !important;
}

a.router-link-active {
  color: #5e9f88;
  text-decoration: underline;
}

.iconCar {
  color: white !important;
}

.drop {
  text-decoration: none !important;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .dropdown-menu {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media (max-width: 991px) {
  .dropdown-menu {
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .input-group {
    order: 3;
    float: right;
  }
}
</style>
