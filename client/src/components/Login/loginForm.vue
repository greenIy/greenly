<template>
    <div class="login-form" style="padding-top: 2.5%">
        <form>
          <h2 class="text-center">Iniciar Sessão</h2>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="E-mail">
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Palavra-passe</label>
            <input type="password" class="form-control" id="password" placeholder="Palavra-passe">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe">
            <label class="form-check-label" for="rememberMe">Lembrar-me</label>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%">Iniciar</button>
        <div class="or-seperator"><i>ou</i></div>
            <p class="text-center">Inicia sessão com uma rede social</p>
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
import { faFacebookSquare, faGoogle, faApple} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookSquare);
library.add(faGoogle);
library.add(faApple);

export default {
  name: 'loginForm',
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