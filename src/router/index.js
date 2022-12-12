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
        meta: { selectedID: 1 },
      },
      {
        path: "/UserList",
        name: "UserList",
        component: () => import("../views/User/UserList.vue"),
        meta: { selectedID: 2 },
      },
      {
        path: "/UserManager",
        name: "UserManager",
        component: () => import("../views/User/UserManager.vue"),
        meta: { selectedID: 3 },
      },
      {
        path: "/ProductList",
        name: "ProductList",
        component: () => import("../views/Product/ProductList.vue"),
        meta: { selectedID: 4 },
      },
      {
        path: "/ProductClass",
        name: "ProductClass",
        component: () => import("../views/Product/ProductClass.vue"),
        meta: { selectedID: 5 },
      },
      {
        path: "/Selector",
        name: "Selector",
        component: () => import("@/components/Selectors/index.vue"),
        meta: { selectedID: 6 },
      },
      {
        path: "/ProductCont",
        name: "ProductCont",
        component: () => import("../views/Product/ProductCont.vue"),
        meta: { selectedID: 7 },
      },
      {
        path: "/creation",
        name: "creation",
        component: () => import("../views/Product/creation.vue"),
        meta: { selectedID: 8 },
      },
      {
        path: "/ServiceWord",
        name: "ServiceWord",
        component: () => import("../views/Product/ServiceWord.vue"),
        meta: { selectedID: 9 },
      },
      {
        path: "/Vedio",
        name: "Vedio",
        component: () => import("../views/Vedio/vedio.vue"),
        meta: { selectedID: 10 },
      },
      {
        path: "/upload",
        name: "upload",
        component: () => import("../views/upload/upload.vue"),
        meta: { selectedID: 12 },
      },
      {
        path: "/VedioPlayer",
        name: "VedioPlayer",
        component: () => import("../views/Vedio/vedioPlayer.vue"),
        meta: { selectedID: 11 },
      },
    ],
  },

  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { selectedID: 12 },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test/test.vue"),
    meta: { selectedID: 13 },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
