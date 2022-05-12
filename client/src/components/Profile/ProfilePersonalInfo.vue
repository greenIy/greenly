<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Informações Pessoais</h4>
        <hr>
        <form @submit.prevent="editProfile">
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" v-model="userCopy.first_name" placeholder="Nome" readonly required>
                </div>
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" v-model="userCopy.last_name" placeholder="Apelido" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" v-model="userCopy.email" placeholder="E-mail" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" v-model="userCopy.phone" placeholder="Telemóvel" readonly required>
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

        <!-- Notification Profile Edited -->
        <div class="alert alert-success alert-dismissible fade show" id="successNotification" role="alert">
            <strong>Atualizado!</strong> O seu perfil foi atualizado com sucesso.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    </div>
</template>

<script>

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
            userCopy: {}
        }
    },
    methods: {
        getUserInfo() {
            this.userCopy = this.cloneUser(this.$store.getters.getUser)
            return this.$store.getters.getUser
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
            this.userCopy = this.cloneUser(this.$store.getters.getUser)
        },
        saveUserInfo() {
            this.$store.dispatch('setUser', this.cloneUser(this.userCopy))
            this.getUserInfo()
            this.cancelUserInfo()
            document.getElementById("successNotification").style.display = "block"

        },
        editProfile() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
            http.put(`/user/${userId}`,
                    JSON.stringify({
                            first_name: this.userCopy.first_name,
                            last_name: this.userCopy.last_name,
                            phone: this.userCopy.phone.toString(),
                        }), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            setTimeout(this.saveUserInfo, 500)
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
    #successNotification {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 30px;
        margin-top: 150px;
        display: none;
        width: 25%;
    }
</style>