<template>
  <div class="login-container">
    <div class="title">品如集团后台管理系统</div>
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名长度必须为3-8位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '密码长度必须为3-8位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        try {
          const { data: res } = await login(this.loginForm.username, this.loginForm.password)

          // todo 把token储存到xuex中 和本地存储 数据持久化
          this.$store.commit('setUser', res.data.token)
          this.$router.push('/home')
        } catch (err) {
          this.$message.error('登录失败')
        }
      } catch (err) {
        this.$message.error('校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #2b4b6b;
  .form-box {
    width: 450px;
    height: 240px;
    border-radius: 4px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
  .title {
    position: absolute;
    top: 26vh;
    font-size: 30px;
    color: #fff;
  }
}
</style>
