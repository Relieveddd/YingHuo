<template>
  <div class="allContent">
    <div class="contentColor">
      <h1>创建商品</h1>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="基本信息" name="first">
          <!-- 基本信息 -->
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            status-icon
          >
            <el-form-item label="商品名称" prop="goodname">
              <el-input v-model="ruleForm.goodname" />
            </el-form-item>

            <el-form-item label="商品分类">
              <el-tree-select
                v-model="ruleForm.typeID"
                placeholder="请选择"
                check-strictly="true"
                :data="GoodTypeList"
                :default-expanded-keys="defaultExpandedNodes"
                :props="{ value: 'good_type_id', label: 'type_name' }"
              />
            </el-form-item>

            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="http://api_devs.wanxikeji.cn/api/savePic"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="img"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="商品编码">
              <el-input v-model="ruleForm.goodsID" />
            </el-form-item>

            <el-form-item label="请选择运费模板">
              <el-select
                v-model="ruleForm.priceYf"
                placeholder="请选择运费模板"
              >
                <el-option
                  v-for="item in newoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="商品状态">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="0">上架</el-radio>
                <el-radio label="1">下架</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="商品排序" prop="sort">
              <el-input-number
                v-model="ruleForm.sort"
                :min="1"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="jbInformSub(ruleFormRef)"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 规格库存开始 -->
        <el-tab-pane label="规格/库存" name="second">
          <el-form>
            <el-form-item label="规格类型:" :label-width="formLabelWidth">
              <el-radio-group v-model="radio31">
                <el-radio :label="3" @click="simplyPage">单规格</el-radio>
                <el-radio :label="6" @click="morePage">多规格</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- 单规格页面 -->
          <el-form v-show="simplyPageVisible">
            <el-form-item label="商品价格:" :label-width="formLabelWidth">
              <el-input-number
                :precision="0"
                v-model="ruleForm.price"
                class="mx-4"
                :min="10"
                :max="500"
                controls-position="right"
                :controls="simplyFlag"
                @focus="simplyHandleVisible()"
              />元
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1">商品的实际购买金额, 最低0.01</span>
            </el-form-item>
            <el-form-item label="划线价:" :label-width="formLabelWidth">
              <el-input-number
                :precision="2"
                v-model="underinePrice"
                class="mx-4"
                :min="0"
                :max="500"
                controls-position="right"
                :controls="simplyFlag"
                @focus="simplyHandleVisible()"
              />元
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1">划线价仅用于商品页展示</span>
            </el-form-item>
            <el-form-item label="当前库存数量:" :label-width="formLabelWidth">
              <el-input-number
                v-model="stockNum"
                class="mx-4"
                :min="0"
                :max="10"
                controls-position="right"
                :controls="simplyFlag"
                @focus="simplyHandleVisible()"
              />件
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1"
                >商品的实际库存数量，为0时用户无法下单</span
              >
            </el-form-item>
            <el-form-item label="商品重量:" :label-width="formLabelWidth">
              <el-input-number
                v-model="goodWeight"
                class="mx-4"
                :min="0"
                :max="10"
                controls-position="right"
                :controls="simplyFlag"
                @focus="simplyHandleVisible()"
              />千克(Kg)
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1">商品的实际重量，用于计算运费</span>
            </el-form-item>
            <el-form-item label="库存计算方法:" :label-width="formLabelWidth">
              <el-radio-group v-model="simplyRadio">
                <el-radio :label="2">下单减库存</el-radio>
                <el-radio :label="4">付款减库存</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-button class="newAddBtn">提交</el-button>
          </el-form>
          <!-- 多规格 -->
          <el-form v-show="morePageVisible">
            <div v-for="(item, index) in sku_column" :key="index">
              <div class="title">
                <el-input type="text" v-model="item.title">{{
                  item.title
                }}</el-input>
              </div>
              <div>
                <span>
                  <el-input
                    v-for="(items, indexs) in item.title_value"
                    class="title_value"
                    type="text"
                    v-model="item.title_value[indexs]"
                    >{{ items }}</el-input
                  >
                  <el-button
                    class="addTitle_valueItem"
                    @click="addTitle_valueItem(index)"
                  >
                    新增规格值
                  </el-button>
                </span>
              </div>
            </div>
            <br />
            <div>
              <el-button @click="addListItem" v-if="sku_column.length < 3">
                + 添加规格组
              </el-button>
            </div>
            <br />
            <div><el-button @click="makeSku">生成 sku 列表</el-button></div>
            <!-- {{sku_list}} -->
            <el-table :data="sku_list">
              <el-table-column
                :label="item.title"
                v-for="(item, index) in sku_column"
                :key="index"
              >
                <!-- 插槽，.row.sku拿到该行数据  .index的下标  -->
                <template #default="scpoe">{{ scpoe.row.sku[index] }}</template>
              </el-table-column>
              <el-table-column label="图片">
                <template #default="scpoe">
                  <!-- 图片上传框 -->
                  <el-upload
                    class="avatar-uploader"
                    action="http://api_devs.wanxikeji.cn/api/savePic"
                    name="img"
                    :show-file-list="false"
                    :on-success="
                      (response, uploadFile) => {
                        uploadSuccess(response, scpoe.row);
                      }
                    "
                  >
                    <img
                      v-if="scpoe.row.img"
                      :src="scpoe.row.img"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column label="价格">
                <template #default="scpoe">
                  <el-input v-model="scpoe.row.price"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
        <!-- 商品详情开始 -->
        <el-tab-pane label="商品详情" name="fourth">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
            />
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              @onCreated="handleCreated"
            />
          </div>
        </el-tab-pane>
        <!-- 更多设置开始 -->
        <el-tab-pane label="更多设置" name="third">
          <el-form :model="moreSetForm">
            <el-form-item label="商品卖点:" :label-width="formLabelWidth">
              <el-input placeholder="请输入商品卖点" />
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1"
                >一句话简述，例如：此款商品美观大方 性价比较高 不容错过</span
              >
            </el-form-item>
            <el-form-item label="服务与承诺:" :label-width="formLabelWidth">
              <el-select
                v-model="value4"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="请选择服务与承诺"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize">去新增 刷新</span>
            </el-form-item>
            <el-form-item label="初始销量:" :label-width="formLabelWidth">
              <el-input-number
                v-model="goodPrice"
                class="mx-4"
                :min="1"
                :max="500"
                controls-position="right"
                :controls="flag"
                @focus="handleVisible()"
              />元
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1"
                >用户端展示的销量 = 初始销量 + 实际销量</span
              >
            </el-form-item>
            <el-form-item label="积分赠送:" :label-width="formLabelWidth">
              <el-radio-group v-model="radio41">
                <el-radio :label="3">开启</el-radio>
                <el-radio :label="6">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1">开启后用户购买此商品将获得积分</span>
            </el-form-item>
            <el-form-item label="积分抵扣:" :label-width="formLabelWidth">
              <el-radio-group v-model="radio42">
                <el-radio :label="2">开启</el-radio>
                <el-radio :label="4">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1"
                >开启后用户购买此商品可以使用积分进行抵扣</span
              >
            </el-form-item>
            <el-form-item label="会员折扣:" :label-width="formLabelWidth">
              <el-radio-group v-model="radio43">
                <el-radio :label="0">开启</el-radio>
                <el-radio :label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1"
                >开启后会员折扣，会员购买此商品可以享受会员等级折扣价</span
              >
            </el-form-item>
            <el-form-item label="会员折扣设置:" :label-width="formLabelWidth">
              <el-radio-group v-model="radio44">
                <el-radio :label="5">默认等级折扣</el-radio>
                <el-radio :label="7">单独设置折扣</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <span class="formTextSize1"
                >默认折扣：默认为用户所属会员等级的折扣率</span
              >
            </el-form-item>
            <el-button class="newAddBtn">提交</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import {
  reactive,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  getCurrentInstance,
} from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useRoute } from "vue-router";

