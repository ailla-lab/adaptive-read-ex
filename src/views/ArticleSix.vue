<template>
  <NavBar />
  <div class="container mt-5">
    <div class="mobileContainer">
      <div class="row">
        <h4>{{ title }}</h4>
        <p>{{ currentPar }}</p>
      </div>

      <div v-show="showQ" class="row topM">
        <p id="item">
          Q{{ questions[currentQ].id }}: {{ questions[currentQ].q }}
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
                {{ questions[currentQ].A }}
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
                {{ questions[currentQ].B }}
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
                {{ questions[currentQ].C }}</label
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
                {{ questions[currentQ].D }}
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
    <div class="footer"></div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import NavBar from "@/components/Navbar";
export default {
  name: "ArticleSix",
  components: {
    NavBar,
  },
  data() {
    return {
      readingSpeed: "",
      userGroup: "",
      studentid: "",
      email: "",
      level: "",
      answer: [],
      cuurentPage: 0,
      currentPar: "",
      startReadingTime: 0,
      endReadingTime: 0,
      currentQ: 0,

      showNextBtn: false,
      showStartBtn: true,
      showFinishBtn: false,
      showQ: false,
      title: "Hundreds Hurt after Meteorite Falls to Earth",
      paragraphs: [
        {
          id: 0,
          advanced:
            "Galina Zaglumyonova was woken in her flat in central Chelyabinsk by an enormous explosion that blew in the balcony windows and shattered clay pots containing her few houseplants. When she jumped out of bed she could see a huge vapor trail hanging in the morning sky and hear the wail of car alarms from the street below. ‘I didn’t understand what was going on,’ said Zaglumyonova. ‘There was a big explosion and then a series of little explosions. My first thought was that it was a plane crash.’ What she had actually witnessed were the death throes of a ten-ton meteorite that plunged to Earth in a series of fireballs just after sunrise. Officials put the number of people injured at almost 1,200, with more than 40 taken to hospital – most as a result of flying glass shattered by the sonic boom created by the meteorite’s descent. There were no reported deaths.",
          intimidate:
            "Galina Zaglumyonova was woken in her flat in central Chelyabinsk by an enormous explosion that blew in the balcony windows and shattered pots containing her houseplants. When she jumped out of bed, she could see a huge vapor trail hanging in the morning sky and hear car alarms from the street below. ‘I didn’t understand what was going on,’ said Zaglumyonova. ‘There was a big explosion and then a series of little explosions. My first thought was that it was a plane crash.’ What she had actually witnessed was a ten-ton meteorite that fell to Earth in a series of fireballs just after sunrise. Officials said almost 1,200 people had been injured, with more than 40 taken to hospital – most as a result of flying glass shattered by the sonic boom created by the meteorite’s fall. There were no reported deaths.",

          elementary:
            "Galina Zaglumyonova was woken in her flat in central Chelyabinsk by a very big explosion that broke the balcony windows and broken pots containing her houseplants. When she jumped out of bed she could see a huge vapor trail in the morning sky and hear car alarms from the street below. ‘I didn’t understand what was going on,’ said Zaglumyonova. ‘There was a big explosion and then lots of little explosions. My first thought was that it was a plane crash.’ In fact, it was a ten-ton meteorite that fell to Earth in lots of pieces. Almost 1,200 people were injured. More than 40 people were taken to hospital – most of them were hurt by flying glass. There were no deaths.",
        },
        {
          id: 1,
          advanced:
            "The meteorite entered the atmosphere traveling at a speed of at least 33,000mph and broke up into chunks between 18 and 32 miles above the ground, according to a statement from the Russian Academy of Sciences. The event caused panic in Chelyabinsk, a Russian city of one million people to the south of the Ural mountains, as mobile phone networks swiftly became jammed by the volume of calls. Amateur video footage from the area, often peppered with the obscene language of frightened observers, showed the chunks of meteorite glowing more brightly as they approached the moment of impact. The vapor trail was visible for hundreds of miles around, including in neighboring Kazakhstan.",
          intimidate:
            ": The meteorite entered the atmosphere traveling at a speed of at least 33,000mph and broke up into pieces between 18 and 32 miles above the ground, according to a statement from the Russian Academy of Sciences. The event caused panic in Chelyabinsk, a Russian city of one million people to the south of the Ural mountains. Mobile phone networks swiftly became jammed by the volume of calls. A video showed the pieces of meteorite glowing more brightly as they approached the moment of impact. The vapor trail was visible for hundreds of miles around, including in neighboring Kazakhstan.",
          elementary:
            " The meteorite entered the atmosphere at a speed of at least 33,000 miles per hour and broke into pieces between 18 and 32 miles above the ground. The event caused panic in Chelyabinsk, a Russian city of one million people to the south of the Ural mountains. Mobile phone networks quickly became jammed by the large number of calls. A video showed the pieces of meteorite glowing more brightly as they approached the moment of impact. People could see the vapor trail for hundreds of miles, even from neighboring Kazakhstan.",
        },
        {
          id: 2,
          advanced:
            "Tatyana Bets was at work in the reception area of a hospital clinic in the center of the city when the meteorite struck. ‘First we noticed the wind, and then the room was filled with a very bright light and we could see a cloud of some unspecified smoke in the sky,’ she said. Then, after a few minutes, came the explosions. At least three craters were subsequently discovered, according to the Ministry of the Interior, and were being monitored by the military. One crater was more than six meters wide, while another lump of meteorite was reported to have slammed through the thick ice of a nearby lake. Radiation levels at the impact sites were normal, according to local military officials.",
          intimidate:
            "Tatyana Bets was at work in the reception area of a hospital clinic in the center of the city when the meteorite hit. ‘First we noticed the wind, and then the room was filled with a very bright light and we could see a cloud of smoke in the sky,’ she said. Then, after a few minutes, the explosions came. At least three craters were discovered, according to the Ministry of the Interior. One crater was more than six meters wide and another piece of the meteorite broke through the thick ice of a nearby lake. Radiation levels at the impact sites were normal, according to the local military.",
          elementary:
            "Tatyana Bets was at work in the reception area of a hospital clinic in the center of the city when the meteorite hit. ‘First we noticed the wind, and then the room was filled with a very bright light and we could see smoke in the sky,’ she said. Then, after a few minutes, the explosions came. At least three craters were found. One crater was more than six meters wide. Another piece of meteorite broke through the thick ice of a lake. The local military said that the radiation levels at the impact sites were normal. ",
        },
        {
          id: 3,
          advanced:
            "In Chelyabinsk itself, schools and universities were closed and many other staff told to go home early. About 200 children were among the injured. A steady stream of lightly injured people, most suffering cuts from flying glass, came into the clinic where Bets works. She said a nearby college was particularly badly affected and many of the students were brought in suffering from fright. ‘There were a lot of girls from the college in shock. Some were very pale and many of them fainted,’ she said. Early estimates suggested more than 100,000 square meters of glass had been broken and 3,000 buildings hit. The total cost of the damage in the city was being valued at in excess of one billion roubles (£20m). ",
          intimidate:
            "In Chelyabinsk itself, schools and universities were closed and many other staff told to go home early. About 200 children were among the injured. A steady stream of lightly injured people, most suffering cuts from flying glass, came into the clinic where Bets works. She said a nearby college was particularly badly affected and many of the students were brought in suffering from fright. ‘There were a lot of girls from the college in shock. Some were very pale and many of them fainted,’ she said. Early estimates suggested more than 100,000 square meters of glass had been broken and 3,000 buildings hit. The total cost of the damage in the city was being valued at more than one billion roubles (£20m).",
          elementary:
            " In Chelyabinsk, schools and universities were closed and people were told to go home early. About 200 children were injured. Many people, mostly with cuts from flying glass, came into the clinic where Bets works. She said many of the students at a nearby college came to the hospital because they were scared. ‘There were a lot of girls from the college in shock,’ she said. More than 100,000 square meters of glass were broken and 3,000 buildings were hit. The total cost of the damage in the city is probably more than one billion roubles (£20 million).",
        },
        {
          id: 4,
          advanced:
            "The meteorite over Chelyabinsk arrived less than a day before asteroid 2012 DA14 was expected to make the closest pass to Earth (about 17,510 miles) of any recorded cosmic body. But experts said the two events were linked by nothing more than coincidence. Rumors and conspiracy theories, however, swirled in the first few hours after the incident. Reports on Russian state television and in local media suggested that the meteorite was engaged by local air defense units and blown apart at an altitude of more than 15 miles. ",
          intimidate:
            "The meteorite over Chelyabinsk arrived less than a day before asteroid 2012 DA14 was expected to pass Earth very closely (about 17,510 miles). But experts said the two events were not connected. There were lots of rumors and conspiracy theories, however, in the first few hours after the incident. Reports on Russian state television and in local media suggested that the meteorite was blown apart by local air defense units at an altitude of more than 15 miles.",
          elementary:
            "The meteorite arrived a day before asteroid 2012 DA14 passed Earth very closely (about 17,510 miles). But experts said the two events were not connected. There were lots of rumors in the first few hours after the incident. Reports on Russian state television and in local media suggested that the Russian military blew apart the meteorite.",
        },
        {
          id: 4,
          advanced:
            "The ultranationalist leader of Russia’s Liberal Democrat party, Vladimir Zhirinovsky, said it was not a meteorite but military action by the United States, echoing much of the speculation voiced on amateur film footage. ‘It’s not a meteorite falling – it’s a test of new American weapons,’ Zhirinovsky said. Some were quick to take advantage of the confusion. Enterprising people were offering lumps of meteorite for sale through internet sites within a few hours of the impact. President Vladimir Putin and the Prime Minister, Dmitry Medvedev, were informed about the incident, and Putin convened a meeting with the head of the Emergency Situations Ministry. ‘It’s proof that not only are economies vulnerable but the whole planet,’ Medvedev said at an economic forum in Siberia.",
          intimidate:
            "The ultra-nationalist leader of Russia’s Liberal Democrat party, Vladimir Zhirinovsky, said it was not a meteorite but military action by the United States. ‘It’s not a meteorite falling – it’s a test of new American weapons,’ Zhirinovsky said. Some were quick to take advantage. Enterprising people were offering pieces of meteorite for sale through internet sites within a few hours of the impact. President Vladimir Putin and the Prime Minister, Dmitry Medvedev, were informed about the incident, and Putin called a meeting with the head of the Emergency Situations Ministry. ‘It’s proof that not only are economies vulnerable but the whole planet,’ Medvedev said at an economic forum in Siberia.",
          elementary:
            "The ultra-nationalist leader of Russia’s Liberal Democrat party, Vladimir Zhirinovsky, said it was not a meteorite. He said it was a weapons test by the United States. Some people were selling pieces of meteorite through internet sites within a few hours of the impact. President Vladimir Putin and the Prime Minister, Dmitry Medvedev, were updated about the incident, and Putin met with the head of the Emergency Situations Ministry. Prime Minister Dmitry Medvedev said that it shows us that the whole planet is vulnerable",
        },
      ],
      selected: null,
      questions: [
        {
          id: 1,
          q: "What happened in Galina's apartment because of the explosion?",
          A: "The balcony collapsed",
          B: "Pots were damaged",
          C: " The apartment filled up with vapor",
          D: "A chandelier fell off the ceiling",
          correctAnswer: "B",
        },
        {
          id: 2,
          q: " Where is Chelyabinsk located?",
          A: "In Russia",
          B: "In Kazakhstan",
          C: "In the Ural mountains",
          D: "In Ukraine",
          correctAnswer: "A",
        },
        {
          id: 3,
          q: "What was Tatyana Bets doing as she noticed the wind, light and smoke?",
          A: "Hospitalized at a clinic",
          B: "Visiting a lake",
          C: " Preparing to go to bed",
          D: "Working at the city center",
          correctAnswer: "D",
        },
        {
          id: 4,
          q: "What is true of most of the people who came into the clinic where Bets works?",

          A: "They were injured by glass",
          B: "They were children",
          C: "They were in shock",
          D: "hey were brought in ambulances",
          correctAnswer: "A",
        },
        {
          id: 5,
          q: " What is true of the asteroid 2012 DA14?",
          A: "It hit earth 17,510 miles away from the landing site of the meteorite",
          B: "It was blown apart by the Russian military",
          C: "It passed Earth without hitting it",
          D: "It created panic in Russia",
          correctAnswer: "C",
        },
        {
          id: 6,
          q: "What did Vladimir Zhirinovsky say?",
          A: "That meteorite pieces were sold online",
          B: "That the event demonstrates how vulnerable Russia is",
          C: " That his thoughts are with the Russian people",
          D: "That an arms trial was conducted by another country",
          correctAnswer: "D",
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
    async sendUserData() {
      await addDoc(collection(db, "responses"), {
        studentid: this.studentid,
        email: this.email,
        group: this.userGroup,
        title: this.title,
        answer: this.answer,
      });
      console.log("sent");
    },

    updateResponse() {
      var today = new Date();
      var time =
        today.getDay() +
        "-" +
        today.getMonth() +
        "-" +
        today.getFullYear() +
        "  " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();
      const dataObject = {
        par: this.paragraphs[this.cuurentPage].id,
        question_id: this.questions[this.currentQ].id,
        startReadingTime: this.startReadingTime,
        endReadingTime: this.endReadingTime,
        answer: this.selected,
        time: time,
        level: this.level,
      };
      this.answer.push(dataObject);
    },

    start() {
      this.startReadingTime = new Date().getSeconds();
      this.showStartBtn = false;
      this.showNextBtn = true;
      this.showQ = true;
      // at start all group get orignal text except group B
      if (this.userGroup === "B") {
        const par = this.paragraphs[this.cuurentPage].elementary;
        this.currentPar = par;
        this.level = "elementary";
        this.cuurentPage++;
      } else {
        const par = this.paragraphs[this.cuurentPage].advanced;
        this.currentPar = par;
        this.level = "advanced";
        this.cuurentPage++;
      }
    },
    finishTest() {
      this.sendUserData();
      this.$router.push("/");
    },

    async next() {
      if (this.selected == null) {
        alert("You need to answer the question");
      } else {
        if (this.cuurentPage < this.paragraphs.length) {
          if (this.userGroup === "A") {
            const par = this.paragraphs[this.cuurentPage].advanced;
            this.currentPar = par;
            this.level = "advanced";
            this.endReadingTime =
              new Date().getSeconds() - this.startReadingTime;
            this.startReadingTime = new Date().getSeconds();
            this.updateResponse();
            this.cuurentPage++;
            this.currentQ++;
          } else if (this.userGroup === "B") {
            const par = this.paragraphs[this.cuurentPage].elementary;
            this.currentPar = par;
            this.level = "elementary";
            this.endReadingTime =
              new Date().getSeconds() - this.startReadingTime;
            this.startReadingTime = new Date().getSeconds();
            this.updateResponse();
            this.cuurentPage++;
            this.currentQ++;
          } else {
            if (
              this.questions[this.cuurentPage].correctAnswer != this.selected
            ) {
              const par = this.paragraphs[this.cuurentPage].elementary;
              this.currentPar = par;
              this.level = "elementary";
              this.endReadingTime =
                new Date().getSeconds() - this.startReadingTime;
              this.startReadingTime = new Date().getSeconds();
              this.updateResponse();
              this.cuurentPage++;
              this.currentQ++;
            } else {
              const par = this.paragraphs[this.cuurentPage].advanced;
              this.currentPar = par;
              this.level = "advanced";
              this.endReadingTime =
                new Date().getSeconds() - this.startReadingTime;
              this.startReadingTime = new Date().getSeconds();
              this.updateResponse();
              this.cuurentPage++;
              this.currentQ++;
            }
          }
        } else {
          this.showNextBtn = false;
          this.showFinishBtn = true;
        }
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
  font-size: 22px;
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
}
.topM {
  margin-top: 50px;
}
</style>
