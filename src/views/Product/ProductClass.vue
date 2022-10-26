<template>
  <div class="common-layout">
    <div class="el-mainDiv">
      <div class="maincont">
        <div class="cont-top">
          <div class="title-cont">商品分类</div>
          <div>
            <el-row>
              <el-col :span="12"
                ><div class="grid-content ep-bg-purple">
                  <el-button type="primary" @click="dialogFormVisible = true"
                    >新增</el-button
                  >
                  <el-dialog
                    align-center="true"
                    v-model="dialogFormVisible"
                    title="新增角商品分类"
                    width="600px"
                  >
                    <el-form
                      :model="roleform"
                      :rules="formRules"
                      class="demo-ruleForm"
                      ref="formForRules"
                    >
                      <el-form-item
                        label="分类名称"
                        :label-width="formLabelWidth"
                        prop="RoleName"
                      >
                        <el-input
                          v-model="roleform.RoleName"
                          autocomplete="off"
                          trigger="blur"
                        />
                      </el-form-item>
                      <el-form-item
                        label="上级分类"
                        :label-width="formLabelWidth"
                      >
                        <el-tree-select
                          v-model="roleform.parentRoleID"
                          placeholder="请选择"
                          check-strictly="true"
                          :data="list"
                          :default-expanded-keys="defaultExpandedNodes"
                          :props="{ value: 'good_type_id', label: 'type_name' }"
                        />
                      </el-form-item>
                      <el-form-item
                        v-model="roleform.menuList"
                        label="分类图片："
                        :label-width="formLabelWidth"
                      >
                        <el-upload
                          class="avatar-uploader"
                          action="http://api_devs.wanxikeji.cn/api/savePic"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          name="img"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <el-icon v-else class="avatar-uploader-icon"
                            ><Plus
                          /></el-icon>
                        </el-upload>
                      </el-form-item>
                      <el-form-item> </el-form-item>
                      <el-form-item :label-width="formLabelWidth">
                        <span>用户端是否展示</span>
                      </el-form-item>
                      <el-form-item label="排序" :label-width="formLabelWidth">
                        <el-input-number v-model="roleform.UserSort" />
                      </el-form-item>
                      <el-form-item :label-width="formLabelWidth">
                        <span>数字越小越靠前</span>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false"
                          >取消</el-button
                        >
                        <el-button
                          type="primary"
                          @click="submitAddRole(formForRules)"
                          >确认</el-button
                        >
                      </span>
                    </template>
                  </el-dialog>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
        <div class="cont-bttom">
          <el-table
            :data="
              list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            "
            style="width: 100%"
            row-key="good_type_id"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="good_type_id" label="分类ID" width="180" />
            <el-table-column prop="type_name" label="分类名称" width="180" />
            <el-table-column label="状态">
              <template #default="scope">
                <img :src="scope.row.pic" style="width: 50px; height: 50px" />
              </template>
            </el-table-column>
            <el-table-column prop="status" label="排序" />
            <el-table-column prop="create_time" label="添加时间" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click="goodTypeModify(scope.row)"
                >
                  编辑
                </el-button>
                <el-button link type="primary" @click=""> 删除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next,jumper, total"
            :total="list.length"
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
import { getCurrentInstance, ref, reactive, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance();

//当前页 刷新后默认显示第一页
const currentPage = ref(1);
//每一页显示的数据量 此处每页显示6条数据
const pageSize = 10;
function handleCurrentChange(_currentPage) {
  //每次点击分页按钮，当前页发生变化
  currentPage.value = _currentPage;
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.level === 2) {
    return "warning-row";
  } else if (row.level === 3) {
    return "success-row";
  }
  return "";
};
// 商品分类列表（将数据分成三层）
let list = ref([]);
proxy
  .$axios({
    url: "http://api_devs.wanxikeji.cn/api/admin/goodsTypeList",
    method: "POST",
    data: {
      token: localStorage.getItem("token"),
    },
  })
  .then((res) => {
    // 循环处理一级数据
    res.data.data.forEach((item) => {
      if (item.parent_id == 0) {
        item.level = 1;
        item.create_time = proxy.$timeTransformate(item.create_time);
        list.value.push(item);
      }
    });
    // 处理二级数据
    list.value.forEach((item) => {
      item.children = [];
      res.data.data.forEach((items) => {
        if (items.parent_id == item.good_type_id) {
          items.level = 2;
          items.create_time = proxy.$timeTransformate(items.create_time);
          item.children.push(items);
        }
      });
    });
    //处理三级数据
    list.value.forEach((item) => {
      item.children.forEach((items) => {
        items.children = [];
        res.data.data.forEach((itemss) => {
          if (itemss.parent_id == items.good_type_id) {
            itemss.level = 3;
            itemss.create_time = proxy.$timeTransformate(itemss.create_time);
            items.children.push(itemss);
          }
        });
      });
    });
    console.log(list.value);
  });
// 增加

// 弹出框
const imageUrl = ref("");
const dialogFormVisible = ref(false);
const formForRules = ref();
const formLabelWidth = "200px";
const roleform = reactive({
  RoleName: "",
  roleID: "",
  pic: "",
  parentRoleID: "",
  UserSort: 100,
});
// 验证规则
const formRules = reactive({
  RoleName: [
    {
      required: true,
      message: "请输入角色名称",
      trigger: "blur",
    },
    { min: 2, message: "请至少输入2个字符", trigger: "blur" },
  ],
});

// 表单验证
const submitAddRole = async (formForRules) => {
  if (!formForRules) return;
  await formForRules.validate((valid, fields) => {
    if (valid) {
      proxy.$axios
        .post("/api/admin/addGoodType", {
          token: localStorage.getItem("token"),
          name: roleform.RoleName,
          pid: roleform.parentRoleID,
          id: roleform.roleID,
          pic: imageUrl.value,
        })
        .then((res) => {
          console.log(res);
          // 关闭弹窗，刷新页面
          dialogFormVisible.value = false;
          location.reload();
        });
    } else {
      ElMessage({
        type: "warning",
        message: "请输入角色名称",
      });
    }
  });
};
// upload

// 图片上传

const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response.data);
  imageUrl.value = "http://api_devs.wanxikeji.cn/" + response.data;
};
// 编辑功能
function goodTypeModify(_infoIn) {
  dialogFormVisible.value = true;
  roleform.RoleName = _infoIn.type_name;
  roleform.roleID = _infoIn.good_type_id;
  roleform.parentRoleID = _infoIn.parent_id;
  imageUrl.value = _infoIn.pic;
  roleform.UserSort = _infoIn.status;
  console.log(_infoIn);
}
// 通过弹窗值变化清空数组
watch(dialogFormVisible, (newVal, oldVal) => {
  if (newVal == false) {
    roleform.RoleName = "";
    roleform.roleID = "";
    roleform.pic = "";
    roleform.parentRoleID = "";
    roleform.UserSort = 100;
  }
});
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
::v-deep .el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
::v-deep .el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
