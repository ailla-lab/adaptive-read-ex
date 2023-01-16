<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-blue">
    <div class="container-fluid">
      <a class="navbar-brand mylogo" href="#">MyReader</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          <!-- <a class="nav-link right" aria-current="page" href="#">Log out</a> -->
          <button
            @click.prevent="logout"
            class="btn btn-primary nav-link right"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavBar",

  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style>
.mylogo {
  padding-left: 10px;
}
.bg-dark-blue {
  background-color: rgb(23, 12, 108);
}
.right {
  color: azure;
  font-size: 15px;
  position: absolute;
  top: 5px;
  right: 30px;
}
</style>
