<template>
<div>
        <p class="d-flex align-items-center pb-3 mb-3 fs-4 fw-bold">
            CATEGORIA ATUAL
        </p>
    
        <div class="row align-items-start">
            <div class="dropdown col-8 align-self-start">
                <a class="dropdown-toggle btn btn-outline-success rounded text-decoration-none" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">Ordenar por</a>
                <ul class="dropdown-menu" aria-labelledby="order-by">
                    <li><a class="dropdown-item" href="#">Novidade</a></li>
                    <li><a class="dropdown-item" href="#">Preço Ascendente</a></li>
                    <li><a class="dropdown-item" href="#">Preço Descendente</a></li>
                </ul>
            </div>

            <div class="dropdown col-2 text-end">
                <a class="dropdown-toggle btn btn-outline-success rounded text-decoration-none" href="#" id="order-by" data-bs-toggle="dropdown" aria-expanded="false">Ver</a>
                <ul class="dropdown-menu w-50" aria-labelledby="order-by">
                    <li><a class="dropdown-item" href="#">12</a></li>
                    <li><a class="dropdown-item" href="#">24</a></li>
                    <li><a class="dropdown-item" href="#">48</a></li>
                </ul>
            </div>

            <div class="dropdown col-2 text-end">
                <p class="text-secondary">
                    1-12 de 96 produtos 
                </p>
            </div>
        </div>
</template>

<script>
  export default {
    props: [
        ''
    ],
  }
</script>