<template>
  <div class="common-layout">
    <div class="el-mainDiv">
      <div class="maincont">
        <div class="cont-top">
          <div class="title-cont">商品列表</div>
          <div class="secondDiv">
            <el-row>
              <el-form-item label="商品名称:">
                <el-col :span="7">
                  <el-input placeholder="请输入商品名称"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="商品编码:">
                <el-col :span="7">
                  <el-input placeholder="请输入商品编码"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="商品分类:">
                <el-col :span="7">
                  <el-input placeholder="请输入商品分类"></el-input>
                </el-col>
              </el-form-item>
              <el-col :span="3"
                ><div class="grid-content ep-bg-purple-light">
                  <el-button type="primary">搜索</el-button>
                </div></el-col
              >
            </el-row>
          </div>
          <div class="thirdDiv">
            <span>全部</span>
            <span>出售中</span>
            <span>已下架</span>
            <span>已售罄</span>
            <el-button type="primary" @click="addNewGood"> 创建商品</el-button>
          </div>
        </div>
        <div class="cont-bttom">
          <el-table
            :data="
              productList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="good_id" label="商品ID" width="100" />
            <el-table-column prop="good_name" label="商品名称" />
            <el-table-column label="商品图片" width="150">
              <template #default="scope">
                <img :src="scope.row.img" style="width: 50px; height: 50px" />
              </template>
            </el-table-column>
            <el-table-column prop="price" label="商品价格" />
            <el-table-column prop="promotion_price" label="商品总销量" />
            <el-table-column prop="channel_id" label="库存总量" />
            <el-table-column prop="is_new" label="状态" />
            <el-table-column prop="status" label="排序" />
            <el-table-column prop="create_time" label="添加时间" width="150" />
            <el-table-column prop="address" label="操作" width="100">
              <template #default="scope">
                <el-button link type="primary" @click="addNewGood(scope.row)">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next,jumper, total"
            :total="productList.length"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            style="text-align: center"
          />
        </div>
      </div>
    </div>
    <div class="el-footerDiv">Copyright © 2021 萤火科技 |YIOVO.COM</div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

//当前页 刷新后默认显示第一页
const currentPage = ref(1);
//每一页显示的数据量 此处每页显示6条数据
const pageSize = 10;
function handleCurrentChange(_currentPage) {
  //每次点击分页按钮，当前页发生变化
  currentPage.value = _currentPage;
  // console.log(_currentPage);
}
// 设置变量保存请求的商品数据
let productList = ref([]);
// 请求后端商品数据
proxy
  .$axios({
    url: "/api/admin/goodList",
    method: "POST",
    data: {
      token: localStorage.getItem("token"),
      size: 100,
    },
  })
  .then((res) => {
    res.data.data.data.map((item) => {
      item.create_time = proxy.$timeTransformate(item.create_time);
      productList.value.push(item);
    });
  });

// 新增或编辑.
const addNewGood = (rowIn) => {
  if (rowIn) {
    // console.log(rowIn);
    proxy.$router.push({
      path: "/creation",
      query: { good_id: rowIn.good_id },
    });
  } else {
    proxy.$router.push("/creation");
  }
};
</script>
<style scoped>
.common-layout {
  height: 89vh;
}
.title-cont .el-row .secondDiv .el-col .el-form-item .el-input {
  width: 100px;
}
.thirdDiv span {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-color: 1px solid skyblue;
}
.thirdDiv span :last-child {
  margin-right: 20px;
}
.thirdDiv span :hover {
  color: skyblue;
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
