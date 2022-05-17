<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap position-relative">
      
      <TheNavbar />

      <!--Pills-->



      

      <!--Background color-->
      <div class="underlay-banner bg-226d53">

        <!--ul class="nav nav-pills mx-auto super-round border-0">
          <li class="nav-item">
            <router-link to="/painel"><a class="nav-link super-round active">Panorâmica</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/painel"><a class="nav-link super-round text-secondary">Utilizadores</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/painel"><a class="nav-link super-round text-secondary">Produtos</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/painel"><a class="nav-link super-round text-secondary">Encomendas</a></router-link>
          </li>
        </ul-->
        
      </div> 


        <div class="position-relative overlay">
        <div class="container-fluid px-5"> 
          <div class="row">
            <div class="col-lg-12 col-md-12 col-12 mt-4">
              <!-- Page header -->
              <div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="mb-2 mb-lg-0">
                    <h2 class="mb-0 text-light d-inline me-3">Panorâmica</h2>
                    <h2 class="mb-0 text-309c76 d-inline me-3 btn-lg">Utilizadores</h2>
                    <h2 class="mb-0 text-309c76 d-inline me-3 btn-lg">Produtos</h2>
                    <h2 class="mb-0 text-309c76 d-inline me-3 btn-lg">Encomendas</h2>
                  </div>
                  <!--div>
                    <button class="btn btn-success">Create New Project</button>
                  </div-->
                </div>
              </div>
            </div>

            <!--Tiny overview cards-->
            <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-5">
              <!-- card -->
              <div class="card ">
                <!-- card body -->
                <div class="card-body">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Utilizadores</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'users']" size="xl"/>
                    </div>
                  </div>
                  <!-- project number -->
                  <div>
                    <h1 class="fw-bold">18k</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-success">+36</span> utilizadores</p>
                  </div>
                </div>
          </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-5">
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
            <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-5">
              <!-- card -->
              <div class="card ">
                <!-- card body -->
                <div class="card-body">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Produtos</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'barcode']" size="xl"/>
                    </div>
                  </div>
                  <!-- project number -->
                  <div>
                    <h1 class="fw-bold">200k</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-danger">-2</span> produtos</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-5">
              <!-- card -->
              <div class="card ">
                <!-- card body -->
                <div class="card-body">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Categorias</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'sitemap']" size="xl"/>
                    </div>
                  </div>
                  <!-- project number -->
                  <div>
                    <h1 class="fw-bold">540</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-success">+3</span> categorias</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-lg-6 col-md-12 col-12 mt-5">
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
        </div>

        <!--Lists-->
        <div class="row">
          <div class="col-xl-8 col-lg-12 col-md-12 col-12 mt-5">
                      <div class="card h-100 ms-5 px-3">
                        <!-- card header  -->
                        <nav class="navbar py-4">
                          <div class="container-fluid px-1">
                            <h4>Utilizadores </h4>

                              
                          <div class="input-group w-25 rounded-3">
                            <input class="form-control bg-light border-success border-end-0 super-round" type="search" placeholder="Nome, tipo, distrito...">
                            <span class="input-group-text bg-light border-success border-start-0 super-round"><font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l"/></span>
                          </div>
                              
                          </div>
                        </nav>

                        <!-- table  -->
                        <div class="table-responsive">
                          <table class="table text-nowrap px-3">
                            <thead class="text-uppercase">
                              <tr>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Distrito</th>
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
                                      <h5 class=" mb-1">Worten</h5>
                                      <p class="mb-0">worten@example.com</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-226d53 text-uppercase">Fornecedor</span></td>
                                <td class="align-middle">Lisboa</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                                      <a class="dropdown-item" href="#">Action</a>
                                      <a class="dropdown-item" href="#">Another action</a>
                                      <a class="dropdown-item" href="#">Something else
                                        here</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="align-middle">
                                  <div class="d-flex align-items-center">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">Jitu Chauhan</h5>
                                      <p class="mb-0">jituchauhan@example.com</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-309c76 text-uppercase">Consumidor</span></td>
                                <td class="align-middle">Porto</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamTwo" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamTwo">
                                      <a class="dropdown-item" href="#">Action</a>
                                      <a class="dropdown-item" href="#">Another action</a>
                                      <a class="dropdown-item" href="#">Something else
                                        here</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="align-middle">
                                  <div class="d-flex align-items-center">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">MRW</h5>
                                      <p class="mb-0">mrw@example.com</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"><span class="badge bg-dark text-uppercase">Transportador</span></td>
                                <td class="align-middle">Viseu</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamThree" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>

                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamThree">
                                      <a class="dropdown-item" href="#">Action</a>
                                      <a class="dropdown-item" href="#">Another action</a>
                                      <a class="dropdown-item" href="#">Something else
                                        here</a>
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
      </div>
      <h1>fuck as oi</h1>
      
    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins } from '@fortawesome/free-solid-svg-icons';
library.add(faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins);

export default {
  name: 'AdminView',
  components: {
    TheNavbar,
    TheFooter
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

  .bg-309c76,
  .nav-link.active {
    background-color: #309c76;
  }

  .bg-secondary {
    background-color: rgb(177, 177, 177)!important;
  }

  .test-badge {
    padding-left: 6.5px !important;
  }
  
  .fa-users,
  .fa-boxes-stacked,
  .fa-barcode,
  .fa-sitemap,
  .fa-magnifying-glass,
  .fa-coins{
    color: #226d53;
  }

  .text-309c76{
    color: #309c76;
  }

  .text-309c76:hover{
    color: #5abd9a!important;
  }

   .fa-magnifying-glass:hover{
        color: #226d5393;
    }

  .page-content img {
    max-width: 30px;
  }

.por-cima {
  margin-top: -70px;
}

.underlay-banner {
	padding-top: 4rem ;
	padding-bottom: 9.5rem;
}

.overlay {
  top: -150px;
}

.router-link-exact-active {
  text-decoration: none!important;
}

.nav-pills {
  max-width: 446.3px;
  background-color: white;
}
</style>