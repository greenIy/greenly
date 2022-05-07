<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Moradas</h4>
        <hr>
        <i>Adicionar moradas dinamicamente com o componente address do bootsratp...</i>
        <br>
        <br>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                    <address>
                        <strong>Exemplo, Inc.</strong><br>
                        Avenida Homem Gaiola, Suite 900<br>
                        Carnide, Lisboa<br>
                        <abbr title="CP">Código Postal:</abbr> 2700-99
                    </address>
                    <address>
                        <strong>NIF</strong><br>
                        <a>967 712 361</a>
                        <div class="position-absolute bottom-0 end-0 p-2 pe-3">
                            <a data-bs-toggle="modal" data-bs-target="#editAddress"><font-awesome-icon style="color: black; cursor: pointer;" :icon="['fa', 'pen']" size=""/></a>&nbsp;
                            <a data-bs-toggle="modal" data-bs-target="#removeAddress"><font-awesome-icon style="color: black; cursor: pointer;" :icon="['fa', 'trash-can']" size=""/></a>
                        </div>
                    </address>              
            </div>
        </div>
        <br>

        <!-- Button trigger modal New Address -->
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newAddress">Adicionar morada &nbsp;<font-awesome-icon :icon="['fa', 'plus']" size=""/></button>
        
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
                        <country-select v-model="newAddressInfo.country" :country="country" topCountry="" :countryName="true" class="form-control" required/>
                    </div>
                    <div class="mb-3">
                        <label for="addressCity" class="form-label">Cidade <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="addressCity" v-model="newAddress.city" required>
                    </div>
                    <div class="mb-3">
                        <label for="addressStreet" class="form-label">Rua <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="addressStreet" v-model="newAddressInfo.street" required>
                    </div>
                    <div class="mb-3">
                        <label for="addressPostalCode" class="form-label">Código-postal <span style='color: #FF0000;'>*</span></label>
                        <input type="text" class="form-control" id="addressPostalCode" v-model="newAddressInfo.postalCode" required>
                    </div>
                    <div class="mb-3">
                        <label for="addressNIF" class="form-label">NIF <span style='color: #FF0000;'>*</span></label>
                        <input type="number" class="form-control" id="addressNIF" v-model="newAddressInfo.nif" required>
                    </div>

                     <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary" id="newAddressButton">Adicionar</button>
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
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Guardar alterações</button>
            </div>
            </div>
        </div>
        </div>

        <!-- Modal Edit Address -->
        <div class="modal fade" id="removeAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeAddressLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="removeAddressLabel">Remover morada</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Tem a certeza que pretende remover esta morada da sua conta?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger">Remover</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faPlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faTrashCan, faPen);

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
            }
        }
    },
    methods: {
        getUserInfo() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken){
                http.get(`/user/${userId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
                .then(response => {
                if (response.status == 200) {
                    this.user = response.data
                    return this.user
                }
                })  
            }
        },
        newAddress() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken){
                http.post(`/user/${userId}/addresses`, { headers: {"Authorization" : `Bearer ${accessToken}`} },
                JSON.stringify({
                    street: this.newAddressInfo.street,
                    city: this.newAddressInfo.street,
                    postal_code: this.newAddressInfo.postalCode,
                    country: this.newAddressInfo.country.toString(),
                    nif: this.newAddressInfo.nif,
                    }))
                .then(response => {
                if (response.status == 201) {
                    console.log("Success")
                } else {
                    console.log(response)
                }
                })  
            }
        },
    },
});

</script>

<style scoped>
    .modal-footer {
        border-width: 0;
    }
</style>