<template>
    <div>
        <form>   
            <p class="text-left" style="margin-bottom: -2%">Informações pessoais</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" placeholder="Introduza nome...">
                </div>
                <div class="col mb-3">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" placeholder="Introduza apelido...">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" placeholder="Introduza e-mail...">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputNif" class="form-label">Identificador Fiscal <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="nif" placeholder="Introduzir NIF...">
                </div>
                <div class="col mb-3">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" placeholder="Introduza telemóvel...">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputPassword" class="form-label">Palavra-passe <span style='color: #FF0000;'>*</span></label>
                    <input type="password" class="form-control" id="password" placeholder="Introduza palavra-passe...">
                </div>
                <div class="col mb-3">
                    <label for="inputPasswordConfirm" class="form-label">Repetir palavra-passe <span style='color: #FF0000;'>*</span></label>
                    <input type="password" class="form-control" id="passwordConfirm" placeholder="Introduza palavra-passe...">
                </div>
            </div>

            <p class="text-left" style="margin-bottom: -2%">Morada</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCountry" class="form-label">País <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="country" placeholder="Introduza país...">
                </div>
                <div class="col mb-3">
                    <label for="inputCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="city" placeholder="Introduza cidade...">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="street" placeholder="Introduza rua...">
                </div>
                <div class="col mb-3">
                    <label for="postalCode" class="form-label">Código Postal <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="postalCode" placeholder="Introduza código postal...">
                </div>
            </div>

            <p class="text-left" style="margin-bottom: -2%">Empresa</p><hr/>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyName" class="form-label">Nome da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="companyName" placeholder="Introduza nome empresa...">
                </div>
                <div class="col mb-3">
                    <label for="inputCompanyEmail" class="form-label">E-mail da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="city" placeholder="Introduza e-mail empresa...">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputDescription" class="form-label">Descrição <span style='color: #FF0000;'>*</span></label>
                    <textarea rows="3" type="description" class="form-control" id="description" placeholder="Introduza descrição..."></textarea>
                </div>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="termsConditons">
                <label class="form-check-label" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%">Registar como transportador</button>

        </form>
        <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right">Inicia sessão aqui!</router-link></p>
    </div>
</template>

<script>

</script>

<style scoped>
    .btn-primary {
      background-color: #608072;
      border-color: white;
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