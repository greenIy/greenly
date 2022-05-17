<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Moradas</h4>
        <hr>
        <i v-if="addressesLength() == 0">Parece que não tem nenhuma morada associada à sua conta.<br>Adicione uma clicando no botão abaixo.</i>
        <i v-else>Pode adicionar mais do que uma morada à sua conta Greenly</i>
        <br>
        <br>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="address in this.user.addresses" :key="address.nif" class="card" style="width: 300px; margin-right: 30px">
                <div class="card-body">
                        <address>
                            <strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
                            {{ address.street }}<br>
                            {{ address.city }}, {{ address.country }}<br>
                            <abbr title="CP">Código Postal:</abbr> {{ address.postal_code }}
                        </address>
                        <address>
                            <strong>NIF</strong><br>
                            <a>{{ address.nif }}</a>
                            <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                                <a data-bs-toggle="modal" data-bs-target="#editAddressModal" v-on:click="selectAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa', 'pen']" /></a>&nbsp;
                                <a data-bs-toggle="modal" data-bs-target="#removeAddress" v-on:click="selectAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa', 'trash-can']" /></a>
                            </div>
                        </address>              
                </div>
            </div>
        </div>
        <br>

        <!-- Button trigger modal New Address -->
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newAddress"><font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar morada</button>
        
        <!-- Modal New Address -->
        <div class="modal fade" id="newAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newAddressLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="newAddressLabel">Adicionar morada</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="newAddress">
                    <div class="col mb-3">
                        <label for="selectCountry" class="form-label">País <span style='color: #FF0000;'>*</span></label>
                        <country-select class="form-control" id="newAddressCountry" v-bind:value="newAddressInfo.country" :country="country" topCountry="" :countryName="true" required/>
                    </div>
                    <div class="col mb-3">
                        <label for="newAddressCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="newAddressCity" v-bind:value="newAddressInfo.city" required>
                    </div>
                    <div class="col mb-3">
                        <label for="newAddressStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="newAddressStreet" v-bind:value="newAddressInfo.street" required>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="newAddressPostalCode" class="form-label">Código-postal <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newAddressPostalCode" v-bind:value="newAddressInfo.postalCode" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newAddressNIF" class="form-label">NIF <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newAddressNIF" v-bind:value="newAddressInfo.nif" v-on:click="removeIsInvalid" required>
                            <div class="invalid-feedback" id="invalidFeedbackNewNIF">Deve conter exatamente 9 algarismos.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeNewModalButton" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="newAddressButton"><font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Edit Address -->
        <div class="modal fade" id="editAddressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editAddressLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editAddressLabel">Editar morada</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="editAddress">
                    <div class="col mb-3">
                        <label for="selectCountry" class="form-label">País <span style='color: #FF0000;'>*</span></label>
                        <country-select class="form-control" id="editAddressCountry" v-bind:value="this.selectedAddress.country" :country="this.selectedAddress.country" topCountry="" :countryName="true" required/>
                    </div>
                    <div class="col mb-3">
                        <label for="addressCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="editAddressCity" v-bind:value="this.selectedAddress.city" required>
                    </div>
                    <div class="col mb-3">
                        <label for="addressStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="editAddressStreet" v-bind:value="this.selectedAddress.street" required>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="addressPostalCode" class="form-label">Código-postal <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="editAddressPostalCode" v-bind:value="this.selectedAddress.postal_code" required>
                        </div>
                        <div class="col mb-3">
                            <label for="addressNIF" class="form-label">NIF <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="editAddressNIF" v-bind:value="this.selectedAddress.nif" v-on:click="removeIsInvalid" required>
                            <div class="invalid-feedback" id="invalidFeedbackEditNIF">Deve conter exatamente 9 algarismos.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeEditModalButton" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        <button type="submit" class="btn btn-primary"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Remove Address -->
        <div class="modal fade" id="removeAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeAddressLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="removeAddressLabel">Atenção!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Tem a certeza que deseja remover esta morada do seu perfil?
            </div>
            <div class="modal-footer">
                <button type="button" id="closeRemoveModalButton" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" v-on:click="removeAddress">Remover</button>
            </div>
            </div>
        </div>
        </div>

        <!-- Toast New Address -->
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <div class="toast align-items-center text-white bg-primary border-0" id="newAddressToast" role="alert" aria-live="polite" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Adicionada!</strong> A sua morada foi adicionada com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Toast Edit Address -->
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <div class="toast align-items-center text-white bg-primary border-0" id="editAddressToast" role="alert" aria-live="polite" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Atualizada!</strong> A sua morada foi atualizada com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Toast Remove Address -->
        <div class="toast-container position-absolute top-0 end-0 p-3">
            <div class="toast align-items-center text-white bg-primary border-0" id="removeAddressToast" role="alert" aria-live="polite" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Removida!</strong> A sua morada foi removida com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>

        

    </div>
