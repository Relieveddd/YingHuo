<template>
  <div class="common-layout">
    <div class="el-mainDiv">
      <div class="maincont">
        <div class="cont-top">
          <div class="title-cont">管理员列表</div>
          <div>
            <el-row>
              <el-col :span="12"
                ><div class="grid-content ep-bg-purple">
                  <el-button type="primary" @click="centerDialogVisible = true"
                    >新增</el-button
                  >
                  <el-dialog
                    v-model="centerDialogVisible"
                    title="增加用户"
                    width="500px"
                    align-center
                    ><el-form
                      ref="ruleFormRef"
                      :model="ruleForm"
                      :rules="rules"
                      label-width="120px"
                      class="demo-ruleForm"
                      :size="formSize"
                      status-icon
                    >
                      <el-form-item label="管理员姓名" prop="manageName">
                        <el-input v-model="ruleForm.manageName" />
                      </el-form-item>
                      <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName" />
                      </el-form-item>
                      <el-form-item label="所属角色" prop="userRole">
                        <el-select
                          v-model="ruleForm.userRole"
                          class="m-2"
                          placeholder="选择角色"
                        >
                          <el-option
                            v-for="(items, index) in adminRoleForm"
                            :key="index"
                            :label="items.role_name"
                            :value="items.role_id"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="用户密码" prop="pw">
                        <el-input
                          type="password"
                          autocomplete="off"
                          v-model="ruleForm.pw"
                        />
                      </el-form-item>
                      <el-form-item
                        label="确认密码"
                        autocomplete="off"
                        prop="checkPw"
                      >
                        <el-input type="password" v-model="ruleForm.checkPw" />
                      </el-form-item>
                      <el-form-item label="排序" prop="slot">
                        <el-input-number v-model="ruleForm.slot" />
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="centerDialogVisible = false"
                          >取消</el-button
                        >
                        <el-button @click="resetForm(ruleFormRef)"
                          >重置</el-button
                        >
                        <el-button
                          type="primary"
                          @click="submitForm(ruleFormRef)"
                          >确认</el-button
                        >
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </div>
              </el-col>

              <el-col :span="12"
                ><div class="grid-content ep-bg-purple-light" />
                <el-input
                  v-model="input1"
                  class="w-50 m-2"
                  placeholder="请输入用户名/姓名  "
                  :suffix-icon="Search"
              /></el-col>
            </el-row>
          </div>
        </div>
        <div class="cont-bttom">
          <el-table
            :data="
              adminlist.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
          >
            <el-table-column prop="admin_id" label="管理员ID" width="100" />
            <el-table-column prop="admin_name" label="用户名" width="150" />
            <el-table-column prop="pw" label="密码" width="200" />
            <el-table-column
              prop="roles[0].role_name"
              label="管理员角色"
              width="300"
            />
            <el-table-column prop="create_time" label="添加时间" width="150" />
            <el-table-column prop="address" label="操作" width="100">
              <template #default="scope">
                <el-button link type="primary" @click=""> 编辑 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            background
            layout="prev, pager, next,jumper, total"
            :total="adminlist.length"
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
import { Search } from "@element-plus/icons-vue";

import { reactive, ref, getCurrentInstance, watch } from "vue";

//当前页 刷新后默认显示第一页
const currentPage = ref(1);
//每一页显示的数据量 此处每页显示6条数据
const pageSize = 10;
function handleCurrentChange(_currentPage) {
  //每次点击分页按钮，当前页发生变化
  currentPage.value = _currentPage;
  // getAllData(currentPage.value, pageSize);
  // console.log(_currentPage);
}
// 设置变量保存当前请求获取的数据
let adminlist = ref([]);
let adminRoleForm = ref([]);
const { proxy } = getCurrentInstance();
// 请求当前管理员账号
// 设置总条数
let countNum = ref(1);
// 封装请求页面函数
const getAllData = (pageIn, sizeIn) => {
  proxy
    .$axios({
      url: "/api/admin/accountList",
      method: "POST",
      data: {
        token: localStorage.getItem("token"),
        page: pageIn,
        size: sizeIn,
      },
    })
    .then((res) => {
      // console.log(res.data.data.count);
      countNum.value = res.data.data.count;
      // console.log(countNum.value);
      res.data.data.data.map((item) => {
        item.create_time = proxy.$timeTransformate(item.create_time);
        adminlist.value.push(item);
      });
    });
};
getAllData(currentPage.value, 100);
// 设置用户角色变量用于渲染到页面
proxy.$axios
  .post("/api/admin/roleLise", {
    token: localStorage.getItem("token"),
    size: 100,
  })
  .then((res1) => {
    res1.data.data.data.map((item) => {
      adminRoleForm.value.push(item);
    });
  });
//dialog弹窗
const centerDialogVisible = ref(false);

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  manageName: "",
  userName: "",
  userRole: "",
  pw: "",
  checkPw: "",
  slot: 100,
});
// 密码验证
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPw !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPw", () => null);
    }
    callback();
  }
};
// 再次输入密码验证
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.pw) {
    callback(new Error("两次密码不一致!"));
  } else {
    callback();
  }
};
const rules = reactive({
  manageName: [
    {
      required: true,
      message: "请输入管理员名称",
      trigger: "blur",
    },
    { min: 2, message: "请至少输入2个字符", trigger: "blur" },
  ],
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    { min: 4, message: "请至少输入4个字符", trigger: "blur" },
  ],
  userRole: [
    {
      required: true,
      message: "请选择用户角色",
      trigger: "change",
    },
  ],
  pw: [{ required: true, validator: validatePass, trigger: "blur" }],
  checkPw: [{ required: true, validator: validatePass2, trigger: "blur" }],
});
// 表单新增用户提交验证
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      proxy
        .$axios({
          url: "/api/admin/register",
          method: "POST",
          data: {
            token: localStorage.getItem("token"),
            name: ruleForm.manageName,
            pw: ruleForm.pw,
            roles: [ruleForm.userRole],
          },
        })
        .then((res) => {
          // console.log(res);
        });

      // 关闭弹窗
      centerDialogVisible.value = false;
    } else {
      console.log("表单验证失败，请重新输入", fields);
    }
  });
};
// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
//关闭弹窗，清空数组
watch(centerDialogVisible, (newValue, oldValue) => {
  if (newValue == false) {
    ruleForm.manageName = "";
    ruleForm.userName = "";
    ruleForm.userRole = "";
    ruleForm.pw = "";
    ruleForm.checkPw = "";
    ruleForm.slot = 100;
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
