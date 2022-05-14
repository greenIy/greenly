<template>
    <body>
    <div class="page-container">
        <TheNavbar @search-information="searchInformation"/>
        <div class="content-wrap mw-0">
        <div class="container">
            <!-- <div class="row content justify-content-center" v-if="rendered"> -->
            
            <Transition name="fade">
                <!-- <div v-if="products.length" class="content d-flex w-100 " @currentPage="getCurrentPage">
                <ProductCard
                v-for="p in products"
                :key="p.id"
                :product="p"
                ></ProductCard>
                </div> -->
                <div class="content d-flex w-100">
                <TheNoProduct></TheNoProduct>
                </div>
            </Transition>
            <!-- </div> -->
        </div>
        <!-- <TheNextPage v-if="products.length" @sendCurrentPage="getCurrentPage" :pageAmount="getPageAmount"/> -->
        </div>
        <TheFooter />
    </div>
    </body>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import ProductCard from '@/components/Wishlist/ProductCard.vue';
import TheNoProduct from "@/components/StandardMessages/TheNoProduct.vue";

export default {
    name: 'WhishlistView',
    components: {
        TheNavbar,
        TheFooter,
        ProductCard,
        TheNoProduct
    },
};
</script>


<style scoped>
</style>