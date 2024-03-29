<template>
    <div class="container">
        <div class="container-body">
            <!-- Stripe checkout -->
            <StripeElements
                v-if="stripeLoaded"
                v-slot="{ elements, instance }"
                ref="elms"
                :stripe-key="stripeKey"
                :instance-options="instanceOptions"
                :elements-options="elementsOptions"
            >
                <StripeElement
                    ref="payment"
                    type="payment"
                    :elements="elements"
                    :options="paymentOptions"
                >
                </StripeElement>

            </StripeElements>
            <div v-if="!stripeLoaded" class="text-center">
                <font-awesome-icon :icon="['fas', 'spinner']" spin></font-awesome-icon>
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <div class="container-footer d-flex flex-row justify-content-between mt-5">

            <!-- button to go back -->
            <button
                class="btn btn-secondary btn-lg btn-block me-5"
                @click="$emit('go-back', 'shipping')"
            >
                <font-awesome-icon :icon="['fa', 'arrow-left']" class="me-2"></font-awesome-icon>
                <span>Regressar</span>
            </button>

            <!-- pay button that has pay written on it with green background and card icon and changes to loading -->

            <button
                class="btn btn-primary btn-lg btn-block btn-greenly"
                :disabled="loading"
                @click="pay"
            >
                <font-awesome-icon :icon="['fa', 'credit-card']" class="me-2" v-if="!loading"></font-awesome-icon>
                <font-awesome-icon :icon="['fas', 'spinner']" class="me-2" spin v-else></font-awesome-icon>
                <span>Pagar</span>
            </button>

        </div>
    </div>

</template>

<script>

import {loadStripe} from '@stripe/stripe-js';
import {StripeElements, StripeElement} from 'vue-stripe-js'
import {defineComponent, ref, onBeforeMount} from 'vue'

import {library} from '@fortawesome/fontawesome-svg-core';
import {faStripeS} from '@fortawesome/free-brands-svg-icons';


library.add(faStripeS);
import {faSpinner, faCreditCard, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faCreditCard, faArrowLeft);



export default defineComponent({
    name: 'PaymentForm',
    props: {
        stripeKey: String,
        clientSecret: String
    },
    emits: ['go-back', 'payment-success', 'toast-fail'],

    components: {
        loadStripe,
        StripeElements,
        StripeElement,
    },

    setup(props) {
        console.log('PaymentForm setup');
        const stripeKey = ref(props.stripeKey);
        const clientSecret = ref(props.clientSecret);
        const stripeLoaded = ref(false);
        const instanceOptions = ref({
            locale: 'auto',
        });
        const elementsOptions = ref({

            locale: 'auto',
            appearance: {
                theme: 'stripe',
                labels: 'floating',
                variables: {
                    borderRadius: '5px',
                    colorPrimary: '#5e9f88',
                    colorBackground: '#ffffff',
                    colorText: '#30313d',
                    colorDanger: '#df1b41',
                    colorSuccess: '#2dce89',
                    colorWarning: '#f0b429',
                }
            },
            clientSecret: clientSecret.value,
            loader: 'always'

        });
        const paymentOptions = ref({});
        const payment = ref();
        const elms = ref();


        onBeforeMount(() => {
            const stripePromise = loadStripe(stripeKey.value)
            stripePromise.then(() => {
                stripeLoaded.value = true;
            });
        });

        return {
            stripeLoaded,
            instanceOptions,
            elementsOptions,
            paymentOptions,
            payment,
            elms
        }
    },

    data() {
        return {
            loading: false
        }
    },



    methods: {
        pay() {
            const self = this;
            this.loading = true;
            // Access instance methods, e.g. createToken()
            this.elms.instance.confirmPayment({
                elements: this.elms.elements,
                redirect: 'if_required'
            }).then(function (result) {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    self.$emit("toast-fail", result.error.message);
                    self.loading = false;
                } else {
                    // The payment has been processed!
                    // The payment token can be used to create a charge or a customer
                    // self.$emit("payment-success", result.paymentIntent.id);
                    self.loading = false;
                    self.$emit("payment-success");

                    // Redirect to order confirmation page
                    self.$router.push({name: 'sucesso'});

                }
            });

        }
    },


});


</script>

<style scoped>

.btn-greenly {
    background-color: #5e9f88;
    border-color: #5e9f88;
}

</style>