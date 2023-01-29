<template>
  <NavBar />
  <div class="container mt-5">
    <div>
      {{ studentid }} selected: {{ selected }} and current Group
      {{ userGroup }} and current page {{ cuurentPage }} and current q
      {{ currentQ }} start time {{ startReadingTime }} and end time
      {{ endReadingTime }}
    </div>
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
      title: "Spain’s Robin Hood",
      paragraphs: [
        {
          id: 0,
          advanced:
            "They call him the Robin Hood of the banks, a man who took out dozens of loans, worth almost half a million euros, with no intention of ever paying them back. Instead, Enric Duran handed the money out to projects that created and promoted alternatives to capitalism. After 14 months in hiding, Duran is unapologetic, even though his activities could land him in jail. I’m proud of what I did,'he said in an interview by Skype from an undisclosed location.' ",
          intimidate:
            "They call him the Robin Hood of the banks, a man who took out many loans worth almost half a million euros with no intention of ever paying them back. Instead, Enric Duran gave the money to projects that created and promoted alternatives to capitalism. After 14 months in hiding Duran is unapologetic, even though his activities could put him in jail. I’m proud of what I did, 'he said in an interview by Skype from a secret location.'",
          elementary:
            "They call him the Robin Hood of the banks. He is a man who took out loans for almost half a million euros and never paid the money back. Enric Duran gave the money to projects that created and supported alternatives to capitalism. Duran has spent 14 months in hiding.  He will not say he is sorry, even though he might go to prison for what he has done. I’m proud of what I’ve done,'he said in an interview by Skype from a secret location'.",
        },
        {
          id: 1,
          advanced:
            "From 2006 to 2008, Duran took out 68 commercial and personal loans from 39 banks in Spain. He farmed the money out to social activists, funding speaking tours against capitalism and TV cameras for a media network. I saw that, on one side, these social movements were building alternatives but that they lacked resources and communication capacities, he said.  ‘Meanwhile, our economy was perpetually growing, which lead to a system that created money out of nothing.’",
          intimidate:
            "From 2006 to 2008, Duran took out 68 commercial and personal loans from 39 banks in Spain. He gave the money to social activists, who used it to pay for speaking tours against capitalism and TV cameras for a media network. He said he saw that these social movements were building alternatives but that they didn’t have enough money. ’Meanwhile, constant growth was creating a system that created money out of nothing.’",
          elementary:
            "From 2006 to 2008, Duran took out 68 loans from 39 banks in Spain. He gave the money to social activists. They used the money to pay for speaking tours against capitalism and TV cameras for a media network. He said that these social activists didn’t have enough money. At the same time, he said, the economy was constantly growing, which created money from nothing.",
        },
        {
          id: 2,
          advanced:
            "The loans Duran swindled from banks were his way of regulating and denouncing this situation, he said. He started slowly. ‘I filled out a few credit applications with my real details. They denied me, but I just wanted to get a feel for what they were asking for.’ From there, the former table-tennis coach began to weave an intricate web of accounts, payments and transfers. ‘I was learning constantly.’ By the summer of 2007, he had discovered how to make the system work, applying for loans under the name of a false television production company. ‘Then, I managed to get a lot.’ €492,000, to be exact.",
          intimidate:
            "The loans Duran swindled from banks were his way of regulating and denouncing this situation, he said. He started slowly. ‘I filled out a few credit applications with my real details.  They said no, but I just wanted to understand what they were asking for.’ From there, the former table-tennis coach began to set up a confusing web of accounts, payments and transfers. ‘I was learning constantly.’ By the summer of 2007, he had discovered how to make the system work – he applied for loans under the name of a false television production company. ‘Then, I managed to get a lot.’ €492,000, to be exact.",
          elementary:
            "The loans Duran took out dishonestly from banks were his way of showing that this situation was wrong, he said. He started slowly. He tried to take out a few bank loans using his real details. The banks said no. Then, he learned how to get money from the banks. ‘I was learning all the time.’ By the summer of 2007, <A3>he learned how to make the system work – he took out loans under the name of a false television production company. This way, he got a lot of money. €492,000, to be exact.",
        },
        {
          id: 3,
          advanced:
            "Duran was arrested in Spain in 2009, on charges brought against him by six of the 39 banks that had lent him money. He spent two months in prison before being bailed for €50,000. In February 2013, facing up to eight years in prison, he decided to flee rather than stand trial. ‘I don’t see legitimacy in a judicial system based on authority, because I don’t recognize its authority,’ he said. His actions, he said, were in the vanguard of a worldwide debate on the economic crisis. The timing pushed the anti-capitalist movement into the light, just as many Spaniards were seeking alternatives to a system that had wreaked havoc on their lives.",
          intimidate:
            "Duran was arrested in Spain in 2009, on charges brought against him by six of the 39 banks that had lent him money. He spent two months in prison before being let out on €50,000 bail. In February 2013, threatened with up to eight years in prison, he decided to flee rather than stand trial because, he said, he doesn’t recognize the authority of the judicial system. His actions, he said, were an important part of a worldwide debate on the economic crisis. The timing pushed the anti-capitalist movement into the light, just as many Spaniards were looking for alternatives to a system that has caused chaos in their lives.",
          elementary:
            "Duran was arrested in Spain in 2009. He spent two months in prison; then, they let him out on €50,000 bail. In February 2013, with the possibility of up to eight years in prison, he decided to run away. His actions in 2006 to 2008 made many people notice the anti-capitalist movement for the first time. This happened at a time when many Spanish people were looking for alternatives to a system that has caused problems in their lives.",
        },
        {
          id: 4,
          advanced:
            "While the same actions would probably be better understood in today’s Spain, he said that they would not be needed. The anti-capitalist movement has grown from a fringe movement to one supported by thousands of Spaniards, he said, evidenced by the widely supported movements such as the Indignados. Duran is widening his focus to include Spain’s justice system, by promoting restorative justice. The people in Spain who believe that banks don’t work, they think that I don’t owe anything. I also think that, he said. But there is a part of a population that is not in agreement with us and I think I should respond to that. In his case, he said, the element of reciprocity he could offer to banks might lie in the insight he gleaned from years of obtaining bank loans fraudulently. He could share his thoughts on which best practices work and the bad ones that don’t, for the general population and for bank workers.",
          intimidate:
            "In today’s Spain, the anti-capitalist movement, and groups such as the Indignados, are supported by thousands of Spaniards.  Duran is now widening his focus to include Spain’s justice system, by promoting restorative justice. The people in Spain who believe that banks don’t work, they think that I don’t owe anything. I’ve already done my work, he said. But there is a part of a population that is not in agreement with us and I think I should respond to that. In his case, he said, he could offer banks the insight he got from years of obtaining bank loans fraudulently. He could share his thoughts on which best practices work and the bad ones that don’t, he suggested, for the general population and for bank workers.",
          elementary:
            "In today’s Spain, thousands of people support the anti-capitalist movement and groups such as the Indignados. Duran says he does not want to give back the money to the banks but he can offer them something. He learned a lot in the years when he was taking loans out dishonestly, so he can show the banks how they can improve things for people in general and for bank workers.",
        },
      ],
      selected: null,
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
        {
          id: 5,
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
      const dataObject = {
        par: this.paragraphs[this.cuurentPage].id,
        question_id: this.questions[this.currentQ].id,
        startReadingTime: this.startReadingTime,
        endReadingTime: this.endReadingTime,
        answer: this.selected,
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
        this.cuurentPage++;
      } else {
        const par = this.paragraphs[this.cuurentPage].advanced;
        this.currentPar = par;
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
            this.endReadingTime =
              new Date().getSeconds() - this.startReadingTime;
            this.startReadingTime = new Date().getSeconds();
            this.updateResponse();
            this.cuurentPage++;
            this.currentQ++;
          } else if (this.userGroup === "B") {
            const par = this.paragraphs[this.cuurentPage].elementary;
            this.currentPar = par;
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
              this.endReadingTime =
                new Date().getSeconds() - this.startReadingTime;
              this.startReadingTime = new Date().getSeconds();
              this.updateResponse();
              this.cuurentPage++;
              this.currentQ++;
            } else {
              const par = this.paragraphs[this.cuurentPage].advanced;
              this.currentPar = par;
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
</style>
