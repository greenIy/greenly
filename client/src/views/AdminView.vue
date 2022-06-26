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
          <TheUsersTab :users='this.users' :amountUsers='this.amountUsers' :increment='this.userIncrement'/>
          <TheProductsTab :categories='this.categories' :products='this.products' :requests='this.requests' 
                          :amountCategories='this.amountCategories' :amountProducts='this.amountProducts' :amountRequests='this.amountRequests'/>
          <TheOrdersTab :orders='this.orders' :amountOrders='this.amountOrders'/>
        </div>

      </div>
    </div>
      
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import TheDashboardPills from '@/components/Administration/TheDashboardPills.vue';
import TheGeneralTab from '@/components/Administration/TheGeneralTab.vue';
import TheUsersTab from '@/components/Administration/TheUsersTab.vue';
import TheProductsTab from '@/components/Administration/TheProductsTab.vue';
import TheOrdersTab from '@/components/Administration/TheOrdersTab.vue';

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
    TheOrdersTab
  },
  data() {
    return {
      users: [],
      amountUsers: 0,
      userIncrement: 99999,
      categories: [],
      amountCategories: 0,
      products: [],
      amountProducts: 0,
      requests: [],
      amountRequests: 0,
      orders: [],
      amountOrders: 0
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
      this.amountUsers = response.data.length;
    },
    async getCategories() {
      let response = await http.get("/store/categories");
      this.categories = response.data;
      this.amountCategories = response.data.length;
    },
    async getProducts() {
      let response = await http.get("/store/products");
      this.products = response.data.products;
      this.amountProducts = response.data.total_products;
    },
    async getOrders() {
      let accessToken = JSON.parse(localStorage.getItem('accessToken'));

      let response = await http.get("/store/orders", { headers: {"Authorization" : `Bearer ${accessToken}`}} );
      this.orders = response.data;
      this.amountOrders = response.data.length;
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