<template>
<div class="d-flex">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <div>
                    <canvas id="priceChart"></canvas>
                </div>
            </div>
            <div class="col-sm-6">
                <div>
                    <canvas id="stockChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
                
</template>

<script>
import Chart from "chart.js/auto";
export default {

  name: "Chart",
  props: {
    suppliers:Array,
    idSupplier:Number,
    
  },
  mounted() {
    this.showCharts();
  
  },
  methods: {
    showCharts(){
      const priceCtx = document.getElementById('priceChart');
      const stockCtx = document.getElementById('stockChart');
        
        let productHistory = this.suppliers[this.idSupplier].history
        const dateOptions = {
            month: 'long',
            day: 'numeric'
        };

        // Re-estruturação de dados históricos
        const monthLabels = productHistory.map((singleData) => new Date(singleData.moment).toLocaleDateString("pt-PT", dateOptions))
        const priceData = productHistory.map((singleData) => Number(singleData.price))
        const quantityData = productHistory.map((singleData) => Number(singleData.quantity))
        const labels = monthLabels;

        // Configuração dos gráficos de preços e stock (tipo, dados, opções)
        // Configuração do gráfico de preços
        const priceConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Preço',
                        data: priceData,
                        borderColor: 'rgb(79,180,119)'
                    }
                ]
            },
            options: {
                responsive: true,
                tension: 0.3,
                plugins: {
                    legend: {
                        position: 'bottom',
                        align:'end'
                    },
                    title: {
                        display: true,
                        text: 'Variações no preço do produto do fornecedor selecionado'
                    }
                }
            }
        };

        // Configuração do gráfico de stock
        const stockConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Quantidade',
                        data: quantityData,
                        borderColor: 'rgb(138,196,255)'
                    }
                ]
            },
            options: {
                responsive: true,
                tension: 0.3,
                plugins: {
                    legend: {
                        position: 'bottom',
                        align:'end'
                    },
                    title: {
                        display: true,
                        text: 'Variações no stock do produto do fornecedor selecionado'
                    }
                }
            }
        };

        // Mostrar gráficos de preço e stock
        const priceChart = new Chart(priceCtx, priceConfig)
        const stockChart = new Chart(stockCtx, stockConfig)
    }
  },
};
</script>

<style scoped>

</style>
