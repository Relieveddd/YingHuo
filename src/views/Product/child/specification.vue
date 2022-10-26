<template>
    <!-- 规格/库存 -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon >
      
      <el-form-item label="规格/库存" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="单规格" />
          <el-radio label="多规格" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="商品价格"  prop="num">
        <el-input-number v-model="ruleForm.num" :min="1" controls-position="right"  />
        <span>元</span>
      </el-form-item>

      <el-form-item label="划线价"  prop="num">
        <el-input-number v-model="ruleForm.num" :min="1" controls-position="right"  />
        <span>元</span>

      </el-form-item>

      <el-form-item label="当前库存数量"  prop="num">
        <el-input-number v-model="ruleForm.num" :min="1" controls-position="right"  />
        <span>件</span>
      </el-form-item>

      <el-form-item label="商品重量"  prop="num">
        <el-input-number v-model="ruleForm.num" :min="1" controls-position="right"  />
        <span>千克(Kg)</span>
      </el-form-item>

      <el-form-item label="库存计算方式" prop="resource">
        <el-radio-group v-model="ruleForm.resource2">
          <el-radio label="下单减库存" />
          <el-radio label="付款减库存" />
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
name: '',
resource:'单规格',
resource2:'下单减库存',
num:'1',
})


const rules = reactive({

resource: [
  {
    required: true,
    message: 'Please select activity resource',
    trigger: 'change',
  },
],
num: [
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