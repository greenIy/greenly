<template>

<div class="sidenav bg-light collapse collapse-horizontal" id="megamenu" data-bs-scroll="true">
  <p class="closebtn" data-bs-toggle="offcanvas" href="#megamenu" aria-controls="megamenu">&times;</p>
  <img id="brand-icon w-25" alt="ícone do greenly" src="../../assets/leaves.png">
  <p >About</p>
  <p>Services</p>
  <p>Clients</p>
  <p>Contact</p>
</div>

    <!--div class="d-flex flex-column flex-shrink-0 bg-white align-items-start collapse navbar-collapse overflow-auto" id="megamenu">
            <ul class="list-unstyled mx-5 my-4 w-75">
                <!-Promos->
                <li class="mb-3">
                    <button id="promo" class="rounded fs-6 fw-bold text-uppercase bg-transparent border-0">
                        <font-awesome-icon :icon="['fas', 'percent']" size="l"/> Promoções
                    </button> 
                </li>


                <!-Products (main categories)->
                <li>
                    <button class="btn-toggle rounded fs-6 text-uppercase bg-transparent border-0" @click="transformC()" data-bs-toggle="collapse" data-bs-target="#products-collapse" aria-expanded="false">
                        <!-font-awesome-icon id="iconC" class="fs-6 fa-fw" :icon="['fas', 'angle-up']" /-> Produtos
                    </button>  

                    <div class="collapse" id="products-collapse">
                        <div class="list-group list-group-flush">
                            <router-link v-for="category in showCategories" :key="category" :to="{ name: 'categoria', params: { categoria : category.name } }" @click='showProducts(category)' class="list-group-item  list-group-item-action border-0">
                                {{ category.name }}
                            </router-link>
                            <a class="list-group-item list-group-item-action border-0">categorias aki</a>
                        </div>
                    </div>
                </li>

                <!-Services->
                <li>
                    <button class="btn-toggle rounded fs-6 text-uppercase bg-transparent border-0" data-bs-toggle="collapse" data-bs-target="#services-collapse" aria-expanded="false">
                        <!-font-awesome-icon id="iconC" class="fs-6 fa-fw" :icon="['fas', 'angle-up']" /-> Serviços
                    </button>  

                    <div class="collapse" id="services-collapse">
                        <div class="list-group list-group-flush">
                            <a class="list-group-item list-group-item-action border-0">Serviço 1</a>
                            <a class="list-group-item list-group-item-action border-0">Serviço 2</a>
                            <a class="list-group-item list-group-item-action border-0">Serviço 3</a>
                        </div>
                    </div>
                </li>

                <!-Main suppliers
                <li></li>
            </ul>
        </div>-->
</template>

<style>
.sidenav {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 60px;
}

.sidenav p {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav p:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media only screen and (max-width: 575px) {
    #megamenu {
        width: 100%;
    }
}

@media only screen and (min-width: 576px) {

    #megamenu {
        min-width: 400px;
    }

}

.offcanvas-backdrop {
  z-index: 0;}

</style>