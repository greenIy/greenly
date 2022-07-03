<template>
    <!-- Remove user modal -->
    <div class="modal fade" id="user-removal" aria-hidden="true" aria-labelledby="user-removal" tabindex="-1"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="user-removal">Atenção!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                     Tem a certeza que deseja remover o utilizador {{ this.currentUser.first_name }}? Esta ação é irreversível.
                </div>
                <div class="modal-footer">
                    <button class="btn bg-226d53 text-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                    <button v-on:click="removeUser" class="btn bg-danger text-light btn-sm" data-bs-dismiss="modal">Remover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";

import http from "../../../../http-common";

export default {
    name: 'TheUserRemoval',
    data() {
        const toast = useToast();

        return {
            toast
        }
    },
    props: [
        'currentUser'
    ],
    methods: {
        removeUser() {
             let accessToken = JSON.parse(localStorage.getItem('accessToken'));

             const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

            http.delete(`/user/${this.currentUser.id}`, headers)
                        .then((response) => {
                            console.log(this.currentUser.id);
                            console.log(response);
                            if (response.status == 202) {
                                this.successNotification('O utilizador foi removido com sucesso.');
                            }
                        }).catch((error) => {
                            //O utilizador não pode ser removido: encomendas, moradas e/ou empresa associados.
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
        }
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

.modal-footer {
    justify-content: center;
}
</style>