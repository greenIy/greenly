<template>
<nav>
        <div class=" navmenu d-flex justify-content-center pt-2 pb-2">
            <div class="align-self-center mt-2 mb-2">
                <router-link to="/" class="navbar-brand">
                    <img alt="Logo do greenly" src="../../assets/logo_dark.png">
                </router-link>
            </div>
            <div class="input-group search-group align-self-center mt-2 mb-2 ms-4">
                <input class="form-control" type="search" placeholder="" aria-label="Search" v-model="search">
                <button class="btn btn-outline-success" type="submit" @click="submit(this.search)">Pesquisar</button>
            </div>
            <div v-if="!userIsLoggedIn" class="align-self-center text-uppercase nav-links mt-2 mb-2 ml-2 ms-5">
                <router-link  to="/login">
                    <font-awesome-icon :icon="['fas', 'user']" size="xl"/>
                </router-link>
            </div>
            <div v-else class="align-self-center nav-links mt-3 mb-0 ml-2 ms-2">
                <div class="dropdown">
                    <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <font-awesome-icon :icon="['fas', 'user']" size="xl"/>
                    </a>
                    <ul class="dropdown-menu mt-3" aria-labelledby="dropdownMenuLink">
                        <li><h6 class="dropdown-header"> {{ user.first_name + " " + user.last_name }}</h6></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><router-link to="/profile" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'id-card']" size=""/>&nbsp; Perfil</a></router-link></li>
                        <li><router-link to="/" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'box-archive']" size=""/>&nbsp; Encomendas</a></router-link></li>
                        <li><router-link to="/" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'heart']" size=""/>&nbsp; Favoritos</a></router-link></li>
                        <li><router-link to="/" style="margin-left: 0"><a class="dropdown-item ms-0"><font-awesome-icon :icon="['fa', 'bell']" size=""/>&nbsp; Notificações</a></router-link></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><router-link to="/login" v-on:click="logoutUser" style="margin-left: 0;"><a class="dropdown-item" style="color: red !important; width: 85%">Terminar sessão</a></router-link></li>
                    </ul>
                </div>
                <router-link  to="/login">
                    
                </router-link>
            </div>
            <div class="align-self-center nav-links mt-2 mb-2">
                <router-link to="/cart">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl"/>
                </router-link>
            </div>
        </div>
        <div class=" navmenu2 d-flex justify-content-center pb-3 text-uppercase nav-links pt-2">
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
        </div>
    
</nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faUser, faIdCard, faBoxArchive, faHeart, faBell, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../router/auth';

library.add(faCartShopping, faUser, faIdCard, faBoxArchive, faHeart, faBell, faArrowRightFromBracket);


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
    .navmenu {
        background-color: #608072;
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
        color: #608072;
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
        color: #608072;
        box-shadow: none;
    }
    button:hover {
        background-color: #dce5e1;
        border: 0px;
        color: #608072;
    }
    .btn-outline-success{
        box-shadow:none;
    }
    .form-control{
        box-shadow:none;
    }
    .dropdown-header, .dropdown-item, .dropdown-item a {
        color: black !important;
    }
    
</style>