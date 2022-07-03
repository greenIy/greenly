<template>
    <!-- Remove category modal -->
    <div class="modal fade" id="category-removal" aria-hidden="true" aria-labelledby="category-removal" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="category-removal">Atenção!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                     Tem a certeza que deseja remover a categoria {{ this.currentCategoryName }}? Esta ação é irreversível.
                </div>
                <div class="modal-footer">
                    <button class="btn bg-226d53 text-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                    <button v-on:click="removeCategory" class="btn bg-danger text-light btn-sm" data-bs-dismiss="modal">Remover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";

import http from "../../../../http-common";

export default {
    name: 'TheCategoryRemoval',
    components: {},
    data() {
        const toast = useToast();

        return {
            toast
        }
    },
    props: [
        'currentCategoryName',
        'currentCategoryId'
    ],
    methods: {
        removeCategory() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));

             const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

            http.delete(`/store/categories/${this.currentCategoryId}`, headers)
                        .then((response) => {
                            if (response.status == 202) {
                                this.successNotification('A categoria foi removida com sucesso.');
                            }
                        }).catch((error) => {
                            if (error.response.status == 409) {
                                this.errorNotification('A categoria não pode ser removida: categorias e/ou produtos associados.');
                            }
                        })

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
        },
        errorNotification(msg) {
            this.toast.error(msg, {
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
    }
}
</script>

<style scoped>
form {
    padding: 4.8em;
}

.bg-5e9f88{
        background-color: #5E9F88!important;
    }

.bg-226d53 {
    background-color: #226d53;
  }
</style>