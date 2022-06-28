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
                <h1 v-if="title == 'Vendas'  || title == 'Lucros'" class="fw-bold"> {{ amount }}€ </h1>
                <h1 v-else-if="title == 'Gastos de armazenamento'" class="fw-bold"> {{ amount }} kWh/dia</h1>
                <h1 v-else-if="title == 'Gastos de transporte'" class="fw-bold"> {{ amount }} L/100 km</h1>
                <h1 v-else-if="title == 'Emissões'" class="fw-bold"> {{ amount }} CO<sub>2</sub> g/km/t</h1>
                <h1 v-else class="fw-bold"> {{ amount }} </h1>
                <p v-if="title == 'Utilizadores' || title == 'Vendas' || title == 'Lucros' || title == 'Gastos de armazenamento' || title == 'Gastos de transporte' || title == 'Emissões'" class="mb-0 text-secondary text-lowercase"><span class="badge bg-secondary text-uppercase">Este mês</span>
                    <span v-if="title == 'Vendas'  || title == 'Lucros'" class="ms-2 text-success">+{{ increment }}€</span>
                    <span v-else-if="title == 'Gastos de armazenamento'" class="ms-2 text-success">+{{ increment }} kWh/dia</span>
                    <span v-else-if="title == 'Gastos de transporte'" class="ms-2 text-success">+{{ increment }} L/100 km</span>
                    <span v-else-if="title == 'Emissões'" class="ms-2 text-success">+{{ increment }} CO<sub>2</sub> g/km/t</span>
                    <span v-else class="ms-2 text-success">+{{ increment }}</span>
                    
                    {{ title }}
                </p>
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
