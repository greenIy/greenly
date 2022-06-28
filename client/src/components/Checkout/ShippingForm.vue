<template>
    <!-- list of shipping addresses -->
    <div class="tab-content p-5" id="checkout-content">
        <div v-if="activeTab === 'shippingAddress'" class="row"> <!-- Shipping tab -->

            <h3>Morada de envio: </h3>

            <div class="ps-4 row g-4">
                <div v-for="address in this.addresses" :key="address.nif" class="card" :class="{'bg-selected' : selectedShippingAddress.id === address.id}" style="width: 300px; margin-right: 30px">
                    <!-- toggle class to show green background if selected -->
                    <div class="card-body" @click="selectShippingAddress(address)"  style="cursor: pointer;">
                        <address>
                            <strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
                            {{ address.street }}<br>
                            {{ address.city }}, {{ address.country }}<br>
                            Código Postal: {{ address.postal_code }}
                        </address>
                        <address>
                            <strong>NIF</strong><br>
                            <a>{{ address.nif }}</a>
                            <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                                <!-- select address with check colored green -->

                                <a v-if="selectedShippingAddress.id === address.id" @click="selectShippingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square-check']" class="selected" /></a>
                                <!-- address that isn't selected -->
                                <a v-else @click="selectShippingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square']" /></a>

                            </div>
                        </address>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-end">
                <button class="btn btn-primary btn-lg btn-block btn-greenly" @click="changeTab('billingAddress')">
                    <span>Avançar</span>
                    <font-awesome-icon :icon="['fa', 'arrow-right']" class="ms-2" />
                </button>

            </div>

        </div>
        <!-- end of list of shipping addresses -->

        <!-- list of billing addresses -->
        <div class="billing-addresses row" v-if="activeTab === 'billingAddress'"> <!-- Shipping tab -->

            <h3>Morada fiscal:</h3>
            <div class="ps-4 row g-4">
                <div v-for="address in this.addresses" :key="address.id" class="card" :class="{'bg-selected' : selectedBillingAddress.id === address.id}" style="width: 300px; margin-right: 30px">
                    <!-- toggle class to show green background if selected -->
                    <div class="card-body" @click="selectBillingAddress(address)"  style="cursor: pointer;">
                        <address>
                            <strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
                            {{ address.street }}<br>
                            {{ address.city }}, {{ address.country }}<br>
                            Código Postal: {{ address.postal_code }}
                        </address>
                        <address>
                            <strong>NIF</strong><br>
                            <a>{{ address.nif }}</a>
                            <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                                <!-- select address with check colored green -->

                                <a v-if="selectedBillingAddress.id === address.id" @click="selectBillingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square-check']" class="selected" /></a>
                                <!-- address that isn't selected -->
                                <a v-else @click="selectBillingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square']" /></a>

                            </div>
                        </address>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-between">
            <button
                class="btn btn-secondary btn-lg btn-block me-5"
                @click="changeTab('shippingAddress')"
            >
                <font-awesome-icon :icon="['fa', 'arrow-left']" class="me-2"></font-awesome-icon>
                <span>Regressar</span>
            </button>
                <button class="btn btn-primary btn-lg btn-block btn-greenly" @click="$emit('done')">
                        <span>Avançar</span>
                        <font-awesome-icon :icon="['fa', 'arrow-right']" class="ms-2" />
                </button>
            </div>
        </div>

        <!-- end of list of billing addresses -->
    </div>
</template>

<script>
import http from "../../../http-common";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouseChimney, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
library.add(faHouseChimney, faSquare, faSquareCheck, faArrowLeft);



export default {
    name: "ShippingForm",
    props: {
        shipping: {
            type: Object,
            required: true,
            default: false
        },
        billing: {
            type: Object,
            required: true,
            default: false
        },
    },
    emits: ["setShipping", "setBilling", "done"],
    mounted() {
        this.getUserInfo();
    },
    data(props) {
        let selectedBillingAddress = props.billing;
        let selectedShippingAddress = props.shipping;
        return {
            user: [],
            addresses: [],
            activeTab: "shippingAddress",
            selectedShippingAddress,
            selectedBillingAddress
        }
    },
    methods: {
        async getUserInfo() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const self = this;
            if (accessToken) {
                await http.get(`/user/${userId}`, {headers: {"Authorization": `Bearer ${accessToken}`}})
                    .then(response => {
                        if (response.status == 200) {
                            self.user = response.data;
                            self.addresses = self.user.addresses;
                            if (self.selectedShippingAddress == null || self.selectedBillingAddress == null) {
                                self.selectShippingAddress(self.addresses[0]);
                                self.selectBillingAddress(self.addresses[0]);
                                for (let address of self.addresses) {
                                    if (address.is_shipping == true) {
                                        self.selectShippingAddress(address);
                                    }
                                    if (address.is_billing == true) {
                                        self.selectBillingAddress(address);
                                    }
                                }
                            }
                            return self.user
                        }
                    })
            }
        },
        selectShippingAddress(address) {
            this.selectedShippingAddress = address;
            this.$emit('setShipping', address);
        },

        selectBillingAddress(address) {
            this.selectedBillingAddress = address;
            this.$emit('setBilling', address);
        },

        changeTab(tab) {
            this.activeTab = tab;
        }
    },


}
</script>

<style scoped>
.card {
    margin-bottom: 30px;
}
.card-body {
    padding: 20px;
}

.bg-selected {
    /*faded outline*/
    box-shadow: 0 2px 17px 5px rgba(94,159,136,1);

}

.selected{
    color: #5e9f88;
}

.btn-greenly {
    background-color: #5e9f88;
    border-color: #5e9f88;
}

</style>