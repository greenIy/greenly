<template>
<div class="d-flex justify-content-center mt-5">
  <nav aria-label="Page navigation example" >
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Anterior</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Seguinte</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
</template>
<script>

export default {
  name: 'TheNextPage',
};
</script>

<style scoped>

.pagination a {
  color: black;
  padding: 8px 16px;
  text-decoration: none;
}

</style>
