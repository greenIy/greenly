<template>        
   
    <div class="wrapper">
        
        <nav class="d-flex flex-column flex-shrink-0 p-3" style="width: 25%">
            <font-awesome-icon :icon="['fas', 'user-astronaut']" size="2xl" style="position: absolute; margin: 1.4%"/>
            <div style="margin-left: 20px">
            <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32"></svg>
                <span class="fs-4">{{user.first_name + " " + user.last_name}}</span>
            </a>
            <a>
                <svg class="bi me-2" width="40" height="32"></svg>
                <span class="fs-10">Consumidor</span>
            </a>
            </div>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item" @click="activeTab = 'personalInfo'">
                    <a class="nav-link link-dark" :class="(activeTab === 'personalInfo') ? 'nav-link active' : ''" aria-current="page">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'user']" size="lg"/>&nbsp; Informações Pessoais
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'orders'">
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
import ProfileOrders from '@/components/Profile/ProfileOrders.vue'
import ProfileAddresses from '@/components/Profile/ProfileAddresses.vue'
import ProfileSecurity from '@/components/Profile/ProfileSecurity.vue'
import ProfileStatistics from '@/components/Profile/ProfileStatistics.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserAstronaut, faUser, faBoxArchive, faMap, faGear, faChartLine } from '@fortawesome/free-solid-svg-icons';
library.add(faUserAstronaut, faUser, faBoxArchive, faMap, faGear, faChartLine);

export default {
    name: 'Profile',
    components: {
        TheNavbar,
        TheFooter,
        ProfilePersonalInfo,
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