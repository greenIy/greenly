<template>
    <div class="container h-100 d-flex justify-content-center">
        <div class="card p-3 justify-content-center align-items-center mt-5 mb-5" style="width: 350px">
            <div class="card-body">
                <form @submit.prevent="loginUser">
                    <h2 class="text-center" >Iniciar sessão</h2>
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">E-mail</label>
                        <input v-on:click="removeIsInvalid" type="email" class="form-control" id="email" v-model="loginInfo.email" placeholder="Introduza email" required data-cy="login-email">
                        <div class="invalid-feedback">E-mail não se encontra registado.</div>
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Palavra-passe</label>
                        <div class="input-group">
                        <input v-on:click="removeIsInvalid" :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="loginInfo.password" placeholder="Introduza palavra-passe" required data-cy="login-password">
                            <div class="input-group-append">
                                <span class="input-group-text" @click="showPassword = !showPassword" style="height: 100%; cursor: pointer;">
                                        <font-awesome-icon :icon="showPassword ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                                </span>
                            </div>
                        <div class="invalid-feedback">Palavra-passe incorreta.</div>
                        </div>
                    </div>
                    <p class="text-muted small" style="font-size: 85%"><router-link class="greenly-link" to="">Esqueceste-te da tua palavra-passe?</router-link></p>
                    <button type="submit" class="btn btn-primary" style="width: 100%" id="loginButton" data-cy="login-submit">Iniciar&nbsp;&nbsp;<img  src="../../assets/leaf.png" class="mb-1" alt="Folha" style="width:7%" /></button>
                    <div class="or-seperator"><i>ou</i></div>
                        <p class="text-center">Inicia sessão através de uma rede social</p>
                        <div class="text-center social-btn">
                             <a @click="googleSignIn" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
                            <a @click="loginWithFacebook" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
                        </div>
                </form>
            </div>
            <p class="text-center text-muted small">Ainda não tens conta?  <router-link to="/registo" class="float-right greenly-link">Regista-te aqui!</router-link></p>
        </div>
    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../router/auth';


library.add(faFacebookSquare, faGoogle, faEye, faEyeSlash, faLeaf);

import http from "../../../http-common";
import { initFbsdk } from "@/config/facebook_oAuth";


export default({
  name: 'loginForm',
    data(){
        return {
            showPassword: false,
            loginInfo: {
                email: '',
                password: ''
            }
        }
    },
    mounted(){
        initFbsdk();
    },
    methods: {

        // Login with Google
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
                }
            }, {scope: 'public_profile,email'});
        },

        wrongCredentials(message) {
            if (message == "User with specified e-mail not found.") {
                document.getElementById("email").classList.add("is-invalid")
            } else if (message == "Wrong credentials for specified user.") {
                document.getElementById("password").classList.add("is-invalid")
            }
            document.getElementById("password").value = "";
        },

        loginUser() {
            http.post("/auth/login", JSON.stringify({
                email: this.loginInfo.email,
                password: this.loginInfo.password }))
                .then(async (response) => {
                        if (response.status == 200) {
                            localStorage.setItem('accessToken', JSON.stringify(response.data.token));
                            localStorage.setItem('userId', JSON.stringify(response.data.id));
                            this.$router.push({path: '/'})

                            // Modificar a store do VueX de forma a refletir o estado de autenticação
                            this.$store.dispatch('setUser', await AuthService.getUser())
                            this.$store.dispatch('setState', true);
                        }
                    })
                    .catch(error => this.wrongCredentials(error.response.data.message));
        },
        removeIsInvalid() {
            document.getElementById("email").classList.remove("is-invalid");
            document.getElementById("password").classList.remove("is-invalid");
        }
    },
});

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
        color:#5e9f88;
    }
</style>