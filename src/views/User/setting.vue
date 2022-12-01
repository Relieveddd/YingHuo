<template>
  <div class="box">
    <div class="container">
      <div class="leftCont">
        <div class="title"><span>平台总数据</span></div>
        <div class="allData">
          <div class="img">
            <el-icon color="white" size="large"><CopyDocument /></el-icon>
          </div>
          <div class="dataDetail">
            <div class="saoma">
              <span class="SMName">· 扫码</span><span class="SMNum">2339</span>
            </div>
            <div class="fenxiang">
              <span class="FXName">. 分享</span><span class="FXNum">1206</span>
            </div>
          </div>
        </div>
        <div class="allData">
          <div class="img" style="background-color: #a570e0">
            <el-icon color="white" size="large"><Phone /></el-icon>
          </div>
          <div class="dataDetail">
            <div class="saoma">
              <span class="SMName">· 通话</span><span class="SMNum">277</span>
            </div>
            <div class="fenxiang">
              <span class="FXName">. 到访</span><span class="FXNum">145</span>
            </div>
          </div>
        </div>
        <div class="allData">
          <div class="img" style="background-color: #6dd3be">
            <el-icon color="white" size="large"><Notebook /></el-icon>
          </div>
          <div class="dataDetail">
            <div class="saoma">
              <span class="SMName">· 订单</span><span class="SMNum">870</span>
            </div>
          </div>
        </div>
        <div class="allData">
          <div class="img" style="background-color: #ecaf76">
            <el-icon color="white" size="large"><Files /></el-icon>
          </div>
          <div class="dataDetail">
            <div class="saoma">
              <span class="SMName">· 发布品类</span
              ><span class="SMNum">30</span>
            </div>
          </div>
        </div>
        <div class="allData">
          <div class="img" style="background-color: #77da7a">
            <el-icon color="white" size="large"><List /></el-icon>
          </div>
          <div class="dataDetail">
            <div class="saoma">
              <span class="SMName">· 事项</span><span class="SMNum">288</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mainCont">
        <div class="top">
          <div class="title">
            <div class="dateTi">2022-11-08</div>
            <div class="dateWeek">星期二</div>
            <div class="dataShow">
              <div class="detail" v-for="item in numArray" :key="item.index">
                <div class="dataDetail">{{ item.SMpeople }}</div>
                <div class="dataDetail1">
                  <span>{{ item.num }}</span>
                  <div class="dataDetail11"></div>
                </div>
                <div class="dataDetail2" v-if="item.monNum != '0'">
                  当月累计
                </div>
                <div class="dataDetail3" v-if="item.monNum != '0'">
                  {{ item.monNum }}
                </div>
              </div>
              <div class="detail">
                <el-icon><MoreFilled /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="bottomLe">
            <div class="title1">
              <span>最受欢迎品类订单次数</span
              ><span
                ><el-icon><MoreFilled /></el-icon
              ></span>
            </div>
            <div style="width: 100%; height: 310px">
              <e-charts class="chart" :option="option" />
            </div>
          </div>
          <div class="bottomRi">
            <div class="title1">
              <span>村民订购次数排行</span
              ><span
                ><el-icon><MoreFilled /></el-icon
              ></span>
            </div>
            <div style="width: 100%; height: 310px">
              <e-charts class="chart" :option="option1" />
            </div>
          </div>
        </div>
      </div>
      <div class="rightCont">
        <div class="riTop">
          <div class="title">
            <span>订单</span>
            <el-table
              :data="tableData"
              :header-row-style="tableHeaderColor"
              style="width: 100%"
            >
              <el-table-column prop="name" label="村民" min-width="30%" />
              <el-table-column
                prop="productClass"
                label="订单品类"
                min-width="33%"
              />
              <el-table-column prop="productNum" label="数量" min-width="24%" />
              <el-table-column
                prop="createAt"
                label="订单时间"
                min-width="43%"
              />
            </el-table>
          </div>
        </div>
        <div class="riBottom">
          <div class="title">
            <span>事项</span>
            <el-table
              :header-row-style="tableHeaderColor"
              :data="tableDataShiXiang"
              style="width: 100%"
            >
              <el-table-column
                prop="ShiXiang"
                label="具体事件"
                min-width="50%"
              />
              <el-table-column prop="time" label="开始时间" min-width="30%" />
              <el-table-column prop="Pstatus" label="状态" min-width="20%">
                <template #default="scope">
                  <span style="color: orange" v-if="scope.row.Pstatus == '0'"
                    >未完</span
                  >
                  <span style="color: #6dd3be" v-else>完成</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-button @click="add">增加</el-button> -->
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";

