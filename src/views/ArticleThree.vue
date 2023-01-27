<template>
  <NavBar />
  <div class="container mt-5">
    <div>
      {{ studentid }} selected: {{ selected }} and current Group
      {{ userGroup }} and current page {{ cuurentPage }} start time
      {{ startReadingTime }} and end time
      {{ endReadingTime }}
    </div>
    <div class="mobileContainer">
      <div class="row">
        <h4>{{ title }}</h4>
        <p>{{ currentPar }}</p>
      </div>

      <div v-show="showQ" class="row topM">
        <p id="item">
          Q{{ questions[cuurentPage].id }}: {{ questions[cuurentPage].q }}
        </p>
        <div class="col-6 offset-2">
          <div class="form-group form-check">
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="selected"
                value="A"
              />
              <label class="form-check-label" for="2A">
                {{ questions[cuurentPage].A }}
              </label>
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="selected"
                value="B"
              />
              <label class="form-check-label" for="2B">
                {{ questions[cuurentPage].B }}
              </label>
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="selected"
                value="C"
              />
              <label class="form-check-label" for="2C">
                {{ questions[cuurentPage].C }}</label
              >
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="selected"
                value="D"
              />
              <label class="form-check-label" for="2D">
                {{ questions[cuurentPage].D }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="mt-4">
          <button
            type="button"
            v-if="showStartBtn"
            @click="start"
            class="btn btn-danger m-2"
          >
            Start
          </button>
          <button
            type="button"
            v-if="showNextBtn"
            @click="next"
            class="btn btn-info m-2"
          >
            Next
          </button>
          <button
            type="button"
            @click="finishTest"
            class="btn btn-success m-2"
            v-if="showFinishBtn"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import NavBar from "@/components/Navbar";
export default {
  name: "ArticleThree",
  components: {
    NavBar,
  },
  data() {
    return {
      readingSpeed: "",
      userGroup: "",
      studentid: "",
      email: "",
      cuurentPage: 0,
      currentPar: "",
      startReadingTime: 0,
      endReadingTime: 0,
      showFinishBtn: false,
      showNextBtn: false,
      showStartBtn: true,
      showQ: false,
      title: "Spain’s Robin Hood",
      paragraphs: [
        {
          id: 0,
          orginalText: "",
          easyText: "",
        },
        {
          id: 1,
          orginalText: "",
          easyText: "",
        },
        {
          id: 2,
          orginalText: "",
          easyText: "",
        },
      ],
      selected: "",
      questions: [
        {
          id: 1,
          q: "",
          A: "",
          B: "",
          C: "",
          D: "",
          correctAnswer: "",
        },
        {
          id: 2,
          q: "",
          A: "",
          B: "",
          C: "",
          D: "",
          correctAnswer: "",
        },
        {
          id: 3,
          q: "",
          A: "",
          B: "",
          C: "",
          D: "",
          correctAnswer: "",
        },
        {
          id: 4,
          q: "",
          A: "",
          B: "",
          C: "",
          D: "",
          correctAnswer: "",
        },
      ],
    };
  },
  created() {
    this.readingSpeed = this.$store.state.readingSpeed;
    this.userGroup = this.$store.state.group;
    this.studentid = this.$store.state.studentid;
    this.email = this.$store.state.email;
  },

  methods: {
    async writeUserData() {
      await addDoc(collection(db, "responses"), {
        studentid: this.studentid,
        email: this.email,
        group: this.userGroup,
        startReadingTime: this.startReadingTime,
        endReadingTime: this.endReadingTime,
        title: this.title,
        answer: this.selected,
        paragraph_id: this.paragraphs[this.cuurentPage].id,
        question_id: this.questions[this.cuurentPage].id,
        score: false,
      });
      console.log("sent");
    },
    start() {
      this.startReadingTime = new Date().getSeconds();
      this.showStartBtn = false;
      this.showNextBtn = true;
      this.showQ = true;
      // at start all group get orignal text except group B
      if (this.userGroup === "B") {
        const par = this.paragraphs[this.cuurentPage].easyText;
        this.currentPar = par;
      } else {
        const par = this.paragraphs[this.cuurentPage].orginalText;
        this.currentPar = par;
      }
    },
    finishTest() {
      this.$router.push("/");
    },

    async next() {
      if (this.cuurentPage < this.paragraphs.length) {
        if (this.userGroup === "A") {
          const par = this.paragraphs[this.cuurentPage].orginalText;
          this.currentPar = par;
          this.endReadingTime = new Date().getSeconds() - this.startReadingTime;
          this.startReadingTime = new Date().getSeconds();
          this.writeUserData();
          this.cuurentPage++;
        } else if (this.userGroup === "B") {
          const par = this.paragraphs[this.cuurentPage].easyText;
          this.currentPar = par;
          this.endReadingTime = new Date().getSeconds() - this.startReadingTime;
          this.startReadingTime = new Date().getSeconds();
          this.writeUserData();
          this.cuurentPage++;
        } else {
          if (this.questions[this.cuurentPage].correctAnswer != this.selected) {
            const par = this.paragraphs[this.cuurentPage].easyText;
            this.currentPar = par;
            this.endReadingTime =
              new Date().getSeconds() - this.startReadingTime;
            this.startReadingTime = new Date().getSeconds();
            this.writeUserData();
            this.cuurentPage++;
          } else {
            const par = this.paragraphs[this.cuurentPage].orginalText;
            this.currentPar = par;
            this.endReadingTime =
              new Date().getSeconds() - this.startReadingTime;
            this.startReadingTime = new Date().getSeconds();
            this.writeUserData();
            this.cuurentPage++;
          }
        }
      } else {
        this.showFinishBtn = true;
        this.showNextBtn = false;
      }
    },
  },
};
</script>

<style scoped>
.mt-10 {
  margin-top: 10rem;
}
p {
  font-size: 22px;
  text-align: justify;
}
.mobileContainer {
  margin: 50px;
}
#myElement1,
#myElement2,
#myElement3 {
  margin: 10px;
  border: 2px solid black;
}

.form-check-label {
  font-size: 20px;
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
.btn {
  font-size: 22px;
}
#item {
  font-size: 22px;
  font-weight: bold;
}

.form-check-input[type="radio"] {
  border-radius: 50%;
  color: blue;
  border-color: blue;
  background-color: lightcoral;
}
.topM {
  margin-top: 50px;
}

.footer {
  margin-bottom: 200px;
}
</style>
