<template>
  <div class="videoMain">
    <!-- 要传送到的小视频播放窗口 -->
    <!-- <div id="small"></div> -->
    <!-- 被监听出入视口的占位元素 -->
    <!-- <div class="observeContainer" id="videoContainer"></div> -->
    <!-- 初始播放的大视频窗口 -->
    <div class="bigBox">
      <div id="mse"></div>
    </div>
    <!-- 模拟滚动 -->
    <!-- <div style="height: 2000px"></div> -->

    <div>
      <upload />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { useRoute } from "vue-router";
import Player from "xgplayer";
import upload from "../upload/upload.vue";

const route = useRoute().query;
const vedioInfoIn = JSON.parse(route.itemIn1);
const disabled = ref(true);
// onMounted里面才能拿到dom ，数据可以在created拿到
onMounted(() => {
  let player = new Player({
    el: document.querySelector("#mse"),
    playsinline: true,
    url: vedioInfoIn.url,
    poster:
      "https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
    width: "100%",
    height: "100%",
  });

  // const { stop } = useIntersectionObserver(
  //   document.getElementById("videoContainer"),
  //   ([{ isIntersecting }]) => {
  //     console.log(isIntersecting);
  //     disabled.value = isIntersecting;
  //     // isIntersecting是布尔值   视口区域内  true 否则就是false
  //   }
  // );
});

// 1.初始化视频插件，npm install xgplayer
// 2.在页面提供占位dom  mse
// 3.实例化  let player=new Player({id:'mse',url:''});
// 4.监听大视频播放区是否在视口区域
</script>
<style scoped lang="scss">
*,
html,
body {
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: hidden;
}
.videoMain {
  height: 85vh;
  #small {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 200px;
    height: 140px;
    // border: 1px solid black;
  }
  .observeContainer {
    width: 600px;
    height: 420px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .bigBox {
    width: 600px;
    height: 420px;
    border: 1px solid black;
    #mse {
      width: 600px;
      height: 420px;
      & > video {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
