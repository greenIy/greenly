<template>
<nav>
        <div class="navmenu d-flex justify-content-center pt-2 pb-2">
            <div class="align-self-center mt-2 mb-2">
                <router-link to="/" class="navbar-brand">
                    <img alt="Logo do greenly" src="../../assets/logo_dark.png">
                </router-link>
            </div>
            <div class="input-group search-group align-self-center mt-2 mb-2 ms-4">
                <input class="form-control" type="search" placeholder="O que estás à procura?" aria-label="Search" v-model="search" @keyup.enter="submit(this.search)">
                <button class="btn btn-outline-success" type="submit" @click="submit(this.search)">Pesquisar</button>
            </div>
            <div v-if="!userIsLoggedIn" class="align-self-center nav-links mt-2 mb-2 ml-2 ms-5">
                <router-link  to="/login">
                    <font-awesome-icon :icon="['fas', 'user']" size="xl"/>
                </router-link>
            </div>
            <div v-if="userIsLoggedIn" style="display: flex">
                <div class="align-self-center nav-links mt-3 mb-2 ms-3">
                    <h6>{{ user.first_name }}</h6>
                </div>
                <div class="align-self-center nav-links mt-2 mb-2 ml-3">
                    <div class="dropdown">
                        <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <font-awesome-icon :icon="['fas', 'user']" size="xl"/>
                        </a>
                        <ul class="dropdown-menu mt-3" aria-labelledby="dropdownMenuLink">
                            <li><router-link to="/profile/personalInfo" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'id-card']" />&nbsp; Perfil</a></router-link></li>
                            <li v-if="user.type == 'CONSUMER'"><router-link to="/profile/orders" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'box-archive']" />&nbsp; Encomendas</a></router-link></li>
                            <li v-if="user.type == 'SUPPLIER' || user.type == 'TRANSPORTER'"><router-link to="/" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'clipboard']" />&nbsp; Painel de encomendas</a></router-link></li>
                            <li><router-link to="/" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'heart']" />&nbsp; Favoritos</a></router-link></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><router-link to="/login" v-on:click="logoutUser" style="margin-left: 0;"><a class="dropdown-item" style="color: red !important; width: 85%">Terminar sessão</a></router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="userIsLoggedIn" class="align-self-center nav-links mt-2 mb-2 ml-3">
                <div class="dropdown">
                    <span class="position-absolute top-0 start-100 translate-middle bg-custom border border-light rounded-circle" style="padding: 6px">
                        <span class="visually-hidden"></span>
                    </span>
                    <a class="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <font-awesome-icon :icon="['fas', 'bell']" size="xl"/>
                    </a>
                    <ul class="dropdown-menu mt-3" aria-labelledby="dropdownMenuLink" style="width: 350px;">
                        <div class="list-group list-group-flush" style="">
                            <!-- <a class="list-group-item list-group-item-action" style="margin-left: 0; color: black">
                                <div class="d-flex justify-content-center align-items-center p-4">
                                    Não tem notificações.
                                </div>
                            </a> -->
                            <router-link to="/profile/personalInfo" style="margin: 0;">
                                <a class="list-group-item list-group-item-action" style="margin-left: 0; color: black">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">Perfil incompleto (telemóvel)</h6>
                                        <small>Aviso</small>
                                    </div>
                                    <small>Por favor clique aqui para associar um número de telemóvel ao seu perfil.</small>
                                </a>
                            </router-link>
                            <router-link to="/profile/addresses" style="margin: 0;">
                                <a class="list-group-item list-group-item-action" style="margin-left: 0; color: black">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">Perfil incompleto (morada)</h6>
                                        <small>Aviso</small>
                                    </div>
                                    <small>Por favor clique aqui para associar uma ou mais moradas ao seu perfil.</small>
                                </a>
                            </router-link>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="align-self-center nav-links mt-2 mb-2">
                <router-link to="/cart">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl"/>
                </router-link>
            </div>
            <router-link  to="/login">
                
            </router-link>
        </div>
        
    <div class=" navmenu2 d-flex justify-content-center pb-3 text-uppercase nav-links pt-2">
        <div class="pt-2">
            <router-link to="/promocoes" class="mb-2 pr-2">
                promoções <span class="ms-3"> | </span>            
            </router-link>
        </div>
        <div class="pt-2">
            <router-link to="/produtos" :key="$route.fullPath" @click="reloadPage()" class="mb-2 mr-2">
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
    </div>
</nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faUser, faIdCard, faBoxArchive, faClipboard, faHeart, faBell, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
library.add(faCartShopping, faUser, faIdCard, faBoxArchive, faClipboard, faHeart, faBell, faArrowRightFromBracket);

import AuthService from '../../router/auth';


export default {
  name: 'TheNavbar',
  data () {
    return {
        search: '',
        userIsLoggedIn: this.$store.getters.getState,
        user: this.$store.getters.getUser
    }
  },
  methods: {
    submit(search) {
        this.$router.push({ path: '/produtos', query: { pesquisa: `${ search }` } });
    },
    methods: {
        submit(search) {
            this.$emit('search-information', search);
        },
        logoutUser() {
            AuthService.logoutUser()
            // TODO: Eventualmente fazer um pedido a /auth/logout aqui
        }

    }
    }
}
</script>

<style scoped>
    .navmenu {
        background-color: #5e9f88;
        color: #fcfaf9;
    }

    .navmenu2 {
        background-color: #ffffff;
        color: #000000;
        box-shadow: 0 2px 3px rgb(40 40 40 / 20%);
    }
    .navmenu a {
        color: #fcfaf9;
        text-decoration: none;
        margin-left: 20px;
    }
    .navmenu2 a {
        color: #000000;
        text-decoration: none;
        margin-left: 20px;

    }
    .navmenu a:hover {
        color: #e4e4e4;
    }

    .navmenu2 a:hover {
        color: #5e9f88;
    }

    .nav-links {
        font-size: 12px;
    }

    .container {
        width: 100%;
    }

    img {
        width: 90px;
        height: 35px;
    }

    .search-group {
        width: 825px!important;
    }

    input, button {
        border-radius: 20px;
        line-height: 15px;
        font-size: 15px;
    }
    
    button {
        background-color: #dce5e1;
        border: 0px;
        color: #5e9f88;
        box-shadow: none;
    }
    button:hover {
        background-color: #dce5e1;
        border: 0px;
        color: #5e9f88;
    }
    .btn-outline-success{
        box-shadow:none;
    }
    .form-control{
        box-shadow:none;
    }

    .router-link-exact-active {
       text-decoration: underline!important;
    }

    .dropdown-header, .dropdown-item, .dropdown-item a {
        color: black !important;
    }
    .bg-custom {
        background-color: #222725 !important;
    }  
</style>
