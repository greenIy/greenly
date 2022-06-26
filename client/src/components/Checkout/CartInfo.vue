<template>
<!-- Iterate through cart array and show products in cards -->
<div class="cart-info">
    <div class="cart-info__header">
        <h2 class="cart-info__title">{{ total_items }} {{ total_items == 1 ? 'produto' : 'produtos ' }} no seu carrinho</h2>
    </div>
    <div class="cart-info__body" v-if="cart.length > 0">
        <div class="cart-info__item" v-for="item in cart">
            <div class="cart-info__item-image">
<!--                <img :src="item.image" alt="">-->
            </div>
            <div class="cart-info__item-info">
                <h3 class="cart-info__item-title">{{ item.product.name }}</h3>
                <p class="cart-info__item-price">€ {{ item.price * item.quantity }}</p>
                <p class="cart-info__item-quantity">Quantidade: {{ item.quantity }}</p>
            </div>

    </div>
    </div>
    <div class="cart-info__footer" v-if="cart.length > 0">
        <p class="cart-info__total">Total: € {{ total }}</p>
    </div>
    <div class="cart-info__footer" v-else>
        <p class="cart-info__empty">O seu carrinho está vazio!</p>
    </div>
</div>





</template>

<script>
import http from "../../../http-common";


export default {
    name: "CartInfo",
    data() {
        return {
           cart: [],
           total: 0,
           total_items: 0
        }
    },
    mounted(){
        this.getCart();
    },

    methods: {
        getCart() {
            this.total_items = 0;
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken) {
                http.get(`/user/${userId}/cart`, {headers: {'Authorization': `Bearer ${accessToken}`}})
                    .then(response => {
                        this.cart = response.data.items;
                        this.total = response.data.total_price;
                        for (let item of this.cart) {
                            this.total_items += item.quantity;
                        }
                    })
                return this.cart;
            }
        },
    }
}

</script>

<style scoped>
    .cart-info {
        position: relative;
        width: 100%;
        height: auto;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .cart-info__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5%;
    }

    .cart-info__title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
    }

    .cart-info__body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: flex-start;

    }

    .cart-info__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .cart-info__item-image {
        width: 100px;
        height: 100px;
        background: #eee;
        border-radius: 5px;
        overflow: hidden;
    }

    .cart-info__item-image img {
        width: 100%;
        height: 100%;
    }

    .cart-info__item-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        padding: 0 20px;
    }

    .cart-info__item-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }

    .cart-info__item-price {
        font-size: 1.2rem;
        font-weight: bold;
        align-self: flex-end;
        color: #333;
    }

    .cart-info__item-quantity {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }
    .cart-info__footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        padding: 0 20px;
    }
    .cart-info__total {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }

</style>