<template>
        <p class="d-flex align-items-center pb-3 mb-3 fs-4 fw-bold">
            CATEGORIA ATUAL
        </p>
    
        <div class="row align-items-start">
            <div class="dropdown col-8 align-self-start">
                <label>Ordenar por: &nbsp;</label>
                
                <a class="btn btn-sm btn-outline-success btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orderby-collapse" aria-expanded="false">
                    Novidade 
                </a>
                    
                <div class="dropdown-menu collapse" id="orderby-collapse" style="position: absolute; transform: translate3d(110px, 35px, 0px); top: 0px; left: 0px; will-change: transform;">
                    <a class="dropdown-item" href="#">Novidade</a>
                    <a class="dropdown-item" href="#">Preço Ascendente</a>
                    <a class="dropdown-item" href="#">Preço Descendente</a>
                </div>
            </div>

            <div class="dropdown col-2 text-end">
                <div class="dropdown col-8 align-self-start">
                    <label>Ver: &nbsp;</label>

                    <a class="btn btn-sm btn-outline-success btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#view-collapse" aria-expanded="false">
                        12 
                    </a>

                    <div class="dropdown-menu collapse" id="view-collapse" style="position: absolute; transform: translate3d(35px, 35px, 0px); top: 0px; left: 0px; will-change: transform;">
                        <a class="dropdown-item" href="#">12</a>
                        <a class="dropdown-item" href="#">24</a>
                        <a class="dropdown-item" href="#">48</a>
                        <a class="dropdown-item" href="#">96</a>
                    </div>
                </div>
            </div>

            <div class="col-2 text-end">
                <button type="button" class="btn btn-sm btn-outline-success rounded"> &larr; </button>
                
                <span>&nbsp;&nbsp;&nbsp;</span>
                
                <button type="button" class="btn btn-sm btn-outline-success rounded"> &rarr; </button>
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