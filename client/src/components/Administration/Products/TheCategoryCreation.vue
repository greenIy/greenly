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
                </div>

                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";

import http from "../../../../http-common";

export default {
    name: 'TheCategoryCreation',
    data(){
        const toast = useToast();

        return {
            toast,
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
                        this.successNotification('A nova categoria foi criada com sucesso.')

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
                        this.successNotification('A nova categoria foi criada com sucesso.')

                        this.registerInfo.name = '';
                    }
                })
                .catch(error => console.log(error.response.data.errors[0]));
            }
        },
        successNotification(msg){
        this.toast.success(msg, {
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
