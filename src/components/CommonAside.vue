<!-- <template>
  <div class="aside-container">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#001529"
      mode:vertical
      text-color="#fff"
      :collapse="false"
    >
      <h5>萤火商城2.0</h5>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
      >
        <el-icon><icon-menu /></el-icon>
        <component class="icons" :is="item.icon"></component>
        <span class="itemTitle">{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span class="itemTitle">{{ item.label }}</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item
            :index="subItem.path"
            component
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            ><component class="icons" :is="subItem.icon"></component>
            <span class="itemTitle">{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
// 构建侧边栏的栏目数据
const list = [
  {
    path: "/",
    name: "Home",
    label: "首页",
    icon: "menu",
    url: "../views/home/Home.vue",
  },
  {
    path: "/UserList",
    name: "UserList",
    label: "管理员",
    icon: "user",
    url: "../views/User/UserList.vue",
  },
  {
    path: "/ProductList",
    name: "ProductList",
    label: "商品管理",
    icon: "shop",
    url: "../views/Product/ProductList.vue",
  },
  {
    path: "",
    name: "user",
    label: "店铺管理",
    icon: "user",
    url: "UserManage/UserManage",
  },

  {
    path: "",
    name: "user",
    label: "订单管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    path: "",
    name: "user",
    label: "会员管理",
    icon: "user",
    url: "UserManage/UserManage464",
  },
  {
    path: "",
    name: "user",
    label: "内容管理",
    icon: "user",
    url: "UserManage/UserManage4654",
  },
  {
    path: "",
    name: "user",
    label: "营销管理",
    icon: "user",
    url: "UserManage/UserManage4646",
  },
  {
    path: "",
    name: "user",
    label: "数据统计",
    icon: "user",
    url: "UserManage/UserManage",
  },
];
// 遍历数组，没有children的item
const noChildren = () => {
  return list.filter((item) => !item.children);
};
// 遍历数组，返回有children的item
const hasChildren = () => {
  return list.filter((item) => item.children);
};
</script>

<style lang="less" scoped>
.icons {
  width: 16px;
  height: 16px;
}
.el-menu-item {
  color: silver;
  height: 45px;
  margin-left: -20px;
}
.el-menu-item:hover {
  color: white;
  background-color: #0d8fdf;
}
.router-link-exact-active {
  text-decoration: none;
  color: white;
}

.el-menu {
  height: 100vh;
}
div h5 {
  background-color: #001529;
  box-sizing: border-box;
  color: white;
  height: 60px;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-menu-item > .component {
  margin-right: 5px;
}
</style> -->
