<template>
  <div class="container mt-4">
    <h4 v-show="!isTesting">Reading Speed Test</h4>
    <p v-show="isCanceled" id="instruction">
      In this test, you need to read as you normally would
    </p>

    <button
      type="button"
      @click="beginTest"
      class="btn btn-primary m-2"
      v-if="isCanceled"
    >
      Begin
    </button>

    <div class="content col-md-10 col-sm-8" v-show="isTesting">
      <h4>Bogus Allergy</h4>
      <p id="readingTestText">
        A group of experts say that thousands of people are taking unnecessary
        medicines and have bad diets because of bogus allergy tests. Allergies
        and food intolerances are increasing very quickly but people do not
        understand the difference between an allergy and a food intolerance –
        this is causing problems, says the charity Sense About Science, who have
        written a guide to allergies. “It’s a big mess,” said Tracey Brown,
        director of Sense About Science. “There is unnecessary action for people
        who don’t really have allergies and not enough action for people who
        have allergies.” Lots of people tell the waiter or waitress in a
        restaurant that they have an allergy. But some of these people don’t
        have an allergy – that have a food intolerance, which is not dangerous.
        Experts fear that restaurants hear so many people say that they have
        allergies (when maybe that is not true) that they may not be careful
        enough when they give food to a person who has a real allergy. “It
        matters very much,” said Moira Austin of an allergy charity.
      </p>
    </div>
  </div>
  <div class="row">
    <div class="">
      <button
        type="button"
        @click="cancel"
        class="btn btn-danger m-2"
        v-if="isTesting"
      >
        Restart
      </button>
      <button
        type="button"
        @click="next"
        class="btn btn-success m-2"
        v-if="isTesting"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script>
// import userCollection from "@/firebaseInit";
// import { setDoc, doc } from "@/firebaseInit";

export default {
  name: "ReadingSpeedTest",

  data() {
    return {
      isTesting: false,

      isCanceled: true,
      isDone: false,
      readingTimeStart: 0,
      readingDuration: 0,
      results: [],
    };
  },
  computed: {
    getId() {
      return this.$store.getters.id;
    },
  },
  methods: {
    next() {
      this.$router.push("/MobileInterFaceView");
    },
    beginTest() {
      this.readingTimeStart = Date.now();
      this.isTesting = true;
      this.isCanceled = false;
      this.results.push({
        userID: this.$store.state.id,
      });
    },
    cancel() {
      this.isTesting = false;
      this.isCanceled = true;
    },

    finishTest() {
      this.readingDuration = Date.now() - this.readingTimeStart;
      this.$store.state.readingSpeed = this.readingDuration;
      this.addReadingSpeedResult();
      this.readingTimeStart = 0;
      this.$router.push("/Experiment");
    },

    // async addReadingSpeedResult() {
    //   let docRef = doc(userCollection, this.$store.state.id);
    //   let userDoc = this.getDoc(docRef);
    //   console.log(userDoc);
    //   await setDoc(userDoc, { readingSpeed: this.readingDuration });
    // },
  },
};
</script>
<style scoped>
.content {
  padding-top: 30px;
  margin: 20px;
}

#instruction {
  font-size: 20px;
}

#readingTestText {
  font-size: 18px;
  text-align: justify;
}
</style>
