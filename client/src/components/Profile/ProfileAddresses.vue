<template>
    <div class="p-5">
        <h4>Moradas</h4>
        <hr>
        <i v-if="addressesLength() == 0">Parece que não tem nenhuma morada associada à sua conta.<br>Adicione uma clicando no botão abaixo.</i>
        <div v-else>
            <i>Pode adicionar mais do que uma morada à sua conta Greenly.</i>
            <br>
            <i>Deve definir uma morada de entrega &nbsp;<font-awesome-icon :icon="['fa', 'truck']" style="color: #E3C12B"/>&nbsp; 
            e uma morada de faturação &nbsp;<font-awesome-icon :icon="['fa', 'money-check-dollar']" style="color: #309C76"/>&nbsp;.</i>
        </div>
        <br>

        <!-- Button trigger modal New Address -->
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newAddress"><font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar morada</button>
        
        <br>
        <br>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="address in this.user.addresses" :key="address.nif" class="card" style="width: 300px; margin-right: 30px">
                <div class="card-body">
                        <address>
                            <div class="position-absolute top-0 end-0 p-2 pe-3">
                                <font-awesome-icon v-if="address.is_shipping === true" style="cursor: pointer; color: #E3C12B; margin-right: 5px" :icon="['fa', 'truck']" 
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Morada de entrega atual" v-on:click="addressAlreadySet('shipping')"/>
                                <font-awesome-icon v-else id="addressButtons" style="cursor: pointer; color: #A3A2A0; margin-right: 5px" :icon="['fa', 'truck']" 
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Definir como morada de entrega" v-on:click="selectAddress(address); setAsShippingAddress()"/>
                                <font-awesome-icon v-if="address.is_billing === true" style="cursor: pointer; color: #309C76" :icon="['fa', 'money-check-dollar']" size="lg" 
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Morada de faturação atual" v-on:click="addressAlreadySet('billing')"/>
                                <font-awesome-icon v-else id="addressButtons" style="cursor: pointer; color: #A3A2A0" :icon="['fa', 'money-check-dollar']" size="lg" 
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Definir como morada de faturação" v-on:click="selectAddress(address); setAsBillingAddress()"/>
                            </div>
                            <strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
                            {{ address.street }}<br>
                            {{ address.city }}, {{ address.country }}<br>
                            <abbr title="CP">Código Postal:</abbr> {{ address.postal_code }}
                        </address>
                        <address>
                            <strong>NIF</strong><br>
                            <a>{{ address.nif }}</a>
                            <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                                <a data-bs-toggle="modal" data-bs-target="#editAddressModal" v-on:click="selectAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa', 'pen']"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Editar morada"/></a>&nbsp;
                                <a data-bs-toggle="modal" data-bs-target="#removeAddress" v-on:click="selectAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa', 'trash-can']"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Remover morada"/></a>
                            </div>
                        </address>              
                </div>
            </div>
        </div>
        <br>
        
        <!-- Modal New Address -->
        <div class="modal fade" id="newAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newAddressLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="newAddressLabel">Adicionar morada</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="newAddress">
                    <div class="col mb-3">
                        <label for="selectCountry" class="form-label">País <span style='color: #FF0000;'>*</span></label>
                        <country-select class="form-control" id="newAddressCountry" v-model="newAddressInfo.country" :country="country" topCountry="" :countryName="true" required/>
                    </div>
                    <div class="col mb-3">
                        <label for="newAddressCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="newAddressCity" v-model="newAddressInfo.city" placeholder="Cidade" required>
                    </div>
                    <div class="col mb-3">
                        <label for="newAddressStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="newAddressStreet" v-model="newAddressInfo.street" placeholder="Rua" required>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="newAddressPostalCode" class="form-label">Código-postal <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newAddressPostalCode" v-model="newAddressInfo.postalCode" placeholder="Código Postal" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newAddressNIF" class="form-label">NIF <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newAddressNIF" v-model="newAddressInfo.nif" v-on:click="removeIsInvalid"  placeholder="NIF" required>
                            <div class="invalid-feedback" id="invalidFeedbackNewNIF">Deve conter exatamente 9 algarismos.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closeNewModalButton" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="removeIsInvalid"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="newAddressButton"><font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Edit Address -->
        <div class="modal fade" id="editAddressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editAddressLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
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
                        <button type="button" id="closeEditModalButton" class="btn btn-secondary" data-bs-dismiss="modal" v-on:click="removeIsInvalid"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        <button type="submit" class="btn btn-primary"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Remove Address -->
        <div class="modal fade" id="removeAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeAddressLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
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

        <div class="toast-container position-absolute top-0 end-0 p-3" style="margin-top: 120px;">
            <!-- Toast New Address -->
            <div class="toast align-items-center text-white bg-primary border-0" id="newAddressToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Adicionada!</strong> A sua morada foi adicionada com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        
            <!-- Toast Edit Address -->
            <div class="toast align-items-center text-white bg-primary border-0" id="editAddressToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Atualizada!</strong> A sua morada foi atualizada com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>

            <!-- Toast Set Shipping Address -->
            <div class="toast align-items-center text-white bg-primary border-0" id="setShippingAddressToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Definida!</strong> A sua morada de entrega foi definida com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>

            <!-- Toast Set Billing Address -->
            <div class="toast align-items-center text-white bg-primary border-0" id="setBillingAddressToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Definida!</strong> A sua morada de faturação foi definida com sucesso.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>

            <!-- Toast Shipping Already Set -->
            <div class="toast align-items-center text-white bg-primary border-0" id="shippingAlreadySetToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Oops!</strong> Esta morada já se encontra definida como a sua morada de entrega.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>

            <!-- Toast Billing Already Set -->
            <div class="toast align-items-center text-white bg-primary border-0" id="billingAlreadySetToast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                    <strong>Oops!</strong> Esta morada já se encontra definida como a sua morada de faturação.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>

            <!-- Toast Remove Address -->
            <div class="toast align-items-center text-white bg-primary border-0" id="removeAddressToast" role="alert" aria-live="assertive" aria-atomic="true">
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
import { faPlus, faXmark, faFloppyDisk, faTrashCan, faPen, faHouseChimney, faMoneyCheckDollar, faTruck } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faXmark, faFloppyDisk,faTrashCan, faPen, faHouseChimney, faMoneyCheckDollar, faTruck);

