<template>
        <div class="container-fluid px-5 tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-pill">
          <!--Tiny overview cards-->
          <div class="row px-5">

            <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-5">
              <!-- card -->
              <div class="card ">
                <!-- card body -->
                <div class="card-body">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Encomendas</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'boxes-stacked']" size="xl"/>
                    </div>
                  </div>
                  <!-- project number -->
                  <div>
                    <h1 class="fw-bold">360k</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-success">+55</span> encomendas</p>
                  </div>
                </div>
              </div>

            </div>

            <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-5">
              <!-- card -->
              <div class="card ">
                <!-- card body -->
                <div class="card-body">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Lucros</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'coins']" size="xl"/>
                    </div>
                  </div>
                  <!-- project number -->
                  <div>
                    <h1 class="fw-bold">13k</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-success">+13k</span> lucros</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <!--Content list-->
        <div class="row px-5">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
                      <div class="card h-100 px-3">
                        <!-- card header  -->
                        <nav class="navbar py-4">
                          <div class="container-fluid px-1">
                            <h4>Encomendas </h4>

                              
                          <div class="input-group w-25 rounded-3">
                            <input class="form-control bg-light border-success border-end-0 super-round" type="search" placeholder="Número, estado, consumidor...">
                            <span class="input-group-text bg-light border-success border-start-0 super-round"><font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l"/></span>
                          </div>
                              
                          </div>
                        </nav>

                        <!-- table  -->
                        <div class="table-responsive">
                          <table class="table text-nowrap px-3">
                            <thead class="text-uppercase">
                              <tr>
                                <th>Número</th>
                                <th>Estado</th>
                                <th>Consumidor</th>
                                <th>Fornecedor</th>
                                <th>Transportador</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody class="border-top-0">
                              <tr>
                                <td class="align-middle">
                                  <div class="d-flex align-items-center ">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">#4337</h5>
                                      <p class="mb-0 text-secondary">33.00€</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-secondary text-uppercase">Em preparação</span></td>
                                <td class="align-middle">João Bastos</td>
                                <td class="align-middle">ASOS</td>
                                <td class="align-middle">MRW</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                                      <a class="dropdown-item" href="#">Ver detalhes</a>
                                      <a class="dropdown-item text-danger" href="#">Remover</a>

                                    </div>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td class="align-middle">
                                  <div class="d-flex align-items-center ">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">#4336</h5>
                                      <p class="mb-0 text-secondary">457.99€</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-dark text-uppercase">Enviada</span></td>
                                <td class="align-middle">Maria Albertina</td>
                                <td class="align-middle">Worten</td>
                                <td class="align-middle">CTT</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                                      <a class="dropdown-item" href="#">Ver detalhes</a>
                                      <a class="dropdown-item text-danger" href="#">Remover</a>

                                    </div>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td class="align-middle">
                                  <div class="d-flex align-items-center ">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">#4335</h5>
                                      <p class="mb-0 text-secondary">00.50€</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-danger text-uppercase">Cancelada</span></td>
                                <td class="align-middle">Augusto Gustavo</td>
                                <td class="align-middle">Samsung</td>
                                <td class="align-middle">MRW</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                                      <a class="dropdown-item" href="#">Ver detalhes</a>
                                      <a class="dropdown-item text-danger" href="#">Remover</a>

                                    </div>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td class="align-middle">
                                  <div class="d-flex align-items-center ">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">#4334</h5>
                                      <p class="mb-0 text-secondary">20.00€</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-success text-uppercase">Entregue</span></td>
                                <td class="align-middle">Mário António</td>
                                <td class="align-middle">FCUL</td>
                                <td class="align-middle">CTT</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                                      <a class="dropdown-item" href="#">Ver detalhes</a>
                                      <a class="dropdown-item text-danger" href="#">Remover</a>

                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot class="border-0">
                                <tr>
                                    <td class="border-0 text-center pt-4" colspan="6">
                                        <button type="button" class="btn border-success super-round px-3">Ver mais</button>
                                    </td>
                                </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
          </div>
        </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins } from '@fortawesome/free-solid-svg-icons';

import http from "../../../http-common"

library.add(faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins);

export default {
  name: 'TheOrdersTab',
  data() {
    return {
      currentOrder: []
    };
  },
  props: [
    'orders',
    'amountOrders'
  ],
  methods: {
    getCurrentOrder: function (targetOrderId) {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        let orderId = JSON.parse(localStorage.getItem('orderId'));

        const headers = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        }

        if (accessToken && userId) {
          http.get(`/user/${targetOrderId}`, headers)
            .then((response) => {
              if (response.status == 200) {
                this.currentOrder = response.data;
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
  .fa-boxes-stacked,
  .fa-barcode,
  .fa-sitemap,
  .fa-magnifying-glass,
  .fa-coins{
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