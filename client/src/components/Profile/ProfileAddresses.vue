<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h3>Moradas</h3>
        <hr>
        <i>Adicionar moradas dinamicamente com o componente address do bootsratp...</i>
        <br>
        <br>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                    <address>
                        <strong>Exemplo, Inc.</strong><br>
                        Avenida Homem Gaiola, Suite 900<br>
                        Carnide, Lisboa<br>
                        <abbr title="CP">Código Postal:</abbr> 2700-99
                    </address>
                    <address>
                        <strong>NIF</strong><br>
                        <a>967 712 361</a>
                    </address>              
            </div>
        </div>
        <br>
        

        <button type="button" class="btn btn-primary">Adicionar morada &nbsp;<font-awesome-icon :icon="['fa', 'plus']" size=""/></button>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);

import http from "../../../http-commmon"


export default({
    name: 'ProfileAddresses',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: [],
        }
    },
    methods: {
        getUserInfo() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken){
                http.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
                .then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    return this.user
                }
                })  
            }
        },
    },
});

</script>

<style scoped>
    .btn-primary {
        background-color: #767e7a;
        border-color: white;
    }
</style>