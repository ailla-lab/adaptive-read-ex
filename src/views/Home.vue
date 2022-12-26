<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-sm-4">
        <div class="card border border-primary">
          <div class="card-body">
            <h5 class="card-title">Reading speed Test</h5>
            <router-link to="/ReadingSpeed" custom v-slot="{ navigate }">
              <button @click="navigate" role="link" class="btn btn-success">
                Start
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Two</h5>
            <a href="#" class="btn btn-secondary">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Three</h5>
            <a href="#" class="btn btn-secondary">Read</a>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title One</h5>
            <a href="#" class="btn btn-secondary">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Two</h5>
            <a href="#" class="btn btn-secondary">Read</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="card-title">Title Three</h5>
            <a href="#" class="btn btn-secondary">Read</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
