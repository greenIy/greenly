<template>

    <!-- success page -->
    <div class="page-container">
    <the-navbar/>
        <div class="success-container d-flex flex-column align-items-center justify-content-center my-5">
            <div class="success-checkmark">
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            </div>
            <h2>Obrigado pela sua compra!</h2>
            <p class="text-center">
                Irá receber um e-mail com a confirmação do seu pedido.<br>
                O # do seu pedido é: {{ orderID }}<br>
            </p>
            <p>
                <router-link to="/perfil/encomendas" class="btn btn-greenly">
                    <font-awesome-icon :icon="['fa', 'box-archive']" size="lg"/>&nbsp; Ver encomendas
                </router-link>
            </p>
            <p> ou </p>
            <p>
                <router-link to="/">
                    <button class="btn btn-greenly">
                        Continuar a comprar
                    </button>
                </router-link>
            </p>
        </div>
        <the-footer class="bottom-0"/>
    </div>
</template>

<script>
import TheNavbar from "@/components/Frontpage/TheNavbar";
import TheFooter from "@/components/Frontpage/TheFooter";
import http from "../../http-common";

import {library} from '@fortawesome/fontawesome-svg-core';

import {faBoxArchive} from '@fortawesome/free-solid-svg-icons';

library.add(faBoxArchive);


export default {
    name: "SuccessView",
    components: {
        TheFooter,
        TheNavbar
    },
    data() {
        return {
            orderID: null,
        }
    },

    methods: {
        async getOrderID() {
            let self = this;
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            await http.get(`/user/${userId}/orders`, {headers: {"Authorization": `Bearer ${accessToken}`}})
                .then(response => {
                    if (response.status == 200) {
                        self.orderID = response.data[0].id;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    mounted: function() {
        this.getOrderID();
    }
}


</script>

<style scoped>

.page-container {
    width: 100%;
    height: 100%;
}

.btn-greenly {
    background-color: #5e9f88;
    border-color: #5e9f88;
    color: #fff;
}


.success-checkmark {
    width: 80px;
    height: 115px;
    margin: 0 auto;
}
.success-checkmark .check-icon {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid rgb(94, 159, 136);
}
.success-checkmark .check-icon::before {
    top: 3px;
    left: -2px;
    width: 30px;
    transform-origin: 100% 50%;
    border-radius: 100px 0 0 100px;
}
.success-checkmark .check-icon::after {
    top: 0;
    left: 30px;
    width: 60px;
    transform-origin: 0 50%;
    border-radius: 0 100px 100px 0;
    animation: rotate-circle 4.25s ease-in;
}
.success-checkmark .check-icon::before,
.success-checkmark .check-icon::after {
    content: '';
    height: 100px;
    position: absolute;
    background: #ededed;
    transform: rotate(-45deg);
}
.success-checkmark .check-icon .icon-line {
    height: 5px;
    background-color: rgb(94, 159, 136);
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 10;
}
.success-checkmark .check-icon .icon-line.line-tip {
    top: 46px;
    left: 14px;
    width: 25px;
    transform: rotate(45deg);
    animation: icon-line-tip 0.75s;
}
.success-checkmark .check-icon .icon-line.line-long {
    top: 38px;
    right: 8px;
    width: 47px;
    transform: rotate(-45deg);
    animation: icon-line-long 0.75s;
}
.success-checkmark .check-icon .icon-circle {
    top: -4px;
    left: -4px;
    z-index: 10;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    box-sizing: content-box;
    border: 4px solid rgb(94, 159, 136);
}
.success-checkmark .check-icon .icon-fix {
    top: 8px;
    width: 5px;
    left: 26px;
    z-index: 1;
    height: 85px;
    position: absolute;
    transform: rotate(-45deg);
    background-color: #EDEDEDFF;
}
@keyframes rotate-circle {
    0% {
        transform: rotate(-45deg);
    }
    5% {
        transform: rotate(-45deg);
    }
    12% {
        transform: rotate(-405deg);
    }
    100% {
        transform: rotate(-405deg);
    }
}
@keyframes icon-line-tip {
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }
    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }
    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }
    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
}
@keyframes icon-line-long {
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }
    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }
    100% {
        width: 47px;
        right: 8px;
        top: 38px;
    }
}


</style>