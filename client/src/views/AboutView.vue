<template>
  <div class="page-container">
    <body>
      <div class="content-wrap">
        <TheNavbar />
        <h3 class="mt-4 mb-2 text-center">A NOSSA EQUIPA</h3>
        <div class="cards d-flex">
          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/jose.jpg"
              alt="Fotografia do José"
            />
            <div class="container">
              <h4>José Almeida</h4>
              <p class="title">Back-end</p>
            </div>
          </div>

          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/augusto.jpg"
              alt="Fotografia do Augusto"
            />
            <div class="container">
              <h4>Augusto Gouveia</h4>
              <p class="title">Back-end</p>
            </div>
          </div>

          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/livia.jpg"
              alt="Fotografia da Lívia"
            />
            <div class="container">
              <h4>Lívia Batalha</h4>
              <p class="title">Front-end</p>
            </div>
          </div>

          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/daniela.jpg"
              alt="Fotografia da Daniela"
            />
            <div class="container">
              <h4>Daniela Gonçalves</h4>
              <p class="title">Front-end</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center cards2">
          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/ju.jpg"
              alt="Fotografia da Julliana"
            />
            <div class="container">
              <h4>Julliana Sousa</h4>
              <p class="title">Front-end</p>
            </div>
          </div>

          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/joao.jpg"
              alt="Fotografia do João"
            />
            <div class="container">
              <h4>João Mateus</h4>
              <p class="title">Front-end</p>
            </div>
          </div>

          <div class="card">
            <img
              class="img-fluid mt-3 mb-2"
              src="../assets/Team/miguel.jpg"
              alt="Fotografia do Miguel"
            />
            <div class="container">
              <h4>Miguel Lages</h4>
              <p class="title">Front-end</p>
            </div>
          </div>
        </div>
      </div>
      <TheFooter />
    </body>
  </div>
</template>

<script>
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";

export default {
  name: "equipa",
  components: {
    TheNavbar,
    TheFooter,
  },
  created() {
    this.changeTitle();
  },
  methods: {
    changeTitle() {
      window.document.title = "Greenly | Equipa";
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 25%;
  height: auto;
  margin: 0 auto;
  margin-left: 1em;
}
.card:hover {
  box-shadow: 1px 10px 12px #d9d9d9;
}
.card2:hover {
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
.row {
  margin: 0 auto;
  text-align: center;
  justify-content: center;
}

.cards {
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  margin-top: 2em;
}
.cards2 {
  justify-content: center;
  margin-right: 12%;
  margin-left: 17%;
  margin-top: 1em;
}
.col {
  padding: 0 8px;
}

.footerOverride {
  bottom: auto !important;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .cards {
    flex-direction: row;
    flex-flow: row wrap;
    margin: 1em 2em;
  }
  .cards2 {
    flex-direction: row;
    flex-flow: row wrap;
    margin: 1em 2em;
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 50%;
    margin: 0 auto;
  }
}

@media (max-width: 991px) {
  .cards {
    flex-direction: column;
    flex-flow: row wrap;
    margin: 1em 2em;
    gap: 1em;
  }
  .cards2 {
    flex-direction: column;
    flex-flow: row wrap;
    margin: 1em 2em;
    gap: 1em;
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    margin: 0 auto;
  }
}
</style>
