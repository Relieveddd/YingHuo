<template>
    <!-- 更多 -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon >
      
        <el-form-item label="商品卖点" prop="name" label-width="120px">
              <el-input v-model="ruleForm.name" placeholder="请输入商品卖点" />
              
          </el-form-item>


      <el-form-item label="初始销量" label-width="120px">
        <el-input-number v-model="ruleForm.num" :min="1" controls-position="right"  />
      </el-form-item>

      <el-divider content-position="left">积分设置</el-divider>

      <el-form-item label="积分赠送" prop="resource" label-width="120px">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="开启" />
          <el-radio label="关闭" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="积分抵扣" prop="resource" label-width="120px">
        <el-radio-group v-model="ruleForm.resource">
            <el-radio label="开启" />
            <el-radio label="关闭" />
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left">会员折扣设置</el-divider>

      <el-form-item label="会员折扣" prop="resource" label-width="120px">
        <el-radio-group v-model="ruleForm.resource">
            <el-radio label="开启" />
            <el-radio label="关闭" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="会员折扣设置" prop="resource" label-width="120px">
        <el-radio-group v-model="ruleForm.resource2">
          <el-radio label="默认等级折扣" />
          <el-radio label="单独设置折扣" />
        </el-radio-group>
      </el-form-item>

     </el-form>
</template>

<script setup>
import {reactive, ref,getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const {proxy} = getCurrentInstance();

const ruleFormRef = ref()
const ruleForm = reactive({
resource:'开启',
resource2:'默认等级折扣',
})


const rules = reactive({

resource: [
  {
    required: true,
    message: 'Please select activity resource',
    trigger: 'change',
  },
],
})

</script>

<style scoped>
/* ---------------------------------------------------------------------------------------------------- */
.min{
padding: 20px 20px;
}
footer{
margin: 20px 140px;
}
button{
width: 50px;
height: 25px;
background-color: aqua;
border: none;
color: #fff;
}
.el-form .el-form-item{
margin: 15px 0;
} 
.el-form .el-form-item .el-input{
width: 40%;
}
.el-input-number{
    margin-right: 10px;
}
</style>