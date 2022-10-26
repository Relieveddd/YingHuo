<template>
  <div class="common-layout">
    <div class="el-mainDiv">
      <div class="maincont">
        <div class="cont-top">
          <div class="title-cont">商品评价</div>
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
                  placeholder="请输入将要搜索的评价"
                  :suffix-icon="Search"
              /></el-col>
            </el-row>
          </div>
        </div>
        <div class="cont-bttom">
          <el-table :data="contlist" style="width: 100%">
            <el-table-column prop="data1" label="ID" width="180" />
            <el-table-column prop="data2" label="商品信息" width="180" />
            <el-table-column prop="address" label="买家" />
            <el-table-column prop="address" label="评分" />
            <el-table-column prop="address" label="评价内容" />
            <el-table-column prop="address" label="图片评价" />
            <el-table-column prop="address" label="状态" />
            <el-table-column prop="address" label="排序" />
            <el-table-column prop="address" label="评价时间" />
            <el-table-column prop="address" label="操作" />
          </el-table>
        </div>
      </div>
    </div>
    <div class="el-footerDiv">Copyright © 2021 萤火科技 |YIOVO.COM</div>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
let contlist = [];
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
.cont-bttom {
  margin-top: 10px;
}
</style>
