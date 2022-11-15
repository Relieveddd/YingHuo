import { createRouter, createWebHistory } from "vue-router";
// 配置路由
const routes = [
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "/",
        name: "setting",
        component: () => import("../views/User/setting.vue"),
      },
      {
        path: "/UserList",
        name: "UserList",
        component: () => import("../views/User/UserList.vue"),
      },
      {
        path: "/UserManager",
        name: "UserManager",
        component: () => import("../views/User/UserManager.vue"),
      },
      {
        path: "/ProductList",
        name: "ProductList",
        component: () => import("../views/Product/ProductList.vue"),
      },
      {
        path: "/ProductClass",
        name: "ProductClass",
        component: () => import("../views/Product/ProductClass.vue"),
      },
      {
        path: "/ProductCont",
        name: "ProductCont",
        component: () => import("../views/Product/ProductCont.vue"),
      },
      {
        path: "/creation",
        name: "creation",
        component: () => import("../views/Product/creation.vue"),
      },
      {
        path: "/ServiceWord",
        name: "ServiceWord",
        component: () => import("../views/Product/ServiceWord.vue"),
      },
    ],
  },

  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
