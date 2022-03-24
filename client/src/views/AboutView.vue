<template>
 <!-- eslint-disable max-len -->
<div class="cards">
  <h3 class="mt-2 mb-4"> A NOSSA EQUIPA:</h3>
  <div class="row">
  <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2 " src="../assets/Team/jose.jpg" alt="Fotografia do José" >
      <div class="container">
        <h4>José Almeida</h4>
        <p class="title">Back-end</p>
      </div>
    </div>
  </div>
  <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2" src="../assets/Team/daniela.jpg" alt="Fotografia do Augusto" >
      <div class="container">
        <h4>Augusto Gouveia</h4>
        <p class="title">Back-end</p>
      </div>
    </div>
  </div>
   <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2" src="../assets/Team/daniela.jpg" alt="Fotografia da Lívia" >
      <div class="container">
        <h4>Lívia Batalha</h4>
        <p class="title">Front-end</p>
      </div>
    </div>
  </div>
   <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2" src="../assets/Team/daniela.jpg" alt="Fotografia da Daniela" >
      <div class="container">
        <h4>Daniela Gonçalves</h4>
        <p class="title">Front-end</p>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2 " src="../assets/Team/ju.jpg" alt="Fotografia da Julliana" >
      <div class="container">
        <h4>Julliana Sousa</h4>
        <p class="title">Front-end</p>
      </div>
    </div>
  </div>
   <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2" src="../assets/Team/joao.jpg" alt="Fotografia do João" >
      <div class="container">
        <h4>João Mateus</h4>
        <p class="title">Front-end</p>
      </div>
    </div>
  </div>
  <div class="col-3 mb-3">
    <div class="card">
      <img class="img-fluid mt-3 mb-2" src="../assets/Team/daniela.jpg" alt="Fotografia do Miguel" >
      <div class="container">
        <h4>Miguel Lages</h4>
        <p class="title">Front-end</p>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
   width: 100%;
   margin: 0 auto;

}

.card:hover{
     box-shadow: 1px 10px 12px #d9d9d9;
}

.container {
  padding: 0 16px;
}

.title {
  color: grey;
}

.img-fluid {
    max-width: 50%;
    height: auto;
    margin: auto;
}

.row{
  margin: 0 auto;
  text-align: center;
  margin-left:15%;
  margin-right:15%;
  justify-content: center;
}

.col {
  padding: 0 8px;
}
</style>
