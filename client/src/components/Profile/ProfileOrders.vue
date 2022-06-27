<template>
    <div class="p-4">
        
        <h4>Encomendas</h4>
        <hr>
        <i>Todas as suas encomendas encontrar-se-ão nesta secção, ordenadas cronologicamente.<br>É possivel cancelar individualmente
        um item de qualquer encomenda caso este ainda não se encontre em trânsito <font-awesome-icon :icon="['fa', 'truck-fast']"/> .
        </i>
        <br>
        <br>
        <!-- Button trigger Download data (JSON) -->
        <button type="button" class="btn btn-secondary btn-sm position-absolute top-0 end-0 mt-5 me-5" v-on:click="saveFile()"><font-awesome-icon :icon="['fa', 'download']" /> &nbsp;Descarregar dados (JSON)</button>

        <div v-if="this.ordersLength == 0" style="overflow-x: hidden;overflow-y: auto; height: 370px;">
            <div class="w-100 justify-content-center p-5 mt-5">
                <p class="text-center">Parece que ainda não realizou nenhuma encomenda.<br>Do que está à espera? Explore o nosso catálogo.</p>
                <h6 class="text-center">Ir para <router-link class="greenly-link" to="/produtos">Produtos</router-link>!</h6>
            </div>
        </div>

        <div v-else style="overflow-x: hidden;overflow-y: auto; height: 370px;">
        <div v-for="(order, index) in this.orders" :key="order.id" class="accordion mb-4" id="accordion">
            <div class="accordion-item">
                <h2 class="accordion-header" :id="'heading' + order.id">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + order.id" aria-expanded="false" :aria-controls="'collapse' + order.id">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <font-awesome-icon :icon="['fa', 'box']"/>&nbsp;Encomenda #{{ order.id }}
                            </div>
                            <div class="col">
                                <font-awesome-icon :icon="['fa', 'calendar']"/>&nbsp;{{`${String(new Date(order.date).getDate()).padStart(2, '0')}/${String(new Date(order.date).getMonth()+1).padStart(2, '0')}/${new Date(order.date).getFullYear()}`}}
                            </div>
                            <div v-if="calculateOrderProducts(index) == 1" class="col">
                                <font-awesome-icon :icon="['fa', 'shopping-bag']"/>&nbsp; {{ this.calculateOrderProducts(index) }} x item
                            </div>
                            <div v-if="calculateOrderProducts(index) > 1" class="col">
                                <font-awesome-icon :icon="['fa', 'shopping-bag']"/>&nbsp; {{ this.calculateOrderProducts(index) }} x itens
                            </div>
                            <div class="col">
                                <span v-if="getOrderStatus(index) == 0"><font-awesome-icon :icon="['fa', 'hand-holding-dollar']" style="color: grey;"/>&nbsp;A aguardar pagamento</span>
                                <span v-if="getOrderStatus(index) == 1"><font-awesome-icon :icon="['fa', 'clock']" style="color: #E3C12B;"/>&nbsp;Em progresso</span>
                                <span v-if="getOrderStatus(index) == 2"><font-awesome-icon :icon="['fa', 'circle-check']" style="color: #198754;"/>&nbsp;Entregue</span>
                                <span v-if="getOrderStatus(index) == 3"><font-awesome-icon :icon="['fa', 'circle-exclamation']" style="color: #D21D1D;"/>&nbsp;Falha na entrega</span>
                                <span v-if="getOrderStatus(index) == 4"><font-awesome-icon :icon="['fa', 'circle-exclamation']" style="color: #D21D1D;"/>&nbsp;Cancelada</span>
                            </div>
                        </div>
                    </div> 
                    </button>
                </h2>
                <div :id="'collapse' + order.id" class="accordion-collapse collapse" :aria-labelledby="'heading' + order.id">
                    <div class="accordion-body">
                        <!-- <h3 class="ms-3">ID #{{ order.id }}</h3> -->
                        <div class="row mt-2">
                            <div class="col ms-3">
                                <div class="card" style="width: 280px;">
                                <div class="card-img-top map" :id="'order-' + order.id"></div>
                                    <div class="card-body">
                                        <div class="card-text">
                                            <small>
                                                {{ order.shipping_address.city }}, {{ order.shipping_address.country }}<br>
                                                {{ order.shipping_address.street }}<br>
                                                {{ order.shipping_address.postal_code }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container mt-2" style="width: 60%">
                                <div v-for="item in order.items" :key="item.id">
                                    <div class="row">
                                        <div class="col">
                                            <h5>{{ item.product.name }}&nbsp;
                                                <router-link class="greenly-link" :to="{path: '/produto/' + item.product.id}">
                                                    <font-awesome-icon :icon="['fa', 'arrow-up-right-from-square']" style="cursor: pointer;"/>
                                                </router-link>
                                            </h5>
                                        </div>
                                        <div class="col">
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end me-3">
                                                <span v-if="item.status == 'PROCESSING'
                                                || item.status == 'AWAITING_TRANSPORT' || item.status == 'TRANSPORT_IMMINENT'" 
                                                role="button" style="color: #D21D1D" v-on:click="this.selectOrder(order), this.selectProduct(item)" data-bs-toggle="modal" data-bs-target="#cancelProduct"
                                                ><u>Cancelar item</u></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col">
                                            Preço: {{ item.supply_price + item.transport_price }}€
                                        </div>
                                        <div class="col">
                                            Quantidade: {{ item.quantity }}
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col">
                                            Fornecedor: {{ item.supplier.name }}
                                        </div>
                                        <div class="col">
                                            Transportador: {{ item.transporter.name }}
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col">
                                            <span v-if="item.status == 'COMPLETE'">Estado: <b style="color: #198754">{{ this.getProductStatus(item.status) }}</b></span>
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'" >Estado: <b style="color: #D21D1D">{{ this.getProductStatus(item.status) }}</b></span>
                                            <span v-else>Estado: {{ this.getProductStatus(item.status) }}</span>
                                        </div>
                                    </div>         
                                    
                                    <div class="progress mt-4" style="height: 5px;">
                                        <div v-if="item.status == 'AWAITING_PAYMENT'" class="progress-bar bg-success" role="progressbar" style="width: 5%;" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'PROCESSING'" class="progress-bar bg-success" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'AWAITING_TRANSPORT'" class="progress-bar bg-success" role="progressbar" style="width: 35%;" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'TRANSPORT_IMMINENT'" class="progress-bar bg-success" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'IN_TRANSIT'" class="progress-bar bg-success" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'LAST_MILE'" class="progress-bar bg-success" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'COMPLETE'" class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div v-if="item.status == 'FAILURE' || item.status == 'CANCELED'" class="progress-bar bg-danger" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="row mb-4">
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="A aguardar pagamento">
                                            <span v-if="item.status == 'FAILURE' || item.status == 'CANCELED'"></span> 
                                            <span v-else class="dot bg-success"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'hand-holding-dollar']" />
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Em processamento">
                                            <span v-if="item.status == 'PROCESSING' 
                                            || item.status == 'AWAITING_TRANSPORT' || item.status == 'TRANSPORT_IMMINENT' || item.status == 'IN_TRANSIT' 
                                            || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'"></span> 
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'boxes-packing']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="A aguardar transporte">
                                            <span v-if="item.status == 'AWAITING_TRANSPORT' 
                                            || item.status == 'TRANSPORT_IMMINENT' || item.status == 'IN_TRANSIT' || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'"></span>    
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'warehouse']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Transporte iminente">
                                            <span v-if="item.status == 'TRANSPORT_IMMINENT' 
                                            || item.status == 'IN_TRANSIT' || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'" class="canceledDot"><p style="margin-top: -2px; margin-left: 1px"><b>!</b></p></span> 
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'truck-ramp-box']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Em trânsito">
                                            <span v-if="item.status == 'IN_TRANSIT'
                                            || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'"></span>  
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'truck-fast']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Último quilômetro">
                                            <span v-if="item.status == 'LAST_MILE' 
                                            || item.status == 'COMPLETE'" class="dot bg-success"></span>
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'"></span>  
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'house-signal']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Entregue">
                                            <span v-if="item.status == 'COMPLETE'" class="dot bg-success"></span>
                                            <span v-else-if="item.status == 'FAILURE' || item.status == 'CANCELED'"></span>  
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'circle-check']"/>
                                        </div>
                                    </div>
                                    <hr>

                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-4 ms-3">  
                            <h6>Observações:</h6>
                            <span> &nbsp;&nbsp;&nbsp;&nbsp;{{ order.observations }}</span>
                        </div>

                        <div class="row mt-4 ms-3">  
                            <h6>Resumo da encomenda:</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <tbody class="text-center">
                                        <tr>
                                            <td>Recursos renováveis</td>
                                            <td>Emissões poluentes</td>
                                            <td>Recursos de armazenamento</td>
                                            <td>Recursos de transporte</td>
                                        </tr>
                                        <tr class="text-center">
                                            <td>{{ calculateOrderDetails(index, "renewable") }}%</td>
                                            <td data-bs-toggle="tooltip" data-bs-placement="bottom" title="Grama por quilómetro por tonelada">{{ calculateOrderDetails(index, "emissions") }} CO₂ g/km/t</td>
                                            <td data-bs-toggle="tooltip" data-bs-placement="bottom" title="Quilowatt-hora por dia">{{ calculateOrderDetails(index, "supplier") }} kWh/dia</td>
                                            <td data-bs-toggle="tooltip" data-bs-placement="bottom" title="Litros por 100 quilómetros">{{ calculateOrderDetails(index, "transporter") }} l/100km</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Cancel Product -->
            <div class="modal fade" id="cancelProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cancelProductLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cancelProductLabel">Atenção!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Esta ação é irreversível. Tem a certeza que deseja cancelar este item?
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeCancelProductModal" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button type="button" class="btn btn-danger" v-on:click="cancelProduct(this.selectedOrder.id, this.selectedProduct.id)">Sim</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faBox, faShoppingBag, faCalendar, faHandHoldingDollar, faClock, faBoxesPacking, faWarehouse, faTruckRampBox, faTruckFast, faHouseSignal, faCircleCheck, faCircleExclamation, faXmark, faDownload, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
library.add(faBox, faShoppingBag, faCalendar, faHandHoldingDollar, faClock, faBoxesPacking, faWarehouse, faTruckRampBox, faTruckFast, faHouseSignal, faCircleCheck, faCircleExclamation, faXmark, faDownload, faArrowUpRightFromSquare);