const { proxy } = getCurrentInstance();
const activeName = ref("first");

const imageUrl = ref("");
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = "http://api_devs.wanxikeji.cn/" + response.data;
};

const ruleFormRef = ref();
const ruleForm = reactive({
  goodname: "",
  typeID: "",
  typeParentID: "",
  price: "",
  goodsID: "",
  picUrl: "",
  picUrls: "",
  wangeditorText: "",
  ifHot: "",
  colour: {},
  eidition: {},
  resource: "",
  sort: 1,
  priceYf: "",
});
// 接收路由传参的值
const $route = useRoute();
if ($route.query != null) {
  proxy
    .$axios({
      url: "/api/admin/goodInfo",
      method: "post",
      data: {
        token: localStorage.getItem("token"),
        good_id: $route.query,
      },
    })
    .then((res) => {
      console.log(res);
      const resNew = res.data.data;
      ruleForm.goodsID = resNew.good_id;
      ruleForm.typeID = resNew.type_id;
      ruleForm.price = resNew.price;
      ruleForm.picUrl = resNew.img;
      ruleForm.goodname = resNew.good_name;
      ruleForm.priceYf = resNew.promotion_price;
      imageUrl.value = ruleForm.picUrl;
      valueHtml.value = resNew.info[0].info;
    });
  // console.log(ruleForm);
}

