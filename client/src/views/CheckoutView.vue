<template>
    <!-- View for the checkout page -->
    <div class="page-container">
        <div class="content-wrap">
            <the-navbar/>
            <div class="tab-content p-5" id="checkout-content">
                <h2>Check-out</h2>
                <div v-if="activeTab === 'shipping'" class="row"> <!-- Shipping tab -->
                    <div class="col-md-8">
                        <shipping-form :billing="billingAddress" :shipping="shippingAddress" @setBilling="setBillingAddress" @setShipping="setShippingAddress" @done="shippingCallback" />
                </div>
                    <div class="col-md-4">
                        <cart-info/>
                    </div>
                </div> <!-- End of shipping tab -->

                <div v-if="activeTab === 'payment'" class="row"> <!-- Payment tab -->
                    <div class="col-md-6">
                        <payment-form v-if="activeTab === 'payment'" :client-secret="stripeInfo.clientSecret" :stripe-key="stripeInfo.stripeKey" @go-back="changeTab" @toast-fail="toastFail" @payment-success="paymentCallback"/>
                    </div>
                    <div class="col-md-6">
                        <cart-info/>
                    </div>
                </div> <!-- End of payment tab -->
                </div>
            </div>

        <the-footer class="bottom-0"/>
    </div>
</template>


<script>
    import TheNavbar from "@/components/Frontpage/TheNavbar";
    import TheFooter from "@/components/Frontpage/TheFooter";
    import PaymentForm from "@/components/Checkout/PaymentForm";
    import CartInfo from "@/components/Checkout/CartInfo";
    import ShippingForm from "@/components/Checkout/ShippingForm";
    import http from "../../http-common";
    import { useToast } from "vue-toastification";

    export default {
        name: "CheckoutView",
        components: {
            ShippingForm,
            CartInfo,
            PaymentForm,
            TheFooter,
            TheNavbar
        },
        data() {
            const toast = useToast();
            return {
                user: [],
                activeTab: 'shipping',
                shippingAddress: null,
                billingAddress: null,
                stripeInfo: {
                    stripeKey: '',
                    clientSecret: ''
                },
                orderID: null,
                orderStatus: null,
                toast
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
                                for (let address of this.user.addresses) {
                                    if (address.is_shipping == true) {
                                        self.shippingAddress = address;
                                    }
                                    if (address.is_billing == true) {
                                        self.billingAddress = address;
                                    }
                                }
                                console.log(self.billingAddress);
                                return self.user
                            }
                    })
                }
            },

            async shippingCallback() {
                await this.createOrder();
                console.log(this.orderStatus);
                if(this.orderStatus === 200){
                    await this.getStripeKey();
                    await this.getPaymentIntent();
                    if(this.stripeInfo.clientSecret){
                        console.log(this.stripeInfo);
                        this.changeTab('payment');
                    }
                }
            },


            async createOrder() {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                let userId = JSON.parse(localStorage.getItem('userId'));
                let order = {
                    shipping_address: this.shippingAddress.id,
                    billing_address: this.billingAddress.id,
                    observations: "ai e",
                }
                console.log("Attempting to create order: ", order);
                await http.post(`/user/${userId}/orders`, order, {headers: {"Authorization": `Bearer ${accessToken}`}})
                    .then(response => {
                        console.log(response.data);
                        if (response.status == 200) {
                            this.orderID = response.data.id;
                            console.log(response.status);
                        } else {
                            console.log("Error creating order");
                        }
                        this.orderStatus = response.status;
                    }
                )
            },

            async getStripeKey(){
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                if (accessToken) {
                    await http.get('/store/payments/config',{headers: {"Authorization": `Bearer ${accessToken}`}})
                        .then(response => {
                            if (response.status == 200) {
                                this.stripeInfo.stripeKey = response.data.publishable_key;
                                console.log(this.stripeInfo.stripeKey);
                            }
                        })
                }
            },

            async getPaymentIntent(){
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                if (accessToken) {
                    await http.get(`/store/payments/intent/${this.orderID}`,{headers: {"Authorization": `Bearer ${accessToken}`}})
                        .then(response => {
                            if (response.status == 200) {
                                this.stripeInfo.clientSecret = response.data.intent;
                                console.log(this.stripeInfo.clientSecret);
                            }
                        })
                }
            },

            paymentCallback(){
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                let userId = JSON.parse(localStorage.getItem('userId'));

                http.delete(`/user/${userId}/cart`, {headers: {"Authorization": `Bearer ${accessToken}`}})
                    .then(response => {
                        if (response.status == 200) {
                            console.log("Cart deleted");
                        }
                    })
            },

            toastFail(message){
                this.toast.error(message, {
                    position: 'top-left',
                    duration: 10000
                });
            },


            changeTab(tab) {
                this.activeTab = tab;
            },
            setShippingAddress(address) {
                console.log("Received request to set shipping address to: ", address);
                this.shippingAddress = address;
                console.log("Shipping address set to: ", this.shippingAddress);
            },
            setBillingAddress(address) {
                console.log("Received request to set billing address to: ", address);
                this.billingAddress = address;
                console.log("Billing address set to: ", this.billingAddress);
            }
        },
        mounted() {
            this.getUserInfo();
            console.log(this.shippingAddress);
        }

    }
</script>

<style>

.wrapper {
    display: flex;
    align-items: stretch;
}



</style>