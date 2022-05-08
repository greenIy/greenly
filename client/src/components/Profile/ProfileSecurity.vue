<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Segurança</h4>
        <hr>
        <div class="row">
            <div class="col mb-3" style="max-width: 50%">
                <label for="inputOldPassword" class="form-label">Palavra-passe atual</label>
                <div class="input-group">
                <input :type="showPassword1 ? 'text' : 'password'" class="form-control" id="oldPassword" placeholder="Introduza palavra-passe" required>
                    <div class="input-group-append">
                        <span class="input-group-text" @click="showPassword1 = !showPassword1" style="height: 100%">
                                <font-awesome-icon :icon="showPassword1 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mb-3" style="max-width: 50%">
                <label for="inputNewPassword" class="form-label">Nova palavra-passe</label>
                <div class="input-group">
                <input :type="showPassword2 ? 'text' : 'password'" class="form-control" id="newPassword" placeholder="Introduza palavra-passe" required>
                    <div class="input-group-append">
                        <span class="input-group-text" @click="showPassword2 = !showPassword2" style="height: 100%">
                                <font-awesome-icon :icon="showPassword2 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="col mb-3" style="max-width: 50%">
                <label for="inputNewPasswordConfirm" class="form-label">Repetir nova palavra-passe</label>
                <div class="input-group">
                <input :type="showPassword3 ? 'text' : 'password'" class="form-control" id="newPasswordConfirm" placeholder="Introduza palavra-passe" required>
                    <div class="input-group-append">
                        <span class="input-group-text" @click="showPassword3 = !showPassword3" style="height: 100%">
                                <font-awesome-icon :icon="showPassword3 ? ['fa', 'eye-slash'] : ['fa', 'eye']" />
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <h4 style="color: red;">Apagar conta</h4>
        <hr>
        <a>Depois de apagar a sua conta, não há como voltar atrás.<br>Por favor tenha isso em consideração antes de tomar uma decisão.</a>
        <br>
        <br>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteAccount">Apagar conta</button>
        <!-- Modal -->
        <div class="modal fade" id="deleteAccount" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteAccountLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteAccountLabel">Apagar conta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Tem a certeza que deseja apagar a sua conta definitivamente?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger">Apagar</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faEyeSlash);

import http from "../../../http-common"


export default({
    name: 'ProfileSecurity',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: [],
            showPassword1: false,
            showPassword2: false,
            showPassword3: false,
        }
    },
    methods: {
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.$store.getters.getUser
        },
    },
});

</script>

<style scoped>
    
</style>