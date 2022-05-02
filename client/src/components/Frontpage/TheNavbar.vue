<template>
<!--old-->
    <nav class="navbar px-4">
        <div class="container-fluid my-2">
            <div>
                <!--Megamenu toggler-->
                <button class="btn bg-transparent border-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#megamenu">
                    <font-awesome-icon :icon="['fa', 'bars']" size="xl" inverse/>
                </button>

                <!--Brand logo-->
                <router-link to="/" class="navbar-brand mx-3">
                    <img id="navbar-logo" alt="Logo do greenly" src="../../assets/logo_dark.png">
                </router-link>
            </div>

            <!--Search bar-->
            <div  class="input-group search-group align-self-center"> 
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
            <div  class="input-group search-group align-self-center mt-3 d-none">
                <input class="form-control bg-light border-light" type="search" placeholder="Produtos, fornecedores, transportadores..." aria-label="Search" v-model="search" v-on:keyup.enter="submit(this.search)">
                <button class="btn bg-light" type="submit" @click="submit(this.search)">
                    <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l"/>
                </button>
            </div>
        </div>
    </nav> 
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faBars, faUser, faMagnifyingGlass, faPercent} from '@fortawesome/free-solid-svg-icons';

library.add(faCartShopping);
library.add(faBars);
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

    .fa-bars:hover,
    .fa-user:hover,
    .fa-cart-shopping:hover,
    .fa-bars:active,
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
