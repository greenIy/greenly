<template>
  <div class="d-flex justify-content-center profileContainer mt-4 mb-3">
    <div class="card p-3 card1Width">
      <nav>
        <div class="align-middle align-self-center">
          <span class="fs-3">{{ user.first_name + " " + user.last_name }}</span>
          <br />
          <span v-if="user.type == 'CONSUMER'" class="fs-5">Consumidor</span>
          <span v-if="user.type == 'SUPPLIER'" class="fs-5">Fornecedor</span>
          <span v-if="user.type == 'TRANSPORTER'" class="fs-5"
            >Transportador</span
          >
          <br />
          <span v-if="user.type == 'SUPPLIER'" class="fs-5"
            >@ {{ user.company.name }}</span
          >
          <span v-if="user.type == 'TRANSPORTER'" class="fs-5"
            >@ {{ user.company.name }}</span
          >
        </div>

        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <router-link
              :to="{ name: 'personalInfo' }"
              class="nav-link link-dark"
              :class="
                this.$route.name === 'personalInfo' ? 'nav-link active' : ''
              "
              aria-current="page"
            >
              <svg class="bi me-0" width="16" height="16"></svg>
              <font-awesome-icon :icon="['fa', 'user']" size="lg" />&nbsp;
              Informações Pessoais
            </router-link>
          </li>
          <li
            v-if="user.type == 'SUPPLIER' || user.type == 'TRANSPORTER'"
            class="nav-item"
            data-cy="profile-wishlist-tab"
          >
            <router-link
              :to="{ name: 'companyInfo' }"
              class="nav-link link-dark"
              :class="
                this.$route.name === 'companyInfo' ? 'nav-link active' : ''
              "
              aria-current="page"
            >
              <svg class="bi me-0" width="16" height="16"></svg>
              <font-awesome-icon :icon="['fa', 'briefcase']" size="lg" />&nbsp;
              Empresa
            </router-link>
          </li>
          <li v-if="user.type == 'CONSUMER'" class="nav-item">
            <router-link
              :to="{ name: 'orders' }"
              class="nav-link link-dark"
              :class="this.$route.name === 'orders' ? 'nav-link active' : ''"
            >
              <svg class="bi me-0" width="16" height="16"></svg>
              <font-awesome-icon
                :icon="['fa', 'box-archive']"
                size="lg"
              />&nbsp; Encomendas
            </router-link>
          </li>
          <li v-if="user.type == 'CONSUMER'" class="nav-item" data-cy="profile-wishlist-tab">
            <router-link
              :to="{ name: 'wishlist' }"
              class="nav-link link-dark"
              :class="this.$route.name === 'wishlist' ? 'nav-link active' : ''"
            >
              <svg class="bi me-0" width="16" height="16"></svg>
              <font-awesome-icon :icon="['fa', 'heart']" size="lg" />&nbsp;
              Favoritos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'addresses' }"
              class="nav-link link-dark"
              :class="this.$route.name === 'addresses' ? 'nav-link active' : ''"
              aria-current="page"
            >
              <svg class="bi me-0" width="16" height="16"></svg>
              <font-awesome-icon :icon="['fa', 'map']" size="lg" />&nbsp;
              Moradas
            </router-link>
          </li>
          <li class="nav-item" data-cy="profile-security-tab">
            <router-link
              :to="{ name: 'security' }"
              class="nav-link link-dark"
              :class="this.$route.name === 'security' ? 'nav-link active' : ''"
              aria-current="page"
            >
              <svg class="bi me-0" width="16" height="16"></svg>
              <font-awesome-icon :icon="['fa', 'gear']" size="lg" />&nbsp;
              Segurança
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="card p-3 d-flex flex-column card2Width" id="profile-content">
      <profile-personal-info v-if="this.$route.name === 'personalInfo'" />

      <profile-company-info v-if="this.$route.name === 'companyInfo'" />

      <profile-orders v-if="this.$route.name === 'orders'" />

      <profile-wishlist v-if="this.$route.name === 'wishlist'" />

      <profile-addresses v-if="this.$route.name === 'addresses'" />

      <profile-security v-if="this.$route.name === 'security'" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";
import ProfilePersonalInfo from "@/components/Profile/ProfilePersonalInfo.vue";
import ProfileCompanyInfo from "@/components/Profile/ProfileCompanyInfo.vue";
import ProfileOrders from "@/components/Profile/ProfileOrders.vue";
import ProfileWishlist from "@/components/Profile/ProfileWishlist.vue";
import ProfileAddresses from "@/components/Profile/ProfileAddresses.vue";
import ProfileSecurity from "@/components/Profile/ProfileSecurity.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserTag,
  faTruckFast,
  faBoxOpen,
  faUser,
  faBriefcase,
  faBoxArchive,
  faHeart,
  faMap,
  faGear,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUserTag,
  faTruckFast,
  faBoxOpen,
  faUser,
  faBriefcase,
  faBoxArchive,
  faHeart,
  faMap,
  faGear,
  faChartLine
);

export default {
  name: "Profile",
  components: {
    TheNavbar,
    TheFooter,
    ProfilePersonalInfo,
    ProfileCompanyInfo,
    ProfileOrders,
    ProfileWishlist,
    ProfileAddresses,
    ProfileSecurity,
  },
  data() {
    return {
      user: this.$store.getters.getUser,
    };
  },
  created() {
    this.changeTitle();
  },
  methods: {
    changeTitle() {
      window.document.title = "Greenly | Perfil";
    },
  },
};
</script>

<style scoped>
.nav > .nav-item > .active {
  background-color: #5e9f88;
}
.nav-item {
  margin-bottom: 5px;
}
.profileContainer {
  flex-direction: row;
  gap: 3em;
}
.nav-link {
  cursor: pointer;
}

.card1Width {
  width: 20%;
}
.card2Width {
  width: 50%;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .profileContainer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .card1Width {
    width: 90%;
  }
  .card2Width {
    width: 90%;
  }
}

@media (max-width: 991px) {
  .profileContainer {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .card1Width {
    width: 90%;
  }
  .card2Width {
    width: 90%;
  }
}
</style>