// 表单验证
const rules = reactive({
  goodname: [
    { required: true, message: " name", trigger: "blur" },
    { min: 3, message: " 最少三位", trigger: "blur" },
  ],

  goodsClassify: [
    { required: true, message: "请输入内容", trigger: "blur" },
    { min: 1, max: 10, message: "长度在1-10之间", trigger: "blur" },
  ],
  transportPrice: [{ required: true, message: "请选择", trigger: "change" }],
  picUrl: [{ required: true, message: "请上传图片", trigger: "blur" }],
  state: [{ required: true, message: "请选择一个", trigger: "blur" }],
  sort: [
    { required: true, message: "请输入内容", trigger: "blur" },
    {
      min: 1,
      max: 10,
      message: "长度在1-10之间的数字",
      trigger: "blur",
      type: "number",
    },
  ],
});

// 提交
const jbInformSub = async (ruleFormRef) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate((valid, fields) => {
    if (valid) {
      ruleForm.picUrl = imageUrl.value;
      ruleForm.info = valueHtml.value;
      console.log(ruleForm);
      proxy
        .$axios({
          url: "/api/admin/addModifyGood",
          method: "post",
          data: {
            token: localStorage.getItem("token"),
            good_name: ruleForm.goodname,
            type_id: ruleForm.typeID,
            type_parent_id: ruleForm.typeID,
            price: ruleForm.price,
            img: ruleForm.picUrl,
            imgs: ruleForm.picUrl,
            info: ruleForm.info,
            is_new: ruleForm.ifHot,
            good_id: ruleForm.goodsID,
            edition: { sku_column: sku_column.value, sku_list: sku_list.value },
            colour: { cpu: "骁龙750", 网络: "5G", 重量: "178g" },
          },
        })
        .then((res) => {
          console.log(res);
          proxy.$router.push("/ProductList");
        });
    }
  });
};
// 商品分类列表（将数据分成三层）
let GoodTypeList = ref([]);
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
        GoodTypeList.value.push(item);
      }
    });
    // 处理二级数据
    GoodTypeList.value.forEach((item) => {
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
    GoodTypeList.value.forEach((item) => {
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
  });

//运费

const newoptions = [
  {
    value: "Option1",
    label: "Option1",
  },
];
// 提交按钮里面确定的点击事件

// 规格库存开始
const radio31 = ref(3); //单选点击按钮
// 单规格页面
// 上架 下架
const simplyRadio = ref(2); //单选点击按钮
// 计数按钮
const simplygGodPrice = ref(2.0); //商品价格
const underinePrice = ref(0.0); //划线价
const stockNum = ref(100); //当前库存数量
const goodWeight = ref(4); //商品重量
let simplyFlag = ref(false);
function simplyHandleVisible() {
  simplyFlag.value = true;
}
// 判断该页面是否显示
let simplyPageVisible = ref(false);
let morePageVisible = ref(false);
const simplyPage = () => {
  simplyPageVisible.value = true;
  morePageVisible.value = false;
};
simplyPage();
const morePage = () => {
  simplyPageVisible.value = false;
  morePageVisible.value = true;
};
// 多规格页面
let sku_column = ref([
  {
    title: "颜色", //颜色
    title_value: ["红色", "蓝色"], //颜色的分类
  },
  {
    title: "内存", //内存
    title_value: ["8g", "16g", "32g"], //内存的分类
  },
]);
// 整个数组添加的点击事件
const addListItem = () => {
  sku_column.value.push({
    title: "", //颜色
    title_value: [""], //颜色的分类
  });
};
// 横向添加的点击事件
const addTitle_valueItem = (index) => {
  sku_column.value[index].title_value.push("");
};
let sku_list = ref([
  {
    sku: ["红色", "8g"],
    img: "",
    price: "100",
    stock: "10",
  },
  {
    sku: ["红色", "16g"],
    price: 100,
    stock: 10,
    img: "",
  },
  {
    sku: ["红色", "32g"],
    price: 100,
    stock: 10,
    img: "",
  },
  {
    sku: ["蓝色", "8g"],
    price: 100,
    stock: 10,
    img: "",
  },
  {
    sku: ["蓝色", "16g"],
    price: 100,
    stock: 10,
    img: "",
  },
  {
    sku: ["蓝色", "32g"],
    price: 100,
    stock: 10,
    img: "",
  },
]);
// 生成 sku 列表
const makeSku = () => {
  sku_list.value = [];
  let temp = [];
  sku_column.value.forEach((item, index) => {
    //拿到了 sku_column 里面的每一个子元素
    // 定义一个中间数组，因为不能在循环该数组的同时对数组进行操作
    let midArr = [];
    if (index == 0) {
      temp = item.title_value;
      // console.log(temp);
    } else {
      temp.forEach((items) => {
        // console.log(items);
        item.title_value.forEach((itemss) => {
          //具体颜色那一行进行循环  itemss代表要进行合并的原色即具体的颜色(内存)
          // console.log(itemss);
          // console.log(items + itemss);
          midArr.push(items + "+" + itemss);
          temp = midArr;
        });
      });
    }
  });
  // console.log(temp);
  temp.forEach((item, index) => {
    sku_list.value.push({
      sku: item.split("+"),
      img: "",
      price: "100",
    });
  });
};
// 图片上传
const uploadSuccess = (res, row) => {
  row.img = "http://api_devs.wanxikeji.cn/" + res.data;
};
// 商品详情开始
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("<p>hello</p>");
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});
const toolbarConfig = {};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    //自定义字号
    fontSize: {
      fontSizeList: [
        // 元素支持两种形式
        //   1. 字符串；
        //   2. { name: 'xxx', value: 'xxx' }
        "12px",
        "16px",
        "28px",
        { name: "设置24px", value: "24px" },
        "40px",
      ],
    },
    //自定义上传
    uploadImage: {
      // 自定义上传
      async customUpload(file, insertFn) {
        // TS 语法
        // async customUpload(file, insertFn) {                   // JS 语法
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        let from = new FormData();
        from.append("img", file);
        axios({
          url: "http://api_devs.wanxikeji.cn/api/savePic",
          method: "post",
          data: from,
        }).then((res) => {
          console.log(res);
          insertFn("http://api_devs.wanxikeji.cn/" + res.data.data);
        });
      },
    },
  },
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const check = () => {
  console.log(editorRef.value.getAllMenuKeys());
};
// 更多设置开始
let moreSetForm = reactive({
  name: "",
  region: "",
});
// 上架 下架
const radio41 = ref(3); //积分赠送单选点击按钮
const radio42 = ref(2); //积分抵扣单选点击按钮
const radio43 = ref(0); //会员折扣单选点击按钮
const radio44 = ref(5); //会员折扣设置单选点击按钮
// 计数按钮
const goodPrice = ref(0); //初始销量
let flag = ref(false);
function handleVisible() {
  flag.value = true;
}
// 服务与承诺的下拉选择
const value4 = ref([]);
const options = [
  {
    value: "七天无理由退货",
    label: "七天无理由退货",
  },
  {
    value: "全场包邮",
    label: "全场包邮",
  },
  {
    value: "48小时发货",
    label: "48小时发货",
  },
];
</script>
<style scoped>
.allContent {
  background-color: #eff1f4;
  padding: 20px;
  height: 88vh;
}

