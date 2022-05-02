<template>
    <div>
        <form @submit.prevent="registerConsumer" style="width: 85%; margin-left: 7.5%;">   
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
                    <input v-on:click="removeIsInvalid" type="email" class="form-control" id="email" v-model="registerInfo.email" placeholder="Introduza e-mail" required>
                    <div class="invalid-feedback">E-mail não tem o formato correto ou E-mail já em uso</div>
                </div>
            </div>

            <!--
            <div class="row">
                <div class="col mb-3">
                    <label for="inputNif" class="form-label">Identificador Fiscal <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="nif" v-model="registerInfo.nif" placeholder="Introduza NIF" required minlength="9" maxlength="9">
                </div>
                <div class="col mb-3">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" v-model="registerInfo.phoneNumber" placeholder="Introduza telemóvel" required minlength="9" maxlength="9">
                </div>
            </div>
            -->

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
                <label class="form-check-label" style="font-size: 80%" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
                <br>
            </div>

            <button type="submit" class="btn btn-primary" id="registerButton" style="width: 65%; margin-left: 17.5%;">Registar como consumidor</button>

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
import countrySelect from '@/components/Register/country-select'
import regionSelect from '@/components/Register/region-select'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare, faGoogle, faEye, faEyeSlash);
import http from "../../../http-commmon";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';
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
    name: 'registerConsumer',
    components: {
        countrySelect,
        regionSelect
    },
    data(){
        return {
            // country: '',
            // region: '',
            showPassword: false,
            registerInfo: {
                firstName: '',
                lastName:'',
                email:'',
                // nif:'',
                //  phoneNumber:'',
                password:'',
                passwordConfirm:'',
                //street:'',
                //city:'',
                //postalCode:'',
                //country:''
            }
        }
    },
    methods: {
        registerConsumer() {
            http.post("/user", JSON.stringify({
                first_name: this.registerInfo.firstName,
                last_name: this.registerInfo.lastName,
                email: this.registerInfo.email,
                password: this.registerInfo.password.toString(),
                type: "CONSUMER",
            })).then((response) => {
                if (response.status == 201) {
                    console.log(response.data)
                    alert('Account registered successfully!')
                    this.$router.push({path: '/login'});
                }
            })
            .catch(error => wrongRegister(error.response.data.errors[0]));
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