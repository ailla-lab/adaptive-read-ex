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
  name: "ArticleFour",
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
      title: "Nepal’s Tiger Population on the Rise",
      paragraphs: [
        {
          id: 0,
          advanced:
            "Tigers are more numerous in Nepal than at any time since the 1970s, a new census has revealed, giving conservationists hope that the big cats, whose numbers have been dropping across south Asia for 100 years, can be saved. The number of wild royal bengal tigers in Nepal has increased to 198 – a 63.6% rise in five years – the government survey showed. ‘This is very encouraging,’ said Maheshwar Dhakal, an ecologist with Nepal’s Department of National Parks and Wildlife Conservation. The census is based on the examination of pictures from more than 500 cameras placed in five protected areas and three wildlife corridors. More than 250 conservationists and wildlife experts worked on the survey, which cost about £250,000.",
          intimidate:
            "According to a new census, there are more tigers in Nepal than at any time since the 1970s. This has given conservationists hope that the big cats, whose numbers have been dropping across south Asia for 100 years, can be saved. The number of wild royal bengal tigers in Nepal has increased to 198 – a 63.6% rise in five years – the government survey showed. ‘This is very good news,’ said Maheshwar Dhakal, an ecologist with Nepal’s Department of National Parks and Wildlife Conservation. The census is based on the examination of pictures from more than 500 cameras in five protected areas and three wildlife corridors. More than 250 conservationists and wildlife experts worked on the survey, which cost about £250,000.",
          elementary:
            "According to a new survey, there are more tigers in Nepal than at any time since the 1970s. The number of big cats has been decreasing in south Asia for 100 years, but conservationists now hope that we can save them. The number of wild royal bengal tigers in Nepal has increased to 198 – a 63.6% increase in five years – the survey showed. ‘This is very good news,’ said Maheshwar Dhakal, an ecologist with Nepal’s Department of National Parks and Wildlife Conservation. The survey looked at pictures from more than 500 cameras in five protected areas and three wildlife corridors. More than 250 conservationists and wildlife experts worked on the survey, which cost about £250,000.",
        },
        {
          id: 1,
          advanced:
            "Increasing prosperity in Asia has pushed up prices for tiger skins and the body parts used in traditional Chinese medicines. International gangs pay poor local Nepali significant sums to kill the cats. The skin and bones are handed to middlemen, who pass easily through the porous border to India, where the major dealers are based. One major problem is complicity between senior officials and mafia networks involved in the trade.",
          intimidate:
            "Increasing wealth in Asia has led to higher prices for tiger skins and the body parts used in traditional Chinese medicines. International gangs pay poor local Nepali large amounts of money to kill the cats. The skin and bones are given to middlemen, who pass easily through the border with India, where the major dealers are based. One major problem is that some senior officials help mafia networks involved in the trade.",
          elementary:
            "Some rich people want tiger skins. Tiger body parts are used in traditional Chinese medicine. International gangs pay poor local Nepali people large amounts of money to kill the cats. The skin and bones are taken through the border to India, where the big dealers are. One big problem is that some senior officials help the mafia who are involved in the illegal buying and selling.",
        },
        {
          id: 2,
          advanced:
            "Conservation experts credit the increase in numbers to the effective policing of national parks, stronger anti-poaching drives and better management of tiger habitats in Nepal, where forests cover 29% of the land. But they say Nepal needs to do more to protect the habitat and animals on which tigers prey so the big cats have enough space to roam and food to eat. As the number of tigers has increased over the years, so have incidents of conflict with villagers. Seven people were killed in attacks by tigers around national parks in 2012 compared to four in 2011, park officials said. Villagers are also seeking better protection.’",
          intimidate:
            "Conservation experts believe that the increase in tiger numbers is the result of better policing of national parks and better management of tiger habitats in Nepal, where forests cover 29% of the land. But they say Nepal needs to do more to protect the habitat and animals on which tigers feed so the big cats have enough space to roam and food to eat. As the number of tigers has increased over the years, conflict with villagers has increased, too. Seven people were killed in attacks by tigers around national parks in 2012 compared to four in 2011, park officials said. Villagers also want better protection.",
          elementary:
            " Conservation experts believe that tiger numbers have increased because the police are controlling national parks better, and because there is now better management of tiger habitats in Nepal, where forests cover 29% of the land. But they say Nepal must do more to protect the habitat and animals that tigers eat so the big cats have enough space to move around and food to eat. The number of tigers has increased but attacks on villagers have increased, too. Seven people were killed in attacks by tigers around national parks in 2012 compared to four in 2011, park officials said. Villagers also want better protection.",
        },
        {
          id: 3,
          advanced:
            "The government is making conservation plans for tigers. But it should also come up with plans to protect people from tigers,’ Krishna Bhurtel, a local village headman in Chitwan, told Nepali newspaper Nagarik. Wildlife authorities captured a tiger in Chitwan after it killed two people, including a villager who was pulled from his bed in May. Thousands of tigers once roamed the forests in Bangladesh, India and Nepal. But their numbers have dropped to about 3,000, a 95% drop over a century. Chitwan National Park in central Nepal has the highest number of adult tigers, with 120, followed by Bardiya National Park (50) and Shukla Phanta Wildlife Reserve (17).",
          intimidate:
            "‘The government is making conservation plans for tigers. But it should also produce plans to protect people from tigers,’ Krishna Bhurtel, a village headman, told a Nepali newspaper. Wildlife authorities captured a tiger after it killed two people, including a villager who was pulled from his bed in May. Thousands of tigers once roamed the forests in Bangladesh, India and Nepal. But their numbers have dropped to about 3,000, a 95% drop over a century. Chitwan National Park in central Nepal has the highest number of adult tigers, with 120, followed by Bardiya National Park (50) and Shukla Phanta Wildlife Reserve (17).",
          elementary:
            "‘The government is making conservation plans for tigers. But it should also make plans to protect people from tigers,’ Krishna Bhurtel, a village leader, told a Nepali newspaper. Recently, a tiger was captured after it killed two people, including a villager who was pulled from his bed in May. Thousands of tigers used to live in the forests in Bangladesh, India and Nepal. But their numbers have decreased to about 3,000, a 95% decrease in one hundred years. Chitwan National Park in central Nepal has the most adult tigers, with 120, followed by Bardiya National Park (50) and Shukla Phanta Wildlife Reserve (17).",
        },
        {
          id: 4,
          advanced:
            "Dhakal said that a parallel survey was conducted in India and the results from both countries will be published later in 2013. ‘It will take a few more months for India, which now has 1,300 big cats in several huge protected areas, to finalize the data,’ he added. Nepal has pledged to double its own population of tigers by the year 2022 from 121 in 2009 when the last systematic tiger count took place. Diwakar Chapagain, who heads a World Wildlife Fund Nepal unit that monitors wildlife trade, said tiger skins were in demand in Tibet, where well-heeled people use them as festival costumes. In Nepal, kings used to stand on tiger skins for special occasions. Some affluent Nepali have mounted tiger heads on the walls of their living rooms. Tiger bones are in high demand for use in traditional Chinese medicines.’ The trade in tiger parts is lucrative and fetches thousands of dollars in illegal markets,’ Chapagain said.",
          intimidate:
            "Dhakal said that a similar survey was done in India and the results from both countries will be published later in 2013. ‘It will take a few more months for India, which now has 1,300 big cats in several huge protected areas, to finish the survey,’ he added. Nepal has promised to double its own population of tigers by the year 2022 from 121 in 2009 when the last systematic tiger count took place. Diwakar Chapagain, head of a World Wildlife Fund Nepal unit that monitors wildlife trade, said tiger skins were in demand in Tibet, where rich people use them as festival costumes. In Nepal, kings used to stand on tiger skins for special occasions. Some wealthy Nepali have tiger heads on the walls of their living rooms. Tiger bones are used in traditional Chinese medicines. ‘The trade in tiger parts is lucrative and fetches thousands of dollars in illegal markets,’ Chapagain said.",
          elementary:
            "Dhakal said that there was a similar survey in India and the results from both countries will be published later in 2013. ‘It will take a few more months for India, which now has 1,300 big cats in several huge protected areas, to finish the survey,’ he added. Nepal says it will double its own population of tigers by the year 2022 from 121 in 2009 to 242. Diwakar Chapagain said tiger skins are popular in Tibet, where rich people use them as festival costumes. In Nepal, kings used to stand on tiger skins for special occasions. Some rich Nepali have tiger heads on the walls of their living rooms. Tiger bones are in high demand for use in traditional Chinese medicine. Chapagain said people can make a lot of money selling tiger skins and bones illegally.",
        },
      ],
      selected: null,
      questions: [
        {
          id: 1,
          q: "What has happened to Nepal’s royal bengal tiger population over the past five years?",
          A: "It has increased and has now reached 198 tigers",
          B: "It has increased by 500 tigers in five protected areas",
          C: "It has steadily decreased",
          D: "It has increased by 198 tigers",
          correctAnswer: "A",
        },
        {
          id: 2,
          q: "What do international gangs do?",
          A: "Kill tigers",
          B: "Use tiger skins for clothing",
          C: "Pay others to kill tigers",
          D: "Raise tigers for sale",
          correctAnswer: "C",
        },
        {
          id: 3,
          q: "According to conservation experts, what is one reason for the increase in the tiger population in Nepal?",
          A: "Fewer attacks by villagers",
          B: " Better management of areas where tigers live",
          C: "Forests now cover 29% of the land in tiger habitats",
          D: "More severe punishments for tiger hunting",
          correctAnswer: "B",
        },
        {
          id: 4,
          q: " What happened in a recent tiger incident in a village?",
          A: " A tiger killed two people",
          B: " A tiger killed two people and pulled a third from his bed",
          C: "A tiger protected villagers",
          D: "Villagers saved a tiger",
          correctAnswer: "A",
        },
        {
          id: 5,
          q: "What happened in India in 2013, according to Dhakal?",
          A: "1,300 tigers were found outside protected areas",
          B: "The government announced plans to double the tiger population",
          C: "There were demonstrations against tiger-hunting",
          D: "A tiger survey took place",
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
