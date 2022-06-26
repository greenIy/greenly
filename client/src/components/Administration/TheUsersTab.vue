<template>
  <div class="container-fluid px-5 tab-pane fade" id="users-tab" role="tabpanel" aria-labelledby="users-pill">
    <!--User info modals-->
    <TheUserInfo :currentUser='this.currentUser' />

    <!--Users overview card-->
    <div class="row px-5">
      <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.title' :amount='this.amountUsers' :increment='this.increment' />
      </div>
    </div>

    <!--Users list-->
    <div class="row px-5">
      <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
        <div class="card h-100 px-3">
          <nav class="navbar py-4">
            <div class="container-fluid px-1">
              <!--Title-->
              <h4>Utilizadores </h4>

              <!--Search bar-->
              <div class="input-group w-25 rounded-3">
                <input class="form-control bg-light border-success border-end-0 super-round" type="search"
                  placeholder="Nome, tipo, distrito...">
                <span class="input-group-text bg-light border-success border-start-0 super-round">
                  <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l" /></span>
              </div>
            </div>
          </nav>

          <!--Users table-->
          <div class="table-responsive">
            <table class="table text-nowrap px-3">
              <thead class="text-uppercase">
                <tr>
                  <th>Nome</th>
                  <th>Contacto</th>
                  <th>Tipo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="border-top-0 overflow-auto">
                <tr v-for="user in this.users" :key="user">
                  <td class="align-middle">
                    <div class="d-flex align-items-center ">
                      <div>
                      </div>
                      <div class="lh-1">
                        <h5 class=" mb-1"> {{ user.first_name }} {{ user.last_name }}</h5>
                        <p class="mb-0"> {{ user.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">{{ user.phone }}</td>
                  <td v-if="user.type == 'CONSUMER'" class="align-middle"><span
                      class="badge bg-309c76 text-uppercase">Consumidor</span></td>
                  <td v-else-if="user.type == 'SUPPLIER'" class="align-middle"><span
                      class="badge bg-226d53 text-uppercase">Fornecedor</span></td>
                  <td v-else-if="user.type == 'TRANSPORTER'" class="align-middle"><span
                      class="badge bg-dark text-uppercase">Transportador</span></td>
                  <td v-else class="align-middle"><span class="badge bg-warning text-uppercase">Administrador</span>
                  </td>

                  <td class="align-middle">
                    <div class="dropdown dropstart">
                      <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="feather feather-more-vertical icon-xxs">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                        <a @click="this.getCurrentUser(user.id)" class="dropdown-item" data-bs-target="#user-details"
                          data-bs-toggle="modal">Ver detalhes</a> <!--data-bs-dismiss="modal"-->
                        <a class="dropdown-item text-danger" href="#">Remover</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheOverviewCard from './TheOverviewCard.vue';
import TheUserInfo from './TheUserInfo.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass);

import http from "../../../http-common";

export default {
  name: 'TheUsersTab',
  components: {
    TheOverviewCard,
    TheUserInfo
},
  data() {
    return {
      title: 'Utilizadores',
      currentUser: {}
    };
  },
  props: [
    'users',
    'amountUsers',
    'increment',
  ],
  methods: {
    getCurrentUser: function (targetUserId) {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        let userId = JSON.parse(localStorage.getItem('userId'));

        const headers = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }

        if (accessToken && userId) {
          http.get(`/user/${targetUserId}`, headers)
            .then((response) => {
              if (response.status == 200) {
                this.currentUser = response.data;
              }
            }).catch((error) => {
              console.log(error.response.data);
              console.log("Failure!")
            })
        }
    }
  }
};
</script>

<style scoped>
  .super-round{
    border-radius: 20px;
  }
  .bg-e4e6c3 {
    background-color: #e4e6c3;
  }
  .bg-226d53 {
    background-color: #226d53;
  }

  .fa-users,
  .fa-magnifying-glass {
    color: #226d53;
  }

     .fa-magnifying-glass:hover{
        color: #226d5393;
    }


  .bg-309c76 {
    background-color: #309c76;
  }

  .bg-secondary {
    background-color: rgb(177, 177, 177)!important;
  }
</style>