.contentColor {
  background-color: white;
  padding: 12px 20px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

/* 编辑按钮弹出内容的样式 */

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

/* 表单内的灰色字体 */
.formTextSize {
  font-size: 12px;
  color: #ccc;
}

.contentColor p .el-button {
  margin: 0;
}

.inputBanner {
  font-size: 14px;
  display: flex;
}

.inputHeight {
  height: 25px;
  width: 200px;
  padding-left: 10px;
  border: 1px solid #ccc;
}

::v-deep .el-sub-menu__title {
  align-items: center;
  height: 20px;
  line-height: 35px;
  font-size: var(--el-menu-item-font-size);
  color: var(--el-menu-text-color);
  padding: 0 var(--el-menu-base-level-padding);
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: none;
  box-sizing: border-box;
  white-space: nowrap;
}

::v-deep .el-input {
  --el-input-height: var(--el-component-size);
  position: relative;
  font-size: var(--el-font-size-base);
  display: inline-flex;
  width: 500px;
  line-height: var(--el-input-height);
  box-sizing: border-box;
  vertical-align: middle;
}

.avatar-uploader .avatar {
  width: 88px;
  height: 88px;
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
  width: 80px;
  height: 80px;
  text-align: center;
}

.formTextSize {
  font-size: 12px;
  color: #1890ff;
  margin-top: -20px;
}

.formTextSize1 {
  font-size: 13px;
  color: #ccc;
  margin-top: -20px;
}

/* 单规格页面 */
::v-deep .el-input {
  --el-input-height: var(--el-component-size);
  position: relative;
  font-size: var(--el-font-size-base);
  display: inline-flex;
  width: 500px;
  line-height: var(--el-input-height);
  box-sizing: border-box;
  vertical-align: middle;
}

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
  width: 80px;
  height: 80px;
  text-align: center;
}

