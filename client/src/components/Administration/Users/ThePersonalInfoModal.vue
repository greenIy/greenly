<template>
<div>
    <!--Personal info-->
    <div class="modal fade" id="user-details" aria-hidden="true" aria-labelledby="user-details" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="user-details"> Informação pessoal de
                        {{ this.currentUser.first_name }} {{ this.currentUser.last_name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editProfile">
                        <div class="row g-4">
                            <div class="col-md-6 w-50">
                                <label for="inputFirstName" class="form-label">Nome <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="name" class="form-control" id="firstName"
                                    v-bind:value="currentUser.first_name" placeholder="Nome" readonly required>
                            </div>
                            <div class="col-md-6 mb-3 w-50">
                                <label for="inputLastName" class="form-label">Apelido <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="name" class="form-control" id="lastName"
                                    v-bind:value="currentUser.last_name" placeholder="Apelido" readonly required>
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-md-12 mb-3 w-50">
                                <label for="inputEmail" class="form-label">E-mail <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="email" class="form-control" id="email" v-bind:value="currentUser.email"
                                    placeholder="E-mail" readonly v-on:click="removeIsInvalid" required>
                                <div class="invalid-feedback" id="invalidEmail">Email já em uso.</div>
                            </div>
                            <div class="col-md-6 mb-3 w-50">
                                <label for="inputPhoneNumber" class="form-label">Telemóvel <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="number" class="form-control" id="phoneNumber"
                                    v-bind:value="currentUser.phone" placeholder="Telemóvel" readonly required>
                            </div>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                            <button type="button" class="btn bg-5e9f88 text-light" id="editInfoButton"
                                v-on:click="editUserInfo">
                                <font-awesome-icon :icon="['fa', 'pen']" /> &nbsp;Editar</button>

                            <button type="button" class="btn btn-danger"
                                style="display: none" id="cancelInfoButton" data-bs-target="#cancelUserInfo" data-bs-toggle="modal"
                                data-bs-dismiss="modal">
                                <font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        

                            <button type="submit" class="btn bg-5e9f88 text-light" style="display: none"
                                id="saveInfoButton">
                                <font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar
                                alterações</button>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button v-if="this.currentUser.type == 'CONSUMER'" class="btn bg-226d53 text-light btn-sm"
                        data-bs-target="#user-orders" data-bs-toggle="modal" data-bs-dismiss="modal">Encomendas</button>
                    <button v-if="this.currentUser.type == 'SUPPLIER' || this.currentUser.type == 'TRANSPORTER'"
                        class="btn bg-226d53 text-light btn-sm" data-bs-target="#user-company" data-bs-toggle="modal"
                        data-bs-dismiss="modal">Empresa</button>
                    <button class="btn bg-226d53 text-light btn-sm" data-bs-target="#user-addresses"
                        data-bs-toggle="modal" data-bs-dismiss="modal">Moradas</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cancel edit modal -->
    <div class="modal fade" id="cancelUserInfo" aria-hidden="true" aria-labelledby="cancelUserInfo" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cancelUserInfo">Atenção!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                     Tem a certeza que deseja cancelar? Todas as alterações serão perdidas.
                </div>
                <div class="modal-footer">
                    <button class="btn bg-226d53 text-light btn-sm" data-bs-target="#user-details"
                        data-bs-toggle="modal" data-bs-dismiss="modal">Não</button>
                    <button v-on:click="cancelUserInfo" class="btn bg-danger text-light btn-sm" data-bs-target="#user-details"
                        data-bs-toggle="modal" data-bs-dismiss="modal">Sim</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { useToast } from "vue-toastification";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen, faFloppyDisk, faXmark);

import http from "../../../../http-common";
import AuthService from "../../../router/auth";

export default {
    name: 'ThePersonalInfoModal',
    components: {},
    data() {
        const toast = useToast();

        return {
            toast
        }
    },
    props: [
        'currentUser',
    ],
    methods: {
        editUserInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block";
            document.getElementById("saveInfoButton").style.display = "block";

            document.getElementById("firstName").readOnly = false;
            document.getElementById("lastName").readOnly = false;
            document.getElementById("email").readOnly = false;
            document.getElementById("phoneNumber").readOnly = false;
        },
        cancelUserInfo() {
            document.getElementById("cancelInfoButton").style.display = "none";
            document.getElementById("saveInfoButton").style.display = "none";
            document.getElementById("editInfoButton").style.display = "block";
            
            document.getElementById("firstName").readOnly = true;
            document.getElementById("lastName").readOnly = true;
            document.getElementById("email").readOnly = true;
            document.getElementById("phoneNumber").readOnly = true;

            console.log("current user:");
            console.log(this.currentUser.id);
            console.log(JSON.parse(localStorage.getItem('userId')));

            AuthService.getTargetUser(this.currentUser.id).then((result) => {
                document.getElementById("firstName").value = result.first_name;
                document.getElementById("lastName").value = result.last_name;
                document.getElementById("email").value = result.email;
                document.getElementById("phoneNumber").value = result.phone;
            });

            this.removeIsInvalid();
        },
        wrongCredentials(message) {
            if (message == "E-mail already in use.") {
                document.getElementById("email").classList.add("is-invalid");
            }
        },
        saveUserInfo() {
            this.cancelUserInfo();
            this.successNotification('O perfil foi atualizado com sucesso.');

        },
        editProfile() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));

            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

            var newFirstName = document.getElementById("firstName").value
            var newLastName = document.getElementById("lastName").value
            var newEmail = document.getElementById("email").value
            var newPhone = document.getElementById("phoneNumber").value

            if (accessToken && userId) {
                if (newEmail === this.currentUser.email) {
                    http.put(`/user/${this.currentUser.id}`,
                            JSON.stringify({
                                first_name: newFirstName,
                                last_name: newLastName,
                                phone: newPhone.toString(),
                            }), headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.currentUser.first_name = newFirstName;
                                this.currentUser.last_name = newLastName;
                                this.currentUser.phone = newPhone;
                                this.saveUserInfo()
                            }
                        }).catch((error) => {
                            console.log(error.response.data);
                            console.log("Failure!")
                        })
                } else {
                    http.put(`/user/${this.currentUser.id}`,
                            JSON.stringify({
                                first_name: newFirstName,
                                last_name: newLastName,
                                email: newEmail,
                                phone: newPhone.toString(),
                            }), headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.currentUser.first_name = newFirstName;
                                this.currentUser.last_name = newLastName;
                                this.currentUser.email = newEmail
                                this.currentUser.phone = newPhone;
                                this.saveUserInfo()
                            }
                        }).catch((error) => {
                            this.wrongCredentials(error.response.data.errors[0].msg);
                            console.log("Failure!")
                        })
                }
            }
        },
        removeIsInvalid() {
            document.getElementById("email").classList.remove("is-invalid");
        },
        successNotification(msg){
        this.toast.success(msg, {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    }    
    }
}
</script>

<style scoped>
form {
    padding: 4.8em;
}

.bg-5e9f88{
        background-color: #5E9F88!important;
    }

.bg-226d53 {
    background-color: #226d53;
  }

.modal-footer {
    justify-content: center;
}
</style>