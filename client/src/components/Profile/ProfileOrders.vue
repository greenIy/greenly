<template>
    <div class="p-5" style="margin-top: 2px">
        
        <h4>Encomendas</h4>
        <hr>
        
        <h4>Still on the works. . .&nbsp;<font-awesome-icon :icon="['fa', 'hammer']" /></h4>


    </div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
library.add(faHammer);

import http from "../../../http-common"


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
            this.user = this.$store.getters.getUser
            return this.$store.getters.getUser
        },
    },
});

</script>

<style scoped>
    
</style>