</template>

<script>
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faXmark, faFloppyDisk, faTrashCan, faPen, faHouseChimney } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faXmark, faFloppyDisk,faTrashCan, faPen, faHouseChimney);

import http from "../../../http-common"
import countrySelect from '@/components/Profile/country-select'


export default({
    name: 'ProfileAddresses',
    components: {
        countrySelect,
    },
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: [],
            newAddressInfo: {
                country: '',
                city: '',
                street: '',
                postalCode: '',
                nif: '',
            },
            selectedAddress: '',
        }
    },
    methods: {
        getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.$store.getters.getUser
        },
        addressesLength() {
            var user = this.getUserInfo()
            var size = Object.keys(user.addresses).length;
            return size
        },
        selectAddress(address) {
            this.selectedAddress = address;
        },
        wrongCredentials(action, param) {
            if (action == "new" && param == "nif") {
                document.getElementById("newAddressNIF").classList.add("is-invalid");          
            }
            else if (action == "edit" && param == "nif") {
                document.getElementById("editAddressNIF").classList.add("is-invalid");          
            }
        },
        successfulNewAddress() {
            var closeEditModal = document.getElementById("closeNewModalButton");
            closeEditModal.click()
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("newAddressToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();
        },
        successfulEditAddress() {
            var closeEditModal = document.getElementById("closeEditModalButton");
            closeEditModal.click()
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("editAddressToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();
        },
        successfulRemoveAddress() {
            var closeEditModal = document.getElementById("closeRemoveModalButton");
            closeEditModal.click()
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("removeAddressToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();
        },
        newAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            this.newAddressInfo.country = document.getElementById("newAddressCountry").value
            this.newAddressInfo.city = document.getElementById("newAddressCity").value
            this.newAddressInfo.street = document.getElementById("newAddressStreet").value
            this.newAddressInfo.postalCode = document.getElementById("newAddressPostalCode").value
            this.newAddressInfo.nif = document.getElementById("newAddressNIF").value
            if (accessToken && userId) {
                this.newAddressInfo.country = document.getElementById("newAddressCountry").value;
                http.post(`/user/${userId}/addresses`,
                        JSON.stringify({
                            street: this.newAddressInfo.street,
                            city: this.newAddressInfo.city,
                            postal_code: this.newAddressInfo.postalCode,
                            country: this.newAddressInfo.country,
                            nif: Number(this.newAddressInfo.nif),
                        }), headers)
                    .then((response) => {
                        if (response.status == 201) {
                            this.successfulNewAddress()
                            this.getUserInfo()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials("new", error.response.data.errors[0].param)) 
            }
        },
        editAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            let addressId = this.selectedAddress.id
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            this.selectedAddress.country = document.getElementById("editAddressCountry").value
            this.selectedAddress.city = document.getElementById("editAddressCity").value
            this.selectedAddress.street = document.getElementById("editAddressStreet").value
            this.selectedAddress.postalCode = document.getElementById("editAddressPostalCode").value
            this.selectedAddress.nif = document.getElementById("editAddressNIF").value
            if (accessToken && userId) {
                this.selectedAddress.country = document.getElementById("editAddressCountry").value;
                http.put(`/user/${userId}/addresses/${addressId}`, 
                    JSON.stringify({
                            street: this.selectedAddress.street,
                            city: this.selectedAddress.city,
                            country: this.selectedAddress.country,
                            postal_code: this.selectedAddress.postal_code,
                            nif: Number(this.selectedAddress.nif)
                        }), headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.successfulEditAddress()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials("edit", error.response.data.errors[0].param)) 
            }
        },
        removeAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            let addressId = this.selectedAddress.id
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/user/${userId}/addresses/${addressId}`, headers)
                    .then((response) => {
                        if (response.status == 202) {
                            this.successfulRemoveAddress()
                            this.getUserInfo()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials(error.response.data)) 
            }
        },
        removeIsInvalid() {
            document.getElementById("newAddressNIF").classList.remove("is-invalid");
        }
    },
});

</script>

<style scoped>
    .btn-primary{
        background-color: #309C76;
        border-color: white;
    }
    .modal-footer {
        border-width: 0;
    }
    #newAddressToast, #editAddressToast,
    #removeAddressToast {
        margin-top: 120px;
        background-color: #309C76 !important;
    }
</style>