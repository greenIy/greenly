<template>
    <!-- Remove product modal -->
    <div class="modal fade" id="product-removal" aria-hidden="true" aria-labelledby="product-removal" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="product-removal">Atenção!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                     Tem a certeza que deseja remover o produto {{ this.currentProductName }}? Esta ação é irreversível.
                </div>
                <div class="modal-footer">
                    <button class="btn bg-226d53 text-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                    <button v-on:click="removeProduct" class="btn bg-danger text-light btn-sm" data-bs-dismiss="modal">Remover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";

import http from "../../../../http-common";

export default {
    name: 'TheProductRemoval',
    components: {},
    data() {
        const toast = useToast();

        return {
            toast
        }
    },
    props: [
        'currentProductName',
        'currentProductId'
    ],
    methods: {
        removeProduct() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));

             const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

            http.delete(`/store/products/${this.currentProductId}`, headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.successNotification('O produto foi removido com sucesso.');
                            }
                        }).catch((error) => {
                            console.log(error.response.data);
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