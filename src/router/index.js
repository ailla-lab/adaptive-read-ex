import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ArticleOne from "../views/ArticleOne.vue";
import ArticleTwo from "../views/ArticleTwo.vue";
import ArticleThree from "../views/ArticleThree.vue";
import ReadingSpeed from "../views/ReadingSpeed.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reading-speed",
    name: "ReadingSpeed",
    component: ReadingSpeed,
  },
  {
    path: "/article1",
    name: "ArticleOne",
    component: ArticleOne,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/article2",
    name: "ArticleTwo",
    component: ArticleTwo,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/article3",
    name: "ArticleThree",
    component: ArticleThree,
    meta: {
      requiresAuth: true,
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
