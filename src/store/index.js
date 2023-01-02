import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
    id: null,
    group: null,
    readingSpeed: 1500,
    artciles: [
      {
        id: 1,
        title: "Text 1",
        hard: false,
        paragraphs: [
          "I am easy text, pargraph number 1 ",
          "I am easy text, pargraph number 2 ",
          "I am easy text, pargraph number 3 ",
        ],
      },

      {
        id: 1,
        title: "Text 2",
        hard: true,
        paragraphs: [
          "I am hard text, pargraph number 1 ",
          "I am hard text, pargraph number 2 ",
          "I am hard text, pargraph number 3 ",
        ],
      },

      {
        id: 2,
        title: "Text 2",
        hard: false,
        paragraphs: [
          "I am easy text, pargraph number 1 ",
          "I am easy text, pargraph number 2 ",
          "I am easy text, pargraph number 3 ",
        ],
      },

      {
        id: 2,
        title: "Text 3",
        hard: true,
        paragraphs: [
          "I am hard text, pargraph number 1 ",
          "I am hard text, pargraph number 2 ",
          "I am hard text, pargraph number 3 ",
        ],
      },
    ],
  },
  mutations: {
    SET_USER(state, user, group) {
      state.user = user;
      state.group = group;
    },

    CLEAR_USER(state) {
      state.user = null;
    },
    addUserID(state, id) {
      state.id = id;
    },
    addreadingSpeed(state, readingSpeed) {
      state.readingSpeed = readingSpeed;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password, group } = details;
      this.state.group = group;
      console.log("group is", this.state.group);

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);

      router.push("/");
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/login");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
  getters: {
    getUserID(state) {
      return state.id;
    },
    getReadingSpeed(state) {
      return state.readingSpeed;
    },

    filterArticles(state) {
      if (state.group == "A") {
        return state.artcileOne["easey"];
      } else if (state.group == "B") {
        return state.artcileOne["hard"];
      } else {
        console.log("nothing worked out");
      }
    },
  },
});
