<template>
    <!-- list of shipping addresses -->
    <div class="shipping-addresses">
        <h3>Morada de envio: </h3>
        <div class="p-5 row row-cols-1 row-cols-md-3 g-4">
            <div v-for="address in this.shippingAddresses" :key="address.nif" class="card" :class="{'bg-selected' : selectedShippingAddress === address}" style="width: 300px; margin-right: 30px">
                <!-- toggle class to show green background if selected -->
                <div class="card-body" @click="selectShippingAddress(address)"  style="cursor: pointer;">
                    <address>
                        <strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
                        {{ address.street }}<br>
                        {{ address.city }}, {{ address.country }}<br>
                        <abbr title="CP">Código Postal:</abbr> {{ address.postal_code }}
                    </address>
                    <address>
                        <strong>NIF</strong><br>
                        <a>{{ address.nif }}</a>
                        <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                            <!-- select address with check colored green -->

                            <a v-if="selectedShippingAddress === address" @click="selectShippingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square-check']" class="selected" /></a>
                            <!-- address that isn't selected -->
                            <a v-else @click="selectShippingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square']" /></a>

                        </div>
                    </address>
                </div>
            </div>
        </div>
    </div><!-- end of list of shipping addresses -->

        <!-- list of billing addresses -->
        <div class="billing-addresses">
            <h3>Morada fiscal:</h3>
            <div class="p-5 row row-cols-1 row-cols-md-3 g-4">
                <div v-for="address in this.billingAddresses" :key="address.nif" class="card" :class="{'bg-selected' : selectedBillingAddress === address}" style="width: 300px; margin-right: 30px">
                    <!-- toggle class to show green background if selected -->
                    <div class="card-body" @click="selectBillingAddress(address)"  style="cursor: pointer;">
                        <address>
                            <strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
                            {{ address.street }}<br>
                            {{ address.city }}, {{ address.country }}<br>
                            <abbr title="CP">Código Postal:</abbr> {{ address.postal_code }}
                        </address>
                        <address>
                            <strong>NIF</strong><br>
                            <a>{{ address.nif }}</a>
                            <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                                <!-- select address with check colored green -->

                                <a v-if="selectedBillingAddress === address" @click="selectBillingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square-check']" class="selected" /></a>
                                <!-- address that isn't selected -->
                                <a v-else @click="selectBillingAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa-regular', 'square']" /></a>

                            </div>
                        </address>
                    </div>
                </div>
        </div>
    </div>
    <!-- end of list of billing addresses -->

    <!-- next button -->
    <div class="row justify-content-center">
        <button class="btn btn-primary" @click="$emit('done')">Próximo</button>
    </div>
</template>

<script>
import http from "../../../http-common";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouseChimney} from '@fortawesome/free-solid-svg-icons';
import {faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
library.add(faHouseChimney, faSquare, faSquareCheck);



export default {
    name: "ShippingForm",
    props: {
        shipping: null,
        billing: null,
    },
    emits: ["setShipping", "setBilling", "done"],
    mounted() {
        this.getUserInfo();
    },
    data(props) {
        return {
            user: [],
            shippingAddresses: [],
            billingAddresses: [],
            selectedShippingAddress: props.shipping,
            selectedBillingAddress: props.billing,
        }
    },
    methods: {
        getUserInfo() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken) {
                http.get(`/user/${userId}`, {headers: {"Authorization": `Bearer ${accessToken}`}})
                    .then(response => {
                        if (response.status == 200) {
                            this.user = response.data;
                            for(let address of this.user.addresses) {
                                if(address.is_shipping === true) {
                                    this.shippingAddresses.push(address);
                                }
                                if(address.is_billing === true) {
                                    this.billingAddresses.push(address);
                                }
                            }
                            return this.user
                        }
                    })
            }
        },
        selectShippingAddress(address) {
            this.selectedShippingAddress = address;
            console.log("setting shipping to: ", address);
            this.$emit('setShipping', address);
        },

        selectBillingAddress(address) {
            this.selectedBillingAddress = address;
            console.log("setting billing to: ", address);
            this.$emit('setBilling', address);
        },
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

</style>