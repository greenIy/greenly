<template>
    <div class="p-4">
        <h4>Segurança</h4>
        <hr>
        <div style="overflow-y: auto; overflow-x: hidden; height: 440px;">
            <div style="width: 95%; margin-left: 5px; margin-bottom: 5px;">
                <form @submit.prevent="changePassword">
                    <div class="row g-4">
                        <div class="col-md-6 mb-3">
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
                    <div class="row g-3">
                        <div class="col-md-6">
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
                        <div class="col-md-6 mb-3">
                            <label for="inputNewPasswordConfirm" class="form-label">Confirmar nova palavra-passe</label>
                            <div class="input-group">
                            <input :type="showPassword3 ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="newPasswordConfirm" v-model="changePW.newPasswordConfirm" placeholder="Confirmar palavra-passe nova" required>
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

                <h4>Acesso API</h4>
                <hr>
                <a>Procura desenvolver aplicações utilizando o API Greenly? Utilize este token para se autenticar. 
                   <br><b>Deve tratá-lo com todo o cuidado, pois este token permite acesso à sua conta.</b>
                   <br>Consulte todas as funcionalidades do API em <a :href="url_api">docs.greenly.pt</a>.</a>
                <br>
                <br>
                <p>
                    <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#accessTokenCollapse" aria-expanded="false" aria-controls="accessTokenCollapse" @click="changeAccessTokenIcon">
                        <span><font-awesome-icon :icon="showAccessToken ? ['fa', 'lock-open'] : ['fa', 'lock']" /> &nbsp;Mostrar token</span>
                    </button>
                </p>
                <div style="min-height: 50px;">
                    <div class="collapse" id="accessTokenCollapse">
                        <div class="card card-body" style="width: 100%; margin-bottom: 30px; background-color: #EDEDED">
                            <span  class="small">{{ this.accessToken.replaceAll('"', '') }}</span>
                        </div>
                    </div>
                </div>

                <h4 style="color: red;">Apagar conta</h4>
                <hr>
                <a>Depois de apagar a sua conta, <b>não há como voltar atrás</b>.<br>Por favor tenha isso em consideração antes de tomar uma decisão.</a>
                <br>
                <br>

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAccount" v-on:click="generateCode()"><font-awesome-icon :icon="['fa', 'user-xmark']" /> &nbsp;Apagar conta</button>

                <!-- Modal -->
                <div class="modal fade" id="deleteAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteAccountLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteAccountLabel">Apagar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="checkIcon" style="width: 15%; margin-left: 42.5%; display: none;">
                        <img src='../../assets/checkIconGreen.png'>
                    </div>
                    <div class="modal-body text-center p-4" id="deleteMessage">
                        <h3 id="deleteAccountCode">{{ this.deleteCode }}</h3>
                        Digite o código acima para confirmar que pretende apagar a sua conta de forma definitiva
                        <div class="form-row justify-content-center mt-3">
                            <div class="input-group input-group-lg col-md-3 mx-auto w-50">
                                <input v-on:click="removeIsInvalid" id="codeInput" type="text" class="form-control text-center" maxlength="4" placeholder="Código">
                                <div class="invalid-feedback" id="invalidDeleteCode">O código está errado.</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="cancelButton" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="deleteButton" v-on:click="confirmDeleteAccount">Apagar</button>
                    </div>
                    </div>
                </div>
                </div>

                <!-- Toast Change Password -->
                <div class="toast-container position-absolute top-0 end-0 p-3">
                    <div class="toast align-items-center text-white bg-primary border-0" id="changePasswordToast" role="alert" aria-live="polite" aria-atomic="true">
                        <div class="d-flex">
                            <div class="toast-body">
                            <strong>Atualizada!</strong> A sua palavra-passe foi atualizada com sucesso.
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from '../../main'
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faCheck, faUserXmark, faKey, faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faEyeSlash, faCheck, faUserXmark, faKey, faLock, faLockOpen);

import AuthService from '../../router/auth';
import http from "../../../http-common"

export default({
    name: 'ProfileSecurity',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: {},
            accessToken: localStorage.getItem('accessToken'),
            showPassword1: false,
            showPassword2: false,
            showPassword3: false,
            showAccessToken: false,
            changePW: {
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
            },
            deleteCode: '',
            url_api: 'https://docs.greenly.pt/'
        }
    },
    methods: {
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        logoutUser() {
            AuthService.logoutUser()
        },
        successfulChangePassword() {
            document.getElementById("oldPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("newPasswordConfirm").value = "";
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("changePasswordToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();
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
        changeAccessTokenIcon() {
            if (this.showAccessToken === false) {
                this.showAccessToken = true;
            } else {
                this.showAccessToken = false;
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
                                    this.successfulChangePassword()
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
        generateCode() {
            const code = Math.floor(1000 + Math.random() * 9000);
            this.deleteCode = code;
        },
        confirmDeleteAccount() {
            var codeInput = document.getElementById("codeInput")
            if (this.deleteCode == codeInput.value) {
                this.deleteAccount()
            } else {
                codeInput.classList.add("is-invalid")
            }
        },
        removeIsInvalid() {
            document.getElementById("oldPassword").classList.remove("is-invalid");
            document.getElementById("newPassword").classList.remove("is-invalid");
            document.getElementById("newPasswordConfirm").classList.remove("is-invalid");
            document.getElementById("codeInput").classList.remove("is-invalid");
        }
    },
});

</script>

<style scoped>
    #changePasswordToast {
        background-color: #5E9F88 !important;
    }
    ::-webkit-scrollbar {
        width: 17px;
    }
    ::-webkit-scrollbar-track {
        background-color: #E4E4E4;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 5px solid transparent;
        background-clip: content-box;
        background-color: #5E9F88;
    }
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
</style>