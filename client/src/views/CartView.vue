<template>    
    <div class="page-container">
        <TheNavbar @search-information="searchInformation" />
                <div class="d-flex justify-content-center my-2 mx-4 card-general">
                    <div class="card mt-5">
                        <div class="card-body w-100">
                            <h2 class="page-title text-start align-middle mt-auto"> Carrinho de Compras</h2>
                            <div v-if="this.cartLength > 0" class="text-start mb-2">
                                <font-awesome-icon :icon="['fa', 'sun']" style="color: orange" /> Recursos renováveis
                                fornecedor |
                                <font-awesome-icon :icon="['fa', 'warehouse']" style="color: grey" /> Média recursos
                                fornecedor |
                                <font-awesome-icon :icon="['fa', 'gas-pump']" style="color: " /> Média recursos
                                transportador |
                                <font-awesome-icon :icon="['fa', 'skull-crossbones']" style="color: red" /> Média
                                emissões
                                transportador
                            </div>
                            <div>
                                <div v-if="this.cartLength == 0" style="overflow-y: hidden; overflow-x: auto; height: 370px;" class="content d-flex mb-3">
                                    <div class="w-100 justify-content-center p-5 mt-5">
                                        <p class="text-center">Parece que ainda não adicionou nenhum produto ao carrinho.<br>Do que está à espera? Explore o nosso catálogo.</p>
                                        <h6 class="text-center">Ir para <router-link class="greenly-link" to="/produtos">Produtos</router-link>!</h6>
                                    </div>
                                </div>
                                <div v-else class="row gx-2">
                                        <div class="card p-3 container" style="height:40vh;">
                                            <div class="row title">
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
                                            <!-- <div class="container"> -->
                                            <div class="row h-100 align-content-start" style="overflow-y:auto">
                                                <CartProductCard v-for="p in products" :key="p.id" :product="p"
                                                    @getProducts="getProducts"></CartProductCard>
                                            </div>
                                            <!-- </div>     -->
                                        </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="this.cartLength != 0" class="d-flex ms-2">
                        <div class="card p-3 my-5 w-100">
                            <h2 class="mb-4">Resumo</h2>
                            <div class="card-body w-100 h-100 mt-3">
                                    <table class="table">
                                        <tbody>
                                            <tr class="align-middle">
                                                <td style="font-size:15px;">Percentagem de recursos renováveis dos fornecedores</td>
                                                <td style="font-size:13px;">{{this.totalSupplierRenewableResources}}%</td>
                                            </tr>
                                            <tr class="align-middle">
                                                <td style="font-size:15px;">Média de consumos dos fornecedores</td>
                                                <td style="font-size:13px;">{{this.totalSupplierResourceUsage}} kWh</td>
                                            </tr>
                                            <tr class="align-middle">
                                                <td style="font-size:15px;">Média de consumos dos transportadores</td>
                                                <td style="font-size:13px;">{{this.totalTransporterResourceUsage}} l/100Km</td>
                                            </tr>
                                            <tr class="align-middle">
                                                <td style="font-size:15px;">Média de emissões poluentes dos transportadores </td>
                                                <td style="font-size:13px;">{{this.totalTransporterEmissions}} CO2 g/Km/t</td>
                                            </tr>
                                            <tr class="mt-5 table-bordered">
                                                <td>Total da encomenda</td>
                                                <td>{{parseFloat(this.totalPrice).toFixed(2)}}€</td>
                                            </tr>
                                        </tbody>
                                        <tfooter>
                                            
                                        </tfooter>
                                    </table>
                            </div>
                            <div class=" d-flex align-items-end justify-content-end h-100 me-3 mb-3">
                                    <div v-if="this.cartLength > 0">
                                        <button type="button"     data-bs-toggle="modal" data-bs-target="#staticBackdrop"

                                            class="btn btn-danger me-2">Limpar carrinho
                                            <font-awesome-icon :icon="['fa', 'trash']" style="color: " />
                                        </button>
                                    </div>
                                    <div v-if="this.cartLength > 0">
                                        <router-link to="/checkout" class="mb-2 ml-2">
                                            <button type="button" class="btn btn-success "
                                                style="background-color: #5E9F88"> Finalizar
                                                <font-awesome-icon :icon="['fa', 'check']" />
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                </div>
                <br>
               <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Limpar carrinho?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Têm a certeza que quer limpar todos os produtos do carrinho?
            </div>
            <div class="modal-footer">
                <button type="button" id="closeRemoveAll" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" v-on:click="removeAllProducts()" class="btn btn-danger">Limpar Carrinho</button>
            </div>
            </div>
        </div>
        </div>
            <TheFooter />
        </div>
</template>


<script>
    // @ is an alias to /src
    import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
    import TheFooter from '@/components/Frontpage/TheFooter.vue';
    import TheNoProduct from "@/components/StandardMessages/TheNoProduct.vue";
    import CartProductCard from '@/components/Cart/CartProductCard.vue';
    import { useToast } from "vue-toastification";
    import {
        library
    } from '@fortawesome/fontawesome-svg-core';
    import {
        faCheck,
        faGasPump,
        faWarehouse,
        faSkullCrossbones,
        faSun
    } from '@fortawesome/free-solid-svg-icons';

    library.add(faSun, faGasPump, faWarehouse, faSkullCrossbones, faCheck);

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

        data() {
            const toast = useToast()
            return {
                toast,
                products: [],
                totalPrice: 0,
                totalSupplierRenewableResources: 0,
                totalSupplierResourceUsage: 0,
                totalTransporterResourceUsage: 0,
                totalTransporterEmissions: 0,
                cartLength: -1
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
                    http.get(`/user/${userId}/cart`, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.products = response.data.items
                            this.totalPrice = response.data.total_price
                            this.totalSupplierRenewableResources = response.data
                                .total_supplier_renewable_resources
                            this.totalSupplierResourceUsage = response.data.total_supplier_resource_usage
                            this.totalTransporterResourceUsage = response.data
                                .total_transporter_resource_usage
                            this.totalTransporterEmissions = response.data.total_transporter_emissions
                            this.calculateCartLength()                            
                        }
                    })

                }
            },

            changeTitle(){
                window.document.title = "Greenly | Carrinho de Compras";
            },

            round(value, decimals) {
                return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
            }, 

            calculateCartLength() {
                this.cartLength = this.products.length;
                
            },

            removeAllProducts() {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                let userId = JSON.parse(localStorage.getItem('userId'));

                if (accessToken) {
                    http.delete(`/user/${userId}/cart`, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }).then(response => {
                        if (response.status == 200) {
                            this.products = response.data
                            this.getProducts()
                            this.successRemoveAllItems()
                            var closeModal = document.getElementById("closeRemoveAll");
                            closeModal.click();
                            return this.products
                        }
                    })

                }
            },

            successRemoveAllItems(){
                this.toast.success('Todos os itens foram removidos do carrinho!', {
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
hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

.footerOverride {
  bottom: auto !important;
}
.card-general{
    flex-direction: row;
}

.title{
    display: flex;
    justify-content: space-between;
    
}


@media (min-width: 992px) and (max-width: 1199px) {
    .card-general{
        flex-direction: column;
    }
}

@media (max-width: 991px) {
    .card-general{
        flex-direction: column;
    }

}
</style>