<template>
  <div class="mobileContainer">
    <div class="row">
      <h3>Readability</h3>

      <section v-show="showText1" ref="box1" id="#box1">
        <div v-show="showOrginalText1" ref="orginalBox1" id="#myElement1">
          <p>
            <strong>[ORGINAL] </strong> We always recommend aiming for a
            Readable grade A. This ensures that your writing will reach the
            general public. If you're measuring your text with the Flesch
            Kincaid Grade Level, we recommend aiming for a FK Grade 8. This
            corresponds to 8th Grade in the USA education system. It is
            recommended for the general public. It doesn't mean you're writing
            for an eighth-grader. Certainly, an eighth-grader can understand
            your content if it's written to that level. But writers and
            marketers from a wide variety of fields can benefit from this.
            Adults enjoy reading several grades below their actual reading
            level. Further, a lower Flesch-Kincaid Grade Level makes your
            content skimmable. This saves your reader's time. It also saves your
            time by reducing queries.
          </p>
        </div>

        <div v-show="showEasyText1" ref="easyBox1" id="#myElement1">
          <p>
            <strong>[MODIFED]</strong> We always recommend aiming for a Readable
            grade A. This ensures that your writing will reach the general
            public. If you're measuring your text with the Flesch Kincaid Grade
            Level, we recommend aiming for a FK Grade 8. This corresponds to 8th
            Grade in the USA education system. It is recommended for the general
            public. It doesn't mean you're writing for an eighth-grader.
            Certainly, an eighth-grader can understand your content if it's
            written to that level. But writers and marketers from a wide variety
            of fields can benefit from this. Adults enjoy reading several grades
            below their actual reading level. Further, a lower Flesch-Kincaid
            Grade Level makes your content skimmable. This saves your reader's
            time. It also saves your time by reducing queries.
          </p>
        </div>

        <div class="row">
          <div class="form-group">
            <p class="pt-0" id="left">2. What is Reading for you?</p>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="questionOne"
                value="1"
              />
              <label class="form-check-label" for="2A"> a. Information </label>
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="questionOne"
                value="0"
              />
              <label class="form-check-label" for="2B"> b. Knowledge </label>
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="questionOne"
                value="00"
              />
              <label class="form-check-label" for="2C"> c. Leisure </label>
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="questionOne"
                value="000"
              />
              <label class="form-check-label" for="2D"> d. Pleasure </label>
            </div>
            <div id="left">
              <input
                class="form-check-input"
                type="radio"
                v-model="questionOne"
                value="0000"
              />
              <label class="form-check-label" for="2E"> e. Discussion </label>
            </div>
          </div>
        </div>
      </section>

      <section v-show="showText2" ref="box2" id="#box2">
        <div v-show="showOrginalText2" ref="orginalBox2" id="#myElement2">
          <p>
            <strong>[ORGINAL]</strong> Readability is a measure of how easy a
            piece of text is to read. A readability score refers to the
            familiarity and structure of your text. It can tell you what level
            of education someone will need to be able to read a piece of text
            easily. The most common of these scores is the Flesch Kincaid Grade
            Level. Readable's bespoke A-E rating gives you a holistic view of
            your readability. It takes several widely-used formulas into
            account. Giving you goals to work towards and a score that's quick
            and easy to understand.
          </p>
        </div>
        <div v-show="showEasyText2" ref="easyBox2" id="#myElement2">
          <p>
            <strong>[MODIFED]</strong> Readability is a measure of how easy a
            piece of text is to read. A readability score refers to the
            familiarity and structure of your text. It can tell you what level
            of education someone will need to be able to read a piece of text
            easily. The most common of these scores is the Flesch Kincaid Grade
            Level. Readable's bespoke A-E rating gives you a holistic view of
            your readability. It takes several widely-used formulas into
            account. Giving you goals to work towards and a score that's quick
            and easy to understand.
          </p>
        </div>
      </section>
      <section v-show="showText3" ref="box3" id="#box3">
        <div v-show="showOrginalText3" ref="orginalBox3" id="#myElement3">
          <p>
            <strong>[ORGINAL]</strong> The impact of poor readability on the
            success of content is significant, and that is becoming more
            apparent as the river of content we all experience grows into more
            of a torrent. Attention spans are decreasing. Distractions are
            increasing. The 280 character tweet is taking over from the 2000
            word article. With all that in mind, it's incredibly important that,
            in addition to writing interesting and engaging content, you write
            it in a way that people find easy to take in. So people are turning
            to software, not as a replacement for editorial expertise, but as a
            complement to it. A computer can quickly use algorithms like the
            Flesch Reading Ease or the Gunning Fog index to spot problematic
            passages of text. And that's where we come in. At Readable.io, we
            are fascinated - almost obsessed - with readability. We are always
            looking at more ways to measure it, more ways to recommend
            improvements, and more ways to help our customers make readability
            scoring and analysis a core part of their content management
            strategies. Our software can analyse anything you can throw at it,
            from Word documents to entire websites, and help you focus your
            efforts where they are going to have the maximum impact
          </p>
        </div>

        <div v-show="showEasyText3" ref="easyBox3" id="#myElement3">
          <p>
            <strong>[MODIFED]</strong> The impact of poor readability on the
            success of content is significant, and that is becoming more
            apparent as the river of content we all experience grows into more
            of a torrent. Attention spans are decreasing. Distractions are
            increasing. The 280 character tweet is taking over from the 2000
            word article. With all that in mind, it's incredibly important that,
            in addition to writing interesting and engaging content, you write
            it in a way that people find easy to take in. So people are turning
            to software, not as a replacement for editorial expertise, but as a
            complement to it. A computer can quickly use algorithms like the
            Flesch Reading Ease or the Gunning Fog index to spot problematic
            passages of text. And that's where we come in. At Readable.io, we
            are fascinated - almost obsessed - with readability. We are always
            looking at more ways to measure it, more ways to recommend
            improvements, and more ways to help our customers make readability
            scoring and analysis a core part of their content management
            strategies. Our software can analyse anything you can throw at it,
            from Word documents to entire websites, and help you focus your
            efforts where they are going to have the maximum impact
          </p>
        </div>
      </section>
    </div>

    <div class="row">
      <div class="mt-4">
        <button type="button" @click="next" class="btn btn-info m-2">
          Next
        </button>
        <button type="button" @click="finish" class="btn btn-success m-2">
          Finish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ArticleTwo",
  data() {
    return {
      userGroup: "A",
      readingSpeed: this.$store.getters.readingSpeed,
      currentSection: 0,

      showText1: true,
      showText2: false,
      showText3: false,

      showOrginalText1: true,
      showOrginalText2: false,
      showOrginalText3: false,
      showOrginalText4: false,
      showOrginalText5: false,
      showEasyText2: false,
      showEasyText3: false,
      showEasyText4: false,
      showEasyText5: false,
      showEasyText6: false,

      questionOne: null,
      questionTwo: null,
      questionThree: null,
    };
  },
  methods: {
    // A =>  hard , b => easy/simplfied, c => modifed
    next() {
      if (this.questionOne != null) {
        this.showText1 = false;
        this.showText2 = true;
        this.showOrginalText1 = false;
        this.showOrginalText2 = true;
      } else if (this.userGroup === "B" && this.questionOne != null) {
        this.showEasyText2 = true;
      } else if (this.userGroup === "C" && this.questionOne != null) {
        if (this.questionOne != 0) {
          this.showEasyText2 = true;
        } else {
          this.showOrginalText2 = true;
        }
      }
    },
  },
  computed: {
    ...mapState(["readingSpeed"]),
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
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
</style>
