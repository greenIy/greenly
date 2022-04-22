<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h3>Encomendas</h3>
        <hr>
        
        <h2>Still on the works. . .&nbsp;<font-awesome-icon :icon="['fa', 'hammer']" size=""/></h2>


    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
library.add(faHammer);

import http from "../../../http-commmon"


export default({
    name: 'ProfileOrders',
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: [],
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
});

</script>

<style scoped>
    
</style>