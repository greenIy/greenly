<template>
  <div class="page-container">
    <div class="content-wrap">

      <!--Responsive Nav-->
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Expand at sm</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form>
          <input class="form-control" type="text" placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
      </nav>
      <!--End Responsive Nav-->

      <the-navbar />

      <div class="container" id="aju">
          <the-filters />

          <div class="flex-shrink-0 p-3" style="width: 80%;">
            <the-utility-bar />

            <br>

            <!--products-->
            <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5">
                        <div class="card h-100">
                          <div class="badge bg-secondary text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Favoritar</div>
                            <img class="card-img-top" src="https://thumbs.dreamstime.com/b/os-polegares-levantam-o-emoticon-73992493.jpg" alt="...">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Eu</h5>
                                    00.50€-1000.00€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-success mt-auto" href="#">Ver opções</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-success text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Favorito</div>
                            <img class="card-img-top" src="https://i.ytimg.com/vi/4JipHEz53sU/maxresdefault.jpg" alt="...">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Quero</h5>
                                    <!-- <span class="text-muted text-decoration-line-through">$50.00</span> -->
                                    24.00€ - 35.00€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-success mt-auto" href="#">Ver opções</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                          <div class="badge bg-secondary text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Favoritar</div>
                            <img class="card-img-top" src="http://conteudo.imguol.com.br/c/entretenimento/68/2020/12/23/lichia-1608745783126_v2_1920x1285.jpg" alt="...">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Tchu</h5>
                                    1000.00€ - 9999999.00€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-success mt-auto" href="#">Ver opções</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-success text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Favorito</div>
                            <img class="card-img-top" src="https://thumbs.dreamstime.com/b/unrecognizable-pregnant-lady-touching-her-naked-belly-closeup-shot-unrecognizable-pregnant-lady-touching-her-naked-belly-closeup-206671372.jpg" alt="...">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Eu</h5>
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    18.00€ - 19.00€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-success mt-auto" href="#">Ver opções</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <div class="badge bg-success text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Favorito</div>
                            <div class="h-25">
                              <img class="card-img-top mh-100 overflow-hidden" src="https://cdn.britannica.com/63/5363-050-F797D3B9/Africa.jpg" alt="...">
                            </div>
                            
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Quero</h5>
                                    <!-- <span class="text-muted text-decoration-line-through">$50.00</span> -->
                                    05.00€ - 45.00€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-success mt-auto" href="#">Ver opções</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-5">
                        <div class="card h-100">
                          <div class="badge bg-secondary text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Favoritar</div>
                            <img class="card-img-top mh-50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ball%2C_%E0%B4%AA%E0%B4%A8%E0%B5%8D%E0%B4%A4%E0%B5%8D.JPG/1200px-Ball%2C_%E0%B4%AA%E0%B4%A8%E0%B5%8D%E0%B4%A4%E0%B5%8D.JPG" alt="...">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">Tcha</h5>
                                    <!-- Product reviews
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>-->
                                    40.00€ - 41.00€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-success mt-auto" href="#">Ver opções</a></div>
                            </div>
                        </div>
                    </div>
            </div>
          </div>

          <!--here
            <div class="half">
                <TheFilters :switchCurrentCategory="switchCurrentCategory"/>
            </div>

            <div class="half">
                <ProductsPlaceholder :products="products"/>
            </div>-->
      </div>
    </div> 
    <the-footer />
  </div>
</template>

<script>

// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import TheFilters from '../components/Catalog Page/TheFilters.vue'
import TheUtilityBar from '../components/Catalog Page/TheUtilityBar.vue'
import ProductsPlaceholder from '../components/Catalog Page/ProductsPlaceholder.vue'
import mock_prods from '../mock_prods.json'

export default {
  name: 'FiltersView',
  components: {
    TheNavbar,
    TheFooter,
    TheFilters,
    TheUtilityBar,
    ProductsPlaceholder
  },
  data () {
    return {
      products: mock_prods
    }
  },
  methods: {
    /*switchCurrentCategory (chosenCategory) {
      this.resetProducts()
      if (chosenCategory !== 'Todos') {
        this.products = this.products.category((product) => {
          console.log("found match value")
          return product.category === chosenCategory
        })
    },*/
    resetProducts () {
      this.products = mock_prods
    }
  }
};
</script>

<style scope>
    #aju { 
    display: flex;
    }
</style>
