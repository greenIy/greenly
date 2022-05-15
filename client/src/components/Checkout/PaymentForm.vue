<template>
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
        <button type="button" @click="pay">Pay</button>

</template>

<script >
    import { loadStripe } from '@stripe/stripe-js';
    import { StripeElements, StripeElement } from 'vue-stripe-js'
    import {defineComponent, ref, onBeforeMount, Ref} from 'vue'

    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faStripeS } from '@fortawesome/free-brands-svg-icons';
    library.add(faStripeS);
    import { faSpinner  } from '@fortawesome/free-solid-svg-icons';
    library.add(faSpinner);


    export default defineComponent({
        name: 'PaymentForm',

        components: {
            loadStripe,
            StripeElements,
            StripeElement,
        },


        setup() {
        const stripeKey = ref('pk_test_51KxFiLGMWnhnwj5BXizQZZAE5dHlrznwONPjJiTYKmvPuCVYxBYQWlLAn3fKuv41TrUD6DCinKvEqweRVVlwSCWb00zzCjNqu3');
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
            clientSecret: 'pi_3KzSzeGMWnhnwj5B1DBfExmD_secret_3BOiPw2jGUspZ7sBnEUNUhFh9',
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
            stripeKey,
            stripeLoaded,
            instanceOptions,
            elementsOptions,
            paymentOptions,
            payment,
            elms,
        }
    },

    methods: {
        pay() {
            // Access instance methods, e.g. createToken()
            this.elms.instance.confirmPayment({
                elements: this.elms.elements,
            redirect: 'if_required'
            }).then(function(result) {
                console.log(result);
            });

            }
        },
    });


</script>

<style scoped>

</style>