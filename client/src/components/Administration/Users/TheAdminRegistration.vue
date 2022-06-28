<template>
    <div class="modal fade" id="admin-registration" aria-hidden="true" aria-labelledby="admin-registration"
        tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="admin-registration">Registo de novo administador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="register">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="inputFirstName" class="form-label">Nome <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="name" class="form-control" id="firstName" v-model="registerInfo.firstName"
                                    placeholder="Nome" required>
                            </div>
                            <div class="col-md-6">
                                <label for="inputLastName" class="form-label">Apelido <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="name" class="form-control" id="lastName" v-model="registerInfo.lastName"
                                    placeholder="Apelido" required>
                            </div>
                        </div>
                        <div class="row g-3 mt-1">
                            <div class="col">
                                <label for="inputEmail" class="form-label">E-mail <span
                                        style='color: #FF0000;'>*</span></label>
                                <input v-on:click="removeIsInvalid" type="email" class="form-control" id="email"
                                    v-model="registerInfo.email" placeholder="E-mail" required>
                                <div class="invalid-feedback" id="invalidFeedbackEmail"></div>
                            </div>
                        </div>

                        <div class="row g-3 mt-1">
                            <div class="col-md-6">
                                <label for="inputPassword" class="form-label">Palavra-passe</label>
                                <div class="input-group">
                                    <input :type="showPassword1 ? 'text' : 'password'" v-on:click="removeIsInvalid"
                                        class="form-control" id="password" v-model="registerInfo.password"
                                        placeholder="Palavra-passe" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showPassword1 = !showPassword1"
                                            style="height: 100%">
                                            <font-awesome-icon
                                                :icon="showPassword1 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                                        </span>
                                    </div>
                                    <div class="invalid-feedback" id="invalidFeedbackPassword"></div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="inputPasswordConfirm" class="form-label">Repetir palavra-passe</label>
                                <div class="input-group">
                                    <input :type="showPassword2 ? 'text' : 'password'" v-on:click="removeIsInvalid"
                                        class="form-control" id="passwordConfirm" v-model="registerInfo.passwordConfirm"
                                        placeholder="Palavra-passe" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text" @click="showPassword2 = !showPassword2"
                                            style="height: 100%">
                                            <font-awesome-icon
                                                :icon="showPassword2 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                            <button type="submit" class="btn bg-5e9f88 text-light" id="registerButton">Registar</button>
                        </div>
                    </form>

                    <!-- Toast Edit User Info -->
                    <div class="toast-container position-absolute top-0 end-0 p-3">
                        <div class="toast align-items-center text-white bg-primary border-0" id="successToast"
                            role="alert" aria-live="polite" aria-atomic="true">
                            <div class="d-flex">
                                <div class="toast-body">
                                    <strong>Registado!</strong> O novo administrador foi
                                    criado com sucesso.
                                </div>
                                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                    data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from '../../../main';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faEyeSlash, faLeaf);

import http from "../../../../http-common";

export default {
    name: 'TheAdminRegistration',
    data(){
        return {
            showPassword1: false,
            showPassword2: false,
            registerInfo: {
                firstName: '',
                lastName:'',
                email:'',
                password:'',
                passwordConfirm:'',
            }
        }
    },
    methods: {
        checkPasswords() {
            if(document.getElementById("password").value == document.getElementById("passwordConfirm").value) {
                return true
            } else {
                return false
            }
        },
        wrongRegister(message) {
            if (message.msg == "Invalid value") {
                if (message.param == "email") {
                    document.getElementById("invalidFeedbackEmail").innerText = "E-mail não apresenta formato correto."
                    document.getElementById("email").classList.add("is-invalid")
                } else if (message.param == "password") {
                    document.getElementById("invalidFeedbackPassword").innerText = "Tem de ter pelo menos 5 caracteres"
                    document.getElementById("password").classList.add("is-invalid")
                }
            } else if (message.msg == "E-mail already in use.") {
                document.getElementById("invalidFeedbackEmail").innerText = "Email já em uso."
                document.getElementById("email").classList.add("is-invalid")
                
            }
            document.getElementById("password").value = "";
            document.getElementById("passwordConfirm").value = "";
        },
        register() {
            if(this.checkPasswords()) {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));

                http.post("/user", JSON.stringify({
                    first_name: this.registerInfo.firstName,
                    last_name: this.registerInfo.lastName,
                    email: this.registerInfo.email,
                    password: this.registerInfo.password.toString(),
                    type: "ADMINISTRATOR"}), 
                    { headers: {"Authorization" : `Bearer ${accessToken}`}}).then((response) => {
                    if (response.status == 201) {
                        let animation = {
                            animation: true,
                            delay: 5000
                        };
                        let successToast = document.getElementById("successToast");
                        let successfulToast = new Toast(successToast, animation)
                        successfulToast.show();

                        this.registerInfo.firstName = '';
                        this.registerInfo.lastName = '';
                        this.registerInfo.email = '';
                        this.registerInfo.password = '';
                        this.registerInfo.passwordConfirm = '';
                    }
                })
                .catch(error => this.wrongRegister(error.response.data.errors[0]));
            } else {
                document.getElementById("invalidFeedbackPassword").innerText = "Palavras-passe não coincidem."
                document.getElementById("password").classList.add("is-invalid")
                document.getElementById("password").value = "";
                document.getElementById("passwordConfirm").value = "";
            }
        },
        removeIsInvalid() {
            document.getElementById("email").classList.remove("is-invalid");
            document.getElementById("password").classList.remove("is-invalid");
            document.getElementById("passwordConfirm").classList.remove("is-invalid");
        }
    }
}
</script>

<style scoped>
form {
    padding: 4.8em;
}

#successToast,
.bg-5e9f88{
        background-color: #5E9F88!important;
    }

</style>
