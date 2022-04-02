<template>
  <div class="page-container">
    <TheNavbar />
    <body>
    <div class="content-wrap mw-0">
      
      <div class="card center mt-3" style="width: 18rem">
        <img class="card-img-top" src="../assets/Team/daniela.jpg" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
      <TheNextPage />
    </div>
    </body>
    <TheFooter />
  </div>
</template>
<script>
import TheNavbar from "@/components/Frontpage/TheNavbar.vue";
import TheFooter from "@/components/Frontpage/TheFooter.vue";
/* eslint-disable */

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import AboutView from './AboutView.vue';

library.add(faCartPlus);

export default {
  name: "ProductView",
  components: {
    TheNextPage,
    TheNavbar,
    TheFooter,
    AboutView,
  },
};
</script>

<style scoped>
.center{
  margin:0 auto;
}
.btnS {
  border: none;
  color: white;
  background-color: #7c9d8e;
  padding: 10px;
  border-radius: 10px;
}

.btnS:hover {
  background-color: #89a799;
}
</style>
