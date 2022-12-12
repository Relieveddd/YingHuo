<template>
  <div class="vedioMain">
    <div class="title">视频列表</div>
    <div class="main1">
      <div
        class="vedioCont"
        v-for="(item, index) in vedioListData"
        :key="index"
        @click="toVedioPlayer(item)"
      >
        <div class="vedioTit">
          <div>{{ item.title }}</div>
          <div>{{ item.describe }}</div>
        </div>
        <div class="vedioPic"><img :src="item.pic" alt="" /></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { userList, vedioList } from "../../assets/API/index.js";
import { reactive, ref, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
// 保存请求视频数据
let userlistdata = reactive({
  token: localStorage.getItem("token"),
  size: 200,
});
// 保存视频信息
const vedioListData = ref([]);
// 请求视频列表
vedioList(userlistdata).then((res) => {
  vedioListData.value = res.data.data.data;
});
//页面跳转
const toVedioPlayer = (itemIn) => {
  let itemIn1 = JSON.stringify(itemIn);
  proxy.$router.push({
    path: "/vedioPlayer",
    query: { itemIn1 },
  });
};
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
}
.vedioMain {
  border-radius: 10px;
  height: 85vh;
  margin: 20px 30px;
  box-sizing: border-box;
  .title {
    margin: 10px 15px;
  }
  .main1 {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    overflow: auto;
    .vedioCont {
      width: 48%;
      margin-right: 10px;
      padding: 10px;
      .vedioPic {
        width: 100%;
        height: 300px;
      }
      & > .vedioPic > img {
        width: 100%;
        height: 100%;
      }
      .vedioTit {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
