<template>
  <NavBar />
  <div class="container mt-5">
    <div class="mobileContainer">
      <div class="row">
        <h4>{{ title }}</h4>
        <p>{{ currentPar }}</p>
      </div>

      <div v-show="showQ" class="row topM">
        <p id="item" class="text-center">
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
  name: "ArticleFive",
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
      title: "Philip Pullman Illegal Downloading Is Moral Squalor",
      paragraphs: [
        {
          id: 0,
          advanced:
            "Illegal downloading is a kind of ‘moral squalor’ and theft, as much as reaching in to someone’s pocket and stealing their wallet is theft, says author Philip Pullman. In an article for Index on Censorship, Pullman, who is president of the Society of Authors, makes a robust defence of copyright laws. He is highly critical of Internet users who think it is OK to download music or books without paying for them.",
          intimidate:
            "Illegal downloading is a kind of ‘moral squalor’ and theft, as much as reaching in to someone’s pocket and stealing their wallet is theft, says author Philip Pullman. In an article for Index on Censorship, Pullman, who is president of the Society of Authors, makes a robust defence of copyright laws. He is highly critical of Internet users who think it is OK to download music or books without paying for them.",
          elementary:
            "Illegal downloading is morally wrong, and it is theft, the same as how putting your hand in someone’s pocket and stealing their wallet is theft, says author Philip Pullman. In an article for the magazine Index on Censorship, Pullman, who is president of the Society of Authors, strongly defends copyright laws. He criticizes Internet users who think it is OK to download music or books without paying for them.",
        },
        {
          id: 1,
          advanced:
            "‘The technical brilliance is so dazzling that people can’t see the moral squalor of what they’re doing,’ he writes. ‘It is outrageous that anyone can steal an artist’s work and get away with it. It is theft, as surely as reaching into someone’s pocket and taking their wallet is theft.’ His article comes after music industry leaders met British Prime Minister David Cameron in Downing Street, where the issue of web piracy was discussed. Pullman, writer of the His Dark Materials trilogy, says authors and musicians work in poverty and obscurity for years to bring their work to the level ‘that gives delight to their audiences and, as soon as they achieve that, the possibility of making a living from it is taken away from them’. He concludes: ‘The principle is simple, and unaltered by technology, science or magic: if we want to enjoy the work that someone does, we should pay for it.’",
          intimidate:
            "‘The technical brilliance is so dazzling that people can’t see the moral squalor of what they’re doing,’ he writes. ‘It is outrageous that anyone can steal an artist’s work and get away with it. It is theft, as surely as reaching into someone’s pocket and taking their wallet is theft.’ His article comes after music industry leaders met British Prime Minister David Cameron in Downing Street, where the issue of web piracy was discussed. Pullman, writer of the His Dark Materials trilogy, says authors and musicians work in poverty and obscurity for years to bring their work to the level ‘that gives delight to their audiences and, as soon as they achieve that, the possibility of making a living from it is taken away from them’. He concludes: ‘The principle is simple, and unaltered by technology, science or magic: if we want to enjoy the work that someone does, we should pay for it.’",
          elementary:
            "‘The technology is so dazzling that people can’t see that what they’re doing is morally wrong,’ he writes. ‘It is outrageous that anyone can steal an artist’s work without punishment. It is theft, just as putting your hand in someone’s pocket and taking their wallet is theft.’ His article comes after music industry leaders met British Prime Minister David Cameron in Downing Street to discuss the issue of web piracy. Pullman, writer of the His Dark Materials trilogy, says authors and musicians work in poverty for years to bring their work to the level ‘that gives happiness to their audiences and, when they achieve that, the possibility of making money from it is taken away from them’. He concludes: ‘If we want to enjoy the work that someone does, we should pay for it.’",
        },
        {
          id: 2,
          advanced:
            "Pullman is writing in the next issue of the campaign group’s magazine in a dialogue with Cathy Casserly, chief executive of Creative Commons, which offers open content licenses ‘that lets creators take copyright into their own hands’. Casserly argues that there is much wrong with copyright, which was created ‘in an analog age’. Casserly writes: ‘By default, copyright closes the door on countless ways that people can share, build upon and remix each other’s work, possibilities that were unimaginable when those laws were established.’ She says artists need to think creatively about how they distribute and monetize their work, quoting the science fiction writer Cory Doctorow, who said: ‘My problem is not piracy, it’s obscurity.’",
          intimidate:
            "Pullman is writing in the next issue of the campaign group’s magazine in a dialogue with Cathy Casserly, chief executive of Creative Commons, which offers open content licenses ‘that lets creators take copyright into their own hands’. Casserly argues that there is much wrong with copyright, which was created ‘in an analog age’. Casserly writes: ‘By default, copyright closes the door on countless ways that people can share, build upon and remix each other’s work, possibilities that were unimaginable when those laws were established.’ She says artists need to think creatively about how they distribute and monetize their work, quoting the science fiction writer Cory Doctorow, who said: ‘My problem is not piracy, it’s obscurity. ",
          elementary:
            " Pullman is writing in the next issue of the campaign group’s magazine in a dialogue with Cathy Casserly, chief executive of Creative Commons. Casserly argues that there is a lot wrong with copyright, which was created a long time ago. Casserly writes: ‘Copyright closes the door on the many ways that people can share, build upon and remix each other’s work, possibilities that we could not imagine when those laws were made.’ She says artists need to think creatively about how they earn money from their work.",
        },
        {
          id: 3,
          advanced:
            "Index on Censorship agrees. The magazine’s editor, Rachael Jolley, said: ‘Existing copyright laws don’t work in the digital age and risk criminalizing consumers. We need new models for how artists, writers and musicians earn a living from their work.’ The scale of illegal downloading vast. Data collected by Ofcom (the competition authority for the UK communications industries) suggests that, between November 2012 and January 2013 in the UK, 280 million music tracks were digitally pirated, along with 52 million TV shows, 29 million films, 18 million ebooks and 7 million software or games files. Ofcom has said 18% of Internet users aged over 12 admit to having recently pirated content, and 9% say they fear getting caught. Pullman writes in his article: ‘The ease and swiftness with which music can be acquired in the form of MP3 downloads is still astonishing to those of us who have been building up our iTunes list for some time.’",
          intimidate:
            "Index on Censorship agrees. The magazine’s editor, Rachael Jolley, said: ‘Existing copyright laws don’t work in the digital age and risk criminalizing consumers. We need new models for how artists, writers and musicians earn a living from their work.’ The scale of illegal downloading vast. Data collected by Ofcom (the competition authority for the UK communications industries) suggests that, between November 2012 and January 2013 in the UK, 280 million music tracks were digitally pirated, along with 52 million TV shows, 29 million films, 18 million ebooks and 7 million software or games files. Ofcom has said 18% of Internet users aged over 12 admit to having recently pirated content, and 9% say they fear getting caught. Pullman writes in his article: ‘The ease and swiftness with which music can be acquired in the form of MP3 downloads is still astonishing to those of us who have been building up our iTunes list for some time.’",
          elementary:
            "Index on Censorship agrees. The magazine’s editor, Rachael Jolley, said: ‘Illegal downloading is a very big problem.’ Between November 2012 and January 2013 in the UK, 280 million music tracks were digitally pirated along with 52 million TV shows, 29 million films, 18 million ebooks and 7 million software or games files. 18% of Internet users aged over 12 say they have pirated items, and 9% say they are afraid they will get caught. Pullman writes in his article: ‘The ease and speed with which people can get music in MP3 is still very surprising to people like me who have been building up their iTunes list for some time.’",
        },
        {
          id: 4,
          advanced:
            "One thing to emerge from the Downing Street meeting was Cameron’s appointment of the Conservative Member of Parliament Mike Weatherley to be his adviser on the subject. A spokesman for the BPI, the record industry trade body, said: ‘Mike Weatherley is a strong champion of copyright and the artists and creative producers it’s there to protect. We hope Weatherley’s influence and the prime minister’s endorsement of copyright will be brought to bear on the approach of the UK’s intellectual property office.’",
          intimidate:
            "One thing to emerge from the Downing Street meeting was Cameron’s appointment of the Conservative member of parliament Mike Weatherley to be his adviser on the subject. A spokesman for the BPI, the record industry trade body, said: ‘Mike Weatherley is a strong champion of copyright and the artists and creative producers it’s there to protect. We hope Weatherley’s influence and the prime minister’s endorsement of copyright will be brought to bear on the approach of the UK’s intellectual property office.’",
          elementary:
            "After the Downing Street meeting, Cameron asked the Conservative member of parliament Mike Weatherley to be his adviser on the subject. The BPI, an organization that supports music companies, said: ‘Mike Weatherley is a strong supporter of copyright and the artists and creative producers it’s there to protect. We hope Weatherley’s influence and the prime minister’s support for copyright will change what the government does about illegal downloading in the UK",
        },
      ],
      selected: null,
      questions: [
        {
          id: 1,
          q: "Where does Philip Pullman hold a senior position?",
          A: "The “Index on Censorship”",
          B: "The “Association Against Illegal Downloading”",
          C: "The “Arts Union”",
          D: " The “Society of Authors”",
          correctAnswer: "D",
        },
        {
          id: 2,
          q: "What does Pullman find outrageous?",
          A: " That authors and musicians work in poverty for years",
          B: "That his book is one of the most pirated books on the Internet",
          C: " That someone pirating a book would not face consequences",
          D: " That someone stealing a wallet would not be punished",
          correctAnswer: "C",
        },
        {
          id: 3,
          q: "What is Casserly’s position on current copyright law?",
          A: " It is outdated and too strict",
          B: " It is unable to protect authors from having their work shared, built upon and remixed",
          C: " It will allow artists to do more creative work",
          D: "It is a good compromise between the needs of artists and consumers",
          correctAnswer: "A",
        },
        {
          id: 4,
          q: " What do the statistics in the paragraph convey?",
          A: "How pirating frequency has changed between November 2012 and January 2013",
          B: "How frequently different kinds of digital content are pirated",
          C: "The ease and quickness of the MP3 format",
          D: " How pirating has evolved over time to combat copyright law",
          correctAnswer: "B",
        },
        {
          id: 5,
          q: "Who is Mike Weatherly and what is his relation to the BPI?",
          A: "He is a resident of Downing Street who organizes meetings to oppose the BPI",
          B: "He is a conservative businessman who is the head of the BPI",
          C: "He is a lobbyist who works for the BPI",
          D: "He is a politician who is endorsed by the BPI",
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