import http from "../../../http-common"
import { Loader } from "@googlemaps/js-api-loader"

export default({
    name: 'ProfileOrders',
    mounted() {
        this.getUserInfo();
        this.getUserOrders();
    },
    data() {
        const toast = useToast()
        return {
            user: {},
            orders: [],
            ordersLength: 1,
            selectedOrder: '',
            selectedProduct: '',
        }
    },
    methods: {
        initMaps() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });

            loader.load().then(() => {
                for (let order of this.orders) {
                    let position = {lat: order.shipping_address.latitude, lng: order.shipping_address.longitude}
                    let map = new google.maps.Map(document.getElementById("order-" + order.id), {
                    center: position,
                    zoom: 15,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoomControl: false,
                    disableDoubleClickZoom: true,
                    draggable: false,
                    disableDefaultUI: true,
                    clickableIcons: false,
                })

                const marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        label: {
                            text: " ",
                            color: "#FFF"
                        }
                    }
                );
                }
            })
        },
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        getUserOrders() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/user/${userId}/orders`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.orders = response.data;
                        this.calculateOrdersLength();
                        this.initMaps();
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        },
        calculateOrdersLength() {
            this.ordersLength = Object.keys(this.orders).length;
        },
        getOrderStatus(orderIndex) {
            var productStatus = [];
            var waitingProduct = 0;
            var completeProduct = 0;
            var failureProduct = 0;
            var canceledProduct = 0;
            for (let productIndex = 0; productIndex < Object.keys(this.orders[orderIndex].items).length; productIndex++) {
                productStatus.push(this.orders[orderIndex].items[productIndex].status)
            }
            for (let state = 0; state < productStatus.length; state++) {
                if (productStatus[state] === "AWAITING_PAYMENT") {
                    waitingProduct += 1;
                } else if (productStatus[state] === "COMPLETE") {
                    completeProduct += 1;
                } else if (productStatus[state] === "FAILURE") {
                    failureProduct += 1
                } else if (productStatus[state] === "CANCELED") {
                    canceledProduct += 1
                }
            }
            if (Object.keys(this.orders[orderIndex].items).length == waitingProduct) {
                return 0
            } else if (Object.keys(this.orders[orderIndex].items).length == completeProduct) {
                return 2
            } else if (Object.keys(this.orders[orderIndex].items).length == failureProduct) {
                return 3
            } else if (Object.keys(this.orders[orderIndex].items).length == canceledProduct) {
                return 4
            } else {
                return 1
            }

        },
        calculateOrderProducts(orderIndex) {
            return this.orders[orderIndex].items.reduce((sum, item) => sum + item.quantity, 0)
        },
        calculateOrderDetails(orderIndex, detail) {
            var totalRenewableResources = 0;
            var totalTransportEmissions = 0;
            var totalSupplierResources = 0;
            var totalTransporterResources = 0;
            for (let productIndex = 0; productIndex < Object.keys(this.orders[orderIndex].items).length; productIndex++) {
                var productDtalis = this.orders[orderIndex].items[productIndex]
                totalRenewableResources += productDtalis.supplier_renewable_resources;
                totalTransportEmissions += productDtalis.transporter_emissions;
                totalSupplierResources += productDtalis.supplier_resource_usage;
                totalTransporterResources += productDtalis.transporter_resource_usage;
            }
            if (detail === "renewable") {return totalRenewableResources}
            else if (detail === "emissions") {return totalTransportEmissions.toFixed(2)}
            else if (detail === "supplier") {return totalSupplierResources.toFixed(2)}
            else if (detail === "transporter") {return totalTransporterResources.toFixed(2)};
        },
        selectOrder(order) {
            this.selectedOrder = order;
        },
        selectProduct(product) {
            this.selectedProduct = product;
        },
        getProductStatus(state) {
            if (state === "AWAITING_PAYMENT") {return "A aguardar pagamento"} 
            else if (state === "PROCESSING") {return "Em processamento"}
            else if (state === "AWAITING_TRANSPORT") {return "A aguardar transporte"}
            else if (state === "TRANSPORT_IMMINENT") {return "Transporte iminente"} 
            else if (state === "IN_TRANSIT") {return "Em trânsito"}
            else if (state === "LAST_MILE") {return "Último quilômetro"}
            else if (state === "COMPLETE") {return "Entregue"}
            else if (state === "FAILURE") {return "Falha na entrega"}
            else if (state === "CANCELED") {return "Cancelada"}
        },
        successfulCancelProduct() {
            var closeCancelProductModal = document.getElementById("closeCancelProductModal");
            closeCancelProductModal.click()
            this.toast.success("Cancelada! A entrega do item foi cancelada com sucesso.", {
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
        },
        cancelProduct(order_id, product_id) {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.put(`/store/orders/${order_id}/${product_id}`, 
                JSON.stringify({
                            status: "CANCELED",
                        }), headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.getUserOrders();
                        this.successfulCancelProduct();
                        this.emitter.emit('updateNotifications');
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        },
        saveFile() {
            let date = new Date()
            const content = JSON.stringify(this.orders);
            let a = document.createElement("a");
            let file = new Blob([content], {type: "application/json"});
            a.href = URL.createObjectURL(file);
            a.download =    `GREENLY_ORDERS_` + 
                            `${String(date.getDate()).padStart(2, '0')}-` + 
                            `${String(date.getMonth() + 1).padStart(2, '0')}-` + 
                            `${date.getFullYear()}_${date.getHours()}-` + 
                            `${String(date.getMinutes()).padStart(2, '0')}-` + 
                            `${date.getSeconds()}.json`;
            a.click();
        }
    },
});

</script>

<style scoped>
    .accordion, .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .accordion:hover, .card:hover{
        box-shadow: 1px 10px 12px #d9d9d9;
    }
    .accordion-button {
        height: 70px;
    }
    .accordion-button {
        color: black;
        background-color: white;
    }
    .accordion-button.collapsed {
        background-color: white;
    }
    .dot {
        height: 20px;
        width: 20px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
    .canceledDot {
        height: 20px;
        width: 20px;
        color: white;
        background-color: #D21D1D;
        border-radius: 50%;
        display: inline-block;
    }
    .map {
        height: 160px;
        width: 100%;
        display: inline-block;
    }
    .greenly-link {
        color: #5e9f88;
    }
    #cancelProductToast {
        background-color: #5E9F88 !important;
    }
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
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
</style>