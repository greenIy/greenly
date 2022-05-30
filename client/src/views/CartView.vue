<template>
    <body>
    <div class="page-container">
        <TheNavbar @search-information="searchInformation"/>
                <h2 class="page-title text-center mt-2" > Carrinho</h2>
                    <Transition name="fade">
                        <div v-if="products.length" @currentPage="getCurrentPage">
                            <div class="card-deck card">
                                <ProductCard
                                    v-for="p in products"
                                    :key="p.id"
                                    :product="p"
                                ></ProductCard>
                            </div>
                        </div>
                        <div v-else class="content d-flex w-100">
                            <TheNoProduct></TheNoProduct>
                        </div>
                    </Transition>
            <div v-if="products.length" class="text-center mt-3">
                <button type="button" @click="removeAllProducts($event)" class="btn btn-outline-danger btn-lg">Limpar carrinho</button>
            </div>
        <!-- <TheNextPage v-if="products.length" @sendCurrentPage="getCurrentPage" :pageAmount="getPageAmount"/> -->
        <TheFooter />
    </div>
    </body>
</template>


<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import ProductCard from '@/components/Wishlist/ProductCard.vue';
import TheNoProduct from "@/components/StandardMessages/TheNoProduct.vue";

import http from "../../http-common";


export default ({
    name: 'WishlistView',
    components: {
        TheNavbar,
        TheFooter,
        ProductCard,
        TheNoProduct
    },

    mounted() {
        this.getProducts();
    },

    data(){
        return {
            products: [],
            currentPage: 1, 
        }
    },

    methods: {
        getProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken){
                http.get(`/user/${userId}/wishlist`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
                    if (response.status == 200) {
                        this.products = response.data
                        return this.products
                    }
                })

            }
        },

        removeAllProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));

            if (accessToken){
                http.delete(`/user/${userId}/wishlist`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
                    if (response.status == 200) {
                        this.products = response.data
                        return this.products
                    }
                })

            }
        }
    }

});
</script>


<style scoped>
</style>