<template>
    <div>    
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
    </div>
</template>

<script>
export default {
  name: 'registerPersonalInfo',
};
</script>