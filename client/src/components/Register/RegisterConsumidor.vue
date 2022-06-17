<template>
    <div>
        <form @submit.prevent="registerConsumer" style="width: 85%; margin-left: 7.5%;">   
            <p class="text-left" style="margin-bottom: -2%">Informações Pessoais</p><hr/>         
            <div class="row">
                <div class="col mb-3">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" v-model="registerInfo.firstName" placeholder="Nome" required>
                </div>
                <div class="col mb-3">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" v-model="registerInfo.lastName" placeholder="Apelido" required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input v-on:click="removeIsInvalid" type="email" class="form-control" id="email" v-model="registerInfo.email" placeholder="E-mail" required>
                    <div class="invalid-feedback" id="invalidFeedbackEmail"></div>
                </div>
            </div>

            <div class="row">
                <div class="col mb-3">
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
                <div class="col mb-3">
                    <label for="inputPasswordConfirm" class="form-label">Confirmar palavra-passe</label>
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
            
            <!-- p class="text-left" style="margin-bottom: -2%">Morada</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="selectCountry" class="form-label">País <span style='color: #FF0000;'>*</span></label>
                    <country-select v-model="country" :country="country" topCountry="" :countryName="true" class="form-control"/>
                    <input type="name" class="form-control" id="country" v-model="registerInfo.country" placeholder="Introduza país" required>
                </div>
                <div class="col mb-3">
                    <label for="selectCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                    <region-select v-model="region" :country="country" :region="region" :countryName="true" :regionName="true" class="form-control"/>
                    <input type="name" class="form-control" id="city" v-model="registerInfo.city" placeholder="Introduza a cidade" required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="street" v-model="registerInfo.street" placeholder="Introduza rua" required>
                </div>
                <div class="col mb-3">
                    <label for="postalCode" class="form-label">Código Postal <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="postalCode" v-model="registerInfo.postalCode" placeholder="Introduza código postal" required>
                </div>
            </div> -->

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="termsConditons" required>
                <label class="form-check-label" style="font-size: 80%" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right greenly-link">termos e condições de uso</router-link>.</label>
                <br>
            </div>

            <button type="submit" class="btn btn-primary" id="registerButton" style="width: 65%; margin-left: 17.5%;">Registar como Consumidor&nbsp;&nbsp;<img  src="../../assets/leaf.png" class="mb-1" alt="Imagem do produto" style="width:7%" /></button>

            <div class="or-seperator"><i>ou</i></div>
            <p class="text-center">Regista-te através de uma rede social</p>
            <div class="text-center social-btn">
                <a @click="googleSignIn" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
                <a @click="loginWithFacebook" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
            </div>

        </form>
        <p class="text-center text-muted small">Já tens conta? <router-link to="/login" class="float-right greenly-link">Inicia sessão aqui!</router-link></p>
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
                        alert('Account registered successfully!')
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
    .register-form form {       
        margin-bottom: 3%;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 6%;
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
        background: #f7f7f7;
        position: relative;
        top: -11px;
        z-index: 1;
    }

    .greenly-link {
        color: #5e9f88;
    }
</style>