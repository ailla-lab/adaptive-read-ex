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
  name: "ArticleTwo",
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
      title: "A New Form of Lie Detector Test",
      paragraphs: [
        {
          id: 0,
          advanced:
            "Police and intelligence agencies around the world have, for almost 100 years, relied on polygraphs as lie detectors to help convict criminals or unearth spies and traitors. The polygraph is beloved of the movies, with countless dramatic moments showing the guilty sweating profusely as they are hooked up. But the invention could soon be defunct. Researchers in Britain and the Netherlands have made a breakthrough, developing a method with a success rate in tests of over 70% that could be in use in police stations around the world within a decade. Rather than relying on facial tics, talking too much or waving of arms – all seen as tell-tale signs of lying – the new method involves monitoring full-body motions to provide an indicator of signs of guilty feelings.",
          intimidate:
            "Police and intelligence agencies around the world have, for almost 100 years, used polygraphs as lie detectors to help convict criminals or find spies and traitors. But the polygraph could soon be defunct. Researchers in Britain and the Netherlands have developed a new method that has a success rate, in tests, of over 70%. This new method could be in use in police stations around the world within a decade. It doesn’t monitor facial tics, talking too much or waving of arms, which are all signs that someone is lying. The new method monitors full-body motion, which can show that the person is feeling guilty.",
          elementary:
            "Police and intelligence agencies around the world have, for almost 100 years, used the polygraph, a lie-detector test, to help catch criminals and spies. But, now, researchers in Britain and the Netherlands have developed a new method, which is correct (in tests) over 70% of the time. Police stations around the world might begin using this new method within ten years. It doesn’t monitor movements in the face, talking too much or waving arms – all signs that someone is lying. The new method monitors movements in the whole body, which can show that the person is feeling guilty.",
        },
        {
          id: 1,
          advanced:
            "The polygraph is widely used in the US in criminal and other cases and for security clearance for the FBI and CIA but is much less popular in Europe. There has been a lot of skepticism in the scientific and legal communities about its reliability. By contrast, the new method developed by the researchers has performed well in experiments. The basic premise is that liars fidget more and so the use of an all-body motion suit – the kind used in films to create computer-generated characters – will pick this up. One of the research team, Ross Anderson, said: ‘Decades of deception research show that the interviewer will tell truth from lies only slightly better than random.’ He said the new method, by contrast, achieved a reliability rating of over 70%. In some tests, the team has already achieved more than 80%. Anderson said: ‘The takeaway message is that guilty people fidget more and we can measure this robustly.’",
          intimidate:
            "The polygraph is widely used in the US in criminal cases and for security clearance for the FBI and CIA but is much less popular in Europe. Many people in the scientific and legal communities do not believe that it is reliable. By contrast, the new method has performed well in experiments. The basic thought is that liars fidget more and so the use of an all-body motion suit – the kind used in films to create computer-generated characters – will record this. One of the research team, Ross Anderson, said that years of research show that an interviewer will know whether someone is telling the truth, and not lies, in only about 55 times out of 100. He said the new method, by contrast, was reliable over 70% of the time. And he was confident they would be able to do better. In some tests, the team has already achieved more than 80%. Anderson said: ‘Guilty people fidget more and we can measure this.’",
          elementary:
            "The polygraph is often used in the US in criminal cases and by the FBI and CIA but is much less popular in Europe. Many people do not believe that it is reliable. The basic idea behind the new method is that liars fidget more and that an all-body motion suit – the kind used in films to create computer-generated characters – will record this. The new method is over 70% reliable – the polygraph is only 55% reliable. In some tests, the success rate of the new method was more than 80%. Ross Anderson, one of the research team, said: ‘Guilty people fidget more and we can now measure this.’",
        },
        {
          id: 2,
          advanced:
            "The polygraph was created in 1921 by policeman John Larson, based on research by the psychologist William Marston. It records changes in pulse, blood pressure, sweating and breathing to ascertain whether a subject is lying. While cinema depictions suggest the device is near-infallible, the US Supreme Court ruled, in 1998, that there was no consensus that the polygraph was reliable, a finding supported by the US National Academy of Scientists in 2003.",
          intimidate:
            "The polygraph was created in 1921 by policeman John Larson, based on research by the psychologist William Marston. It records changes in pulse, blood pressure, sweating and breathing to find out whether someone is lying. In movies, the polygraph is always right, But, in 1998, the US Supreme Court ruled that there was no consensus that the polygraph was reliable. This conclusion was supported by the US National Academy of Scientists in 2003.",
          elementary:
            "The polygraph was created in 1921 by policeman John Larson, based on research by the psychologist William Marston. It records changes in pulse, blood pressure, sweating and breathing to find out if someone is lying. In movies, the polygraph is always correct but, in 1998, the US Supreme Court decided that there was no agreement that the polygraph was reliable. The US National Academy of Scientists said the same thing in 2003. ",
        },
        {
          id: 3,
          advanced:
            "The experiment carried out by Anderson and his colleagues involved 180 students and employees at Lancaster University, of which half were told to tell the truth and half to lie. They were each paid £7.50 for their participation in the 70-minute experiment, involving two tests. Some were interviewed about a computer game Never End, which they played for seven minutes, while others lied about playing it, having only been shown notes about it. The second test involved a lost wallet containing £5. Some were asked to bring the wallet to a lost-and-found box while others hid it and lied about it. ",
          intimidate:
            "The experiment carried out by Anderson and his colleagues involved 180 students and employees at Lancaster University – half of the people were told to tell the truth and half to lie. They were each paid £7.50 for their participation in the 70-minute experiment, involving two tests. Some were interviewed about a computer game Never End, which they played for seven minutes. Others lied about playing the game – they had only seen notes about it. The second test involved a lost wallet containing £5. Some were asked to bring the wallet to a lost-and-found box. Others hid it and lied about it. ",
          elementary:
            "The tests Anderson and his colleagues did involved 180 students and employees at Lancaster University. Half of the people were told to tell the truth and half to lie. The researchers interviewed some of the people about a computer game called Never End that they played for seven minutes. Others lied about playing it. The second test involved a lost wallet with £5 inside. Some people had to bring the wallet to a lost-and-found box. Others hid it and lied about it. ",
        },
        {
          id: 4,
          advanced:
            "‘Overall, we correctly classified 82.2% (truths: 88.9%; lies: 75.6%) of the interviewees as either being truthful or deceptive based on the combined movement in their individual limbs,’ the report says. Anderson said: ‘Our first attempt looked at the extent to which different body parts and body signals indicated deception. It turned out that liars wave their arms more but, again, this is only at the 55% level that you can get from a conventional polygraph. The pay dirt was when we considered total body motion. That turns out to tell truth from lies over 70% of the time.’ The use of all-body suits is expensive – they cost about £30,000 – and can be uncomfortable, and Anderson and his colleagues are now looking at low-cost alternatives. These include using motion-sensing technology from computer games, such as the Kinect camera devices developed by Microsoft for the Xbox console",
          intimidate:
            "‘Overall, we correctly guessed whether 82.2% (truths: 88.9%; lies: 75.6%) of the interviewees were telling the truth or lying based on the movements in their individual limbs,’ the report says. Anderson said: ‘First, we looked at how much different body parts showed that someone was lying. We found that liars wave their arms more, but this is only at the 55% level that you can get from a polygraph. The success came when we looked at total body motion. That tells truth from lies over 70% of the time.’ The use of all-body suits is expensive – they cost about £30,000 – and they can be uncomfortable, so Anderson and his colleagues are now studying low-cost alternatives. These include using motion-sensing technology from computer games, such as the Kinect camera devices developed by Microsoft for the Xbox console.",
          elementary:
            "The new body-suit method was correct 82.2% of the time. Researchers monitored how much the people moved their arms and legs, to decide if they were telling the truth or lying. All-body suits are expensive – they cost about £30,000 – and they can be uncomfortable, so Anderson and his colleagues are now looking at cheaper alternatives. These include using motion-sensing technology from computer games, such as the Kinect camera devices developed by Microsoft for the Xbox console.",
        },
      ],
      selected: null,
      questions: [
        {
          id: 1,
          q: "When is the new lie detection method expected to work with over 70% accuracy?",
          A: "Within ten years",
          B: "Once it is modified to monitor movements of the entire body",
          C: "It has already achieved this accuracy level in tests",
          D: " It is currently not known",
          correctAnswer: "C",
        },
        {
          id: 2,
          q: "What can an all-body suit be used for?",
          A: "nfluence liars to fidget more",
          B: "Protect the body in cold weather",
          C: "Protect FBI and CIA agents",
          D: "Create computer-generated characters",
          correctAnswer: "D",
        },
        {
          id: 3,
          q: "Who was John Larson?",
          A: "A policeman who developed a lie-detection method",
          B: " A psychologist who created the polygraph",
          C: "A US Supreme Court judge who ruled on the reliability of the polygraph",
          D: "A 21st century researcher working on new methods of lie detection",
          correctAnswer: "A",
        },
        {
          id: 4,
          q: "What did participants lie about in the Never End game experiment?",
          A: "The duration of the game",
          B: "Being paid £5 to play the game",
          C: "Their position on the game’s leaderboard",
          D: "Whether they played the game",
          correctAnswer: "D",
        },
        {
          id: 5,
          q: "What is one reason Anderson is looking for alternatives to body suits?",
          A: "Body suits will become expensive in the future",
          B: "Body suits are costly",
          C: "The new suit is only 82.2% reliable",
          D: "Body suits take a long time to manufacture",
          correctAnswer: "B",
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
