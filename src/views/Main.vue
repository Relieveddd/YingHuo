<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="widthAside">
        <el-main>
          <div class="first-aside">
            <el-menu
              :default-active="mselectedID"
              class="el-menu-vertical-demo"
              background-color="#001529"
              text-color="#fff"
              :collapse="ifCollapse"
            >
              <h5>萤火商城2.0</h5>
              <el-menu-item
                :index="index"
                v-for="(item, index) in list"
                :key="index"
                @click="change(index)"
              >
                <el-icon><icon-menu /></el-icon>
                <component class="icons" :is="item.icon"></component>
                <span class="itemTitle">{{ item.label }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-main></el-aside
      >
      <el-container>
        <el-header>
          <div class="headerall">
            <div class="l-content">
              <el-button size="small" color="#ffffff" @click="subAsideRe">
                <el-icon :size="20"><Fold /></el-icon>
              </el-button>
              <el-button size="small" color="#ffffff" @click="btnRefresh">
                <el-icon :size="20"><RefreshLeft /></el-icon>
              </el-button>
              <el-tag v-for="(item, index) in menu_title" :key="index">{{
                item.label
              }}</el-tag>
            </div>
            <div class="r-content">
              <el-dropdown
                size="large"
                style="width: 150px; height: 60px; line-height: 60px"
              >
                <span class="el-dropdown-link">
                  <el-icon style="color: black; size: 2em; margin-right: 5px"
                    ><User
                  /></el-icon>
                  系统管理员
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      ><el-icon style="size: 2em; margin-right: 5px"
                        ><Setting /></el-icon
                      >账户设置</el-dropdown-item
                    >
                    <el-dropdown-item @click="eixtNow"
                      ><el-icon style="size: 2em; margin-right: 5px"
                        ><SwitchButton /></el-icon
                      >退出登录</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-container>
          <div class="second-aside">
            <el-aside width="120px" v-if="child_menu.length > 0">
              <el-row class="tac">
                <el-col>
                  <el-menu class="el-menu-vertical-demo">
                    <el-menu-item
                      v-for="(item, index) in child_menu"
                      :index="index"
                      :key="index"
                      @click="jump(index)"
                    >
                      <span class="itemTitle">{{ item.label }}</span>
                    </el-menu-item>
                  </el-menu>
                </el-col>
              </el-row>
            </el-aside>
          </div>

          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { ref, getCurrentInstance, onMounted } from "vue";

//设置控制aside宽度的变量
let widthAside = ref(160 + "px");
// 设置变量保存firsta-side是否伸缩
let ifCollapse = ref(false);
// 边框收缩功能
const subAsideRe = () => {
  if (ifCollapse.value === false) {
    ifCollapse.value = true;
    widthAside.value = 65 + "px";
  } else {
    ifCollapse.value = false;
    widthAside.value = 160 + "px";
  }
};
// btnRefresh刷新页面
const btnRefresh = () => {
  location.reload();
};
let mselectedID = ref(0);
// 设置变量保存顶部当前所在的页面
let menu_title = ref([]);
// 引入proxy
const { proxy } = getCurrentInstance();
// 设置数组渲染一级侧边栏
const list = ref([
  {
    label: "首页",
    icon: "menu",
    path: "/",
  },

  {
    label: "管理员",
    icon: "user",
    children: [
      {
        label: "管理员列表",
        path: "/UserList",
      },
      {
        label: "角色管理",
        path: "/UserManager",
      },
    ],
  },
  {
    label: "商品管理",
    icon: "shop",
    children: [
      {
        label: "商品列表",
        path: "/ProductList",
      },
      {
        label: "商品分类",
        path: "/ProductClass",
      },
      {
        label: "服务承诺",
        path: "/ServiceWord",
      },
      {
        label: "商品评价",
        path: "/ProductCont",
      },
    ],
  },
]);
// 设置变量保存点击了一级菜单以后的二级菜单的所有选项
let child_menu = ref([]);
// 退出当前账号
const eixtNow = () => {
  localStorage.removeItem("token");
  proxy.$router.push("/login");
};
// 一级菜单的路由跳转
const change = (index) => {
  menu_title.value = [];
  menu_title.value.push(list.value[index]);
  if (list.value[index].children) {
    child_menu.value = list.value[index].children;
    proxy.$router.push(child_menu.value[0].path);
    menu_title.value.push(child_menu.value[0]);
  } else {
    child_menu.value = [];
    proxy.$router.push(list.value[0].path);
  }
};
// 二级菜单的路由跳转
let jump = (index) => {
  menu_title.value[1] = child_menu.value[index];
  proxy.$router.push(child_menu.value[index].path);
};

// 设置声明周期函数保存刷新之前的index，保证刷新以后依然在原页面
onMounted(() => {
  let path = proxy.$route.path;
  list.value.forEach((item, index) => {
    if (item.children) {
      item.children.forEach((items) => {
        if (items.path == path) {
          child_menu.value = item.children;
          mselectedID.value = index;
          menu_title.value[0] = item;
          menu_title.value[1] = items;
        }
      });
    }
  });
});
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}
body {
  background-color: #f0f2f5;
}
.common-layout .main-cont {
  width: 100%;
}
.common-layout .el-container .el-header {
  flex-wrap: wrap;
  padding: 0;
}
.common-layout {
  height: 100%;
  background-color: #f0f2f5;
}
.el-main {
  padding: 0;
}
.icons {
  width: 16px;
  height: 16px;
}
.common-layout .el-menu-item.is-active {
  background-color: #0d8fdf;
  color: white;
}
.first-aside .el-menu-item {
  height: 45px;
  color: grey;
  margin-left: -20px;
}
.first-aside .el-menu-item:hover {
  color: white;
}
.el-menu {
  height: 100vh;
}
.second-aside .el-aside .el-menu {
  height: 90.5vh;
}
div h5 {
  background-color: #001529;
  box-sizing: border-box;
  color: white;
  height: 60px;
  line-height: 60px;
  padding-left: 1rem;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.headerall {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: white;
}
.headerall .el-tag {
  color: #001529;
}
.el-container .el-header {
  box-shadow: 0px 2px 2px -2px #5e5e5e;
  z-index: 2;
}

.el-button {
  border: none;
}
.el-dropdown {
  margin-right: 20px;
  padding-left: 20px;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: 14px;
}
.l-content {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-sizing: border-box;
}
.el-dropdown:hover {
  background-color: #f9f9f9;
}
</style>
