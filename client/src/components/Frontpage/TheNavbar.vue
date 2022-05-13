<template>
    <div>
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
                <div id="web-search" class="input-group search-group align-self-center"> 
                    <input class="form-control bg-light border-light" type="search" placeholder="Produtos, fornecedores, transportadores..." aria-label="Search" v-model="search" v-on:keyup.enter="submit(this.search)">
                    <button class="btn bg-light" type="submit" @click="submit(this.search)">
                        <font-awesome-icon :icon="['fa', 'magnifying-glass']" size="l"/>
                    </button>
                </div>

                <div>
                    <!--Profile logged off
                    <div v-if="!userIsLoggedIn" class="btn-group">
                        <button class="align-self-center bg-transparent border-0 shadow-none mx-3">
                            <router-link  to="/login">
                                <font-awesome-icon :icon="['fa', 'user']" size="xl" inverse/>
                            </router-link>
                        </button>
                    </div>-->

                    <!--Profile logged in v-else {{ user.first_name }}-->
                    <div  class="btn-group">
                        <button class="dropdown-toggle align-self-center bg-transparent border-0 shadow-none mx-3" id="dropdown-user" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <font-awesome-icon :icon="['fa', 'user']" size="xl" inverse/>
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end me-3" aria-labelledby="dropdown-user">
                            <li class="dropdown-header"> <!-- class="dropdown-header"????-->
                                <h5>Olá João!</h5>
                                <h6>Consumidor</h6>
                            </li>

                            <li><router-link to="/painel"><a class="dropdown-item"><font-awesome-icon :icon="['fa', 'table-columns']" size=""/>&nbsp; Painel</a></router-link></li>

                            <li><hr class="dropdown-divider"></li>

                            <li><router-link to="/perfil"><a class="dropdown-item"><font-awesome-icon :icon="['fa', 'id-card']" size=""/>&nbsp; Perfil</a></router-link></li>
                            <li><router-link to="/painel/encomendas"><a class="dropdown-item"><font-awesome-icon :icon="['fa', 'box-archive']" size=""/>&nbsp; Encomendas</a></router-link></li>
                            <li><router-link to="/painel/favoritos"><a class="dropdown-item"><font-awesome-icon :icon="['fa', 'heart']" size=""/>&nbsp; Favoritos</a></router-link></li>
                            <li><router-link to="/painel/notificacoes"><a class="dropdown-item"><font-awesome-icon :icon="['fa', 'bell']" size=""/>&nbsp; Notificações</a></router-link></li>

                            <li><hr class="dropdown-divider"></li>

                            <li><router-link to="/login" v-on:click="logoutUser"><a class="dropdown-item text-danger"><font-awesome-icon :icon="['fa', 'power-off']" size=""/>&nbsp; Terminar sessão</a></router-link></li>
                        </ul>
                    </div>
                
                    <!--Cart-->
                    <button class="align-self-center bg-transparent border-0 shadow-none position-relative me-1" type="button">
                        <router-link to="/carrinho">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" inverse/>
                        </router-link>

                        <span id="cart-leaf" class="position-absolute"> 
                            <img alt="Número itens carrinho" src="../../assets/leaf.png">
                            <span id="cart-count" class="position-absolute text-light">10</span>
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
        </nav> 
        
        <TheMegamenu />
    </div>
</template>

<script>
import TheMegamenu from '@/components/Frontpage/TheMegamenu.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faBars, faUser, faMagnifyingGlass, faPercent, faIdCard, faBoxArchive, faHeart, faBell, faTableColumns, faPowerOff} from '@fortawesome/free-solid-svg-icons';

library.add(faCartShopping, faBars, faUser, faMagnifyingGlass, faPercent, faIdCard, faBoxArchive, faHeart, faBell, faTableColumns, faPowerOff);

export default {
  name: 'TheNavbar',
  components: {
      TheMegamenu
  },
  data () {
    return {
      search: '',
      //userIsLoggedIn: this.$store.getters.getState,
      //user: this.$store.getters.getUser
    }
  },
  methods: {
      submit(search) {
        this.$emit('search-information', search);
      },
      logoutUser() {
        // Apagar token e informação sobre o utilizador presente na VueX store
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setState', false);
        // TODO: Eventualmente fazer um pedido a /auth/logout aqui
      }
  }
};
</script>

<style scoped>
    a {
        text-decoration: none!important;
    }
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
        background-color: #309c76;
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
        color: #226d53;
    }

     .fa-magnifying-glass:hover{
        color: #226d5393;
    }

    .dropdown-toggle::after {
        content: none;
    }

    .dropdown-menu {
        font-size: 0.8rem;
    }

    #cart-count {
        right: 3.3px;
        top: 4.3px;
        width: 70%;
        font-family: 'Lucida Console',monospace;
    }

    #cart-leaf {
        top: -12px;
        left: 20px;
        font-size: 80%;
    }

    #cart-leaf img {
        width: 23px;
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