// 设置响应式变量保存中间数据
const numArray = ref([
  { SMpeople: "扫码人次", num: 23, monNum: 536 },
  { SMpeople: "通话人次", num: 20, monNum: 315 },
  { SMpeople: "到访人次", num: 10, monNum: 200 },
  { SMpeople: "语音搜索次数", num: 36, monNum: 276 },
  { SMpeople: "本月事项", num: 21, monNum: 0 },
  { SMpeople: "本月完成事项", num: 18, monNum: 0 },
]);

// 设置变量保存柱形图1数据
const detailEcharts = ref([
  { num: 23, name: "兔子" },
  { num: 24, name: "鸡蛋" },
  { num: 18, name: "鸭蛋" },
  { num: 25, name: "橘子" },
  { num: 27, name: "土鸡" },
  { num: 28, name: "葡萄" },
  { num: 25, name: "红苕" },
]);
// 设置监听函数返回option的值
const option = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: detailEcharts.value.map((item) => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: detailEcharts.value.map((item) => item.num),
        type: "bar",
        itemStyle: {
          color: "#a9b960",
        },
      },
    ],
    grid: {
      // 让图表占满容器
      top: "20px",
      left: "30px",
      right: "10px",
      bottom: "20px",
    },
  };
});
// 设置变量保存柱形图2数据
const detailEcharts1 = ref([
  { num1: 300, name1: "李国强" },
  { num1: 280, name1: "张会强" },
  { num1: 260, name1: "杨明台" },
  { num1: 240, name1: "周丽琼" },
  { num1: 220, name1: "刘慧英" },
]);
// 设置监听函数返回option1的值
const option1 = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: detailEcharts1.value.map((item) => item.name1),
      axisLabel: {
        interval: 0,
        rotate: 20,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: detailEcharts1.value.map((item) => item.num1),
        type: "bar",
      },
    ],
    grid: {
      // 让图表占满容器
      top: "20px",
      left: "30px",
      right: "10px",
      bottom: "30px",
    },
  };
});

// 表格一数据
const tableData = ref([
  {
    name: "张会强",
    productClass: "兔子",
    productNum: 5,
    createAt: "11-07 14:20",
  },
  {
    name: "李国刚",
    productClass: "土鸡",
    productNum: 3,
    createAt: "11-07 12:20",
  },
  {
    name: "杨明台",
    productClass: "兔子",
    productNum: 1,
    createAt: "11-07 12:11",
  },
  {
    name: "杨军",
    productClass: "橘子",
    productNum: 10,
    createAt: "11-07 10:45",
  },
  {
    name: "刘慧英",
    productClass: "鸡蛋",
    productNum: 20,
    createAt: "11-06 22:01",
  },
  {
    name: "张德平",
    productClass: "土鸡",
    productNum: 2,
    createAt: "11-06 21:35",
  },
  {
    name: "李涛",
    productClass: "小山猪",
    productNum: 1,
    createAt: "11-06 20:13",
  },
  {
    name: "周丽琼",
    productClass: "鸭蛋",
    productNum: 20,
    createAt: "11-05 10:17",
  },
]);

