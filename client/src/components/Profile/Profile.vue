<template>        
   
    <div class="wrapper">
        
        <nav class="d-flex flex-column flex-shrink-0 p-3" style="width: 25%">

            <div class="container">
                <div class="row">
                    <div class="col-2 align-middle align-self-center" style="margin: 0 5%">
                        <span v-if="user.type == 'CONSUMER'"><font-awesome-icon :icon="['fas', 'user-tag']" size="2xl" /></span>
                        <span v-if="user.type == 'SUPPLIER'"><font-awesome-icon :icon="['fas', 'box-open']" size="2xl" /></span>
                        <span v-if="user.type == 'TRANSPORTER'"><font-awesome-icon :icon="['fas', 'truck-fast']" size="2xl" /></span>
                    </div>
                    <div class="col align-middle align-self-center">
                        <span class="fs-3">{{user.first_name + " " + user.last_name}}</span>
                        <br>
                        <span v-if="user.type == 'CONSUMER'" class="fs-5">Consumidor</span>
                        <span v-if="user.type == 'SUPPLIER'" class="fs-5">Fornecedor</span>
                        <span v-if="user.type == 'TRANSPORTER'" class="fs-5">Transportador</span>
                        <br>
                        <span v-if="user.type == 'SUPPLIER'" class="fs-5">@ {{ user.company.name }}</span>
                        <span v-if="user.type == 'TRANSPORTER'" class="fs-5">@ {{ user.company.name }}</span>
                    </div>
                </div>
            </div>

            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item" @click="activeTab = 'personalInfo'">
                    <a class="nav-link link-dark" :class="(activeTab === 'personalInfo') ? 'nav-link active' : ''" aria-current="page">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'user']" size="lg"/>&nbsp; Informações Pessoais
                    </a>
                </li>
                <li v-if="user.type == 'SUPPLIER' || user.type == 'TRANSPORTER'" class="nav-item" @click="activeTab = 'companyInfo'">
                    <a class="nav-link link-dark" :class="(activeTab === 'companyInfo') ? 'nav-link active' : ''" aria-current="page">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'briefcase']" size="lg"/>&nbsp; Empresa
                    </a>
                </li>
                <li v-if="user.type == 'CONSUMER'" class="nav-item" @click="activeTab = 'orders'">
                    <a class="nav-link link-dark" :class="(activeTab === 'orders') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'box-archive']" size="lg"/>&nbsp; Encomendas
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'addresses'">
                    <a class="nav-link link-dark" :class="(activeTab === 'addresses') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'map']" size="lg"/>&nbsp; Moradas
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'security'">
                    <a class="nav-link link-dark" :class="(activeTab === 'security') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'gear']" size="lg"/>&nbsp; Segurança
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'statistics'">
                    <a class="nav-link link-dark" :class="(activeTab === 'statistics') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'chart-line']" size="lg"/>&nbsp; Estatísticas
                    </a>
                </li>

            </ul>
        </nav>

        <div class="tab-content" id="profile-content">
            <transition name="fade">
                <profile-personal-info v-if="activeTab === 'personalInfo'"/>
            </transition>

            <transition name="fade">
                <profile-company-info v-if="activeTab === 'companyInfo'"/>
            </transition>

            <transition name="fade">
                <profile-orders v-if="activeTab === 'orders'"/>
            </transition>

            <transition name="fade">
                <profile-addresses v-if="activeTab === 'addresses'"/>
            </transition>

            <transition name="fade">
                <profile-security v-if="activeTab === 'security'"/>
            </transition>

            <transition name="fade">
                <profile-statistics v-if="activeTab === 'statistics'"/>
            </transition>
        </div> 
    </div>


</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import ProfilePersonalInfo from '@/components/Profile/ProfilePersonalInfo.vue'
import ProfileCompanyInfo from '@/components/Profile/ProfileCompanyInfo.vue'
import ProfileOrders from '@/components/Profile/ProfileOrders.vue'
import ProfileAddresses from '@/components/Profile/ProfileAddresses.vue'
import ProfileSecurity from '@/components/Profile/ProfileSecurity.vue'
import ProfileStatistics from '@/components/Profile/ProfileStatistics.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserTag, faTruckFast, faBoxOpen, faUser, faBriefcase, faBoxArchive, faMap, faGear, faChartLine } from '@fortawesome/free-solid-svg-icons';
library.add(faUserTag, faTruckFast, faBoxOpen, faUser, faBriefcase, faBoxArchive, faMap, faGear, faChartLine);

export default {
    name: 'Profile',
    components: {
        TheNavbar,
        TheFooter,
        ProfilePersonalInfo,
        ProfileCompanyInfo,
        ProfileOrders,
        ProfileAddresses,
        ProfileSecurity,
        ProfileStatistics
    },
    data() {
        return {
            user: this.$store.getters.getUser,
            activeTab: 'personalInfo'
        }
    },
    methods: {

    },
};
</script>

<style>
    .wrapper {
        display: flex;
        align-items: stretch;
    }
    .nav > .nav-item > .active {
        background-color: #309C76;
    }
    .nav-item {
        margin-bottom: 5px;
    }
    .nav-link {
        cursor: pointer;
    }
</style>