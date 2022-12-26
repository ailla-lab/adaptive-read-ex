<template>
  <div class="container">
    <div class="row">
      <p>
        We always recommend aiming for a Readable grade A. This ensures that
        your writing will reach the general public. If you'r measuring your text
        with the Flesch Kincaid Grade Level, we recommend aiming for a FK Grade
        8. This corresponds to 8th Grade in the USA education system. It is
        recommended for the general public. It doesn't mean you're writing for
        an eighth-grader. Certainly, an eighth-gradercan understand your content
        if it's written to that level. But writers and marketers from a wide
        variety of fields can benefit from this. Adults enjoy reading several
        grades below their actual reading level. Further, a lower Flesch-Kincaid
        Grade Level makes your content skimmable. This saves your reader's time.
        It also saves your time by reducing queries.
      </p>
    </div>

    <div class="form-group">
      <p class="pt-0" id="left">2. What is Reading for you?</p>
      <div class="form-check" id="left">
        <input class="form-check-input" type="radio" v-model="Q2" value="2A" />
        <label class="form-check-label" for="2A"> a. Information </label>
      </div>
      <div class="form-check" id="left">
        <input class="form-check-input" type="radio" v-model="Q2" value="2B" />
        <label class="form-check-label" for="2B"> b. Knowledge </label>
      </div>
      <div class="form-check" id="left">
        <input class="form-check-input" type="radio" v-model="Q2" value="2C" />
        <label class="form-check-label" for="2C"> c. Leisure </label>
      </div>
      <div class="form-check" id="left">
        <input class="form-check-input" type="radio" v-model="Q2" value="2D" />
        <label class="form-check-label" for="2D"> d. Pleasure </label>
      </div>
      <div class="form-check" id="left">
        <input class="form-check-input" type="radio" v-model="Q2" value="2E" />
        <label class="form-check-label" for="2E"> e. Discussion </label>
      </div>
    </div>
    <div class="row">
      <div class="mt-4">
        <button type="button" @click="next" class="btn btn-info m-2">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Article",
  data() {
    return {
      readingSpeed: this.$store.state.readingSpeed,
      cuurentPage: 0,
      currentPar: "",
      startReadingTime: 0,
      endReadignTime: 0,
    };
  },
  computed: {
    ...mapState(["readingSpeed"]),
  },
  methods: {
    start() {
      this.startReadingTime = Date.now();
      console.log(this.readingSpeed);
      const par = this.paragraphs[0].orginalText;
      this.currentPar = par;
      this.showStartBtn = false;
      this.showNextBtn = true;
    },
    next() {
      if (this.cuurentPage < this.paragraphs.length) {
        this.endReadignTime = Date.now() - this.startReadingTime;
        this.startReadingTime = Date.now();
        if (this.endReadignTime < this.readingSpeed) {
          const par = this.paragraphs[this.cuurentPage].orginalText;
          this.currentPar = par;
          this.cuurentPage++;
        } else {
          const par = this.paragraphs[this.cuurentPage].easyText;
          this.currentPar = par;
          this.cuurentPage++;
        }
      } else {
        this.$router.push("/ComTestView");
      }
    },
  },
};
</script>

<style scoped>
.mt-10 {
  margin-top: 10rem;
}
p,
label,
bottom {
  font-size: 24px;
  text-align: justify;
}
.mobileContainer {
  margin: 50px;
}
.footer {
  margin-block: 1000px;
  color: whitesmoke;
}
#myElement1,
#myElement2,
#myElement3 {
  margin: 10px;
  border: 2px solid black;
}

.container {
  padding: 20px;
}
#mTB {
  margin-top: 50px;
  margin-bottom: 30px;
}
#left {
  text-align: left;
}
#right {
  float: right;
  margin: 40px 0px;
}
.form-group {
  margin-bottom: 40px;
}
</style>
