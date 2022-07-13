<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
    >
      <el-form-item label="用户名">
        <el-input
          :value="username"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.number="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateTheEmail, validateTheMobile } from '@/utils/validate'
export default {
  props: {
    username: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.ruleForm.username = this.username
  },
  data () {
    const checkEmail = (rule, value, callback) => {
      if (!validateTheEmail(value)) {
        callback(new Error('邮箱格式输入有误'))
      } else {
        callback()
      }
    }
    const checkMobile = (rule, value, callback) => {
      if (!validateTheMobile(value)) {
        callback(new Error('手机号格式输入有误'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        mobile: ''
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          // this.$emit('getDialogIpt', this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.btn {
  display: flex;
  justify-content: end;
  margin-bottom: 0;
}
</style>