import http from "../../../http-common"
import AuthService from "../../router/auth"
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
            this.newAddressInfo.street = "";
            this.newAddressInfo.city = "";
            this.newAddressInfo.postalCode = "";
            document.getElementById("newAddressCountry").value = "";
            document.getElementById("newAddressCountry").placeholder = "Selecione país";
            this.newAddressInfo.nif = "";
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
        successfulSetShippingAddress() {
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("setShippingAddressToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();
        },
        successfulSetBillingAddress() {
            var animation = {animation: true, delay: 5000};
            var successToast = document.getElementById("setBillingAddressToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();
        },
        addressAlreadySet(addressType) {
            var animation = {animation: true, delay: 5000};
            if(addressType == "shipping") {
                var warnToast = document.getElementById("shippingAlreadySetToast");
                var warningToast = new Toast(warnToast, animation)
                warningToast.show();
            } else if (addressType == "billing") {
                var warnToast = document.getElementById("billingAlreadySetToast");
                var warningToast = new Toast(warnToast, animation)
                warningToast.show();
            }
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
            };
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
                            AuthService.getUser().then((result) => {
                                this.user.addresses = result.addresses;
                            })
                            this.successfulNewAddress()
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
            };
            var newCountry = document.getElementById("editAddressCountry").value
            var newCity = document.getElementById("editAddressCity").value
            var newStreet = document.getElementById("editAddressStreet").value
            var newPostalCode = document.getElementById("editAddressPostalCode").value
            var newNif = document.getElementById("editAddressNIF").value
            if (accessToken && userId) {
                http.put(`/user/${userId}/addresses/${addressId}`, 
                    JSON.stringify({
                            street: newStreet,
                            city: newCity,
                            country: newCountry,
                            postal_code: newPostalCode,
                            nif: Number(newNif)
                        }), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            this.selectedAddress.country = newCountry
                            this.selectedAddress.city = newCity
                            this.selectedAddress.street = newStreet
                            this.selectedAddress.postalCode = newPostalCode
                            this.selectedAddress.nif = newNif
                            this.successfulEditAddress()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials("edit", error.response.data.errors[0].param)) 
            }
        },
        setAsShippingAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            let addressId = this.selectedAddress.id
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            };
            if (accessToken && userId) {
                http.put(`/user/${userId}/addresses/${addressId}`, 
                    JSON.stringify({is_shipping: true}), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            AuthService.getUser().then((result) => {
                                this.user.addresses = result.addresses;
                            });
                            this.successfulSetShippingAddress()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials("edit", error.response.data)) 
            }
        },
        setAsBillingAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            let addressId = this.selectedAddress.id
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            };
            if (accessToken && userId) {
                http.put(`/user/${userId}/addresses/${addressId}`, 
                    JSON.stringify({is_billing: true}), headers)
                    .then((response) => {
                        if (response.status == 200) {
                            AuthService.getUser().then((result) => {
                                this.user.addresses = result.addresses;
                            })
                            this.successfulSetBillingAddress()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials("edit", error.response.data)) 
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
                            AuthService.getUser().then((result) => {
                                this.user.addresses = result.addresses;
                            });
                            this.successfulRemoveAddress()
                            console.log("Success!")
                        }
                    }).catch(error => this.wrongCredentials(error.response.data)) 
            }
        },
        removeIsInvalid() {
            document.getElementById("newAddressNIF").classList.remove("is-invalid");
            document.getElementById("editAddressNIF").classList.remove("is-invalid");
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
    #addressButtons {
        opacity: 0.6;
    }
    #addressButtons:hover {
        opacity: 1.0;
        transform: scale(1.05)
    }
    #newAddressToast, #editAddressToast,
    #setBillingAddressToast, #setShippingAddressToast,
    #removeAddressToast {
        background-color: #309C76 !important;
    }
     #billingAlreadySetToast, #shippingAlreadySetToast {
        background-color: #E3C12B !important;
     }
</style>