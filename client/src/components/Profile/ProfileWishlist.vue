<template>
    <div class="p-4">
        
        <h4>Favoritos</h4>
        <hr>
        
        <h4>Still on the works. . .&nbsp;<font-awesome-icon :icon="['fa', 'hammer']" /></h4>


    </div>
</template>

<script>
import { Toast } from '../../main'
import { library } from '@fortawesome/fontawesome-svg-core';
import { } from '@fortawesome/free-brands-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
library.add(faHammer);

import http from "../../../http-common"


export default({
    name: 'ProfileWishlist',
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