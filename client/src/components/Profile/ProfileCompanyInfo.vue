<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Empresa {{user.company}}</h4>
        <hr>
        <form @submit.prevent="editCompany">
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyName" class="form-label">Nome da empresa <span style='color: #FF0000;'>*</span></label>
                    <input type="name" class="form-control" id="companyName" v-bind:value="user.company" placeholder="Nome" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputCompanyEmail" class="form-label">E-mail da empresa<span style='color: #FF0000;'>*</span></label>
                    <input type="email" class="form-control" id="companyEmail" v-model="user.company" placeholder="E-mail" readonly required>
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <label for="inputcompanyDescription" class="form-label">Descrição da empresa <span style='color: #FF0000;'>*</span></label>
                    <textarea type="text" rows="3" cols="50" class="form-control" id="companyDescription" v-model="user.company" placeholder="E-mail" readonly required></textarea>
                </div>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary" id="editInfoButton" v-on:click="editCompanyInfo"><font-awesome-icon :icon="['fa', 'pen']" /> &nbsp;Editar</button>
                <button type="button" class="btn btn-secondary" style="display: none" id="cancelInfoButton" data-bs-toggle="modal" data-bs-target="#cancelCompanyInfo"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                <button type="submit" class="btn btn-primary" style="display: none" id="saveInfoButton" v-on:click="editCompany"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
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

        <!-- Notification Company Edited -->
        <div class="alert alert-success alert-dismissible fade show" id="successNotification" role="alert">
            <strong>Atualizado!</strong> O seu perfil foi atualizado com sucesso.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen, faFloppyDisk, faXmark);

import http from "../../../http-common"

export default({
    name: 'ProfileCompanyInfo',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: {},
        }
    },
    methods: {
        getUserInfo() {
            this.user = this.$store.getters.getUser
            console.log(this.user)
            return this.user
        },
        cloneUser(user) {
            return JSON.parse(JSON.stringify(user))
        },
        editCompanyInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block"
            document.getElementById("saveInfoButton").style.display = "block"

            document.getElementById("companyName").readOnly = false
            document.getElementById("companyEmail").readOnly = false
            document.getElementById("companyDescription").readOnly = false
        },
        cancelCompanyInfo() {
            document.getElementById("cancelInfoButton").style.display = "none"
            document.getElementById("saveInfoButton").style.display = "none"
            document.getElementById("editInfoButton").style.display = "block";

            document.getElementById("companyName").readOnly = true
            document.getElementById("companyEmail").readOnly = true
            document.getElementById("companyDescription").readOnly = true
        },
        saveCompanyInfo() {
            this.cancelCompanyInfo()
            document.getElementById("successNotification").style.display = "block"

        },
        editCompany() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
            http.put(`/user/${userId}`,
                    JSON.stringify({
                            name: this.user.first_name,
                            bio: this.user.last_name,
                            email: this.user.phone,
                        }), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            setTimeout(this.saveCompanyInfo, 500)
                        }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        }
    },
});

</script>

<style scoped>
    .btn-primary{
        background-color: #309C76;
        border-color: white;
    }
    #successNotification {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 30px;
        margin-top: 150px;
        display: none;
        width: 25%;
    }
</style>