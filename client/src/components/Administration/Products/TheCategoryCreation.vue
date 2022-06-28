<template>
    <div class="modal fade" id="category-creation" aria-hidden="true" aria-labelledby="category-creation"
        tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="category-creation">Registo de nova categoria</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="register">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="inputName" class="form-label">Nome <span
                                        style='color: #FF0000;'>*</span></label>
                                <input type="name" class="form-control" id="name" v-model="registerInfo.name"
                                    placeholder="Nome" required>
                            </div>
                            <div class="col-md-6">
                                <label for="inputParentCategory" class="form-label">Categoria mãe</label>
                                <select id="parentCategory" name="parentCategory" class="form-control" v-model="registerInfo.parentCategory">
                                    <option class="text-secondary" value="0">Nenhuma</option>
                                    <option v-for="category in this.categories" :key="category" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                            <button type="submit" class="btn bg-5e9f88 text-light" id="registerButton">Registar</button>
                        </div>
                    </form>

                    <!-- Toast Edit User Info -->
                    <div class="toast-container position-absolute top-0 end-0 p-3">
                        <div class="toast align-items-center text-white bg-primary border-0" id="successToast"
                            role="alert" aria-live="polite" aria-atomic="true">
                            <div class="d-flex">
                                <div class="toast-body">
                                    <strong>Registada!</strong> A nova categoria foi
                                    criada com sucesso.
                                </div>
                                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                    data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from '../../../main';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faLeaf } from '@fortawesome/free-solid-svg-icons';
library.add(faEye, faEyeSlash, faLeaf);

import http from "../../../../http-common";

export default {
    name: 'TheAdminRegistration',
    data(){
        return {
            registerInfo: {
                name: '',
                parentCategory: 0
            }
        }
    },
    props: [
        'categories'
    ],
    methods: {
        register() {
            
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            if(this.registerInfo.parentCategory > 0) {
                http.post("/store/categories", JSON.stringify({
                    name: this.registerInfo.name,
                    parent_category: this.registerInfo.parentCategory}), 
                    { headers: {"Authorization" : `Bearer ${accessToken}`}}).then((response) => {
                    if (response.status == 200) {
                        let animation = {
                            animation: true,
                            delay: 5000
                        };
                        let successToast = document.getElementById("successToast");
                        let successfulToast = new Toast(successToast, animation)
                        successfulToast.show();
                        
                        console.log("CRIADA:");
                        console.log(this.registerInfo.name);
                        console.log(this.registerInfo.parentCategory);

                        this.registerInfo.name = '';
                        this.registerInfo.parentCategory = 0;  
                    }
                })
                .catch(error => console.log("FAILURE!"));
            } else {
                http.post("/store/categories", JSON.stringify({
                    name: this.registerInfo.name}), 
                    { headers: {"Authorization" : `Bearer ${accessToken}`}}).then((response) => {
                    if (response.status == 200) {
                        let animation = {
                            animation: true,
                            delay: 5000
                        };
                        let successToast = document.getElementById("successToast");
                        let successfulToast = new Toast(successToast, animation)
                        successfulToast.show();

                        this.registerInfo.name = '';
                    }
                })
                .catch(error => console.log(error.response.data.errors[0]));
            }
        }
    }
}
</script>

<style scoped>
form {
    padding: 4.8em;
}

.form-control {
    appearance: auto!important;
}
#successToast,
.bg-5e9f88{
        background-color: #5E9F88!important;
    }

</style>
