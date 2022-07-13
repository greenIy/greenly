<template>

    <div class="p-4">
        <div class="row d-flex justify-content-center align-self-center">
            <h4 class="col-md-6 align-self-center">Favoritos</h4>
            <div class="col-md-6 text-end align-self-end">
                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-if="this.wishlistLength > 0" type="button" class="btn btn-danger "><font-awesome-icon :icon="['fa', 'trash']" style="color: " data-cy="wishlist-clear"/> Limpar favoritos</button>
            </div>
        </div>
        <hr>
        
        <div class="page-container" >
                        <div class="infinite-scroll py-3 text-center" id="spinners-and-async-example" style="overflow-y: scroll; height: 450px" data-cy="wishlist-product-container">
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
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Limpar favoritos?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Têm a certeza que quer limpar todos os produtos dos favoritos?
        </div>
        <div class="modal-footer">
            <button type="button" id="closeRemoveAll" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" v-on:click="removeAllProducts()" class="btn btn-danger" data-cy="wishlist-clear-confirm">Limpar favoritos</button>
        </div>
        </div>
    </div>
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

import { useToast } from "vue-toastification";


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
        const toast = useToast()
        return {
            toast,
            products: [],
            wishlistLength: -1
        }
    },
    created() {
        this.changeTitle();
    },
    methods: {
        getProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken) {
                http.get(`/user/${userId}/wishlist`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }).then(response => {
                    if (response.status == 200) {
                        this.products = response.data
                        this.calculateWishlistLength()
                        return this.products
                    }
                })

            }
        },
        changeTitle() {
            window.document.title = "Greenly | Favoritos";
        },
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.$store.getters.getUser
        },
        removeAllProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));

            if (accessToken){
                http.delete(`/user/${userId}/wishlist`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
                    if (response.status == 200) {
                        this.products = response.data
                        this.successRemoveAllItems()
                        var closeModal = document.getElementById("closeRemoveAll");
                        closeModal.click();
                        this.getProducts();
                        return this.products
                    }
                })

            }
        },

        calculateWishlistLength() {
            this.wishlistLength = this.products.length;
            console.log(this.wishlistLength)
        },

        successRemoveAllItems(){
                this.toast.success('Todos os itens foram removidos dos favoritos!', {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
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