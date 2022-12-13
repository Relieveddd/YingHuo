<!-- <template>
  <div class="container">
    <el-table data="table" style="width: 100%">
      <el-table-column prop="textName" label="文档名称" width="300" />
      <el-table-column prop="text" label="文件" width="200" />
      <el-table-column prop="score" label="分值" width="100" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="address" label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" @click=""> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 2代码，请求后端数据绑定到表格
import axios from "axios";
import { ref } from "vue";
const table = ref({
  userId: 1,
  textName: "",
  text: "",
  score: "",
  name: "",
});
axios
  .post({
    url: "www.baidu.com/api/userScoreList",
    data: {
      token: localStorage.getItem("token"),
      userId: table.value.userId,
    },
  })
  .then((res) => {
    table.value.textName = res.data.userScoreList.textName;
    table.value.text = res.data.userScoreList.text;
    table.value.score = res.data.userScoreList.score;
    table.value.name = res.data.userScoreList.name;
  });

// 1.冒泡排序
// functiurl:'www.baidu.com/api/userScoreList'on mpSort(_arr) {
//   for (var i = 0; i < _arr.length; i++) {
//     for (var j = 0; j < _arr.length - i; j++) {
//       if (_arr[j] > _arr[j + 1]) {
//         var temp = _arr[j];
//         _arr[j] = _arr[j + 1];
//         _arr[j + 1] = temp;
//       }
//     }
//   }
//   return _arr;
// }

// var arr = [45, 68, 72, 51, 29, 97];
// console.log(mpSort(arr));

// 2.
// 2.1
// 项目结构：
// vue页面的结构： template  script  style构成
// 布局可以使用1.element 提供的布局模式  2.自己使用flex进行布局
// 存储：存储分为cookie ，session 以及localStorage三种方式对数据进行保存
// 接口定义：接口主要是前端用来请求后端数据用的，前端常见的请求有以下几种:1.ajax进行请求数据 2.axios进行数据请求，axios常用的请求有get post put delete

// 2.2
// 1.首先表格在没有数据时没有做优化（当表格中没有数据时，应给予提示，例如nodata）
// 2.表格没有对单个数据进行处理的操作，表格不应该只是拿来看的，是可以对数据进行处理的
// 3.表格每一个单元的长度应该不一样，每一个数据的长度可能不等，设置每个单元格百分比的占比
</script>

<style scoped>
.container {
  display: flex;
}
</style> -->
