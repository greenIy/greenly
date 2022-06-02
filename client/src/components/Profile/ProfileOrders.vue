<template>
    <div class="p-4">
        
        <h4>Encomendas</h4>
        <hr>
        <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae imperdiet diam, id porttitor mauris. Integer mollis maximus urna ac rutrum. Fusce eget mattis ex, quis rhoncus libero. 
        </i>
        <br>
        <br>
        
        <div style="overflow-y: auto; height: 350px;">
        <div v-for="order in this.orders" :key="order.id" class="accordion mb-4" id="accordion">
            <div class="accordion-item">
                <h2 class="accordion-header" :id="'heading' + order.id">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + order.id" aria-expanded="false" :aria-controls="'collapse' + order.id">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <font-awesome-icon :icon="['fa', 'box']"/>&nbsp;Encomenda #{{ order.id }}
                            </div>
                            <div class="col">
                                <font-awesome-icon :icon="['fa', 'calendar']"/>&nbsp;{{`${new Date(order.date).getDate()}/${new Date(order.date).getMonth()+1}/${new Date(order.date).getFullYear()}`}}
                            </div>
                            <div class="col">
                                <font-awesome-icon :icon="['fa', 'shopping-bag']"/>&nbsp; 3 x itens
                            </div>
                            <div class="col">
                                <span v-if="order.id == 6"><font-awesome-icon :icon="['fa', 'hand-holding-dollar']" style="color: grey;"/>&nbsp;Aguardando pagamento</span>
                                <span v-if="order.id == 5"><font-awesome-icon :icon="['fa', 'clock']" style="color: #E3C12B;"/>&nbsp;Em processamento</span>
                                <span v-if="order.id == 2"><font-awesome-icon :icon="['fa', 'circle-check']" style="color: #5E9F88;"/>&nbsp;Entregue</span>
                            </div>
                        </div>
                    </div> 
                    </button>
                </h2>
                <div :id="'collapse' + order.id" class="accordion-collapse collapse" :aria-labelledby="'heading' + order.id">
                    <div class="accordion-body">
                        <!-- <h3 class="ms-3">ID #{{ order.id }}</h3> -->
                        <div class="row">
                            <div class="col mt-2 ms-3">
                                <div class="card" style="width: 200px;">
                                <img src="../../assets/Team/daniela.jpg" class="card-img-top" alt="..." style="height: 120px">
                                    <div class="card-body">
                                        <div v-for="address in this.user.addresses" :key="address.id" class="card-text" style="height: 35px">
                                            <div v-if="address.id == order.shipping_address">
                                                <address>
                                                    {{ address.city }}, {{ address.country }}<br>
                                                    {{ address.street }}<br>
                                                    {{ address.postal_code }}
                                                </address>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container mt-2" style="width: 50%">
                                <div v-for="item in order.items" :key="item.id">
                                    <div class="row">
                                        <div class="col">
                                            <h5>{{ item.product.name }}</h5>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col">
                                            <u>Preço:</u> {{ item.supply_price + item.transport_price }}€
                                        </div>
                                        <div class="col">
                                            <u>Quantidade:</u> {{ item.quantity }}
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col">
                                            <u>Fornecedor:</u> {{ item.supplier.name }}
                                        </div>
                                        <div class="col">
                                            <u>Transportador:</u> {{ item.transporter.name }}
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col">
                                            <b>Estado:</b> {{ item.status }}
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
                                    </div>
                                    <div class="row mb-5">
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span class="dot bg-success"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'hand-holding-dollar']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span v-if="item.status == 'PROCESSING' 
                                            || item.status == 'AWAITING_TRANSPORT' || item.status == 'TRANSPORT_IMMINENT' || item.status == 'IN_TRANSIT' 
                                            || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'clock']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span v-if="item.status == 'AWAITING_TRANSPORT' 
                                            || item.status == 'TRANSPORT_IMMINENT' || item.status == 'IN_TRANSIT' || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'warehouse']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span v-if="item.status == 'TRANSPORT_IMMINENT' 
                                            || item.status == 'IN_TRANSIT' || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'truck-ramp-box']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span v-if="item.status == 'IN_TRANSIT'
                                            || item.status == 'LAST_MILE' || item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'truck-fast']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span v-if="item.status == 'LAST_MILE' 
                                            || item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'house-signal']"/>
                                        </div>
                                        <div class="col text-center" style="margin-top: -13px">
                                            <span v-if="item.status == 'COMPLETE'" class="dot bg-success"></span>   
                                            <span v-else class="dot"></span>
                                            <br>
                                            <font-awesome-icon :icon="['fa', 'circle-check']"/>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>


    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faBox, faShoppingBag, faCalendar, faHandHoldingDollar, faClock, faWarehouse, faTruckRampBox, faTruckFast, faHouseSignal, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
library.add(faBox, faShoppingBag, faCalendar, faHandHoldingDollar, faClock, faWarehouse, faTruckRampBox, faTruckFast, faHouseSignal, faCircleCheck);

import http from "../../../http-common"


export default({
    name: 'ProfileOrders',
    mounted() {
        this.getUserInfo();
        this.getUserOrders();
    },
    data() {
        return {
            user: {},
            orders: [],
            selectedOrder: '',
        }
    },
    methods: {
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
                        console.log(this.orders)
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        },
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