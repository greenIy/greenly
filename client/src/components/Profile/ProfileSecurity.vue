<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h3>Segurança</h3>
        <hr>
        <div class="row">
            <div class="col mb-3">
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
            <div class="col mb-3">
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
            <div class="col mb-3">
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
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken){
                http.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
                .then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    return this.user
                }
                })  
            }
        },
    },
});

</script>

<style scoped>
    
</style>