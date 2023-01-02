<template>
  <div class="container">
    <!-- <div v-for="(article, index) in filterArticles"> -->
    <div class="row mt-4">
      <div class="col-sm-4">
        <div class="card border colorBg">
          <div class="card-body">
            <h5 class="card-title">Reading speed Test</h5>
            <router-link to="/ReadingSpeed" custom v-slot="{ navigate }">
              <button @click="navigate" role="link" class="btn">Start</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }} {{}}</h5>
            <a href="#" class="btn">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border">
          <div class="card-body">
            <h5 class="card-title">Title Three</h5>
            <a href="#" class="btn">Read</a>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title One</h5>
            <a href="#" class="btn">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Two</h5>
            <a href="#" class="btn">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Three</h5>
            <a href="#" class="btn">Read</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",

  computed: {
    ...mapGetters(["filterArticles"]),
  },
};
</script>

<style scoped>
.card {
  min-height: 140px;
}
.colorBg {
  background-color: rgb(222, 236, 198);
}
.btn {
  font-size: 16px;
  color: black;
  background-color: rgb(96, 239, 120);
  margin-top: 30px;
  border-radius: 11%;
  width: 85px;
}

.border {
  border: 2px solid #dcc9c9 !important;
}
.card-title {
  font-weight: 900 !important;
}
</style>
