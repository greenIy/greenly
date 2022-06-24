<template>
    <div class="p-4">
        <div class="row d-flex justify-content-center align-self-center">
            <h4 class="col-md-6 align-self-center">Favoritos</h4>
            <div class="col-md-6 text-end align-self-end">
                <button v-if="this.wishlistLength > 0" type="button" @click="removeAllProducts($event)" class="btn btn-danger "><font-awesome-icon :icon="['fa', 'trash']" style="color: "/> Limpar favoritos</button>
            </div>
        </div>
        <hr>
        
        <div class="page-container" >
                        <div class="infinite-scroll py-3 text-center" id="spinners-and-async-example" style="overflow-y: scroll; height: 450px">
                            <div v-if="products.length" @currentPage="getCurrentPage">
                                
                                <ProductCard
                                    v-for="p in products"
                                    :key="p.id"
                                    :product="p"
                                    @getProducts="getProducts"
                                ></ProductCard>
                            
                            </div>
                        
                        <div v-if="this.wishlistLength == 0" style="overflow-y: hidden; overflow-x: auto; height: 370px;" class="content d-flex w-100">
                            <div class="w-100 justify-content-center p-5 mt-5">
                                <p class="text-center">Parece que ainda não adicionou nenhum produto aos favoritos.<br>Do que está à espera? Explore o nosso catálogo.</p>
                                <h6 class="text-center">Ir para <router-link class="greenly-link" to="/produtos">Produtos</router-link>!</h6>
                            </div>
                        </div>
                        </div>
            <!-- <div v-if="products.length" class="text-center mt-3">
                <button type="button" @click="removeAllProducts($event)" class="btn btn-outline-danger btn-lg">Limpar favoritos</button>
            </div> -->
        <!-- <TheNextPage v-if="products.length" @sendCurrentPage="getCurrentPage" :pageAmount="getPageAmount"/> -->

    </div>

    </div>
</template>

<script>

import { } from '@fortawesome/free-brands-svg-icons';
import ProductCard from '@/components/Profile/ProductCard.vue';
import TheNoProduct from "@/components/StandardMessages/TheNoProduct.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGasPump, faIndustry, faSkullCrossbones, faSun, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faGasPump, faIndustry, faSkullCrossbones, faTrash);

import http from "../../../http-common"


export default({
    name: 'ProfileWishlist',
    components: {
        ProductCard,
        TheNoProduct
    },
    mounted() {
        this.getProducts();
    },
    data() {
        return {
            products: [],
            wishlistLength: -1
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
                        this.calculateWishlistLength()
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
        },

        calculateWishlistLength() {
            this.wishlistLength = this.products.length;
            console.log(this.wishlistLength)
        }
    },
});

</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 17px;
    }
    ::-webkit-scrollbar-track {
        background-color: #E4E4E4;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 5px solid transparent;
        background-clip: content-box;
        background-color: #5E9F88;
    }
</style>