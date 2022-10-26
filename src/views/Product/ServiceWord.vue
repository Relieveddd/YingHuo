<template>
  <div class="common-layout">
    <div class="el-mainDiv">
      <div class="maincont">
        <div class="cont-top">
          <div class="title-cont">服务承诺</div>
          <div>
            <el-row>
              <el-col :span="12"
                ><div class="grid-content ep-bg-purple" />
                <el-button type="primary">新增</el-button></el-col
              >
              <el-col :span="12"
                ><div class="grid-content ep-bg-purple-light" />
                <el-input
                  v-model="input1"
                  class="w-50 m-2"
                  placeholder="请输入服务名称"
                  :suffix-icon="Search"
              /></el-col>
            </el-row>
          </div>
        </div>
        <div class="cont-bttom">
          <el-table :data="serviceList" style="width: 100%">
            <el-table-column prop="servicename" label="服务名称" width="180" />
            <el-table-column prop="miaoshu" label="概述" width="180" />
            <el-table-column label="是否默认" width="100">
              <template #default="scope">
                <el-tag>{{ scope.row.ifMoren }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="scope">
                <el-tag class="zt">{{ scope.row.zhuangtai }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="paixu" label="排序" />
            <el-table-column prop="update_time" label="更新时间" width="180" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button link type="primary" @click.prevent="">
                  编辑
                </el-button>
                <el-button link type="primary" @click.prevent="">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="el-footerDiv">Copyright © 2021 萤火科技 |YIOVO.COM</div>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
let serviceList = ref([
  {
    servicename: "七天无理由退货",
    miaoshu: "满足相应条件时，消费者可申请7天无理由退货",
    ifMoren: "是",
    zhuangtai: "显示",
    paixu: 100,
    update_time: "2021-03-01 08:00:00",
  },
  {
    servicename: "全场包邮",
    miaoshu: "所有商品包邮（偏远地区除外）",
    ifMoren: "否",
    zhuangtai: "显示",
    paixu: 100,
    update_time: "2021-03-01 08:00:00",
  },
  {
    servicename: "48小时发货",
    miaoshu: "下单后48小时之内发货",
    ifMoren: "是",
    zhuangtai: "显示",
    paixu: 100,
    update_time: "2021-03-01 08:00:00",
  },
]);
</script>
<style scoped>
.common-layout {
  height: 89vh;
}
.el-mainDiv {
  width: 98.5%;
  margin: 1% 0 0 1.5%;
  background-color: white;
  box-sizing: border-box;
}
.maincont {
  padding: 1% 0 1% 1.5%;
  box-sizing: border-box;
}
.el-footerDiv {
  margin-top: 50px;
  font-size: 13px;
  width: 100%;
  text-align: center;
}
.title-cont {
  margin-bottom: 2%;
  font-size: 20px;
}
.con-bttom {
  margin-top: 10px;
}
</style>
