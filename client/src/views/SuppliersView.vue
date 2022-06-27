<template>
  <div class="page-container">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="content-wrap">
      <TheNavbar @search-information="searchInformation" />
      <!-- Hero Banner Section -->
      <section class="hero-banner bg-light py-5">
          <div class="container">
              <div class="row row align-items-center">
                  <div class="col-lg-5 offset-lg-1 order-lg-1">
                      <img src="./../assets/banner-greenly-fornecedores.svg" class="img-fluid" alt="Web Development">
                  </div>
                  <div class="col-lg-6">
                      <h1 class="mt-3">Fornecedores</h1>
                      <p class="lead text-secondary my-5">
                        Quer saber mais sobre os nossos parceiros? Aqui estão todos os que ajudam
                        o nosso mundo a ser mais verde.
                      </p>
                  </div>
              </div>
          </div>
      </section>
      <div class="slider">
        <div class="slide-track">
          <div class="slide"
            v-for="s in suppliers"
            :key="s.id">
            <p>{{ s.company.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/Frontpage/TheNavbar.vue';
import TheFooter from '@/components/Frontpage/TheFooter.vue';

import http from "../../http-common";

export default {
  name: 'SuppliersView',
  components: {
    TheNavbar,
    TheFooter,
  },
  data() {
    return {
      suppliers: [],
    }
  },
  created() {
    this.changeTitle();
    this.getSuppliers();
  },
  methods: {
    changeTitle(){
        window.document.title = "Greenly | Fornecedores";
    },
    async getSuppliers() {
      let response = await http.get("/store/suppliers");
      this.suppliers = JSON.parse(JSON.stringify(response.data));
      console.log(this.suppliers)
    },
  }
};
</script>

<style scoped>
 .hero-banner h1 {
    font-size: 48px;
}

body {
	display: flex;
	height: 100vh;
}

@-webkit-keyframes scroll {
  0% {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  }

  100% {
  -webkit-transform: translateX(calc(-250px * 7));
  transform: translateX(calc(-250px * 7));
  }
}
@keyframes scroll {
  0% {
  -webkit-transform: translateX(0);
  transform: translateX(0);
  }
  100% {
  -webkit-transform: translateX(calc(-250px * 7));
  transform: translateX(calc(-250px * 7));
  }
}

.slider {
  background: pr;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
  height: 100px;
  margin: auto;
  overflow: hidden;
  position: relative;
}
.slider::before, .slider::after {
  background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
  content: "";
  height: 100px;
  position: absolute;
  width: 200px;
  z-index: 2;
}

.slider::after {
  right: 0;
  top: 0;
  -webkit-transform: rotateZ(180deg);
  transform: rotateZ(180deg);
}
.slider::before {
  left: 0;
  top: 0;
}
.slider .slide-track {
  -webkit-animation: scroll 40s linear infinite;
  animation: scroll 40s linear infinite;
  display: flex;
  width: calc(950px * 14);
}

.slider .slide {
  height: 100px;
  width: 250px;
}
</style>