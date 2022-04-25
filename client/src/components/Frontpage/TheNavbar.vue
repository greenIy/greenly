<template>
<!--old-->
    <nav class="navbar px-4">
        <div class="container-fluid my-2">
            <div>
                <!--Megamenu toggler-->
                <button class="btn bg-transparent border-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#megamenu" aria-controls="megamenu">
                    <font-awesome-icon :icon="['fa', 'bars-staggered']" size="xl" inverse/>
                </button>

                <!--Brand logo-->
                <router-link to="/" class="navbar-brand mx-3">
                    <img id="navbar-logo" alt="Logo do greenly" src="../../assets/logo_dark.png">
                </router-link>
            </div>

            <!--Search bar-->
            <div id="web-search" class="input-group search-group align-self-center"> <!--aliugn???-->
                <input class="form-control bg-light border-light" type="search" placeholder="Produtos, fornecedores, transportadores..." aria-label="Search" v-model="search" v-on:keyup.enter="submit(this.search)">
                <button class="btn bg-light" type="submit" @click="submit(this.search)">
                    <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l"/>
                </button>
            </div>

            <div>
                <!--Profile-->
                <div class="btn-group">
                    <button class="dropdown-toggle align-self-center bg-transparent border-0 shadow-none mx-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <font-awesome-icon :icon="['fa', 'user']" size="xl" inverse/>
                    </button>

                    <ul class="dropdown-menu dropdown-menu-end me-3">
                    <li><a class="dropdown-item" href="#">HERE MIGUEL</a></li>
                    </ul>
                </div>
            
                <!--Cart-->
                <button class="align-self-center bg-transparent border-0 shadow-none position-relative me-1" type="button">
                    <router-link to="/cart">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" inverse/>
                    </router-link>

                    <span id="cart-leaf" class="position-absolute"> 
                        <img alt="Número itens carrinho" src="../../assets/leaf.png">
                        <span id="cart-count" class="position-absolute text-light"> 
                            10
                        </span>
                    </span>
                </button>
            </div>

            <!--Mobile search bar-->
            <div id="mobile-search" class="input-group search-group align-self-center mt-3">
                <input class="form-control bg-light border-light" type="search" placeholder="Produtos, fornecedores, transportadores..." aria-label="Search" v-model="search" v-on:keyup.enter="submit(this.search)">
                <button class="btn bg-light" type="submit" @click="submit(this.search)">
                    <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l"/>
                </button>
            </div>
        </div>
        <!--div class=" navmenu2 d-flex justify-content-center pb-3 text-uppercase nav-links pt-2">
            <div class="pt-2">
                <router-link to="/promocoes" class="mb-2 pr-2">
                    promoções <span class="ms-3"> | </span>            
                </router-link>
            </div>
            <div class="pt-2">
                <router-link to="/produtos" class="mb-2 mr-2">
                    produtos <span class="ms-3"> | </span> 
                </router-link>
            </div>
            <div class="pt-2">
                <router-link to="/servicos" class="mb-2 ml-2">
                    serviços <span class="ms-3"> | </span> 
                </router-link>
            </div>
            <div class="pt-2">
                <router-link to="/fornecedores" class="mb-2">
                    fornecedores
                </router-link>
            </div>
        </div-->
    </nav>
    

