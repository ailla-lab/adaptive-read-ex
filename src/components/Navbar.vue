<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-blue">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyReader</a>
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
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link right" aria-current="page" href="#">Log out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.bg-dark-blue {
  background-color: rgb(23, 12, 108);
}
.right {
  position: absolute;
  right: 20px;
}
</style>
