<template>
    <div>
        <form>   
            <p class="text-left" style="margin-bottom: -2%">Informações Pessoais</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" v-model="registerInfo.firstName" placeholder="Introduza nome">
                </div>
                <div class="col mb-3">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" v-model="registerInfo.lastName" placeholder="Introduza apelido">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" v-model="registerInfo.email" placeholder="Introduza e-mail">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputNif" class="form-label">Identificador Fiscal <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="nif" v-model="registerInfo.nif" placeholder="Introduza NIF">
                </div>
                <div class="col mb-3">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" v-model="registerInfo.phoneNumber" placeholder="Introduza telemóvel">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputPassword" class="form-label">Palavra-passe</label>
                    <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="registerInfo.password" placeholder="Introduza palavra-passe">
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
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="passwordConfirm" v-model="registerInfo.passwordConfirm" placeholder="Introduza palavra-passe">
                        <div class="input-group-append">
                            <span class="input-group-text" @click="showPassword = !showPassword" style="height: 100%">
                                    <font-awesome-icon :icon="showPassword ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p class="text-left" style="margin-bottom: -2%">Empresa</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyName" class="form-label">Nome da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="companyName" v-model="registerInfo.companyName" placeholder="Introduza nome empresa">
                </div>
                <div class="col mb-3">
                    <label for="inputCompanyEmail" class="form-label">E-mail da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="companyEmail" v-model="registerInfo.companyEmail" placeholder="Introduza e-mail empresa">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputDescription" class="form-label">Descrição <span style='color: #FF0000;'>*</span></label>
                    <textarea rows="3" type="description" class="form-control" id="description" v-model="registerInfo.description" placeholder="Introduza descrição"></textarea>
                </div>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="termsConditons">
                <label class="form-check-label" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%">Registar como transportador</button>

            <div class="or-seperator"><i>ou</i></div>
            <p class="text-center">Regista-te  através de uma rede social</p>
            <div class="text-center social-btn">
                <a href="#" class="btn btn-secondary"><font-awesome-icon :icon="['fab', 'facebook-square']" size="lg"/>&nbsp; Facebook</a>
                <a href="#" class="btn btn-danger"><font-awesome-icon :icon="['fab', 'google']" size="lg"/>&nbsp; Google</a>
            </div>

        </form>
        <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right">Inicia sessão aqui!</router-link></p>
    </div>
</template>

<script>
import countrySelect from '@/components/Register/country-select'
import regionSelect from '@/components/Register/region-select'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookSquare, faGoogle);

export default {
    name: 'registerTransporter',
    data(){
        return {
            showPassword: false,
            registerInfo: {
                firstName: '',
                lastName:'',
                email:'',
                nif:'',
                phoneNumber:'',
                password:'',
                passwordConfirm:'',
                street:'',
                city:'',
                postal_code:'',
                country:'',
                companyName:'',
                description:'',
                companyEmail:''
            }
        }
    },
    methods: {
        registerTransporter() {
            http.post("/user", JSON.stringify({
                nif: this.registerInfo.nif,
                first_name: this.registerInfo.firstName,
                last_name: this.registerInfo.lastName,
                email: this.registerInfo.email,
                phone: this.registerInfo.phoneNumber,
                type: "TRANSPORTER",
                password: this.registerInfo.password,
                address:{
                    street: this.registerInfo.street,
                    city: this.registerInfo.city,
                    postal_code: this.registerInfo.postal_code,
                    country: this.registerInfo.country},
                company:{
                    name: this.registerInfo.companyName,
                    bio: this.registerInfo.description,
                    email: this.registerInfo.companyEmail
                }})
            ).then(response => {console.log(response)}), alert("Successfull register!")
        }
    }
};
</script>

<style scoped>
    .btn-primary {
        background-color: #608072;
        border-color: white;
    }
    .btn-primary:hover {
        opacity: 0.9;
    }
    .register-form {
        width: 400px;
        margin: 30px auto;
    }
    .register-form form {        
        margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .register-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .register-btn {
        border-radius: 2px;
    }
    .input-group-prepend .fa {
        font-size: 18px;
    }
    .register-btn {
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