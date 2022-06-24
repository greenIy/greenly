<template>
        <div class="container-fluid px-5 tab-pane fade" id="products-tab" role="tabpanel" aria-labelledby="products-pill">
          <!--Tiny overview cards-->
          <div class="row px-5">
            
            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
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

            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
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

            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
              <!-- card -->
              <div class="card ">
                <!-- card body -->
                <div class="card-body">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Pedidos</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'clipboard-list']" size="xl"/>
                    </div>
                  </div>
                  <!-- project number -->
                  <div>
                    <h1 class="fw-bold">768</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-success">+3</span> pedidos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <!--Category list-->
        <div class="row px-5">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
                      <div class="card h-100 px-3">
                        <!-- card header  -->
                        <nav class="navbar py-4">
                          <div class="container-fluid px-1">
                            <h4>Categorias </h4>

                              
                          <div class="input-group w-25 rounded-3">
                            <input class="form-control bg-light border-success border-end-0 super-round" type="search" placeholder="Nome, família...">
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
                                <th>Família</th>
                                <th>Produtos</th>
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
                                      <h5 class=" mb-1">Calças</h5>
                                      <p class="mb-0 text-secondary">Lorem ipsum</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">Vestuário > Calças</td>
                                <td class="align-middle">356</td>
                                <td class="align-middle">
                                  <div class="dropdown dropstart">
                                    <a class="text-muted text-primary-hover" href="#" role="button" id="dropdownTeamOne" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical icon-xxs"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTeamOne">
                                      <a class="dropdown-item" href="#">Ver detalhes</a>
                                      <a class="dropdown-item" href="#">Produtos</a>
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

        <!--Product list-->
        <div class="row px-5">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
                      <div class="card h-100 px-3">
                        <!-- card header  -->
                        <nav class="navbar py-4">
                          <div class="container-fluid px-1">
                            <h4>Produtos </h4>

                              
                          <div class="input-group w-25 rounded-3">
                            <input class="form-control bg-light border-success border-end-0 super-round" type="search" placeholder="Nome, categoria, fornecedor...">
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
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Fornecedor</th>
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
                                      <h5 class=" mb-1">Calças de Cowboy Pretas</h5>
                                      <p class="mb-0 text-secondary">Vestuário > Calças</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">Calças</td>
                                <td class="align-middle">25.05€ - 33.33€</td>
                                <td class="align-middle">ASOS</td>
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
                                      <h5 class=" mb-1">Frigideira Inox Premium</h5>
                                      <p class="mb-0 text-secondary">... > Artigos para cozinhar > Frigideiras</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">Frigideiras</td>
                                <td class="align-middle">250.05€ - 400.33€</td>
                                <td class="align-middle">Sklum</td>
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

        <!--Category requests-->
        <!--Content list-->
        <div class="row px-5">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
                      <div class="card h-100 px-3">
                        <!-- card header  -->
                        <nav class="navbar py-4">
                          <div class="container-fluid px-1">
                            <h4>Pedidos de criação </h4>

                              
                          <div class="input-group w-25 rounded-3">
                            <input class="form-control bg-light border-success border-end-0 super-round" type="search" placeholder="Número, nome, estado...">
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
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Fornecedor</th>
                                <th>Estado</th>
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
                                      <h5 class=" mb-1">#768</h5>
                                      <p class="mb-0 text-secondary">Lorem ipsum</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">Lâmpadas</td>
                                <td class="align-middle">Produto</td>
                                <td class="align-middle">Worten</td>
                                <td class="align-middle"><span class="badge bg-warning text-uppercase">Novo</span></td>
                                
                                
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
                                      <h5 class=" mb-1">#767</h5>
                                      <p class="mb-0 text-secondary">Lorem ipsum</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">Bonecada</td>
                                <td class="align-middle">Categoria</td>
                                <td class="align-middle">Toys 'R' Us</td>
                                <td class="align-middle"><span class="badge bg-danger text-uppercase">Rejeitado</span></td>
                                
                                
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
                                      <h5 class=" mb-1">#766</h5>
                                      <p class="mb-0 text-secondary">Lorem ipsum</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">Sapatos</td>
                                <td class="align-middle">Categoria</td>
                                <td class="align-middle">Gardenia</td>
                                <td class="align-middle"><span class="badge bg-success text-uppercase">Aceite</span></td>
                                
                                
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
import { faBarcode, faSitemap } from '@fortawesome/free-solid-svg-icons';
library.add(faBarcode, faSitemap);

export default {
  name: 'TheProductsTab'
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

  .fa-barcode,
  .fa-sitemap,
  .fa-clipboard-list,
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