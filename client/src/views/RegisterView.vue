<template>

  <div class="register">

    <the-navbar/>

    <div class="signin-area d-flex flex-column align-items-center justify-content-center py-5">
      <!-- Pills navs -->
      <ul class="nav nav-pills mb-5" id="register" role="tablist">
          <li class="nav-item" role="presentation">
              <a      class="nav-link nav-link-active"
                      id="consumidor-pill"
                      data-mdb-toggle="pill"
                      href="#register-consumidor"
                      role="tab"
                      aria-controls="register-consumidor"
                      aria-selected="true"
              >Consumidor</a>
          </li>
          <li class="nav-item" role="presentation">
              <a      class="nav-link"
                      id="transportador-pill"
                      data-mdb-toggle="pill"
                      href="#register-transportador"
                      role="tab"
                      aria-controls="register-transportador"
                      aria-selected="false"
              >Transportador</a>
          </li>
          <li class="nav-item" role="presentation">
              <a      class="nav-link"
                      id="fornecedor-pill"
                      data-mdb-toggle="pill"
                      href="#register-fornecedor"
                      role="tab"
                      aria-controls="register-fornecedor"
                      aria-selected="false"
              >Fornecedor</a>
          </li>
      </ul>
      
      <div class="tab-content register-form" id="register-content" style="width: 45%; margin-top: -1.5%">
      <div class="tab-pane fade show active" id="register-consumidor" role="tabpanel" aria-labelledby="consumidor-pill">
            <form>
                <h2 class="text-center">Criar conta</h2>

                <register-personal-info/>

                <register-address/>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="termsConditons">
                    <label class="form-check-label" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%">Registar como consumidor</button>
            </form>
        <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right">Inicia sessão aqui!</router-link></p>
      </div>
      </div>

      <div class="tab-content register-form" id="register-content" style="width: 45%">
      <div class="tab-pane fade" id="register-transportador" role="tabpanel" aria-labelledby="transportador-pill">       
            <form>
                <h2 class="text-center">Criar conta</h2>

                <register-personal-info/>

                <register-address/>

                <register-terms-conditions/>

                <button type="submit" class="btn btn-primary" style="width: 100%">Registar como transportador</button>
            </form>
            <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right">Inicia sessão aqui!</router-link></p>
      </div>
      </div>

      <div class="tab-content register-form" id="register-content" style="width: 45%">
      <div class="tab-pane fade" id="register-fornecedor" role="tabpanel" aria-labelledby="fornecedor-pill">       
            <form>
                <h2 class="text-center">Criar conta</h2>
                
                <register-personal-info/>

                <register-address/>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="termsConditons">
                    <label class="form-check-label" for="termsConditions">Aceito os <router-link to="/termsConditions" class="float-right">termos e condições de uso</router-link>.</label>
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%">Registar como fornecedor</button>
            </form>
            <p class="text-center text-muted small">Já tens conta?  <router-link to="/login" class="float-right">Inicia sessão aqui!</router-link></p>
      </div>
      </div>


    </div>

    <the-footer/>

  </div>

  
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import registerPersonalInfo from '../components/registerPersonalInfo.vue';
import registerAddress from '../components/registerAddress.vue';
import registerTermsConditions from '../components/registerTermsConditions.vue';

export default {
  name: 'RegisterView',
  components: {
    TheNavbar,
    TheFooter,
    registerPersonalInfo,
    registerAddress,
    registerTermsConditions,
  },
};

</script>

<style scoped>
    .nav-link-active {
        color: white;
        background-color: #608072;
    }

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