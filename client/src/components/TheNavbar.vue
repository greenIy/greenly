<template>
  <nav class="navbar">
    <div class="container-fluid d-flex justify-content-start">
        <div>
            <router-link to="/" class="navbar-brand">
                <img alt="Logo do greenly" src="../assets/logo_dark.png">
            </router-link>
        </div>
        <div class="input-group search-group mb-3">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Pesquisar</button>
        </div>
        <div>
            <router-link to="/login" class="float-right"> Iniciar Sessão </router-link>
        </div>
    </div>
    <div class="nav-links mx-auto text-uppercase" >
        <router-link to="/produtos" class="mb-2 mr-2">
            produtos
        </router-link>
        <router-link to="/promocoes" class="mb-2 pr-2">
            promoções
        </router-link>
        <router-link to="/servicos" class="mb-2 ml-2">
            serviços
        </router-link>
        <router-link to="/fornecedores" class="mb-2 ml-2">
            fornecedores
        </router-link>
    </div>
  </nav>
  <!-- <nav class="navbar">
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-auto">
                <router-link to="/" class="navbar-brand">
                    <img alt="Logo do greenly" src="../assets/logo_dark.png">
                </router-link>
            </div>
            <div class="col input-group search-group">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Pesquisar</button>
            </div>
            <div class="col">
                 <router-link to="/login"> Iniciar Sessão </router-link>
            </div>
        </div>
    </div>
    <div class="nav-links mx-auto text-uppercase container">
        <router-link to="/produtos" class="mb-2">
            produtos
        </router-link>
        <router-link to="/promocoes" class="mb-2">
            promoções
        </router-link>
        <router-link to="/servicos" class="mb-2">
            serviços
        </router-link>
        <router-link to="/fornecedores" class="mb-2">
            fornecedores
        </router-link>
    </div>
  </nav> -->
</template>

<script>

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

    .nav-links {
        font-size: 80%;
    }

    img {
        width: 90px;
        height: 35px;
    }

    .search-group {
        width: 600px;
        margin-top: 2%;
        margin-left: 5%;
    }

    input, button {
        border-radius: 20px;
    }

    button {
        background-color: #dce5e1;
        border: 0px;
        color: #608072;
    }
</style>
