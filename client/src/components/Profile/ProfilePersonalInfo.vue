<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h3>Informações Pessoais</h3>
        <hr>
        <div class="row">
            <div class="col mb-3">
                <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                <input type="name" class="form-control" id="firstName" :value="user.first_name" is-invalid placeholder="Introduza nome" readonly required>
            </div>
            <div class="col mb-3">
                <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                <input type="name" class="form-control" id="lastName" :value="user.last_name" placeholder="Introduza apelido" readonly required>
            </div>
        </div>
        <div class="row">
            <div class="col mb-3">
                <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                <input type="email" class="form-control" id="email" :value="user.email" placeholder="Introduza e-mail" readonly required>
            </div>
        </div>
        <div class="row">
            <div class="col mb-3">
                <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                <input type="number" class="form-control" id="phoneNumber" :value="user.phone" placeholder="Introduza telemóvel" readonly required >
            </div>
        </div>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
library.add();

import http from "../../../http-commmon"


export default({
    name: 'ProfilePersonalInfo',
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
    
</style>