<template>
  <!--Admin pills-->
  <div class="mb-2 mb-lg-0">
    <ul class="nav nav-pills" id="admin-pills" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active bg-transparent" id="general-pill" data-bs-toggle="pill" data-bs-target="#general-tab" type="button" role="tab" aria-controls="general-tab" aria-selected="true">Panorâmica</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link bg-transparent" id="users-pill" data-bs-toggle="pill" data-bs-target="#users-tab" type="button" role="tab" aria-controls="users-tab" aria-selected="true">Utilizadores</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link bg-transparent" id="products-pill" data-bs-toggle="pill" data-bs-target="#products-tab" type="button" role="tab" aria-controls="products-tab" aria-selected="true">Produtos</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link bg-transparent" id="orders-pill" data-bs-toggle="pill" data-bs-target="#orders-tab" type="button" role="tab" aria-controls="orders-tab" aria-selected="true">Encomendas</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheDashboardPills'
};
</script>

<style scoped>
  .nav-link{
    color: #309c76;
  }

  .nav-link:hover{
    color: #5abd9a!important;
  }

  .active:hover{
    color: #a4f3d7!important;
  }
</style>