.formTextSize1 {
  font-size: 13px;
  color: #ccc;
  margin-top: -20px;
}

.newAddBtn {
  background-color: #1890ff;
  width: 60px;
  height: 30px;
  font-size: 14px;
  color: white;
  margin-left: 140px;
}

/* .el-input-number__increase {
  right: 10px;
  border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base) 0;
  border-left: var(--el-border);
}

.el-input-number.is-controls-right .el-input-number__decrease {
  right: 10px;
  top: auto;
  left: auto;
  border-right: none;
  border-left: var(--el-border);
  border-radius: 0 0 var(--el-border-radius-base) 0;
} */

.el-input__wrapper {
  display: inline-flex;
  flex-grow: 0.1;
  align-items: center;
  justify-content: center;
  padding: 1px 11px;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  transition: var(--el-transition-box-shadow);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
}

/* 多规格页面 */
.title {
  margin: 20px 0 0 50px;
}

.title_value {
  margin: 20px 0 0 60px;
}

[data-v-2604ae80] .el-input {
  --el-input-height: var(--el-component-size);
  position: relative;
  font-size: var(--el-font-size-base);
  display: inline-flex;
  width: 196px;
  line-height: var(--el-input-height);
  box-sizing: border-box;
  vertical-align: middle;
}

.addTitle_valueItem {
  margin: 20px 0 0 40px;
}

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
  width: 128px;
  height: 128px;
  text-align: center;
}
</style>
