<template>
    <div class="login-form" style="padding-top: 2.5%">
        <form @submit.prevent="loginUser">
            <h2 class="text-center">Iniciar sessão</h2>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="email"  v-model="loginInfo.email" placeholder="Introduza email" required>
                <div class="invalid-feedback">Deve inserir o e-mail.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Palavra-passe</label>
                <div class="input-group">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="loginInfo.password" placeholder="Introduza palavra-passe" required>
                    <div class="input-group-append">
                        <span class="input-group-text" @click="showPassword = !showPassword" style="height: 100%; cursor: pointer;">
                                <font-awesome-icon :icon="showPassword ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Lembrar-me</label>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%" id="loginButton">Iniciar</button>
            <div class="or-seperator"><i>ou</i></div>
                <p class="text-center">Inicia sessão através de uma rede social</p>
                <div class="text-center social-btn">
                    <a href="#" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
                    <a href="#" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
                </div>
        </form>
        <p class="text-center text-muted small">Ainda não tens conta?  <router-link to="/register" class="float-right">Regista-te aqui!</router-link></p>
    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGoogle, faEye, faEyeSlash);

import http from "../../../http-commmon";

function wrongCredentials(message) {

    document.getElementById("loginButton").style = "background-color: #a32c2c; width: 100%;";
    document.getElementById("loginButton").disabled = true;
    document.getElementById("password").value = "";
    
    if (message == "User with specified e-mail not found.") {
        document.getElementById("loginButton").innerHTML = "E-mail não se encontra registado.";
    } else if (message == "Wrong credentials for specified user.") {
        document.getElementById("loginButton").innerHTML = "Palavra-passe incorreta.";
    }
     setTimeout(function(){
        document.getElementById("loginButton").style = "background-color: #608072; width: 100%;";
        document.getElementById("loginButton").innerHTML = "Iniciar";
        document.getElementById("loginButton").disabled = false;
   }, 3000);
}

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
        loginUser() {

            http.post("/auth/login", JSON.stringify({
                    email: this.loginInfo.email,
                    password: this.loginInfo.password }))
                    .then((response) => {
                        if (response.status == 200) {
                            console.log(response.data.token),
                            localStorage.setItem('accessToken', JSON.stringify(response.data.token));
                            this.$router.push({path: '/'})
                        }
                    })
                    .catch(error => wrongCredentials(error.response.data.message));
        }
    },
});

</script>

<style scoped>
    .btn-primary {
        background-color: #608072;
        border-color: white;
    }
    .btn-primary:hover {
        opacity: 0.9;
    }
    .login-form {
        width: 400px;
        margin: 30px auto;
    }
    .login-form form {        
        margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .login-btn {
        border-radius: 2px;
    }
    .input-group-prepend .fa {
        font-size: 18px;
    }
    .login-btn {
        font-size: 15px;
        font-weight: bold;
        min-height: 40px;
    }
    .social-btn .btn {
        border: none;
        margin: 10px 3px 0;
        opacity: 1;
    }
    .social-btn .btn:hover {
        opacity: 0.9;
    }
    .social-btn .btn-secondary, .social-btn .btn-secondary:active {
        background: #507cc0 !important;
    }
    .social-btn .btn-info, .social-btn .btn-info:active {
        background: #020607 !important;
        color: white;
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