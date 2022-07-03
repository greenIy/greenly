<template>
    <div class="modal fade" id="product-creation" aria-hidden="true" aria-labelledby="product-creation"
        tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="product-creation">Registo de novo produto</h5>
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
                                <label for="inputCategory" class="form-label">Categoria <span
                                        style='color: #FF0000;'>*</span></label>
                                <select id="inputCategory" name="inputCategory" class="form-control" v-model="registerInfo.category" required>
                                    <option v-for="category in this.categories" :key="category" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <label for="inputComplement" class="form-label">Complemento</label>
                                <input type="text" class="form-control" id="inputComplement" v-model="registerInfo.complement"
                                    placeholder="Complemento">
                            </div>

                            <div class="col-md-6">
                                <label for="inputAmountComplement" class="form-label">Quantidade</label>
                                <input type="number" min="0" class="form-control" id="inputAmountComplement" v-model="registerInfo.amountComplement">
                            </div>

                            <div class="col-md-12">
                                <label for="inputDescription" class="form-label">Descrição <span
                                        style='color: #FF0000;'>*</span></label>
                                <textarea class="form-control" id="inputDescription" v-model="registerInfo.description"
                                    placeholder="Descrição" required> </textarea>
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
    import {
        useToast
    } from "vue-toastification";

    import http from "../../../../http-common";

    export default {
        name: 'TheProductCreation',
        data() {
            const toast = useToast();

            return {
                toast,
                registerInfo: {
                    name: '',
                    category: 0,
                    complement: '',
                    amountComplement: 0,
                    description: ''
                }
            }
        },
        props: [
            'categories'
        ],
        methods: {
            register() {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));

                console.log(JSON.stringify({
                            name: this.registerInfo.name,
                            description: this.registerInfo.description,
                            category: this.registerInfo.category,
                            complement_name: this.registerInfo.complement,
                            complement_quantity: this.registerInfo.amountComplement
                        }));

                if (this.registerInfo.complement.length > 0 && this.registerInfo.amountComplement > 0) {
                    http.post("/store/products", JSON.stringify({
                            name: this.registerInfo.name,
                            description: this.registerInfo.description,
                            category: this.registerInfo.category,
                            complement_name: this.registerInfo.complement,
                            complement_quantity: this.registerInfo.amountComplement
                        }), {
                            headers: {
                                "Authorization": `Bearer ${accessToken}`
                            }
                        }).then((response) => {
                            if (response.status == 201) {
                                this.successNotification('O novo produto foi criado com sucesso.')

                                this.registerInfo.name = '';
                                this.registerInfo.category = 0;
                                this.registerInfo.complement = '';
                                this.registerInfo.amountComplement = 0;
                                this.registerInfo.description = '';
                            }
                        })
                        .catch(error => console.log(error));
                } else {
                    http.post("/store/products", JSON.stringify({
                            name: this.registerInfo.name,
                            description: this.registerInfo.description,
                            category: this.registerInfo.category
                        }), {
                            headers: {
                                "Authorization": `Bearer ${accessToken}`
                            }
                        }).then((response) => {
                            if (response.status == 201) {
                                this.successNotification('O novo produto foi criado com sucesso.')

                                this.registerInfo.name = '';
                                this.registerInfo.category = 0;
                                this.registerInfo.description = '';
                            }
                        })
                        .catch(error => console.log(error));
                }
            },
            successNotification(msg) {
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
