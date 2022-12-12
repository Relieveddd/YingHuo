import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import myaxios from "./axios";
import timeTransformate from "./timeTransformate";
import ECharts from "vue-echarts";
import "echarts";
// 引入store
import store from "@/store";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "Login") {
    // token不存在，当前用户未登录，跳转到登录页面
    next({ name: "Login" });
  } else if (token && to.name == "Login") {
    //token存在，说明已经登录，跳转到首页
    next({ name: "home" });
  } else {
    next();
  }
});

// timeTransformate全局函数用来将时间戳转换成我们需要的时间格式
app.config.globalProperties.$timeTransformate = timeTransformate;
app.config.globalProperties.$axios = myaxios;
app.component("ECharts", ECharts);
// 全局使用store
app.use(store);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
