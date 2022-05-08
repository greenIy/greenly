<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Informações Pessoais</h4>
        <hr>
        <form @submit.prevent="">
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" :value="user.first_name" is-invalid placeholder="Nome" readonly required>
                </div>
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" :value="user.last_name" placeholder="Apelido" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" :value="user.email" placeholder="E-mail" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" :value="user.phone" placeholder="Telemóvel" readonly required >
                </div>
            </div>
        </form>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" class="btn btn-primary" id="editInfoButton" v-on:click="editUserInfo">Editar &nbsp;<font-awesome-icon :icon="['fa', 'pen']" size=""/></button>
            <button type="button" class="btn btn-secondary" style="display: none" id="cancelInfoButton" data-bs-toggle="modal" data-bs-target="#cancelUserInfo">Cancelar</button>
            <button type="button" class="btn btn-primary" style="display: none" id="saveInfoButton">Guardar alterações</button>
        </div>

        <!-- Modal Cancel User Info -->
        <div class="modal fade" id="cancelUserInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cancelUserInfoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cancelUserInfoLabel">Atenção!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Tem a certeza que deseja cancelar? Todas as alterações serão perdidas.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                <button type="button" class="btn btn-danger" v-on:click="cancelUserInfo" data-bs-dismiss="modal">Sim</button>
            </div>
            </div>
        </div>
</div>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
library.add(faPen);


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
            this.user = this.$store.getters.getUser
            return this.$store.getters.getUser
        },
        editUserInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block"
            document.getElementById("saveInfoButton").style.display = "block"

            document.getElementById("firstName").readOnly = false
            document.getElementById("lastName").readOnly = false
            document.getElementById("email").readOnly = false
            document.getElementById("phoneNumber").readOnly = false
        },
        cancelUserInfo() {
            document.getElementById("cancelInfoButton").style.display = "none"
            document.getElementById("saveInfoButton").style.display = "none"
            document.getElementById("editInfoButton").style.display = "block";

            document.getElementById("firstName").readOnly = true
            document.getElementById("lastName").readOnly = true
            document.getElementById("email").readOnly = true
            document.getElementById("phoneNumber").readOnly = true
        }
    },
});

</script>

<style scoped>
    .btn-primary{
        background-color: #309C76;
        border-color: white;
    }
</style>