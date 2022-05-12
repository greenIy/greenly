<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Moradas</h4>
        <hr>
        <i>Pode adicionar mais do que uma morada à sua conta Greenly</i>
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
                                <a data-bs-toggle="modal" data-bs-target="#editAddress" v-on:click="selectAddress(address)"><font-awesome-icon style="cursor: pointer;" :icon="['fa', 'pen']" /></a>&nbsp;
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
                        <country-select class="form-control" id="newAddressCountry" v-model="newAddressInfo.country" :country="country" topCountry="" :countryName="true" required/>
                    </div>
                    <div class="col mb-3">
                        <label for="newAddressCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="newAddressCity" v-model="newAddressInfo.city" required>
                    </div>
                    <div class="col mb-3">
                        <label for="newAddressStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="newAddressStreet" v-model="newAddressInfo.street" required>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="newAddressPostalCode" class="form-label">Código-postal <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newAddressPostalCode" v-model="newAddressInfo.postalCode" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newAddressNIF" class="form-label">NIF <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newAddressNIF" v-model="newAddressInfo.nif" v-on:click="removeIsInvalid" required>
                            <div class="invalid-feedback" id="invalidFeedbackNIF">Deve conter exatamente 9 algarismos.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="newAddressButton"><font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Edit Address -->
        <div class="modal fade" id="editAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editAddressLabel" aria-hidden="true">
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
                        <country-select class="form-control" id="country" v-model="this.selectedAddress.country" :country="this.selectedAddress.country" topCountry="" :countryName="true" required/>
                    </div>
                    <div class="col mb-3">
                        <label for="addressCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="addressCity" v-model="this.selectedAddress.city" required>
                    </div>
                    <div class="col mb-3">
                        <label for="addressStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="addressStreet" v-model="this.selectedAddress.street" required>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="addressPostalCode" class="form-label">Código-postal <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="addressPostalCode" v-model="this.selectedAddress.postal_code" required>
                        </div>
                        <div class="col mb-3">
                            <label for="addressNIF" class="form-label">NIF <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="addressNIF" v-model="this.selectedAddress.nif" v-on:click="removeIsInvalid" required>
                            <div class="invalid-feedback" id="invalidFeedbackNIF">Deve conter exatamente 9 algarismos.</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar</button>
                        <button type="button" class="btn btn-primary"><font-awesome-icon :icon="['fa', 'floppy-disk']" /> &nbsp;Guardar alterações</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Delete Address -->
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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteAddress">Remover</button>
            </div>
            </div>
        </div>
        </div>

        <!-- Notification New Address -->
        <div class="alert alert-success alert-dismissible fade show" id="newAddressNotification" role="alert">
            <strong>Adicionada!</strong> A morada foi adicionada com sucesso ao seu perfil.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <!-- Notification Delete Address -->
        <div class="alert alert-success alert-dismissible fade show" id="deleteAddressNotification" role="alert">
            <strong>Removida!</strong> A morada foi removida com sucesso ao seu perfil.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    </div>
</template>

<script>

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
        selectAddress(address) {
            this.selectedAddress = address;
        },
        wrongCredentials(message) {
            console.log(message)
            if (message == "nif") {
                document.getElementById("newAddressNIF").classList.add("is-invalid");          
            }
        },
        successfulNewAddress() {
            document.getElementById("newAddressNotification").style.display = "block"
        },
        successfulDeleteAddress() {
            document.getElementById("deleteAddressNotification").style.display = "block"
        },
        newAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                this.newAddressInfo.country = document.getElementById("newAddressCountry").value;
                http.post(`/user/${userId}/addresses`,
                        JSON.stringify({
                            street: this.newAddressInfo.street,
                            city: this.newAddressInfo.city,
                            postal_code: this.newAddressInfo.postalCode,
                            country: this.newAddressInfo.country,
                            nif: this.newAddressInfo.nif,
                        }), headers)
                    .then((response) => {
                        if (response.status == 201) {
                            setTimeout(this.successfulNewAddress, 500)
                        }
                    }).catch(error => this.wrongCredentials(error.response.data.errors[0].param)) 
            }
        },
        deleteAddress() {
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
                            setTimeout(this.successfulDeleteAddress, 500)
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
    #newAddressNotification {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 30px;
        margin-top: 150px;
        display: none;
        width: 25%;
    }
    #deleteAddressNotification {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 30px;
        margin-top: 150px;
        display: none;
        width: 25%;
    }
</style>