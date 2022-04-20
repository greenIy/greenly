<template>        
   
    <div class="wrapper">
        
        <nav class="d-flex flex-column flex-shrink-0 p-3" style="width: 22%">
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
                        <font-awesome-icon :icon="['fa', 'user']" size=""/>&nbsp; Informações pessoais
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'achievements'">
                    <a class="nav-link link-dark" :class="(activeTab === 'achievements') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'trophy']" size=""/>&nbsp; Conquistas
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'addresses'">
                    <a class="nav-link link-dark" :class="(activeTab === 'addresses') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'map']" size=""/>&nbsp; Moradas
                    </a>
                </li>
                <li class="nav-item" @click="activeTab = 'security'">
                    <a class="nav-link link-dark" :class="(activeTab === 'security') ? 'nav-link active' : ''">
                    <svg class="bi me-0" width="16" height="16"></svg>
                        <font-awesome-icon :icon="['fa', 'gear']" size=""/>&nbsp; Segurança
                    </a>
                </li>

            </ul>
        </nav>

        <div class="tab-content" id="profile-content">
            <transition name="fade">
                <profile-personal-info v-if="activeTab === 'personalInfo'"/>
            </transition>

            <transition name="fade">
                <profile-achievements v-if="activeTab === 'achievements'"/>
            </transition>

            <transition name="fade">
                <profile-addresses v-if="activeTab === 'addresses'"/>
            </transition>

            <transition name="fade">
                <profile-security v-if="activeTab === 'security'"/>
            </transition>
        </div> 
    </div>


</template>

<script>
// @ is an alias to /src
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';
import ProfilePersonalInfo from '@/components/Profile/ProfilePersonalInfo.vue'
import ProfileAchievements from '@/components/Profile/ProfileAchievements.vue'
import ProfileAddresses from '@/components/Profile/ProfileAddresses.vue'
import ProfileSecurity from '@/components/Profile/ProfileSecurity.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserAstronaut, faUser, faTrophy, faMap, faGear} from '@fortawesome/free-solid-svg-icons';
library.add(faUserAstronaut, faUser, faTrophy, faMap, faGear);

import http from "../../../http-commmon"

export default {
    name: 'Profile',
    components: {
        TheNavbar,
        TheFooter,
        ProfilePersonalInfo,
        ProfileAchievements,
        ProfileAddresses,
        ProfileSecurity
    },
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: [],
            activeTab: 'personalInfo'
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
    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
    }
    .nav > .nav-item > .active {
        background-color: #608072;
    }
    .nav-item {
        margin-bottom: 5px;
    }
    .nav-link {
        cursor: pointer;
    }
</style>