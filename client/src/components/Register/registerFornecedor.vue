<template>
    <div>
        <form>            
            <p class="text-left" style="margin-bottom: -2%">Informações Pessoais</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" placeholder="Nome">
                </div>
                <div class="col mb-3">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" placeholder="Apelido">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" placeholder="E-mail">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputNif" class="form-label">Identificador Fiscal <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="nif" placeholder="NIF">
                </div>
                <div class="col mb-3">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" placeholder="Telemóvel">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputPassword" class="form-label">Palavra-passe <span style='color: #FF0000;'>*</span></label>
                    <input type="password" class="form-control" id="password" placeholder="Palavra-passe">
                </div>
                <div class="col mb-3">
                    <label for="inputPasswordConfirm" class="form-label">Repetir palavra-passe <span style='color: #FF0000;'>*</span></label>
                    <input type="password" class="form-control" id="passwordConfirm" placeholder="Palavra-passe">
                </div>
            </div>

            <p class="text-left" style="margin-bottom: -2%">Empresa</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyName" class="form-label">Nome da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="companyName" placeholder="Nome">
                </div>
                <div class="col mb-3">
                    <label for="inputCompanyEmail" class="form-label">E-mail da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="city" placeholder="E-mail">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputDescription" class="form-label">Descrição <span style='color: #FF0000;'>*</span></label>
                    <textarea rows="3" type="description" class="form-control" id="description" placeholder="Descrição"></textarea>
                </div>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="termsConditons">
                <label class="form-check-label" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%">Registar como fornecedor</button>

            <div class="or-seperator"><i>ou</i></div>
            <p class="text-center">Regista-te através de uma rede social</p>
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
  name: 'registerConsumidor',
  components: {
    countrySelect,
    regionSelect
  },
  data: () => ({
    country: '',
    region: ''
  }),
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