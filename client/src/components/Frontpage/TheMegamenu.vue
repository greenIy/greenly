<template>
    <div class="offcanvas offcanvas-start bg-light " id="megamenu" data-bs-scroll="true">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="offcanvas"></button>
        <img class="brand-icon mb-5" alt="ícone do greenly" src="../../assets/logo.png">

        <!--Promos-->
        <p class="pt-1 ps-5 pb-4 text-uppercase promo">
            <font-awesome-icon :icon="['fas', 'percent']" />
            &nbsp;Destaques
        </p>

        <!--Products (main categories)-->
        <p class="pt-1 ps-5 text-uppercase btn-toggle" data-bs-toggle="collapse" data-bs-target="#products-collapse" aria-expanded="false">Categorias</p>

        <div class="collapse ps-5 pb-1 ms-3" id="products-collapse">
            <div class="list-group list-group-flush">
                <router-link v-for="category in showMainCategories" :key="category" :to="{ name: 'categoria', params: { categoria : category.name } }"  class="list-group-item px-0 py-1 list-group-item-action border-0 bg-transparent text-uppercase">
                {{ category.name }}
                </router-link>
            </div>
        </div>

        <!--Services-->
        <p class="pt-4 ps-5 pb-4 text-uppercase">Serviços</p>

        <!--Suppliers (main)-->
        <p class="pt-1 ps-5 pb-4 text-uppercase">Fornecedores</p>
    </div>
</template>

<script>
    import http from "../../../http-common";

    export default {
        name: 'TheMegamenu',
        data () {
            return {
                mainCategories: []
            }
        },
        watch: {
            '$route'() {
                document.getElementById("megamenu").style.visibility = "hidden";
                document.getElementsByClassName('offcanvas-backdrop')[0].remove();          
            }
        },
        created() {
            this.getCategories();
            console.log("route da pag atual:");
            console.log(this.$route);
        },
        methods: {
            async getCategories() {
                var response = await http.get("/store/categories");
                this.mainCategories = response.data;
                console.log("array de categorias do serv:");
                console.log(response.data);

                console.log("array de categorias no vue array:");
                console.log(this.mainCategories);
            }
        },
        computed: {
            showMainCategories: function () {
            // show highest level of categories (ARRAY) --> array de categorias principais
            console.log("array de categorias sem pai:")
            console.log(this.mainCategories.filter(category => category.parent_category == null))
            return this.mainCategories.filter(category => category.parent_category == null);
            },
        }
    };
</script>

<style scoped>
.brand-icon {
    margin-left: 38%;
    width: 90px;
    height: 35px;
}

.offcanvas {
  padding-top: 60px;
}

.offcanvas p {
  cursor: pointer;
  color: #686868;
}

.promo {
    color: #464646!important;
}


.offcanvas p:hover {
  color: #727272;
}

.promo:hover {
    color: #493df693;
}

.offcanvas-backdrop {
    z-index: 1!important;
}

.list-group-item {
    font-size: 12.5px;
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