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
    group: "not changed",
    readingSpeed: 1500,
  },
  mutations: {
    SET_USER(state, user, group) {
      state.user = user.uid;
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
      console.log("from store", this.state.group);

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
    getUserGroup(state) {
      return state.group;
    },
    getReadingSpeed(state) {
      return state.readingSpeed;
    },

    filterArticles(state) {
      if (state.group == "A") {
        return state.artciles.filter((article) => article.hard == false);
      } else if (state.group == "B") {
        return state.artciles.filter((article) => article.hard == true);
      } else {
        console.log("nothing worked out");
      }
    },
  },
});
