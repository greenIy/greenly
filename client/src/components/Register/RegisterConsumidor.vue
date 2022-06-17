<template>
    <div class="container h-100 d-flex justify-content-center">
        <div class="card p-3 justify-content-center align-items-center 2" style="max-width: 600px; min-width: 350px">
            <div class="card-body">
                <form @submit.prevent="registerConsumer">   
                    <p class="text-left">Informações Pessoais</p>
                    <hr/>         
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                            <input type="name" class="form-control" id="firstName" v-model="registerInfo.firstName" placeholder="Nome" required>
                        </div>
                        <div class="col-md-6">
                            <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                            <input type="name" class="form-control" id="lastName" v-model="registerInfo.lastName" placeholder="Apelido" required>
                        </div>
                    </div>
                    <div class="row g-3 mt-1">
                        <div class="col">
                            <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                            <input v-on:click="removeIsInvalid" type="email" class="form-control" id="email" v-model="registerInfo.email" placeholder="E-mail" required>
                            <div class="invalid-feedback" id="invalidFeedbackEmail"></div>
                        </div>
                    </div>

                    <div class="row g-3 mt-1">
                        <div class="col-md-6">
                            <label for="inputPassword" class="form-label">Palavra-passe</label>
                            <div class="input-group">
                            <input :type="showPassword1 ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="password" v-model="registerInfo.password" placeholder="Palavra-passe" required>    
                                <div class="input-group-append">
                                    <span class="input-group-text" @click="showPassword1 = !showPassword1" style="height: 100%">
                                            <font-awesome-icon :icon="showPassword1 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                                    </span>
                                </div>
                                <div class="invalid-feedback" id="invalidFeedbackPassword"></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="inputPasswordConfirm" class="form-label">Repetir palavra-passe</label>
                            <div class="input-group">
                            <input :type="showPassword2 ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="passwordConfirm" v-model="registerInfo.passwordConfirm" placeholder="Palavra-passe" required>  
                                <div class="input-group-append">
                                    <span class="input-group-text" @click="showPassword2 = !showPassword2" style="height: 100%">
                                            <font-awesome-icon :icon="showPassword2 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="termsConditons" required>
                        <label class="form-check-label" style="cursor: pointer; font-size: 80%">Aceito os <u class="greenly-link" data-bs-toggle="modal" data-bs-target="#termsAndConditions">termos e condições de uso.</u></label>
                        <br>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary" id="registerButton" style="width: 65%; margin-left: 17.5%;">Registar como Consumidor&nbsp;&nbsp;<img  src="../../assets/leaf.png" class="mb-1" alt="Imagem do produto" style="width:7%" /></button>
                    </div>

                    <div class="or-seperator"><i>ou</i></div>
                    <p class="text-center">Regista-te através de uma rede social</p>
                    <div class="text-center social-btn">
                        <a @click="googleSignIn" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
                        <a @click="loginWithFacebook" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
                    </div>

                </form>
            </div>
            <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right greenly-link">Inicia sessão aqui!</router-link></p>

            <!-- Modal -->
            <div class="modal fade" id="termsAndConditions" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="termsAndConditionsLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Termos e condições de uso</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>1 - Importantíssimo</h5>
                    <p>&nbsp; &nbsp; &nbsp;  - Gostar de php</p>
                    <br><br><br><br><br><br><br>
                    <small class="position-absolute bottom-0 end-0 p-2 pe-3">Última atualização: 18/05/2022</small>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="closeTermsAndConditionsButton" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" v-on:click="acceptTermsAndConditions">Li e aceito</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGoogle, faEye, faEyeSlash, faLeaf);

import http from "../../../http-common";
import AuthService from "@/router/auth";
import {initFbsdk} from "@/config/facebook_oAuth";


export default {
    name: 'registerConsumer',
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
    mounted() {
        initFbsdk();
    },

    methods: {
        acceptTermsAndConditions() {
            document.getElementById("termsConditons").checked = true;
            var closeTermsAndConditionsModal = document.getElementById("closeTermsAndConditionsButton");
            closeTermsAndConditionsModal.click()
        },
        checkPasswords() {
            if(document.getElementById("password").value == document.getElementById("passwordConfirm").value) {
                return true
            } else {
                return false
            }
        },
        async googleSignIn() {
            try {
                const authCode = await this.$gAuth.getAuthCode();
                http.post("/auth/google", JSON.stringify({
                    code: authCode})
                ).then(async(response) => {
                    if (response.status == 200) {
                        localStorage.setItem('accessToken', JSON.stringify(response.data.token));
                        localStorage.setItem('userId', JSON.stringify(response.data.id));
                        this.$router.push({path: '/'})

                        // Modificar a store do VueX de forma a refletir o estado de autenticação
                        this.$store.dispatch('setUser', await AuthService.getUser())
                        this.$store.dispatch('setState', true);
                    }
                })


            } catch (error) {
                console.error(error);
            }
        },

        loginWithFacebook() {
            window.FB.login(response => {
                // obtain access token from the response
                if (response.authResponse) {
                    const accessToken = response.authResponse.accessToken;
                    http.post("/auth/facebook", JSON.stringify({
                            access_token: accessToken,
                        })
                    ).then(async(response) => {
                        if (response.status === 200) {
                            localStorage.setItem('accessToken', JSON.stringify(response.data.token));
                            localStorage.setItem('userId', JSON.stringify(response.data.id));
                            this.$router.push({path: '/'})

                            // Modificar a store do VueX de forma a refletir o estado de autenticação
                            this.$store.dispatch('setUser', await AuthService.getUser())
                            this.$store.dispatch('setState', true);
                        }
                    })
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'public_profile,email'});
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
        registerConsumer() {
            if(this.checkPasswords()) {
                http.post("/user", JSON.stringify({
                    first_name: this.registerInfo.firstName,
                    last_name: this.registerInfo.lastName,
                    email: this.registerInfo.email,
                    password: this.registerInfo.password.toString(),
                    type: "CONSUMER",
                })).then((response) => {
                    if (response.status == 201) {
                        this.$router.push({path: '/login'});
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
};
</script>

<style scoped>
    .btn-primary {
        background-color: #5e9f88;;
        border-color: white;
    }
    .btn-primary:hover, .social-btn .btn:hover {
        opacity: 0.9;
    }
    .social-btn .btn {
        border: none;
        margin: 10px 3px 0;
        opacity: 1;
    }
    .social-btn .btn-secondary, .social-btn .btn-secondary:active {
        background: #507cc0 !important;
    }
    .social-btn .btn-danger, .social-btn .btn-danger:active {
        background: #df4930 !important;
    }
    .or-seperator {
        margin-top: 20px;
        text-align: center;
        border-top: 1px solid #ccc;
    }
    .or-seperator i {
        padding: 0 10px;
        background: white;
        position: relative;
        top: -11px;
        z-index: 1;
    }
    .greenly-link {
        color: #5e9f88;
    }
</style>