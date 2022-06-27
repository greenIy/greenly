<template>
  <div class="container-fluid px-5 tab-pane fade" id="products-tab" role="tabpanel" aria-labelledby="products-pill">
    <!--Tiny overview cards-->
    <div class="row px-5">

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.categoriesTitle' :amount='this.amountCategories'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.productsTitle' :amount='this.amountProducts'/>
      </div>

      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-5">
        <TheOverviewCard :title='this.requestsTitle' :amount='this.amountRequests'/>
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
                <input class="form-control bg-light border-success border-end-0 super-round" type="search"
                  placeholder="Nome, família...">
                <span class="input-group-text bg-light border-success border-start-0 super-round">
                  <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l" /></span>
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
                        <p class="mb-0 text-secondary">#{{ category.id }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle"> {{ buildPath(category.id) }}</td>
                  <td class="align-middle"> {{ category.total_products }} </td>
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
                <input class="form-control bg-light border-success border-end-0 super-round" type="search"
                  placeholder="Nome, categoria, fornecedor...">
                <span class="input-group-text bg-light border-success border-start-0 super-round">
                  <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l" /></span>
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

    <!--Requests-->
    <!--Content list-->
    <div class="row px-5">
      <div class="col-xl-12 col-lg-12 col-md-12 col-12 mt-5">
        <div class="card h-100 px-3">
          <!-- card header  -->
          <nav class="navbar py-4">
            <div class="container-fluid px-1">
              <h4>Pedidos de criação </h4>


              <div class="input-group w-25 rounded-3">
                <input class="form-control bg-light border-success border-end-0 super-round" type="search"
                  placeholder="Número, nome, estado...">
                <span class="input-group-text bg-light border-success border-start-0 super-round">
                  <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l" /></span>
              </div>

            </div>
          </nav>

          <!-- table  -->
          <div class="table-responsive" style="max-height: 400px;">
            <table class="table text-nowrap px-3">
              <thead class="text-uppercase">
                <tr>
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
                        <h5 class=" mb-1">Lâmpadas</h5>
                        <p class="mb-0 text-secondary">#768</p>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">Produto</td>
                  <td class="align-middle">Worten</td>
                  <td class="align-middle"><span class="badge bg-warning text-uppercase">Novo</span></td>


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
                        <h5 class=" mb-1">Bonecada</h5>
                        <p class="mb-0 text-secondary">#767</p>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">Categoria</td>
                  <td class="align-middle">Toys 'R' Us</td>
                  <td class="align-middle"><span class="badge bg-danger text-uppercase">Rejeitado</span></td>


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
                        <h5 class=" mb-1">Sapatos</h5>
                        <p class="mb-0 text-secondary">#766</p>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">Categoria</td>
                  <td class="align-middle">Gardenia</td>
                  <td class="align-middle"><span class="badge bg-success text-uppercase">Aceite</span></td>


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
</template>

<script>
import TheOverviewCard from './TheOverviewCard.vue';

export default {
  name: 'TheProductsTab',
  components: {
    TheOverviewCard,
  },
  data() {
    return {
      categoriesTitle: 'Categorias',
      productsTitle: 'Produtos',
      requestsTitle: 'Pedidos',
      currentCategory: {},
      currentProduct: {},
      currentRequest: {}
    };
  },
  props: [
    'categories',
    'products',
    'requests',
    'amountCategories',
    'amountProducts',
    'amountRequests'
    //'increment', //not sure if needed
  ],
  methods: {
    getCurrentCategory: function (categoryId) {
      let response = http.get(`/store/categories/${categoryId}`);
      this.currentCategory = response.data;
    },
    getCurrentProduct: function (productId) {
      let response = http.get(`/store/products/${productId}`);
      this.currentCategory = response.data;
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