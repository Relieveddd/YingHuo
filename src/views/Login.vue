<template>
  <div class="login-cont">
    <el-row :gutter="12">
      <el-col :span="7">
        <el-card shadow="always">
          <el-col>
            <div class="grid-content">
              <img
                src="../img/logo.a3adccf1.svg"
                style="width: 50px; height: 50px"
              /></div
          ></el-col>
          <el-col> <div class="grid-content sc-cont">商城登录系统</div></el-col>
          <el-form
            @submit.native.prevent
            ref="formRef"
            size="large"
            :model="form"
            :rules="rules"
          >
            <el-form-item prop="name"
              ><el-input
                v-model="form.name"
                show-text
                :prefix-icon="User"
                placeholder="请输入账号"
            /></el-form-item>
            <el-form-item prop="password"
              ><el-input
                v-model="form.password"
                :prefix-icon="Lock"
                show-password
                placeholder="请输入密码"
            /></el-form-item>
            <el-form-item
              ><el-button native-type="submit" color="#0D8FDF" @click="subumit"
                >确定</el-button
              ></el-form-item
            >
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { Search, Lock, User, ElementPlus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
// 表单校验
const formRef = ref();
// 表单校验以及登录
const subumit = () => {
  formRef.value.validate((valid, fileds) => {
    if (valid) {
      proxy
        .$axios({
          url: "/api/admin/login",
          method: "post",
          data: {
            name: form.value.name,
            pw: form.value.password,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            if (
              form.value.name === res.data.data.admin_name &&
              form.value.password === res.data.data.pw
            ) {
              localStorage.setItem("token", res.data.data.token);
              proxy.$router.push("/");
            } else {
              ElMessage({
                message: "账号或密码错误，请重新输入",
                type: "warning",
              });
            }
          } else if (res.status == 400) {
            ElMessage({
              message: "客户端错误",
              type: "warning",
            });
          } else if (res.status == 500) {
            ElMessage({
              message: "服务端错误",
              type: "warning",
            });
          }
        });
    } else {
      ElMessage({
        message: "表单验证失败，请重新输入",
        type: "warning",
      });
    }
  });
};
proxy
  .$axios({
    url: "/api/admin/accountDelete",
    method: "delete",
    data: { admin_name: "a", pw: "a" },
  })
  .then((res) => {
    console.log(res);
  });

//设置变量 双向绑定用户名和密码
const form = ref({
  name: "",
  password: "",
});
</script>
<style scoped>
.login-cont {
  margin-top: 20vh;
}
.el-button {
  width: 100%;
  font-size: 1rem;
}
.el-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-col .grid-content {
  font-size: 20px;
  color: darkslategrey;
  text-align: center;
  margin-bottom: 20px;
}
.el-col .grid-content .sc-cont {
  margin-bottom: 20px;
}
</style>
