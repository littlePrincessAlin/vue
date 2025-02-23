import { createWebHistory, createRouter } from "vue-router";

import Home from "@pages/Home/index";
import Grammar from "@pages/Home/grammar";
import Mustache from "@pages/Mustache/index";
import Ref from "@pages/Ref/index";

const routes = [
  {
    path: "/",
    redirect: "/grammar",
    component: Home,
    children: [
      {
        path: "grammar",
        component: Grammar,
        children: [
          {
            path: "mustache",
            component: Mustache,
          },
          {
            path: "ref",
            component: Ref,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
