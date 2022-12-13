<template>
  <div class="bigScrennContainer">
    <div class="top">
      <div class="logo">
        <img src="../../img/logo.png" />
      </div>
      <div class="tuanti">
        <div class="sexy">
          <div v-if="gameInfo.raceSex == 1">WOMEN <span>赛事</span></div>
          <div v-else>MEN <span>赛事</span></div>
        </div>
        <div class="geren">
          <div v-if="gameInfo.raceType == 1">个人赛</div>
          <div v-else-if="gameInfo.raceType == 2">双打</div>
          <div v-else>团体</div>
        </div>
      </div>
      <div class="gameTime">
        2022 CHINIA MATCH, ANCIENT AND FRIENDLY NATION. INTRODUCE A PERSON.
      </div>
    </div>
    <div class="bottom">
      <div class="left" id="divScore1" @click="add">
        <div class="score">{{ useStateNum }}</div>
        <div class="player">
          <div v-for="(item, index) in gameInfo.player1" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="qiuquan" v-if="gameInfo.qiuquan == 0"></div>
      </div>
      <div class="mid" id="divScore2">
        <div class="beginTime">{{ gettime }}</div>
        <div class="gameTitle">MATCH</div>
        <div><el-button @click="getEle">点击切换场地</el-button></div>
        <div class="gameScore">
          <div class="bigScore">
            <span id="bigScore1">{{ useStateNum }}</span
            ><span id="bigScore2">:</span
            ><span id="bigScore3">{{ useStateNum1 }}</span>
          </div>
          <div class="smallScore" v-for="(item, index) in useStateNum3">
            <span class="nowScore1">{{ item.num }}</span
            ><span class="nowScore2">-</span
            ><span class="nowScore3">{{ item.num1 }}</span>
          </div>
        </div>
      </div>
      <div class="right" id="divScore3" @click="add1">
        <div class="score">{{ useStateNum1 }}</div>
        <div class="player">
          <div v-for="(item, index) in gameInfo.player2" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="qiuquan" v-if="gameInfo.qiuquan == 1"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, watch, onMounted } from "vue";
import { useState, useGetters } from "../../store/hooks.js";
import store from "../../store/index";
const { proxy } = getCurrentInstance();

const useStateNum = reactive(useState(["num"]).num);
const useStateNum1 = reactive(useState(["num1"]).num1);
const useStateNum3 = reactive(useState(["num3"]).num3);
const gameInfo = ref({
  time: "",
  raceSex: 1,
  raceType: 1,
  qiuquan: 0,
  player2: ["唐", "徐"],
  player1: ["杨柳", "安静"],
  statusNum: 0,
});
// 设置点击左边函数自定义增加比分
const add = () => {
  proxy.$store.commit("increase");
};
// 设置点击右边函数自定义增加比分
const add1 = () => {
  proxy.$store.commit("increase1");
};