<!--div class="row content justify-content-center">
    <div class="col-sm-2 col-md-2 mb-2 filtros ">
            <div class="content d-flex">
              <megamenu
    <div class="d-flex-shrink-0 pt-3 pl-3 mr-0"> 
        <p class=" align-items-center pb-3 mb-3 fs-4 fw-bold ps-2">
        Filtros
        </p>
        <ul class="list-unstyled ">
        <li>
            <div class="btn btn-toggle align-items-center rounded fs-6 fw-bold" @click="transformC()" data-bs-toggle="collapse" data-bs-target="#categories-collapse" aria-expanded="true">
            <font-awesome-icon id="iconC" class="fs-6 fa-fw" :icon="['fas', 'angle-up']" /> Categoria
            </div>   
            <div class="collapse show" id="categories-collapse">
            <div class="list-group list-group-flush">
                <router-link v-if="categorySelected" to="/produtos" @click='goBack()' class="list-group-item list-group-item-action border-0">
                &larr;  {{ currentCategory.name }}
                </router-link>
                
                <router-link v-for="category in showCategories" :key="category" :to="{ name: 'categoria', params: { categoria : category.name } }" @click='showProducts(category)' class="list-group-item list-group-item-action border-0">
                {{ category.name }}
                </router-link>
            </div>
            </div>
        </li>
        <li>
            <div class="btn btn-toggle align-items-center rounded fs-6 fw-bold" @click="transformP()" data-bs-toggle="collapse" data-bs-target="#price-range-collapse" aria-expanded="true">
            <font-awesome-icon  id="iconP" class="fs-6 fa-fw"  :icon="['fas', 'angle-up']"  /> Preço
            </div>

            <div class="collapse show" id="price-range-collapse">
            <div class="list-group list-group-flush pb-3">
                <span class="list-group-item border-0">
                <label for="price-min">Mínimo: &nbsp;</label>
                    <input v-model.number:value="minPrice" :min="minPrice" class="form-control w-50 d-inline" id="min-price" type="number">
                </span>
                <span class="list-group-item border-0">
                <label for="price-max">Máximo: &nbsp;</label>
                <input v-model.number:value="maxPrice" :max="maxPrice" class="form-control w-50 d-inline" id="max-price" type="number">
                </span>
            </div>
            </div>
        </li>
        <li>
            <div class="btn btn-toggle align-items-center rounded fs-6 fw-bold" @click="transformF()" data-bs-toggle="collapse" data-bs-target="#fornecedores-collapse" aria-expanded="true">
            <font-awesome-icon id="iconF" class="fs-6 fa-fw" :icon="['fas', 'angle-up']" /> Fornecedor
            </div>   
            <div class="collapse show" id="fornecedores-collapse">
            <div class="list-group list-group-flush">
            
            </div>
            </div>
        </li>
        </ul>
    </div>-->
    <!--TheFilters :categories="categories" :maxPrice="getMaxPrice" :minPrice="getMinPrice" @sendCurrentCategory="getCurrentCategory" @sendGoBack="goBackPage"/
        </div>
    </div>
</div>-->
    
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faBarsStaggered, faUser, faMagnifyingGlass, faPercent} from '@fortawesome/free-solid-svg-icons';

library.add(faCartShopping);
library.add(faBarsStaggered);
library.add(faUser);
library.add(faMagnifyingGlass);
library.add(faPercent)

export default {
  name: 'TheNavbar',
  data () {
    return {
      search: '',
    }
  },
  methods: {
      submit(search) {
        this.$emit('search-information', search);
      }
  }
};
</script>

<style scoped>
    #navbar-logo {
        width: 90px;
        height: 35px;
    }

    input, button {
        border-radius: 20px;
        line-height: 15px;
        font-size: 15px;
        box-shadow: 0;
    }

    .router-link-exact-active {
       text-decoration: underline!important;
    }
    
    .navbar {
        background-color: #68b694;
    }

    .input-group .btn {
        z-index: 0;
    }

    .fa-bars-staggered:hover,
    .fa-user:hover,
    .fa-cart-shopping:hover,
    .fa-bars-staggered:active,
    .fa-user:active,
    .fa-cart-shopping:active,
    .fa-magnifying-glass,
    #promo {
        color: #483df6;
    }
     .fa-magnifying-glass:hover{
        color: #493df693;
    }

    .dropdown-toggle::after {
    content: none;
    }

    #cart-count {
        right: 3.1px;
        top: 3px;
        width: 70%;
        font-family: 'Lucida Console',monospace;
    }

    #cart-leaf {
        top: -12px;
        left: 20px;
        font-size: 80%;
    }

    #cart-leaf img {
        width: 20px;
    }

    @media only screen and (max-width: 950px) {
        #web-search {
            display: none;
        }

        .search-group {
            width: 100%;
        }   
    }

    @media only screen and (min-width: 951px) {
        #mobile-search {
            display: none;
        }

        .search-group {
            width: 825px;
            max-width: 50%;
        }   

    }
</style>
