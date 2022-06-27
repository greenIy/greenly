<template>
    <div class="p-4">
        <h4>Informações Pessoais</h4>
        <hr>
        <i>As suas informações pessoais não são publicas aos restantes consumidores da plataforma Greenly.<br>Apenas
           os admistradores, fornecedores e transportadores que estiveram e/ou estarão envolivdos num processo de entrega de umas das suas
           encomendas têm também acesso a estas informações.
        </i>
        <br>
        <br>
        <form @submit.prevent="editProfile">
            <div class="row g-4">
                <div class="col-md-6 w-50">
                    <label for="inputFirstName" class="form-label">Nome <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="firstName" v-bind:value="user.first_name" placeholder="Nome" readonly required>
                </div>
                <div class="col-md-6 mb-3 w-50">
                    <label for="inputLastName" class="form-label">Apelido <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="lastName" v-bind:value="user.last_name" placeholder="Apelido" readonly required>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-12 mb-3 w-50">
                    <label for="inputEmail" class="form-label">E-mail <span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="email" v-bind:value="user.email" placeholder="E-mail" readonly v-on:click="removeIsInvalid" required>
                    <div class="invalid-feedback" id="invalidEmail">Email já em uso.</div>
                </div>
                <div class="col-md-6 mb-3 w-50">
                    <label for="inputPhoneNumber" class="form-label">Telemóvel <span style='color: #FF0000;'>*</span></label>
                    <input type="number" class="form-control" id="phoneNumber" v-bind:value="user.phone" placeholder="Telemóvel" readonly required>
                </div>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button type="button" class="btn btn-primary" id="editInfoButton" v-on:click="editUserInfo"><font-awesome-icon :icon="['fa', 'pen']" /> &nbsp;Editar</button>
                <button type="button" class="btn btn-secondary" style="display: none" id="cancelInfoButton" data-bs-toggle="modal" data-bs-target="#cancelUserInfo"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                <button type="submit" class="btn btn-primary" style="display: none" id="saveInfoButton"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
            </div>
        </form>

        <!-- Modal Cancel User Info -->
        <div class="modal fade" id="cancelUserInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cancelUserInfoLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cancelUserInfoLabel">Atenção!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Tem a certeza que deseja cancelar? Todas as alterações serão perdidas.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                <button type="button" class="btn btn-danger" v-on:click="cancelUserInfo" data-bs-dismiss="modal">Sim</button>
            </div>
            </div>
        </div>        
        </div>

    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faPen, faFloppyDisk, faXmark);

import http from "../../../http-common"
import AuthService from "../../router/auth"

export default({
    name: 'ProfilePersonalInfo',
    mounted() {
        this.getUserInfo();
    },
    data() {
        const toast = useToast()
        return {
            toast,
            user: {},
        }
    }, 
    created() {
        this.changeTitle();
    },
    methods: {
         changeTitle(){
            window.document.title = "Greenly | Informações Pessoais";
    },
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        editUserInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block"
            document.getElementById("saveInfoButton").style.display = "block"

            document.getElementById("firstName").readOnly = false
            document.getElementById("lastName").readOnly = false
            document.getElementById("email").readOnly = false
            document.getElementById("phoneNumber").readOnly = false
        },
        cancelUserInfo() {
            document.getElementById("cancelInfoButton").style.display = "none"
            document.getElementById("saveInfoButton").style.display = "none"
            document.getElementById("editInfoButton").style.display = "block";

            document.getElementById("firstName").readOnly = true
            document.getElementById("lastName").readOnly = true
            document.getElementById("email").readOnly = true
            document.getElementById("phoneNumber").readOnly = true
            
            AuthService.getUser().then((result) => {
                document.getElementById("firstName").value = result.first_name;
                document.getElementById("lastName").value = result.last_name;
                document.getElementById("email").value = result.email;
                document.getElementById("phoneNumber").value = result.phone;
            })
            this.removeIsInvalid()

        },
        wrongCredentials(message) {
            if (message == "E-mail already in use.") {
                document.getElementById("email").classList.add("is-invalid")
            }
        },
        saveUserInfo() {
            this.cancelUserInfo()
            this.toast.success("Atualizado! O seu perfil foi atualizado com sucesso.", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });

        },
        editProfile() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            var newFirstName = document.getElementById("firstName").value
            var newLastName = document.getElementById("lastName").value
            var newEmail = document.getElementById("email").value
            var newPhone = document.getElementById("phoneNumber").value
            if (accessToken && userId){
                if (newEmail === this.user.email) {
                    http.put(`/user/${userId}`,
                    JSON.stringify({
                            first_name: newFirstName,
                            last_name: newLastName,
                            phone: newPhone.toString(),
                        }), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            this.user.first_name = newFirstName;
                            this.user.last_name = newLastName;
                            this.user.phone = newPhone;
                            this.saveUserInfo()
                        }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
                } else {
                    http.put(`/user/${userId}`,
                    JSON.stringify({
                            first_name: newFirstName,
                            last_name: newLastName,
                            email: newEmail,
                            phone: newPhone.toString(),
                        }), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            this.user.first_name = newFirstName;
                            this.user.last_name = newLastName;
                            this.user.email = newEmail
                            this.user.phone = newPhone;
                            this.saveUserInfo()
                        }
                    }).catch((error) => {
                        this.wrongCredentials(error.response.data.errors[0].msg);
                        console.log("Failure!")
                    })
                }
            }
        },
        removeIsInvalid() {
            document.getElementById("email").classList.remove("is-invalid");
        }
    },
});

</script>

<style scoped>
    .btn-primary{
        background-color: #5E9F88;
        border-color: white;
    }
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
</style>