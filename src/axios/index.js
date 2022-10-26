import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

const myaxios = new axios.create({});
// 请求拦截器
myaxios.interceptors.request.use((config) => {
  if (!config.url.includes("http")) {
    config.url = "http://api_devs.wanxikeji.cn" + config.url;
  }
  return config;
});
// 响应拦截器
myaxios.interceptors.response.use((res) => {
  if (res.data.code === 2000) {
    return res;
  } else if (res.data.code == 2010) {
    ElMessage({
      type: "warning",
      message: res.data.msg,
    });
  } else if (res.data.code >= 2999) {
    ElMessage({
      type: "warning",
      message: res.data.msg,
    });
    localStorage.removeItem("token");
    router.push("/Login");
  }
});

export default myaxios;
