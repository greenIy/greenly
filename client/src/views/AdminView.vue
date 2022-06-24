<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap position-relative">
      
      <TheNavbar />

      <!--Background color-->
      <div class="underlay-banner bg-226d53">
      </div> 

      <!--Dashboard content-->
      <div class="position-relative overlay px-5">
        <div class="container-fluid px-5"> 
          <!--Dashboard navigation bar-->
          <div class="row px-5">
            <div class="col-lg-12 col-md-12 col-12 mt-4">
              <div>
                <div class="d-flex justify-content-between align-items-center">
                    <!--Admin pills-->
                    <TheDashboardPills />

                    <!--div class="mb-2 mb-lg-0">
                      <router-link :to="{ name: 'admin', params: { id : 'panoramica' } }" class="text-decoration-none">
                        <h2 role="button" class="mb-0 d-inline me-3" :class="{'text-light': isGeneralTab, 'text-309c76 btn-lg' : !isGeneralTab}">Panorâmica</h2>
                      </router-link>

                      <router-link :to="{ name: 'admin', params: { id : 'utilizadores' } }" class="text-decoration-none">
                        <h2 role="button" class="mb-0 d-inline me-3" :class="{'text-light': isUsersTab, 'text-309c76 btn-lg' : !isUsersTab}">Utilizadores</h2>
                      </router-link>

                      <router-link :to="{ name: 'admin', params: { id : 'produtos' } }" class="text-decoration-none">
                      <h2 role="button" class="mb-0 d-inline me-3" :class="{'text-light': isProductsTab, 'text-309c76 btn-lg' : !isProductsTab}">Produtos</h2>
                      </router-link>
                      
                      <router-link :to="{ name: 'admin', params: { id : 'encomendas' } }" class="text-decoration-none">
                        <h2 role="button" class="mb-0 d-inline me-3" :class="{'text-light': isOrdersTab, 'text-309c76 btn-lg' : !isOrdersTab}">Encomendas</h2>
                      </router-link>
                    </div-->

                  <!--Tab creation buttons-->
                  <div class="mb-2 mb-lg-0">
                    <button class="btn btn-success btn-lg bg-309c76 me-2 my-0">Criar administrador</button>
                  </div>

                  <!--div class="mb-2 mb-lg-0">
                    <button class="btn btn-success btn-lg bg-309c76 me-2 my-0">Criar categoria</button>
                    <button class="btn btn-success btn-lg bg-309c76 ms-2 my-0">Criar produto</button>
                  </div-->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--Admin tab content-->
        <div class="tab-content" id="pills-tab-content">
          <TheGeneralTab />
          <TheUsersTab :users='this.users' :nbUsers='this.nbUsers' :currentUser='this.currentUser'/>
          <!--TheProductsTab /-->
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
                    <h1 class="fw-bold"> {{ this.nbCategories }} </h1>
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
                    <h1 class="fw-bold"> {{ this.nbProducts }} </h1>
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
                    <h1 class="fw-bold"> {{this.nbRequests}} </h1>
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
                        <div class="table-responsive" style="max-height: 400px;">
                          <table class="table text-nowrap px-3">
                            <thead class="text-uppercase">
                              <tr>
                                <th>Nome</th>
                                <th>Família</th>
                                <th>Produtos</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody class="border-top-0 overflow-auto">
                              <tr v-for="category in this.categories" :key="category">
                                <td class="align-middle">
                                  <div class="d-flex align-items-center ">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1"> {{ category.name }}</h5>
                                      <p class="mb-0 text-secondary">Lorem ipsum</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle"> {{ buildPath(category.id) }}</td>
                                <td class="align-middle"> {{ category.total_products }} </td>
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
                        <div class="table-responsive" style="max-height: 400px;">
                          <table class="table text-nowrap px-3">
                            <thead class="text-uppercase">
                              <tr>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody class="border-top-0 overflow-auto">
                              <tr v-for="product in this.products" :key="product">
                                <td class="align-middle">
                                  <div class="d-flex align-items-center ">
                                    <div>
                                    </div>
                                    <div class="lh-1">
                                      <h5 class=" mb-1">{{ product.name }}</h5>
                                      <p class="mb-0 text-secondary"> #{{product.id}}</p>
                                    </div>
                                  </div>
                                </td>
                                <td class="align-middle">{{ product.category.name }}</td>
                                <td class="align-middle">{{ product.lowest_price }}€ - {{ product.highest_price }}€</td>
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
                        <div class="table-responsive" style="max-height: 400px;">
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
                            <tbody class="border-top-0 overflow-auto">
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
                          </table>
                        </div>
                      </div>
                    </div>
          </div>
    </div>



          <TheOrdersTab :orders='this.orders' :nbOrders='this.nbOrders'/>
        </div>

      </div>
    </div>
      
    <TheFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import TheDashboardPills from '@/components/Administration/TheDashboardPills.vue';
