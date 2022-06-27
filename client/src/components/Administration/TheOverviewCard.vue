<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h4 class="mb-0"> {{ title }} </h4>
                </div>
                <div class="bg-e4e6c3 rounded-2 p-2">
                    <font-awesome-icon :icon="['fas', 'users']" size="xl" v-if=" title == 'Utilizadores'" />
                    <font-awesome-icon :icon="['fas', 'barcode']" size="xl" v-else-if=" title == 'Categorias'" />
                    <font-awesome-icon :icon="['fas', 'sitemap']" size="xl" v-else-if=" title == 'Produtos'" />
                    <font-awesome-icon :icon="['fas', 'clipboard-list']" size="xl" v-else-if=" title == 'Pedidos'"/>
                    <font-awesome-icon :icon="['fas', 'boxes-stacked']" size="xl" v-else-if=" title == 'Encomendas'" />
                    <font-awesome-icon :icon="['fas', 'cash-register']" size="xl" v-else-if=" title == 'Vendas'" />
                    <font-awesome-icon :icon="['fas', 'coins']" size="xl" v-else-if="title == 'Lucros'"/>
                    <font-awesome-icon :icon="['fas', 'warehouse']" size="xl" v-else-if="title == 'Gastos de armazenamento'"/>
                    <font-awesome-icon :icon="['fas', 'truck']" size="xl" v-else-if="title == 'Gastos de transporte'"/>
                    <font-awesome-icon :icon="['fas', 'smog']" size="xl" v-else/>
                </div>
            </div>
            <div>
                <h1 class="fw-bold"> {{ amount }} </h1>
                <p v-if=" title == 'Utilizadores'" class="mb-0 text-secondary text-lowercase"><span class="badge bg-secondary text-uppercase">Hoje</span>
                <span class="ms-2 text-success">+{{ increment }}</span> {{ title }}</p>

                <p v-else-if="title == 'Vendas' || title == 'Lucros' || title == 'Gastos de armazenamento' || title == 'Gastos de transporte' || title == 'Emissões'" class="mb-0 text-secondary text-lowercase"><span class="badge bg-secondary text-uppercase">Este mês</span>
                <span class="ms-2 text-success">+{{ increment }}</span> {{ title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faBarcode, faSitemap, faClipboardList, faBoxesStacked, faCashRegister, faCoins, faWarehouse, faTruck, faSmog } from '@fortawesome/free-solid-svg-icons';

library.add(faUsers, faBarcode, faSitemap, faClipboardList, faBoxesStacked, faCashRegister,  faCoins, faWarehouse, faTruck, faSmog);

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

.fa-users,
.fa-barcode,
.fa-sitemap,
.fa-clipboard-list,
.fa-boxes-stacked,
.fa-cash-register,
.fa-coins,
.fa-warehouse,
.fa-truck,
.fa-smog {
    color: #226d53;
}
</style>
