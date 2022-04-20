<template>
    <div class="login-form" style="padding-top: 2.5; width: 350px; margin: 5% auto">
        <form @submit.prevent="loginUser" class="form-horizontal">
            <h2 class="text-center" style="margin: 0 0 4%;">Iniciar sessão</h2>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">E-mail</label>
                <input v-on:click="removeIsInvalid" type="email" class="form-control" id="email" v-model="loginInfo.email" placeholder="Introduza email" required>
                <div class="invalid-feedback">E-mail não se encontra registado.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Palavra-passe</label>
                <div class="input-group">
                <input v-on:click="removeIsInvalid" :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="loginInfo.password" placeholder="Introduza palavra-passe" required>
                    <div class="input-group-append">
                        <span class="input-group-text" @click="showPassword = !showPassword" style="height: 100%; cursor: pointer;">
                                <font-awesome-icon :icon="showPassword ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                        </span>
                    </div>
                <div class="invalid-feedback">Palavra-passe incorreta.</div>
                </div>
            </div>
            <p class="text-muted small" style="font-size: 85%"><router-link to="">Esqueceste-te da tua palavra-passe?</router-link></p>
            <button type="submit" class="btn btn-primary" style="width: 100%" id="loginButton">Iniciar&nbsp;&nbsp;<font-awesome-icon :icon="['fa', 'leaf']" size="lg"/></button>
            <div class="or-seperator"><i>ou</i></div>
                <p class="text-center">Inicia sessão através de uma rede social</p>
                <div class="text-center social-btn">
                    <a href="#" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
                    <a href="#" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
                </div>
        </form>
        <p class="text-center text-muted small">Ainda não tens conta?  <router-link to="/register" class="float-right">Regista-te aqui!</router-link></p>

        <!--
        <div class="alert alert-danger alert-dismissible" role="alert" style="display:none;">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Oops! </strong> Corrija os erros e tente outra vez.
        </div>
        -->

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGoogle, faEye, faEyeSlash, faLeaf);

import http from "../../../http-commmon";

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
    methods: {
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
                    .then((response) => {
                        if (response.status == 200) {
                            console.log(response.data.token),
                            localStorage.setItem('accessToken', JSON.stringify(response.data.token));
                            localStorage.setItem('userId', JSON.stringify(response.data.id));
                            this.$router.push({path: '/'})
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
        background-color: #608072;
        border-color: white;
    }
    .btn-primary:hover, .social-btn .btn:hover {
        opacity: 0.9;
    }
    .login-form form {        
        margin-bottom: 3%;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 10%;
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
</style>