import TheGeneralTab from '@/components/Administration/TheGeneralTab.vue';
import TheUsersTab from '@/components/Administration/TheUsersTab.vue';
import TheProductsTab from '@/components/Administration/TheProductsTab.vue';
import TheOrdersTab from '@/components/Administration/TheOrdersTab.vue';
import ProfilePersonalInfo from '../components/Profile/ProfilePersonalInfo.vue';
import Profile from '../components/Profile/Profile.vue';

import http from "../../http-common"

export default {
  name: 'AdminView',
  components: {
    TheNavbar,
    TheFooter,
    TheDashboardPills,
    TheGeneralTab,
    TheUsersTab,
    TheProductsTab,
    TheOrdersTab,
    ProfilePersonalInfo,
    Profile
  },
  data() {
    return {
      users: [],
      nbUsers: 0,
      categories: [],
      nbCategories: 0,
      currentCategory: [],
      products: [],
      nbProducts: 0,
      currentProduct: {},
      requests: [],
      nbRequests: 0,
      orders: [],
      nbOrders: 0,
      currentOrder: []
    };
  },
  mounted() {
    this.getUsers();
    this.getCategories();
    this.getProducts();
  },
  methods: {
    async getUsers() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/user", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.users = response.data;
      this.nbUsers = response.data.length;
    },
    async getOrders() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/orders", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.orders = response.data;
      this.nbOrders = response.data.length;
    },
    async getCategories() {
      let response = await http.get("/store/categories");
      this.categories = response.data;
      this.nbCategories = response.data.length;
    },
    async getProducts() {
      let response = await http.get("/store/products");
      this.products = response.data.products;
      this.nbProducts = response.data.total_products;
    },

    /**
     * 
     * @param {int} categoryID - The ID of the category for which the path is to be found.
     * @param {array} data - The data in [{"id":42, "name": "string", "parent_category": 42}] structure, straight as it comes from the API.
     * @param {boolean} verbose - Specifies if the output should include category IDs or not.
     * @returns A string representing the category path. e.g. "Eos > Reiciendis" (if not verbose) or "(4) Eos > (5) Reiciendis" if verbose.
     */
    buildPath: function(categoryID, verbose) {

        let data = this.categories;
        let pathNames = []

        let findCategory = (ID) => {
            return data.find((category) => category.id == ID)
        }

        let target = categoryID

        while (target) {
            let targetObject = findCategory(target)
            pathNames.push(verbose ? `(${targetObject.id}) ${targetObject.name}` : targetObject.name)
            target = targetObject.parent_category
        }

        return pathNames.reverse().join(" > ")

    }
  }
};
</script>

<style scoped>
  .bg-226d53 {
    background-color: #226d53;
  }

   .bg-309c76 {
    background-color: #309c76;
  }

  
  .text-309c76{
    color: #309c76;
  }

  .text-309c76:hover{
    color: #5abd9a!important;
  }

  .text-light:hover{
    color: #a4f3d7!important;
  }

.underlay-banner {
	padding-top: 4rem ;
	padding-bottom: 9.5rem;
}

.overlay {
  top: -150px;
}
</style>