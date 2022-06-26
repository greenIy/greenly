<template>
<div class="page-container">
    <div class="content-wrap">
    <the-navbar/>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card d-flex align-items-center">
                    <div class="card-header">
                        <h4>Sucesso!</h4>
                    </div>
                    <div class="card-body">
                        <p>
                            <strong>A sua encomenda foi confirmada com sucesso!</strong><br>
                            Obrigado por comprar connosco!
                        </p>
                        <p>
                            <router-link to="'/perfil/encomendas'" class="btn btn-greenly">
                                <font-awesome-icon :icon="['fa', 'box-archive']" size="lg"/>&nbsp; Ver encomendas
                            </router-link>
                            ou
                            <router-link to="/">
                                <button class="btn btn-greenly">
                                    Voltar a casa
                                </button>
                            </router-link>
                        </p>
                    </div>
                </div>
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

.btn-greenly {
    background-color: #5e9f88;
    border-color: #5e9f88;
    color: #fff;
}

</style>