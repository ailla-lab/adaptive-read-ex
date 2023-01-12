<template>
  <div class="container mt-10">
    <div>
      {{ userId }} selected: {{ selected }} and current Group
      {{ userGroup }} and current page {{ cuurentPage }} start time
      {{ startReadingTime }} and end time
      {{ endReadingTime }}
    </div>
    <div class="mobileContainer">
      <div class="row">
        <p>{{ currentPar }}</p>
      </div>

      <div v-show="showQ" class="row border topM">
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
import { mapState, mapGetters } from "vuex";
import { getDatabase, ref, set } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "ArticleThree",
  data() {
    return {
      readingSpeed: this.$store.state.readingSpeed,
      userGroup: this.$store.state.group,
      userId: this.$store.state.user,
      showFinishBtn: false,
      cuurentPage: 0,
      currentPar: "",

      startReadingTime: 0,
      endReadingTime: 0,
      showNextBtn: false,
      showStartBtn: true,
      showQ: false,
      paragraphs: [
        {
          id: 0,
          orginalText:
            "[ORGINAL] We always recommend aiming for a Readable grade A. This ensures that your writing will reach the general public. If you'r measuring your text with the Flesch Kincaid Grade Level, we recommend aiming for a FK Grade 8. This corresponds to 8th Grade in the USA education system. It is recommended for the general public. It doesn't mean you're writing for an eighth-grader. Certainly, an eighth-gradercan understand your content if it's written to that level. But writers and marketers from a wide variety of fields can benefit from this. Adults enjoy reading several grades below their actual reading level. Further, a lower Flesch-Kincaid Grade Level makes your content skimmable. This saves your reader's time. It also saves your time by reducing queries.",
          easyText:
            "[MODIFED] We always recommend aiming for a Readable grade A. This ensures that your writing will reach the general public. If you're measuring your text with the Flesch Kincaid Grade Level, we recommend  aiming for a FK Grade 8. This corresponds to 8th Grade in the USA education system. It is recommended for the general public. It doesn't mean you're writing for an eighth-grader. Certainly, an eighth-grader can understand your content if it's written to that level. But writers  and marketers from a wide variety of fields can benefit from this.  Adults enjoy reading several grades below their actual reading level. Further, a lower Flesch-Kincaid Grade Level makes your content skimmable. This saves your reader's time. It also saves your time by reducing queries.",
        },
        {
          id: 1,
          orginalText:
            "[ORGINAL} Readability is a measure of how easy a piece of text is to read. A readability score refers to the familiarity and structure o  your text. It can tell you what level of education someone will need   to be able to read a piece of text easily. The most common of these  scores is the Flesch Kincaid Grade Level. Readable's bespoke A-  rating gives you a holistic view of your readability. It takes several   widely-used formulas into account. Giving you goals to work towards and a score that's quick and easy to understand.",
          easyText:
            "[MODIFED] Readability is a measure of how easy a piece of text is to   read. A readability score refers to the familiarity and structure of         your text. It can tell you what level of education someone will need      to be able to read a piece of text easily. The most common of thes        scores is the Flesch Kincaid Grade Level. Readable's bespoke A-E    rating gives you a holistic view of your readability. It takes several widely-used formulas into account. Giving you goals to work towards   and a score that's quick and easy to understand.",
        },
        {
          id: 2,
          orginalText:
            "[ORGINAL] The impact of poor readability on the success of content is  significant, and that is becoming more apparent as the river o      content we all experience grows into more of a torrent. Attention  spans are decreasing. Distractions are increasing. The 280 character   tweet is taking over from the 2000 word article. With all that in     mind, it's incredibly important that, in addition to writing   interesting and engaging content, you write it in a way that people   find easy to take in. So people are turning to software, not as a replacement for editorial expertise, but as a complement to it. A computer can quickly use algorithms like the Flesch Reading Ease or the Gunning Fog index to spot problematic passages of text. And that's    where we come in. At Readable.io, we are fascinated - almost obsessed    - with readability. We are always looking at more ways to measure it, more ways to recommend improvements, and more ways to help our    customers make readability scoring and analysis a core part of their   content management strategies. Our software can analyse anything you     can throw at it, from Word documents to entire websites, and help you   focus your efforts where they are going to have the maximum impact",
          easyText:
            "[MODIFED] The impact of poor readability on the success of content is significant, and that is becoming more apparent as the river of       content we all experience grows into more of a torrent. Attention   spans are decreasing. Distractions are increasing. The 280-character    tweet is taking over from the 2000 word article. With all that in   mind, it's incredibly important that, in addition to writing    interesting and engaging content, you write it in a way that people    find easy to take in. So people are turning to software, not as a   replacement for editorial expertise, but as a complement to it. A          computer can quickly use algorithms like the Flesch Reading Ease or          the Gunning Fog index to spot problematic passages of text. And that's          where we come in. At Readable.io, we are fascinated - almost obsessed      - with readability. We are always looking at more ways to measure it,     more ways to recommend improvements, and more ways to help our          customers make readability scoring and analysis a core part of their         content management strategies. Our software can analyse anything you       can throw at it, from Word documents to entire websites, and help you  focus your efforts where they are going to have the maximum impact",
        },
      ],
      selected: "",
      questions: [
        {
          id: 0,
          q: "this is question one",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          correctAnswer: "C",
        },
        {
          id: 1,
          q: "this is question Two",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          correctAnswer: "C",
        },
        {
          id: 2,
          q: "this is question Three",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          correctAnswer: "C",
        },
        {
          id: 3,
          q: "this is question Four",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          correctAnswer: "C",
        },
      ],
    };
  },
  computed: {
    ...mapState(["readingSpeed"]),
    ...mapGetters({ userGroup: "getUserGroup" }),
  },
  methods: {
    writeUserData(userId) {
      const db = getDatabase();
      set(ref(db, "user/" + userId), {
        article_id: this.questions[this.cuurentPage].id,
      });
      console.log("sent");
    },
    start() {
      this.startReadingTime = Date.now();
      this.showStartBtn = false;
      this.showNextBtn = true;
      this.showQ = true;
      this.cuurentPage++;
      if (this.userGroup === "B") {
        const par = this.paragraphs[this.cuurentPage].easyText;
        this.currentPar = par;
      } else {
        const par = this.paragraphs[this.cuurentPage].orginalText;
        this.currentPar = par;
      }
    },
    // sendResult() {

    // },
    finishTest() {
      // this.sendResult()
      this.$router.push("/");
    },

    async getAllDoc() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    },

    // TODO reading time
    // this.endReadingTime = Date.now() - this.startReadingTime;
    // this.startReadingTime = Date.now();
    next() {
      this.getAllDoc();
      if (this.cuurentPage < this.paragraphs.length) {
        if (this.userGroup === "A") {
          const par = this.paragraphs[this.cuurentPage].orginalText;
          this.currentPar = par;
          this.writeUserData(this.userId);
          this.cuurentPage++;
        } else if (this.userGroup === "B") {
          this.endReadingTime = Date.now() - this.startReadingTime;
          this.startReadingTime = Date.now();
          const par = this.paragraphs[this.cuurentPage].easyText;
          this.currentPar = par;
          this.cuurentPage++;
        } else {
          if (this.questions[this.cuurentPage].correctAnswer != this.selected) {
            const par = this.paragraphs[this.cuurentPage].easyText;
            this.currentPar = par;
            this.cuurentPage++;
          } else {
            const par = this.paragraphs[this.cuurentPage].orginalText;
            this.currentPar = par;
            this.cuurentPage++;
          }
        }
      } else {
        this.showFinishBtn = true;
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

.topM {
  margin-top: 50px;
}
</style>
