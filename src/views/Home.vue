<template>
  <NavBar />
  <div v-if="noReadingScore">
    <div class="alert alert-primary" role="alert">
      Before you start {{ user }}, you should take the reading speed test
    </div>
  </div>
  <div class="alert alert-primary" role="alert">
    Welcome {{ studentid }} and {{ group }}
  </div>

  <div class="container tm-50">
    <div class="row mt-4">
      <div v-if="noReadingScore" class="col-sm-4">
        <div class="card text-bg-light">
          <div class="card-body">
            <h5 class="card-title">Reading speed Test</h5>
            <router-link class="btn" to="/reading-speed">Start</router-link>
          </div>
        </div>
      </div>
      <div v-if="readingScoreExist" class="col-sm-4">
        <div class="card border">
          <img src="@/assets/logo.png" class="card-img-top imgHeight" alt="" />
          <div class="card-body">
            <h5 class="card-title">Article One</h5>
            <router-link class="btn" to="/article1">Read</router-link>
          </div>
        </div>
      </div>
      <div v-if="readingScoreExist" class="col-sm-4">
        <div class="card border">
          <img src="@/assets/logo.png" class="card-img-top imgHeight" alt="" />
          <div class="card-body">
            <h5 class="card-title">Title Two</h5>
            <router-link class="btn" to="/article2">Read</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div v-if="readingScoreExist" class="col-sm-4">
        <div class="card border border-dark">
          <img src="@/assets/logo.png" class="card-img-top imgHeight" alt="" />
          <div class="card-body">
            <h5 class="card-title">Title Three</h5>
            <router-link class="btn" to="/article3">Read</router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div v-if="readingScoreExist" class="card border border-dark">
          <img src="@/assets/logo.png" class="card-img-top imgHeight" alt="" />
          <div class="card-body">
            <h5 class="card-title">Title Two</h5>
            <a href="#" class="btn">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div v-if="readingScoreExist" class="card border border-dark">
          <img src="@/assets/logo.png" class="card-img-top imgHeight" alt="" />
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
import NavBar from "@/components/Navbar";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      noReadingScore: false,
      readingScoreExist: true,
      user: null,
    };
  },
  computed: {
    ...mapState(["readingSpeed", "group", "studentid"]),
  },
};
</script>

<style scoped>
.alert {
  font-size: 20px;
}
.card {
  min-height: 140px;
}
.imgHeight {
  height: 200px;
}
.colorBg {
  background-color: #e7e9eb;
}
.btn {
  font-size: 16px;
  color: white;
  background-color: #04aa6d;
  margin-top: 30px;
  border-radius: 8%;
  width: 85px;
}

.border {
  border: 2px solid #dcc9c9 !important;
}
.card-title {
  font-weight: 900 !important;
}
.tm-50 {
  margin-top: 100px;
}
</style>