// 监听useStateNum的数字变化
watch(
  () => store.state.num,
  (newVal, oldVal) => {
    if (newVal == 11) {
      proxy.$store.commit("increase3", {
        num: newVal,
        num1: store.state.num1,
      });
      proxy.$store.commit("refresh");
    }
  }
);
// 监听useStateNum1的数字变化
watch(
  () => store.state.num1,
  (newVal, oldVal) => {
    if (newVal == 11) {
      proxy.$store.commit("increase3", {
        num: store.state.num,
        num1: newVal,
      });
      proxy.$store.commit("refresh");
    }
  }
);
// 设置是变量保存当前时间
let gettime = ref("");
function getNowTime() {
  var _this = this;
  let hh = new Date().getHours();
  let mf =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  let ss =
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds();
  gettime.value = hh + ":" + mf + ":" + ss;
}
// 设置定时器，每隔一秒更新时间
function currenTime() {
  setInterval(() => {
    getNowTime();
  }, 1000);
}
// 吧定时器放到onmounted生命周期中，页面加载时候调用函数
onMounted(() => {
  currenTime();
});
// 交换div位置函数
function getEle() {
  if (gameInfo.value.statusNum % 2 == 1) {
    document
      .querySelector("#divScore3")
      .before(document.querySelector("#divScore1"));
    document
      .querySelector("#divScore2")
      .after(document.querySelector("#divScore3"));
    document
      .querySelector(".nowScore3")
      .before(document.querySelector(".nowScore1"));
    document
      .querySelector(".nowScore2")
      .after(document.querySelector(".nowScore3"));
    document
      .querySelector("#bigScore3")
      .before(document.querySelector("#bigScore1"));
    document
      .querySelector("#bigScore2")
      .after(document.querySelector("#bigScore3"));
    gameInfo.value.statusNum++;
    console.log("输出第一");
  } else if (gameInfo.value.statusNum % 2 == 0) {
    document
      .querySelector("#divScore1")
      .before(document.querySelector("#divScore3"));
    document
      .querySelector("#divScore2")
      .after(document.querySelector("#divScore1"));
    document
      .querySelector(".nowScore1")
      .before(document.querySelector(".nowScore3"));
    document
      .querySelector(".nowScore2")
      .after(document.querySelector(".nowScore1"));
    document
      .querySelector("#bigScore1")
      .before(document.querySelector("#bigScore3"));
    document
      .querySelector("#bigScore2")
      .after(document.querySelector("#bigScore1"));
    gameInfo.value.statusNum++;
    console.log("输出第二");
  }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.bigScrennContainer {
  height: 87vh;
  display: flex;
  flex-direction: column;
  .top {
    background-color: #333333;
    display: flex;
    flex-direction: row;
    & > .logo {
      margin: 1%;
      width: 20%;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    & > .tuanti {
      margin: 1%;
      width: 10%;
      color: white;
      font-size: 13px;
      .sexy {
        height: 2rem;
        text-align: center;
        font-size: 1rem;
        > div > span {
          font-size: 15px;
        }
      }
      .geren {
        height: 2.5rem;
        line-height: 2.5rem;
        background-color: #ea10fc;
        margin-top: 5px;
        text-align: center;
        border: 1px solid white;
        border-radius: 2px;
        padding: 2%;
        font-size: 1.5rem;
      }
    }
    & > .gameTime {
      margin: 1%;
      margin-right: 20px;
      width: 70%;
      font-size: 2rem;
      color: #bff50b;
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    & > .left {
      width: 37%;
      background-color: blue;
      color: white;
      text-align: center;
      position: relative;
      .score {
        height: 70%;
        font-size: 20rem;
        font-weight: 900;
      }
      .player {
        height: 30%;
        width: 100%;
        font-size: 3rem;
      }
      .qiuquan {
        position: absolute;
        top: 15rem;
        right: 4rem;
        border-radius: 50%;
        height: 5rem;
        width: 5rem;
        background: rgba($color: yellow, $alpha: 0.5);
      }
    }
    & > .mid {
      width: 26%;
      background-color: black;
      text-align: center;
      .beginTime {
        color: white;
        margin-top: 10px;
        font-size: 20px;
      }
      .gameTitle {
        color: yellow;
        font-size: 40px;
      }
      .gameScore {
        background-color: #bff50b;
        margin: 5% 20%;
        height: 350px;
        border: 2px solid white;
        border-radius: 10px;
        .bigScore {
          background: linear-gradient(to bottom, blue, red);
          height: 4rem;
          border-radius: 10px 10px 0 0;
          color: white;
          line-height: 4rem;
          border-bottom: 2px solid white;
          font-size: 3rem;
          & > span {
            margin: 0rem 1rem;
          }
        }
        .smallScore {
          font-size: 1.5rem;
          & > span {
            margin: 0 1rem;
          }
        }
      }
    }
    & > .right {
      background-color: red;
      width: 37%;
      color: white;
      text-align: center;
      position: relative;
      .score {
        height: 70%;
        font-size: 20rem;
        font-weight: 900;
      }
      .player {
        height: 30%;
        width: 100%;
        color: yellow;
        font-size: 3rem;
      }
      .qiuquan {
        position: absolute;
        top: 15rem;
        right: 4rem;
        border-radius: 50%;
        height: 5rem;
        width: 5rem;
        background: rgba($color: yellow, $alpha: 0.5);
      }
    }
  }
}
</style>
