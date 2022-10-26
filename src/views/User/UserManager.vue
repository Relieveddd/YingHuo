<template>
  <div class="common-layout">
    <div class="el-mainDiv">
      <div class="maincont">
        <div class="cont-top">
          <div class="title-cont">角色列表</div>
          <div>
            <el-row>
              <el-col :span="12"
                ><div class="grid-content ep-bg-purple">
                  <el-button type="primary" @click="dialogFormVisible = true"
                    >新增</el-button
                  >

                  <el-dialog
                    :align-center="true"
                    v-model="dialogFormVisible"
                    title="新增角色"
                    width="600px"
                  >
                    <el-form
                      :model="roleform"
                      :rules="formRules"
                      class="demo-ruleForm"
                      ref="ruleForRef"
                    >
                      <el-form-item
                        label="角色名称"
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
                        label="上级角色"
                        :label-width="formLabelWidth"
                      >
                        <el-select
                          v-model="roleform.lastRole"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="(items, index) in roleList"
                            :key="index"
                            :label="items.role_name"
                            :value="items.role_id"
                          />
                        </el-select>
                      </el-form-item>

                      <el-form-item
                        v-model="checkedArr"
                        label="菜单权限："
                        :label-width="formLabelWidth"
                      >
                        <el-tree
                          ref="treeEl"
                          :data="treeData"
                          :props="{
                            value: 'permission_id',
                            label: 'permission_name',
                          }"
                          show-checkbox
                          node-key="permission_id"
                          default-expand-all
                          v-if="dialogFormVisible"
                          :default-checked-keys="checkedArr"
                          @check="handleChecked"
                        />
                      </el-form-item>
                      <el-form-item :label-width="formLabelWidth">
                        <span>设置该角色有权限操作的功能</span>
                      </el-form-item>
                      <el-form-item label="排序" :label-width="formLabelWidth">
                        <el-input-number v-model="roleform.UserSort" />
                      </el-form-item>
                      <el-form-item :label-width="formLabelWidth">
                        <span>数字越大越靠前</span>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false"
                          >取消</el-button
                        >
                        <el-button type="primary" @click="submitAddRole()"
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
              roleList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column prop="role_id" label="角色ID" width="180" />
            <el-table-column prop="role_name" label="角色名称" width="180" />
            <el-table-column prop="sort" label="排序" />
            <el-table-column prop="created_at" label="添加时间" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button link type="primary" @click="editContent(scope.row)">
                  编辑
                </el-button>
                <el-button link type="primary" @click.prevent="">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next,jumper, total"
            :total="roleList.length"
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
import { ref, reactive, watch, getCurrentInstance } from "vue";

//当前页 刷新后默认显示第一页
const currentPage = ref(1);
//每一页显示的数据量 此处每页显示6条数据
const pageSize = 10;
function handleCurrentChange(_currentPage) {
  //每次点击分页按钮，当前页发生变化
  currentPage.value = _currentPage;
  // console.log(_currentPage);
}
const { proxy } = getCurrentInstance();
// 定义变量保存请求的数据
let roleList = ref([]);
proxy
  .$axios({
    url: "/api/admin/roleLise",
    method: "POST",
    data: {
      token: localStorage.getItem("token"),
      size: 100,
      page: currentPage.value,
    },
  })
  .then((res) => {
    res.data.data.data.map((item) => {
      item.created_at = proxy.$timeTransformate(item.created_at);
      roleList.value.push(item);
    });
  });

// 弹出框
const dialogFormVisible = ref(false);
const fomForRules = ref();
const formLabelWidth = "200px";
const roleform = reactive({
  roleID: "",
  RoleName: "",
  lastRole: "",
  menuList: [],
  UserSort: 100,
});

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
const formru = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("表单验证成功");
    } else {
      ElMessage({
        type: "warning",
        message: "请输入角色名称",
      });
    }
  });
};
// 提交表单
const submitAddRole = () => {
  // console.log(roleform);
  proxy.$axios
    .post("/api/admin/roleAddModify", {
      token: localStorage.getItem("token"),
      role_id: roleform.roleID,
      role_name: roleform.RoleName,
      permissions: roleform.menuList,
      sort: roleform.UserSort,
    })
    .then((res) => {
      // 关闭弹窗
      dialogFormVisible.value = false;

      location.reload();
    });
};

// 权限列表------用于保存被选中的id(用于修改时上传)
const treeEl = ref(null);
const checkedArr = ref([]);
// 获取被选中的菜单id
const handleChecked = (data, checkedData) => {
  // 先清空数组
  roleform.menuList = [];
  checkedData.checkedNodes.forEach((item) => {
    roleform.menuList.push(item.permission_id);
  });
  console.log(data, roleform);
};
const treeData = ref([]);

// 请求权限申请
proxy
  .$axios({
    url: "/api/admin/permissionList",
    method: "post",
    data: {
      token: localStorage.getItem("token"),
    },
  })
  .then((res) => {
    // 一级分层数据
    console.log(res.data.data);
    res.data.data.forEach((item) => {
      if (item.parent_id == 0) {
        treeData.value.push(item);
      }
    });
    // 二级分层
    treeData.value.forEach((item) => {
      item.children = [];
      res.data.data.forEach((items) => {
        if (items.parent_id == item.permission_id) {
          item.children.push(items);
        }
      });
    });
    // 三级分层
    treeData.value.forEach((item) => {
      item.children.forEach((items) => {
        items.children = [];
        res.data.data.forEach((itemss) => {
          if (itemss.parent_id == items.permission_id) {
            items.children.push(itemss);
          }
        });
      });
    });
  });

// 编辑功能
const editContent = (getRoleId) => {
  dialogFormVisible.value = true;
  roleform.roleID = getRoleId.role_id;
  roleform.RoleName = getRoleId.role_name;
  roleform.UserSort = getRoleId.sort;
  getRoleId.permission.forEach((item) => {
    checkedArr.value.push(item.permission_id);
  });
  console.log(getRoleId);
};
// 监听弹窗是否弹出的值，如果退出清空对象数据
watch(dialogFormVisible, (newValue, oldValue) => {
  console.log(newValue);
  if (newValue == false) {
    treeEl.value.setCheckedKeys([]);
    roleform.roleID = "";
    roleform.RoleName = "";
    roleform.lastRole = "";
    roleform.menuList = [];
    roleform.UserSort = 100;
    checkedArr.value = [];
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
.cont-bttom table {
  width: 100%;
  margin-top: 20px;
  font-size: 15px;
  border-collapse: collapse;
}
.cont-bttom table tr td {
  height: 50px;
  padding-left: 15px;
  border-bottom: 1px solid rgb(231, 225, 225);
}
.el-form-item span {
  color: darkgrey;
  font-size: 12px;
  margin-top: -10px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
