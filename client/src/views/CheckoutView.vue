<template>
    <!-- View for the checkout page -->
    <div class="page-container">
        <div class="content-wrap">
            <the-navbar/>
            <div class="tab-content p-5" id="checkout-content">
                <h2>Checkout</h2>

                <div v-if="activeTab === 'shipping'" class="row"> <!-- Shipping tab -->
                    <div class="col-md-6">
                        <shipping-form :billing="billingAddress" :shipping="shippingAddress" @setBilling="setBillingAddress" @setShipping="setShippingAddress" @done="shippingCallback" />
                    </div>
                    <div class="col-md-6">
                        <cart-info/>
                    </div>
                </div> <!-- End of shipping tab -->

                <div v-if="activeTab === 'payment'" class="row"> <!-- Payment tab -->
                    <div class="col-md-6">
                        <payment-form v-if="activeTab === 'payment'" :client-secret="stripeInfo.clientSecret" :stripe-key="stripeInfo.stripeKey" @go-back="changeTab" />
                    </div>
                    <div class="col-md-6">
                        <cart-info/>
                    </div>
                </div> <!-- End of payment tab -->
                </div>
            </div>

        <the-footer/>
    </div>
</template>


<script>
    import TheNavbar from "@/components/Frontpage/TheNavbar";
    import TheFooter from "@/components/Frontpage/TheFooter";
    import PaymentForm from "@/components/Checkout/PaymentForm";
    import CartInfo from "@/components/Checkout/CartInfo";
    import ShippingForm from "@/components/Checkout/ShippingForm";
    import http from "../../http-common";

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
                orderStatus: null
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
                                for (let address of this.user.addresses) {
                                    if (address.is_shipping === true) {
                                        this.shippingAddress = address;
                                    }
                                    if (address.is_billing === true) {
                                        this.billingAddress = address;
                                    }
                                }
                                return this.user
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
                    address: this.shippingAddress.id,
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
        }

    }
</script>

<style>

.wrapper {
    display: flex;
    align-items: stretch;
}

</style>