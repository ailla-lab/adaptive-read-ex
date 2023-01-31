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
      title: "Why is Sweden Closing its Prisons?",
      paragraphs: [
        {
          id: 0,
          advanced:
            "Swedish prisons have long had a reputation around the world for being progressive. But are the country’s prisons a soft option? The head of Sweden’s prison and probation service, Nils Oberg, announced in November 2013 that four Swedish prisons are to be closed due to an ‘out of the ordinary’ decline in prisoner numbers. Although there has been no fall in crime rates, between 2011 and 2012 there was a 6% drop in Sweden’s prisoner population, now a little over 4,500. A similar decrease is expected in 2013 and 2014. Oberg admitted to being puzzled by the unexpected dip, but expressed optimism that the reason was to do with how his prisons are run. ‘We certainly hope that the efforts we invest in rehabilitation and preventing relapse of crime has had an impact,’ he said.",
          intimidate:
            "Swedish prisons have long had a reputation around the world for being progressive. But are the country’s prisons a soft option? The head of Sweden’s prison and probation service, Nils Oberg, said in November 2013 that four Swedish prisons will close due to an ‘out of the ordinary’ fall in prisoner numbers. Although there has been no fall in crime rates, between 2011 and 2012 there was a 6% fall in Sweden’s prisoner population, now a little over 4,500. A similar decrease is expected in 2013 and 2014. Oberg said he was puzzled by the unexpected fall, but hoped that the reason was to do with how his prisons are run. ‘We certainly hope that the efforts we put into rehabilitation and preventing criminals from reoffending has made a difference,’ he said.",
          elementary:
            "Swedish prisons have a reputation around the world for being liberal and modern. But are the country’s prisons too soft? The head of Sweden’s prison and probation service, Nils Oberg, said in November 2013 that four Swedish prisons will close because of an ‘out of the ordinary’ drop in the number of prisoners. There has been no fall in crime rates, but, between 2011 and 2012, there was a 6% drop in the number of people in Sweden’s prisons, now a little over 4,500. Oberg said he was confused by the drop in numbers, but hoped that the reason was to do with how his prisons are managed. ‘We certainly hope that the efforts we put into rehabilitation and into stopping criminals from reoffending has made a difference,’ he said.",
        },
        {
          id: 1,
          advanced:
            "‘The modern prison service in Sweden is very different from when I joined as a young prison officer in 1978,’ says Kenneth Gustafsson, governor of Kumla Prison, Sweden’s most secure jail. However, he doesn’t think the system has gone soft. ‘When I joined, the focus was very much on humanity in prisons. Prisoners were treated well – maybe too well, some might say. But, after a number of high-profile escapes in 2004, we had to implement changes to make prisons more secure.’ The Swedes still managed to maintain a broadly humane approach to sentencing, even of the most serious offenders: jail terms rarely exceed ten years. Sweden was the first country in Europe to introduce the electronic tagging of convicted criminals and continues to strive to minimize short-term prison sentences wherever possible by using community-based punishments, which have been proven to be more effective at reducing reoffending.",
          intimidate:
            " ‘The modern prison service in Sweden is very different from when I joined as a young prison officer in 1978,’ says Kenneth Gustafsson, governor of Kumla Prison, Sweden’s most secure jail. However, he doesn’t think the system has gone soft. ‘When I joined, the focus was very much on humanity in prisons. Prisoners were treated well – maybe too well, some might say. But, after a number of escapes in 2004, we had to implement changes to make prisons more secure.’ The Swedes still have a humane approach to sentencing, even of the most serious offenders: jail sentences are not usually more than ten years. Sweden was the first country in Europe to introduce the electronic tagging of convicted criminals and continues to keep prison sentences short wherever possible by using community-based punishments. These have been effective at stopping criminals from reoffending.",
          elementary:
            "‘The modern prison service in Sweden is very different from when I joined as a young prison officer in 1978,’ says Kenneth Gustafsson, governor of Kumla Prison, Sweden’s most secure jail. ‘When I joined, prisoners were treated well – maybe too well. But, after high profile escapes in 2004, we had to make the prisons more secure.’ In Sweden, prison sentences are not usually for more than ten years. Sweden was the first country in Europe to introduce the electronic tagging of criminals and it continues to keep prison sentences short when possible by using community-based punishments. These have stopped many criminals from reoffending.",
        },
        {
          id: 2,
          advanced:
            "The overall reoffending rate in Sweden stands at between 30 and 40% over three years – to compare that with another European country, the number is around half that of the UK. One likely reason for the relatively low reoffending rate and the low rate of incarceration in Sweden (below 70 per 100,000 head of population) is that the age of criminal responsibility is set at 15. In the UK, for example, children aged ten to 17 and young people under the age of 21 record the highest reoffending rates: almost three quarters and two thirds, respectively. A good proportion of these offenders go on to populate adult jails. In Sweden, no young person under the age of 21 can be sentenced to life – this is not the case in many other countries – and every effort is made to ensure that as few juvenile offenders as possible end up in prison.",
          intimidate:
            "The overall reoffending rate in Sweden is between 30 and 40% over three years – to compare that with another European country, the number is around half that of the UK. One thing that has kept reoffending down and the number of prisoners in Sweden below 70 per 100,000 people is that the age of criminal responsibility is 15. In the UK, for example, children aged ten to 17 and young people under the age of 21 have the highest reoffending rates. In Sweden, no young person under the age of 21 can be sentenced to life – this is not the case in many other countries – and they try to keep young offenders out of prison.",
          elementary:
            "The reoffending rate in Sweden is between 30 and 40% – to compare that with another European country, the number is around half that of the UK. One thing that has kept reoffending down and the number of prisoners in Sweden below 70 per 100,000 people is that anyone under 15 cannot be responsible for their crime. Also, in Sweden, no young person under the age of 21 can be sentenced to life – this is not the same in many other countries – and they try to keep young offenders out of prison.",
        },
        {
          id: 3,
          advanced:
            "One strong reason for the drop in prison numbers might be the amount of post-prison support available in Sweden. A confident probation service – a government agency – is tasked not only with supervising those on probation but is also guaranteed to provide treatment programs for offenders with drug, alcohol or violence issues. The service is assisted by around 4,500 lay supervisors – members of the public who volunteer to befriend and support offenders under supervision. ‘In Sweden, we believe very much in the concept of rehabilitation, without being naive of course,’ says Gustafsson. ‘There are some people who will not or cannot change. But, in my experience, the majority of prisoners want to change, and we must do what we can to help to facilitate that. It is not always possible to achieve this in one prison sentence.’",
          intimidate:
            "One strong reason for the fall in prison numbers might be the amount of post-prison support available in Sweden. A government-run probation service supervises people on probation and provides treatment programs for offenders with drug, alcohol or violence problems. The service is helped by around 4,500 members of the public who volunteer to befriend and support offenders under supervision. ‘In Sweden, we believe very much in the idea of rehabilitation,’ says Gustafsson. ‘Of course, there are some people who will not or cannot change. But, in my experience, the majority of prisoners want to change and we must do what we can to help them.’",
          elementary:
            "One reason for the drop in prison numbers might be the amount of post-prison support available in Sweden. A government-run probation service gives treatment programs to offenders with drug, alcohol or violence problems. Around 4,500 Swedes help the service – they volunteer to make friends with and support offenders. ‘In Sweden, we believe very much in the idea of rehabilitation,’ says Gustafsson. ‘Of course, there are some people who will not or cannot change. But, in my experience, most prisoners want to change and we must do what we can to help them.’",
        },
      ],
      selected: null,
      questions: [
        {
          id: 1,
          q: "What changed between 2011 and 2012?",
          A: "Crime rates in Sweden have dropped",
          B: "There are fewer people in Sweden’s prisons",
          C: "Swedish prisons became more liberal and progressive",
          D: " The Swedish government started publishing crime statistics",
          correctAnswer: "B",
        },
        {
          id: 2,
          q: "What changed in Swedish prisons after 2004?",
          A: "Prisons have become more secur",
          B: "There have been more high profile escapes",
          C: "Prison sentences have become shorter",
          D: "Prisoners were allowed to receive visitors more frequently",
          correctAnswer: "A",
        },
        {
          id: 3,
          q: "What does “below 70 per 100,000” refer to?",
          A: "The reoffending rate for people under 15 in Sweden",
          B: "The success rate of prison escape attempts in Sweden",
          C: "The number of people who sit in Swedish prisons",
          D: "The number of people under 21 sentenced to life in Sweden",
          correctAnswer: "C",
        },
        {
          id: 4,
          q: "Who helps the treatment programs for prisoners?",
          A: "Former offenders",
          B: "Gustafsson",
          C: "eligious organizations",
          D: "4,500 volunteers",
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
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
