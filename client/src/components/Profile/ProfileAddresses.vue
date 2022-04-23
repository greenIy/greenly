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
                        <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                            <a class="text-decoration: none;"><font-awesome-icon style="color: black; cursor: pointer;" :icon="['fa', 'pen']" size=""/></a>&nbsp;
                            <a class="text-decoration: none;"><font-awesome-icon style="color: black; cursor: pointer;" :icon="['fa', 'trash-can']" size=""/></a>
                        </div>
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
import { faPlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faTrashCan, faPen);

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