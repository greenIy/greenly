<template>
    <body>
    <div class="page-container">
        <TheNavbar @search-information="searchInformation"/>
                    
        <div class="container mt-3">
            <h2 class="page-title text-start align-middle mt-3" > Carrinho de compras</h2>
            <div class="text-start mb-2">    
                <font-awesome-icon :icon="['fa', 'sun']" style="color: orange"/> Recursos renováveis fornecedor | <font-awesome-icon :icon="['fa', 'industry']" style="color: grey"/> Média recursos fornecedor | <font-awesome-icon :icon="['fa', 'gas-pump']" style="color: "/> Média recursos transportador | <font-awesome-icon :icon="['fa', 'skull-crossbones']" style="color: red"/> Média emissões transportador
            </div>
            <div>
                <div v-if="!products.length" class="content d-flex w-100">
                    <TheNoProduct></TheNoProduct>
                </div>                       
                <div v-else class="row gx-2 justify-content-start">
                    <div class="">
                        <div class="card p-3 container" style="height:40vh; " >
                            <div class="row me-1">
                                <div class="col-2">
                                    Item   
                                </div>
                                <div class="col-2">
                                    Descrição
                                </div>
                                <div class="col-2">
                                    Informação Ambiental
                                </div>
                                <div class="col-1">
                                    Preço
                                </div>
                                <div class="col-2">
                                    Preço transporte
                                </div>
                                <div class="col-2">
                                    Quantidade
                                </div>
                                <div class="col-1">
                                    Total
                                </div>
                                
                            </div>
                            <div class="container">
                                <div class="row" style="overflow-y:auto"> 
                                    <CartProductCard
                                        v-for="p in products"
                                        :key="p.id"
                                        :product="p"
                                        @getProducts="getProducts"
                                    ></CartProductCard>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div class=" ">
                    <div class="card p-3 my-1" >
                        <h2>Resumo:</h2>
                        <div >Consumos renováveis dos fornecedores: {{this.totalSupplierRenewableResources}}%</div>
                        <div >Consumos dos fornecedores: {{this.totalSupplierResourceUsage}} kWh</div>
                        <div >Consumos dos transportadores: {{this.totalTransporterResourceUsage}} l/100Km</div>
                        <div >Emissões dos transportadores: {{this.totalTransporterEmissions}} CO2 g/Km/t</div>
                        <div class="fw-bold fs-5">Total da encomenda: {{parseFloat(this.totalPrice).toFixed(2)}}€</div>
                        <div class="text-end align-self-end ">
                            <button type="button" @click="removeAllProducts($event)" class="btn btn-danger me-2 mb-5">Limpar carrinho <font-awesome-icon :icon="['fa', 'trash']" style="color: "/></button>
                            <button type="button" @click="removeAllProducts($event)" class="btn btn-success ps-2 mb-5" style="background-color: #5E9F88"> Finalizar <font-awesome-icon :icon="['fa', 'check']"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TheFooter/>
    </div>
    </body>
</template>


<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import TheNoProduct from "@/components/StandardMessages/TheNoProduct.vue";
import CartProductCard from '@/components/Cart/CartProductCard.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faGasPump, faIndustry, faSkullCrossbones, faSun } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faGasPump, faIndustry, faSkullCrossbones, faCheck);

import http from "../../http-common";


export default ({
    name: 'WishlistView',
    components: {
        TheNavbar,
        TheFooter,
        CartProductCard,
        TheNoProduct
    },

    mounted() {
        this.getProducts();
    },

    data(){
        return {
            products: [],
            totalPrice: 0,
            totalSupplierRenewableResources: 0,
            totalSupplierResourceUsage: 0,
            totalTransporterResourceUsage: 0,
            totalTransporterEmissions: 0
        }
    },

    methods: {
        getProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken){
                http.get(`/user/${userId}/cart`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
                    if (response.status == 200) {
                        this.products = response.data.items
                        this.totalPrice = response.data.total_price
                        this.totalSupplierRenewableResources = response.data.total_supplier_renewable_resources
                        this.totalSupplierResourceUsage = response.data.total_supplier_resource_usage 
                        this.totalTransporterResourceUsage = response.data.total_transporter_resource_usage
                        this.totalTransporterEmissions = response.data.total_transporter_emissions
                        console.log(response.data)
                    }
                })

            }
        },

        removeAllProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));

            if (accessToken){
                http.delete(`/user/${userId}/cart`, { headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
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