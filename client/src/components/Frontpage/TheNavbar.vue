<template>
<nav>
    <div class="container">
        <div class="d-flex">
            <div class="align-self-center pt-3">
                <router-link to="/" class="navbar-brand">
                    <img alt="Logo do greenly" src="../../assets/logo_dark.png">
                </router-link>
            </div>
            <div class="flex-grow-1 input-group search-group align-self-center">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Pesquisar</button>
            </div>
            <div class="p-2 align-self-center pt-4 text-uppercase nav-links">
                <router-link to="/login">
                    Iniciar Sessão
                </router-link>
            </div>
            <div class="p-2 align-self-center pt-4 text-uppercase nav-links">
                <router-link to="/cart">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" size="lg"/>
                </router-link>
            </div>
        </div>
        <div class="d-flex justify-content-center pb-3 text-uppercase nav-links pt-2">
            <div class="pt-2">
                <router-link to="/promocoes" class="mb-2 pr-2">
                    promoções
                </router-link>
            </div>
            <div class="pt-2">
                <router-link to="/produtos" class="mb-2 mr-2">
                    produtos
                </router-link>
            </div>
            <div class="pt-2">
                <router-link to="/servicos" class="mb-2 ml-2">
                    serviços
                </router-link>
            </div>
            <div class="pt-2">
                <router-link to="/fornecedores" class="mb-2">
                    fornecedores
                </router-link>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

library.add(faCartShopping);

export default {
  name: 'TheNavbar',
};
</script>

<style scoped>
    nav {
        background-color: #608072;
        color: #fcfaf9;
    }

    nav a {
        color: #fcfaf9;
        text-decoration: none;
        margin-left: 20px;
    }

    nav a:hover {
        color: #dce5e1;
    }

    .nav-links {
        font-size: 12px;
    }

    img {
        width: 90px;
        height: 35px;
    }

    .search-group {
        width: 570px;
        margin-top: 2%;
        margin-left: 5%;
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
    }

    button:hover {
        background-color: #dce5e1;
        border: 0px;
        color: #608072;
    }
</style>
