import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Reading from "../views/Reading.vue";
import ReadingSpeed from "../views/ReadingSpeed.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/reading-speed-test",
    name: "ReadingSpeed",
    component: ReadingSpeed,
  },
  {
    path: "/reading",
    name: "Reading",
    component: Reading,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next();
});

export default router;
