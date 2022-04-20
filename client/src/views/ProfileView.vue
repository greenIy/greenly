<template>
    <div class="page-container">
        <div class="content-wrap">
        <the-navbar/>

        
        <div class="container">
            <div class="row">
                    <div class="col-12">
                        <form>
                            <div class="row mb-5 gx-5">
                                <div class="col-xxl-4">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <img src="../assets/temporaryUser.png" style="width: 70%;">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-8 mb-5 mb-xxl-0">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="mb-4 mt-0">Informações Pessoais</h4>
                                            <div class="col-md-6">
                                                <label for="inputFirstName" class="form-label">Nome</label>
                                                <input type="name" class="form-control" id="firstName" :value="user.first_name" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputLastName" class="form-label">Apelido</label>
                                                <input type="name" class="form-control" id="lastName" :value="user.last_name" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputEmail" class="form-label">E-mail</label>
                                                <input type="email" class="form-control" id="email" readonly :value="user.email" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputPhoneNumber" class="form-label">Telemóvel</label>
                                                <input type="number" class="form-control" id="phoneNumber" :value="user.last_name" placeholder="Introduza telemóvel" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-5 gx-5">
                                <div class="col-xxl-6 mb-5 mb-xxl-0">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="mb-4 mt-0">Morada</h4>
                                            <div class="col-md-6">
                                                <label for="selectCountry" class="form-label">País</label>
                                                <country-select v-model="country" :country="country" topCountry="" :countryName="true" class="form-control"/>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="selectCity" class="form-label">Cidade</label>
                                                <region-select v-model="region" :country="country" :region="region" :countryName="true" :regionName="true" class="form-control"/>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputStreet" class="form-label">Rua</label>
                                                <input type="name" class="form-control" id="street" placeholder="Introduza rua" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="postalCode" class="form-label">Código Postal</label>
                                                <input type="number" class="form-control" id="postalCode" placeholder="Introduza código postal" required>
                                            </div>
                                        </div> <!-- Row END -->
                                    </div>
                                </div>

                                <!-- change password -->
                                <div class="col-xxl-6">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="my-4">Mudar palavra-passe</h4>
                                            <!-- Old password -->
                                            <div class="col-md-6">
                                                <label for="exampleInputPassword1" class="form-label">Old password *</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1">
                                            </div>
                                            <!-- New password -->
                                            <div class="col-md-6">
                                                <label for="exampleInputPassword2" class="form-label">New password *</label>
                                                <input type="password" class="form-control" id="exampleInputPassword2">
                                            </div>
                                            <!-- Confirm password -->
                                            <div class="col-md-12">
                                                <label for="exampleInputPassword3" class="form-label">Confirm Password *</label>
                                                <input type="password" class="form-control" id="exampleInputPassword3">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> <!-- Row END -->
                            <!-- button -->
                            <div class="gap-3 d-md-flex justify-content-md-end text-center">
                                <button type="button" class="btn btn-danger btn-lg">Delete profile</button>
                                <button type="button" class="btn btn-primary btn-lg">Update profile</button>
                            </div>
                        </form> <!-- Form END -->
                    </div>
                </div>
                </div>





        </div>
        <the-footer/>
    </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';

import countrySelect from '@/components/Register/country-select'
import regionSelect from '@/components/Register/region-select'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faTruckFast, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faTruckFast, faBoxOpen);

import http from "../../http-commmon"

export default {
    name: 'Profile',
    components: {
        TheNavbar,
        TheFooter,
        countrySelect,
        regionSelect
    },
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: []
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
    },
};
</script>

<style>
    .rounded {
        border-radius: 5px !important;
    }
    .py-5 {
        padding-top: 3rem !important;
        padding-bottom: 3rem !important;
    }
    .px-4 {
        padding-right: 1.5rem !important;
        padding-left: 1.5rem !important;
    }
    .form-control {
        display: block;
        width: 100%;
        padding: 0.5rem 1rem;
        font-size: 0.9375rem;
        font-weight: 400;
        line-height: 1.6;
        color: #29292e;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #e5dfe4;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 5px;
        -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    }

</style>