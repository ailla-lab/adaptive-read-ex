<template>
  <div class="container mt-10">
    <div class="mobileContainer">
      <div class="row">
        <p>{{ currentPar }}</p>
      </div>
      <div v-show="showQ" ref="box1" id="#box1" class="row">
        <div class="form-group">
          <p class="pt-0" id="left">{{ questions[cuurentPage].q }}</p>
          <div id="left">
            <input
              class="form-check-input"
              type="radio"
              v-model="questionOneValue"
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
              v-model="questionOneValue"
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
              v-model="questionOneValue"
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
              v-model="questionOneValue"
              value="D"
            />
            <label class="form-check-label" for="2D">
              {{ questions[cuurentPage].D }}
            </label>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ArticleThree",
  data() {
    return {
      readingSpeed: this.$store.state.readingSpeed,
      userGroup: "A",
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
      questionOneValue: null,
      questionTwoValue: null,
      questionThreeValue: null,

      questions: [
        {
          id: 0,
          q: "this is question one",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          cuurentAnswer: "C",
        },
        {
          id: 1,
          q: "this is question Two",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          cuurentAnswer: "C",
        },
        {
          id: 2,
          q: "this is question Three",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          cuurentAnswer: "C",
        },
        {
          id: 3,
          q: "this is question Four",
          A: "Option A",
          B: "Option B",
          C: "Option C",
          D: "Option D",
          cuurentAnswer: "C",
        },
      ],
      cuurentPage: 0,
      currentPar: "",

      startReadingTime: 0,
      endReadignTime: 0,
      showNextBtn: false,
      showStartBtn: true,
      showQ: false,
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
      this.showQ = true;
    },
    next() {
      if (this.cuurentPage < this.paragraphs.length) {
        this.endReadignTime = Date.now() - this.startReadingTime;
        this.startReadingTime = Date.now();
        if (this.userGroup === "A") {
          const par = this.paragraphs[this.cuurentPage].orginalText;
          this.currentPar = par;
          this.cuurentPage++;
        } else if (this.userGroup === "B") {
          const par = this.paragraphs[this.cuurentPage].easyText;
          this.currentPar = par;
          this.cuurentPage++;
        } else {
          if (this.questions[this.cuurentPage].cuurentAnswer != "C") {
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
        this.$router.push("/");
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
  font-size: 18px;
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
</style>
