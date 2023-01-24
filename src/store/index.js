import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase";
import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
    studentid: null,
    email: null,
    group: "",
    documentID: null,
    readingSpeed: 0,
  },
  mutations: {
    SET_USER(state, details) {
      state.email = details.email;
      state.group = details.group;
      state.studentid = details.studentid;
      console.log(
        "the current state is",
        this.state.group,
        this.state.studentid
      );
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
    async queryStudent({ commit }, details) {
      const studentsRef = collection(db, "students");
      const q = query(studentsRef, where("email", "==", details.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.state.documentID = doc.id.toString();
      });

      const docRef = doc(db, "students", this.state.documentID);
      const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data().email);

      const dataFromDatbase = {
        email: docSnap.data().email,
        studentid: docSnap.data().studentid,
        group: docSnap.data().group,
      };
      commit("SET_USER", dataFromDatbase);
    },
    async addStudent({ commit }, details) {
      try {
        addDoc(collection(db, "students"), {
          studentid: details.studentid,
          email: details.email,
          group: details.group,
        });
      } catch (error) {
        console.log(error);
      }
      commit("SET_USER", details);
    },
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

      commit("SET_USER", details);
      console.log(auth.currentUser);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password, group, studentid } = details;
      console.log(studentid, "with", group, "has registered");

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
      commit("SET_USER", details);
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
  },
});
// Todo watch this
// https://www.koderhq.com/tutorial/vue/firestore-database/#adddoc