// 表格二数据
const tableDataShiXiang = ref([
  {
    ShiXiang: "统计家庭数据",
    time: "11-07",
    Pstatus: "0",
  },
  {
    ShiXiang: "新型葡萄种子分发",
    time: "11-05",
    Pstatus: "1",
  },
  {
    ShiXiang: "家禽疫苗",
    time: "10-21",
    Pstatus: "1",
  },
  {
    ShiXiang: "接洽眉山市政府领导视察",
    time: "10-10",
    Pstatus: "1",
  },
  {
    ShiXiang: "全村义诊",
    time: "09-27",
    Pstatus: "1",
  },
]);
// 监听tableData数据变化,向头部添加一个数据，最后一个数据消失
watch(
  () => tableData.value,
  (newVal, oldVal) => {
    console.log(newVal);
    newVal.splice(8, 1);
  },
  { deep: true }
);
// 监听tableDataShiXiang数据变化,向头部添加一个数据，最后一个数据消失
watch(
  () => tableDataShiXiang.value,
  (newVal, oldVal) => {
    console.log(newVal);
    newVal.splice(5, 1);
  },
  { deep: true }
);
// 添加函数用以测试各数组添加数据后的效果
const add = () => {
  // console.log(tableData.value[7].productNum);
  // tableData.value[7].productNum + 1;
  // console.log(detailEcharts1.value[4].num1);
  // detailEcharts1.value[4].num1 = detailEcharts1.value[4].num1 + 1;
  // tableDataShiXiang.value.unshift({
  //   ShiXiang: "全村义诊",
  //   time: "09-27",
  //   Pstatus: "1",
  // });
  // tableData.value.unshift({
  //   name: "张会强",
  //   productClass: "兔子",
  //   productNum: 5,
  //   createAt: "11-07 14:20",
  // });
  // numArray.value[0].num += 1;
  // console.log(numArray.value[0].num);
  // return numArray;
};
// 返回style字段，改变首行样式
function tableHeaderColor() {
  return "color:#65c0ae;text-align:center;";
}
</script>
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
// 全局标准字体大小
$mainfontsize: 14px;
// 主要内容区域文字大小
$MainColor: rgb(34, 32, 32);
// 主要背景颜色
//  & 嵌套中使用&符号表示同时拥有两个类名的元素，> 表示直接子元素， 空格表示后代元素；$符号用于设置变量，引用的时候页需要$符号
// 如需要给元素添加hover属性 ，或者使用伪元素属性，直接在.{main  &:hover{} &::after{}}其嵌套的括号中写  加伪元素和hover等属性时候前面需要添加&符号
$mainBackgroundColor: #eff6fe;
$leftAndRightBack: white;
$leAndRiBorderRadius: 5px;
$leAndRiBorderRadius: 5px;
$leAndRiPadding: 12px 20px;
$title: 16px;
$titleWeight: 600;
// 总体盒子
.box {
  height: 86vh;
  .container {
    background-color: $mainBackgroundColor;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 30px;
    box-sizing: border-box;
    // 左边模块开始
    .leftCont {
      flex: 2;
      color: $MainColor;
      background-color: $leftAndRightBack;
      border-radius: $leAndRiBorderRadius;
      padding: $leAndRiPadding;
      box-sizing: border-box;
      .allData {
        margin-top: 10px;
        margin-bottom: 20px;
        display: flex;
        font-size: $mainfontsize;
        flex-direction: row;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
        .img {
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          background-color: #77a9e3;
          border-radius: 5px;
          margin-right: 20px;
        }
        .dataDetail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 70%;
          .saoma {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 10px;
            & > .SMName {
              flex: 7;
            }
            & > .SMNum {
              flex: 1;
              font-weight: 700;
            }
          }
          .fenxiang {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            & > .FXName {
              flex: 7;
            }
            & > .FXNum {
              flex: 1;
              font-weight: 700;
            }
          }
        }
      }
    }
    // 左边模块结束
    // 中间模块开始
    .mainCont {
      font-size: $mainfontsize;
      width: 100%;
      flex: 5;
      margin: 0 20px;
      .top {
        margin-bottom: 20px;
        .dateTi {
          font-size: 20px;
          font-weight: 800;
        }
        .dateWeek {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        $datashowback: #65c0ae;
        .dataShow {
          font-size: $mainfontsize;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .detail {
            width: 25%;
            text-align: center;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .dataDetail {
              margin-bottom: 20px;
            }
            .dataDetail1 {
              width: 60%;
              margin: 0 auto;
              z-index: 121;
              border: 1px solid $datashowback;
              background-color: $datashowback;
              border-radius: 55%;
              height: 50px;
              position: relative;
              & > span {
                font-size: 50px;
                position: absolute;
                z-index: 2;
                font-weight: 5000;
                margin-top: -30px;
                margin-left: -30px;
              }
              .dataDetail11 {
                width: 103%;
                margin: 0 auto;
                border: 1px solid $datashowback;
                border-radius: 55%;
                height: 50px;
                background-color: $mainBackgroundColor;
                margin-top: -6px;
                margin-left: -1px;
              }
            }
          }
        }
      }
      .bottom {
        background-color: $leftAndRightBack;
        border-radius: $leAndRiBorderRadius;
        padding: $leAndRiPadding;
        display: flex;
        flex-direction: row;
        .bottomLe {
          width: 48%;
          margin-right: 2%;
          .title1 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            & > span {
              font-weight: 800;
            }
          }
        }
        .bottomRi {
          width: 50%;
          .title1 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            & > span {
              font-weight: 800;
            }
          }
        }
      }
    }
    // 中部模块结束
    // 右侧表格开始
    .rightCont {
      flex: 3;
      .riTop {
        background-color: $mainBackgroundColor;
        color: $MainColor;
        background-color: $leftAndRightBack;
        border-radius: $leAndRiBorderRadius;
        padding: $leAndRiPadding;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
      .riBottom {
        background-color: $mainBackgroundColor;
        color: $MainColor;
        background-color: $leftAndRightBack;
        border-radius: $leAndRiBorderRadius;
        padding: $leAndRiPadding;
        box-sizing: border-box;
      }
    }
    & .title > span {
      font-size: $title;
      font-weight: $titleWeight;
    }
  }
}
// 右侧表格结束
</style>
