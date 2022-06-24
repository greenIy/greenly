<template>
        <div class="container-fluid px-5 tab-pane fade show active" id="general-tab" role="tabpanel" aria-labelledby="general-pill">
          <!--Tiny overview cards-->
          <div class="row px-5">
            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
              <div class="card ">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 class="mb-0">Utilizadores</h4>
                    </div>
                    <div class="bg-e4e6c3 rounded-2 p-2">
                      <font-awesome-icon :icon="['fas', 'users']" size="xl"/>
                    </div>
                  </div>
                  <div>
                    <h1 class="fw-bold">18k</h1>
                    <p class="mb-0 text-secondary"><span class="badge bg-secondary text-uppercase">Hoje</span><span class="ms-2 text-success">+36</span> utilizadores</p>
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

            <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
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
        </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins, faClipboardList } from '@fortawesome/free-solid-svg-icons';
library.add(faUsers, faBoxesStacked, faBarcode, faSitemap, faCoins, faClipboardList);

export default {
  name: 'TheGeneralTab'
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
  .fa-clipboard-list,
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