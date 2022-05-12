<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Segurança</h4>
        <hr>
        <form @submit.prevent="changePassword">
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputOldPassword" class="form-label">Palavra-passe atual</label>
                    <div class="input-group">
                    <input :type="showPassword1 ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="oldPassword" v-model="changePW.oldPassword" placeholder="Palavra-passe atual" required>
                        <div class="input-group-append">
                            <span class="input-group-text" @click="showPassword1 = !showPassword1" style="height: 100%">
                                    <font-awesome-icon :icon="showPassword1 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                            </span>
                        </div>
                        <div class="invalid-feedback" id="invalidFeedbackOldPassword">Palavra-passe inserida não coincide com a atual.</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputNewPassword" class="form-label">Nova palavra-passe</label>
                    <div class="input-group">
                    <input :type="showPassword2 ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="newPassword" v-model="changePW.newPassword" placeholder="Palavra-passe nova" required>
                        <div class="input-group-append">
                            <span class="input-group-text" @click="showPassword2 = !showPassword2" style="height: 100%">
                                    <font-awesome-icon :icon="showPassword2 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                            </span>
                        </div>
                        <div class="invalid-feedback" id="invalidFeedbackNewPassword"></div>
                    </div>
                </div>
                <div class="col mb-3" style="max-width: 50%">
                    <label for="inputNewPasswordConfirm" class="form-label">Confirmar nova palavra-passe</label>
                    <div class="input-group">
                    <input :type="showPassword3 ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="newPasswordConfirm" v-model="changePW.newPasswordConfirm" placeholder="Confirmar palavra-passe nov" required>
                        <div class="input-group-append">
                            <span class="input-group-text" @click="showPassword3 = !showPassword3" style="height: 100%">
                                    <font-awesome-icon :icon="showPassword3 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-secondary"><font-awesome-icon :icon="['fa', 'key']" /> &nbsp;Mudar palavra-passe</button>
        </form>
        <br>
        <br>

        <h4 style="color: red;">Apagar conta</h4>
        <hr>
        <a>Depois de apagar a sua conta, não há como voltar atrás.<br>Por favor tenha isso em consideração antes de tomar uma decisão.</a>
        <br>
        <br>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAccount"><font-awesome-icon :icon="['fa', 'user-xmark']" /> &nbsp;Apagar conta</button>
        <!-- Modal -->
        <div class="modal fade" id="deleteAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteAccountLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteAccountLabel">Apagar conta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="checkIcon" style="width: 15%; margin-left: 42.5%; display: none;">
                <img src='../../assets/checkIconGreen.png'>
            </div>
            <div class="modal-body" id="deleteMessage">
                Tem a certeza que deseja apagar a sua conta definitivamente?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancelButton" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" id="deleteButton" v-on:click="deleteAccount">Apagar</button>
            </div>
            </div>
        </div>
        </div>

        <!-- Notification Password Changed -->
        <div class="alert alert-success alert-dismissible fade show" id="successNotification" role="alert">
            <strong>Alterada!</strong> A sua palavra-passe foi alterada com sucesso.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faCheck, faUserXmark, faKey} from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faEyeSlash, faCheck, faUserXmark, faKey);

import AuthService from '../../router/auth';
import http from "../../../http-common"

export default({
    name: 'ProfileSecurity',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: [],
            showPassword1: false,
            showPassword2: false,
            showPassword3: false,
            changePW: {
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
            }
        }
    },
    methods: {
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.$store.getters.getUser
        },
        logoutUser() {
            AuthService.logoutUser()
            this.$forceUpdate();
        },
        successfulDelete() {
            document.getElementById("cancelButton").style.display = "none";
            document.getElementById("deleteButton").style.display = "none";
            document.getElementById("deleteMessage").innerHTML = "<div class='text-center'>Conta apagada com sucesso!<br>Irá ser redirecionado para a página de login...<br><div>";
            document.getElementById("checkIcon").style.display = "block"
        },
        checkPasswords() {
            if(document.getElementById("newPassword").value == document.getElementById("newPasswordConfirm").value) {
                return true
            } else {
                return false
            }
        },
        wrongCredentials(message) {
            
            if (message == "old_password doesn't match user password.") {
                document.getElementById("oldPassword").classList.add("is-invalid")
            } else if (message == "Minimum password length is 5.") {
                document.getElementById("invalidFeedbackNewPassword").innerText = "Palavra-passe nova deve conter pelo menos 5 caracteres."
                document.getElementById("newPassword").classList.add("is-invalid")
            } else if (message == "old_password can't be the same as new_password") {
                document.getElementById("invalidFeedbackNewPassword").innerText = "Palavra-passe nova deve ser diferente da atual."
                document.getElementById("newPassword").classList.add("is-invalid")
            }
            document.getElementById("oldPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("newPasswordConfirm").value = "";
        },
        changePassword() {
                if (this.checkPasswords()) {
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
                                    old_password: this.changePW.oldPassword.toString(),
                                    new_password: this.changePW.newPassword.toString(),
                                }), headers)
                            .then(async (response) => {
                                if (response.status == 200) {
                                    document.getElementById("successNotification").style.display = "block"
                                    document.getElementById("oldPassword").value = "";
                                    document.getElementById("newPassword").value = "";
                                    document.getElementById("newPasswordConfirm").value = "";
                                    console.log("Sucesso")
                                }
                            }).catch(error => this.wrongCredentials(error.response.data.errors[0].msg))
                    } 
                } else {
                    document.getElementById("invalidFeedbackNewPassword").innerText = "Palavras-passe não coincidem.";
                    document.getElementById("newPassword").classList.add("is-invalid");
                    document.getElementById("oldPassword").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPasswordConfirm").value = "";
            }
        },
        deleteAccount() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            http.delete(`/user/${userId}`, headers)
                    .then((response) => {
                        if (response.status == 202) {
                            this.successfulDelete()
                            setTimeout(this.logoutUser, 5000)  
                        }
                    }).catch((error) => {
                        console.log(error.response);
                        console.log("Failure!");
                    })
        },
        removeIsInvalid() {
            document.getElementById("oldPassword").classList.remove("is-invalid");
            document.getElementById("newPassword").classList.remove("is-invalid");
            document.getElementById("newPasswordConfirm").classList.remove("is-invalid");
        }
    },
});

</script>

<style scoped>
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