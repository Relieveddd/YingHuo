<template>
  <!-- 基本信息 -->
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    status-icon
  >
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="商品分类">
      <el-tree-select
        v-model="ruleForm.typeID"
        placeholder="请选择"
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
      <el-select v-model="value" placeholder="请选择运费模板">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="商品状态">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="上架" value="0" />
        <el-radio label="下架" value="1" />
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
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { Plus } from "@element-plus/icons-vue";
const { proxy } = getCurrentInstance();

//图片

const imageUrl = ref("");
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = "http://api_devs.wanxikeji.cn/" + response.data;
};

const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  typeID: "",
  goodsID: "",
  picUrl: "",
  resource: "",
  sort: "1",
});
// 表单验证
const rules = reactive({
  name: [
    { required: true, message: " name", trigger: "blur" },
    { min: 3, message: " 最少三位", trigger: "blur" },
  ],
  sort: [
    {
      required: true,
      message: "P",
      trigger: "change",
    },
  ],
});

// 提交
const jbInformSub = async (ruleFormRef) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate((valid, fields) => {
    if (valid) {
      ruleForm.picUrl = imageUrl.value;
      console.log(ruleForm);
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

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
];
</script>

<style scoped>
/* ---------------------------------------------------------------------------------------------------- */
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.min {
  padding: 20px 20px;
}
footer {
  margin: 20px 140px;
}

.el-form .el-form-item {
  margin: 15px 0;
}
.el-form .el-form-item .el-input {
  width: 40%;
}
</style>
