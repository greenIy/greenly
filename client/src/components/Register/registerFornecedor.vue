<template>
    <div>
        <form @submit.prevent="registerSupplier" style="width: 85%; margin-left: 7.5%;">   
            <p class="text-left" style="margin-bottom: -2%">Informações Pessoais</p><hr/>         
            <div class="row">
                <div class="col mb-3">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" v-model="registerInfo.firstName" placeholder="Introduza nome" required>
                </div>
                <div class="col mb-3">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" v-model="registerInfo.lastName" placeholder="Introduza apelido" required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" v-on:click="removeIsInvalid" class="form-control" id="email" v-model="registerInfo.email" placeholder="Introduza e-mail" required>
                    <div class="invalid-feedback">E-mail não tem o formato correto ou E-mail já em uso</div>
                </div>
            </div>

            <div class="row">
                <div class="col mb-3">
                    <label for="inputPassword" class="form-label">Palavra-passe</label>
                    <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="password" v-model="registerInfo.password" placeholder="Introduza palavra-passe" required>
                    <div class="invalid-feedback">Password tem de ter pelo menos 5 caracteres</div>    
                        <div class="input-group-append">
                            <span class="input-group-text" @click="showPassword = !showPassword" style="height: 100%">
                                    <font-awesome-icon :icon="showPassword ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col mb-3">

                    <label for="inputPasswordConfirm" class="form-label">Repetir palavra-passe</label>
                    <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" v-on:click="removeIsInvalid" class="form-control" id="passwordConfirm" v-model="registerInfo.passwordConfirm" placeholder="Introduza palavra-passe" required>
                    <div class="invalid-feedback">Password tem de ter pelo menos 5 caracteres</div>    
                        <div class="input-group-append">
                            <span class="input-group-text" @click="showPassword = !showPassword" style="height: 100%">
                                    <font-awesome-icon :icon="showPassword ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-left" style="margin-bottom: -2%">Informações Empresa</p><hr/>         
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyName" class="form-label">Nome empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="companyName" v-model="registerInfo.companyName" placeholder="Introduza nome" required>
                </div>
                <div class="col mb-3">
                    <label for="inputComapnyEmail" class="form-label">Email empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" v-on:click="removeIsInvalid" id="companyEmail" v-model="registerInfo.companyEmail" placeholder="Introduza email" required>
                    <div class="invalid-feedback">E-mail não tem o formato correto ou E-mail já em uso</div>
                </div>
            </div>
            
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="termsConditons" required>
                <label class="form-check-label" style="font-size: 80%" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
                <br>
            </div>

            <button type="submit" class="btn btn-primary" id="registerButton" style="width: 65%; margin-left: 17.5%;">Registar como fornecedor</button>

            <div class="or-seperator"><i>ou</i></div>
            <p class="text-center">Regista-te através de uma rede social</p>
            <div class="text-center social-btn">
                <a href="#" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
                <a href="#" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
            </div>

        </form>
        <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right">Inicia sessão aqui!</router-link></p>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';
import http from "../../../http-commmon";

library.add(faFacebookSquare, faGoogle);
function wrongRegister(message) {
    console.log(message)
    document.getElementById("registerButton").style = "background-color: #a32c2c; width: 100%;";
    document.getElementById("registerButton").innerHTML = message;
    document.getElementById("registerButton").disabled = true;
    document.getElementById("password").value = "";
    document.getElementById("passwordConfirm").value = "";
    setTimeout(function(){
        document.getElementById("registerButton").style = "background-color: #608072; width: 100%;";
        document.getElementById("registerButton").innerHTML = "Registar como consumidor";
        document.getElementById("registerButton").disabled = false;
   }, 3000);
   if (message.msg == "Invalid value") {
        if (message.param == "email") {
            document.getElementById("email").classList.add("is-invalid")
        } else if (message.param == "password") {
            document.getElementById("password").classList.add("is-invalid")
            document.getElementById("passwordConfirm").classList.add("is-invalid")
        }
    } else if (message.msg == "E-mail already in use.") {
        document.getElementById("email").classList.add("is-invalid")
    }
}
export default {
    name: 'registerSupllier',
    data(){
        return {
            showPassword: false,
            registerInfo: {
                firstName: '',
                lastName:'',
                email:'',
                password:'',
                passwordConfirm:'',
                companyName:'',
                companyEmail:''
            }
        }
    },
    methods: {
        registerSupllier() {
            http.post("/user", JSON.stringify({
                first_name: this.registerInfo.firstName,
                last_name: this.registerInfo.lastName,
                email: this.registerInfo.email,
                password: this.registerInfo.password.toString(),
                type: "SUPPLIER",
                company:{
                    name: this.registerInfo.companyName,
                    email: this.registerInfo.companyEmail
                }
            })).then((response) => {
                if (response.status == 201) {
                    console.log(response.data)
                    alert('Account registered successfully!')
                    this.$router.push({path: '/login'});
                }
            })
            .catch(error => wrongRegister(error.response.data.errors[0].msg));
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
        background-color: #608072;
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
</style>