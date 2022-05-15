<template>
    <!-- View for the checkout page -->
    <div class="page-container">
        <div class="content-wrap">
            <the-navbar/>
            <div class="container">
                <div class="row">
                    <h2>Checkout</h2>

                    <div class="col-md-6">
                        <payment-form/>
                    </div>
                    <div class="col-md-6">
                        <cart-info/>
                    </div>
                </div>

        </div>

        <the-footer/>
    </div>
    </div>
</template>


<script>
    import TheNavbar from "@/components/Frontpage/TheNavbar";
    import TheFooter from "@/components/Frontpage/TheFooter";
    import PaymentForm from "@/components/Checkout/PaymentForm";
    import CartInfo from "@/components/Checkout/CartInfo";

    export default {
        name: "CheckoutView",
        components: {
            CartInfo,
            PaymentForm,
            TheFooter,
            TheNavbar
        },
    }
</script>

<style>


</style>