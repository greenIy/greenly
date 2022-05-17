<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Informações Pessoais</h4>
        <hr>
        <form @submit.prevent="editProfile">
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" v-bind:value="user.first_name" placeholder="Nome" readonly required>
                </div>
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" v-bind:value="user.last_name" placeholder="Apelido" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" v-bind:value="user.email" placeholder="E-mail" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" v-bind:value="user.phone" placeholder="Telemóvel" readonly required>
                </div>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary" id="editInfoButton" v-on:click="editUserInfo"><font-awesome-icon :icon="['fa', 'pen']" /> &nbsp;Editar</button>
                <button type="button" class="btn btn-secondary" style="display: none" id="cancelInfoButton" data-bs-toggle="modal" data-bs-target="#cancelUserInfo"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                <button type="submit" class="btn btn-primary" style="display: none" id="saveInfoButton" v-on:click="editProfile"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
            </div>
        </form>

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
        
        <!-- Toast Edit User Info -->
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <div class="toast align-items-center text-white bg-primary border-0" id="successToast" role="alert" aria-live="polite" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Atualizado!</strong> O seu perfil foi atualizado com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {Toast} from 'bootstrap/dist/js/bootstrap.bundle.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faPen, faFloppyDisk, faXmark);

import http from "../../../http-common"

export default({
    name: 'ProfilePersonalInfo',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: {},
        }
    },
    methods: {
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        cloneUser(user) {
            return JSON.parse(JSON.stringify(user))
        },
        editUserInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block"
            document.getElementById("saveInfoButton").style.display = "block"

            document.getElementById("firstName").readOnly = false
            document.getElementById("lastName").readOnly = false
            document.getElementById("phoneNumber").readOnly = false
        },
        cancelUserInfo() {
            document.getElementById("cancelInfoButton").style.display = "none"
            document.getElementById("saveInfoButton").style.display = "none"
            document.getElementById("editInfoButton").style.display = "block";

            document.getElementById("firstName").readOnly = true
            document.getElementById("lastName").readOnly = true
            document.getElementById("phoneNumber").readOnly = true
        },
        saveUserInfo() {
            this.cancelUserInfo()
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("successToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();

        },
        editProfile() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            this.user.first_name = document.getElementById("firstName").value
            this.user.last_name = document.getElementById("lastName").value
            this.user.phone = document.getElementById("phoneNumber").value
            if (accessToken && userId){
            http.put(`/user/${userId}`,
                    JSON.stringify({
                            first_name: this.user.first_name,
                            last_name: this.user.last_name,
                            phone: this.user.phone.toString(),
                        }), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            this.saveUserInfo()
                        }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        }
    },
});

</script>

<style scoped>
    .btn-primary{
        background-color: #309C76;
        border-color: white;
    }
    #successToast {
        margin-top: 120px;
        background-color: #309C76 !important;
    }
</style>