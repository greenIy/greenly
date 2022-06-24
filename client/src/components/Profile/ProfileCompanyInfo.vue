<template>
    <div class="p-4">
        <h4>Empresa</h4>
        <hr>
        <form @submit.prevent="editCompany">
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyName" class="form-label">Nome da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="companyName" v-bind:value="company.name" placeholder="Nome" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyEmail" class="form-label">E-mail da empresa<span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="companyEmail" v-bind:value="company.email" placeholder="E-mail" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyBio" class="form-label">Descrição da empresa <span style='color: #FF0000;'>*</span></label>
                    <textarea type="text" rows="3" cols="50" class="form-control" id="companyBio" v-bind:value="company.bio" placeholder="Descrição" readonly required></textarea>
                </div>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary" id="editInfoButton" v-on:click="editCompanyInfo"><font-awesome-icon :icon="['fa', 'pen']" /> &nbsp;Editar</button>
                <button type="button" class="btn btn-secondary" style="display: none" id="cancelInfoButton" data-bs-toggle="modal" data-bs-target="#cancelCompanyInfo"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                <button type="submit" class="btn btn-primary" style="display: none" id="saveInfoButton"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
            </div>
        </form>

        <!-- Modal Cancel Company Info -->
        <div class="modal fade" id="cancelCompanyInfo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cancelCompanyInfoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cancelCompanyInfoLabel">Atenção!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Tem a certeza que deseja cancelar? Todas as alterações serão perdidas.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                <button type="button" class="btn btn-danger" v-on:click="cancelCompanyInfo" data-bs-dismiss="modal">Sim</button>
            </div>
            </div>
        </div>        
        </div>

       <!-- Toast Edit Company Info -->
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <div class="toast align-items-center text-white bg-primary border-0" id="successToast" role="alert" aria-live="polite" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Atualizada!</strong> A sua empresa foi autalizada com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Toast } from '../../main'
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen, faFloppyDisk, faXmark);

import http from "../../../http-common"
import AuthService from "../../router/auth"

export default({
    name: 'ProfileCompanyInfo',
    mounted() {
        this.getCompanyInfo();
    },
    data() {
        return {
            company: {},
        }
    },
    methods: {
        getCompanyInfo() {
            this.company = this.$store.getters.getUser.company
            return this.company
        },
        editCompanyInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block"
            document.getElementById("saveInfoButton").style.display = "block"

            document.getElementById("companyName").readOnly = false
            document.getElementById("companyEmail").readOnly = false
            document.getElementById("companyBio").readOnly = false
        },
        cancelCompanyInfo() {
            document.getElementById("cancelInfoButton").style.display = "none"
            document.getElementById("saveInfoButton").style.display = "none"
            document.getElementById("editInfoButton").style.display = "block";

            document.getElementById("companyName").readOnly = true
            document.getElementById("companyEmail").readOnly = true
            document.getElementById("companyBio").readOnly = true

            AuthService.getUser().then((result) => {
                document.getElementById("companyName").value = result.company.name;
                document.getElementById("companyEmail").value = result.company.email;
                document.getElementById("companyBio").value = result.company.bio;
            })
        },
        saveCompanyInfo() {
            this.cancelCompanyInfo()
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("successToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();

        },
        editCompany() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            var newCompanyName = document.getElementById("companyName").value
            var newCompanyEmail = document.getElementById("companyEmail").value
            var newCompanyBio = document.getElementById("companyBio").value
            if (accessToken && userId){
                if (newCompanyEmail === this.company.email) {
                    http.put(`/user/${userId}`,
                        JSON.stringify({
                            company: {
                                name: newCompanyName,
                                bio: newCompanyBio,
                            }
                            }), headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.newCompanyName = newCompanyName;
                                this.newCompanyBio = newCompanyBio;
                                this.saveCompanyInfo()
                            }
                        }).catch((error) => {
                            console.log(error);
                            console.log("Failure!");
                        })
                } else {
                    http.put(`/user/${userId}`,
                        JSON.stringify({
                            company: {
                                name: newCompanyName,
                                email: newCompanyEmail,
                                bio: newCompanyBio,
                            }
                            }), headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.newCompanyName = newCompanyName;
                                this.companyEmail = newCompanyEmail;
                                this.newCompanyBio = newCompanyBio;
                                this.saveCompanyInfo()
                            }
                        }).catch((error) => {
                            console.log(error);
                            console.log("Failure!");
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
    #successToast {
        background-color: #5E9F88 !important;
    }
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
</style>