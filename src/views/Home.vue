<template>
  <NavBar />
  <div class="container tm-50">
    <div class="row mt-4">
      <div class="col-sm-4">
        <div class="card border colorBg">
          <div class="card-body">
            <h5 class="card-title">Reading speed Test</h5>

            <router-link class="btn" to="/reading-speed">Start</router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border">
          <div class="card-body">
            <h5 class="card-title">Article One</h5>
            <router-link class="btn" to="/article1">Read</router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border">
          <div class="card-body">
            <h5 class="card-title">Title Two</h5>
            <router-link class="btn" to="/article2">Read</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Three</h5>
            <router-link class="btn" to="/article3">Read</router-link>
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
import NavBar from "@/components/Navbar";

export default {
  name: "Home",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.card {
  min-height: 140px;
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
