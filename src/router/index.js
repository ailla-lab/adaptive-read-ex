import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ReadingSpeed from "../views/ReadingSpeed.vue";
import ArticleOne from "../views/ArticleOne.vue";
import ArticleTwo from "../views/ArticleTwo.vue";
import ArticleThree from "../views/ArticleThree.vue";
import ArticleFour from "../views/ArticleFour.vue";
import ArticleFive from "../views/ArticleFive.vue";
import ArticleSix from "../views/ArticleSix.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
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
      requiresAuth: true,
    },
  },
  {
    path: "/article2",
    name: "ArticleTwo",
    component: ArticleTwo,
    meta: {
      requiresAuth: true,
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
    path: "/article4",
    name: "Articlefour",
    component: ArticleFour,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/article5",
    name: "Articlefive",
    component: ArticleFive,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/article6",
    name: "Articlesix",
    component: ArticleSix,
    meta: {
      requiresAuth: true,
    },
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
