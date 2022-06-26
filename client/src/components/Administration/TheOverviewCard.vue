<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h4 class="mb-0"> {{ title }} </h4>
                </div>
                <div class="bg-e4e6c3 rounded-2 p-2">
                    <font-awesome-icon :icon="['fas', 'users']" size="xl" v-if=" title == 'Utilizadores'" />
                </div>
            </div>
            <div>
                <h1 class="fw-bold"> {{ amount }} </h1>
                <p v-if="increment" class="mb-0 text-secondary text-lowercase"><span class="badge bg-secondary text-uppercase">Hoje</span>
                <span class="ms-2 text-success">+{{ increment }}</span> {{ title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

library.add(faUsers);

export default {
    name: 'TheOverviewCard',
    props: [
        'title',
        'amount',
        'increment'
    ]
}
</script>

<style scoped>
.bg-e4e6c3 {
    background-color: #e4e6c3;
}

.fa-users {
    color: #226d53;
}
</style>
