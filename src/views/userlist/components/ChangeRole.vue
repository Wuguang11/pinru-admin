<template>
  <div>
    <div class="container">
      <p>
        当前的用户：
        <span>{{ nowObj.username }}</span>
      </p>
      <p>
        当前的角色：
        <span>{{ nowObj.roleName }}</span>
      </p>
      <div class="select-box">
        <p>分配新角色:</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="btn">
      <el-button @click="cancleUpdateRole">取消</el-button>
      <el-button type="primary" @click="submitIpt">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getRoleInfo, updateRole } from '@/api/userlist'
export default {
  props: {
    nowObj: {
      type: Object,
      required: true
    }
  },
  name: 'ChangeRole',
  async created () {
    try {
      const res = await getRoleInfo()
      this.options = res.data.data
    } catch (err) {
      this.$message('获取数据失败，请联系后台管理员')
    }
  },
  data () {
    return {
      options: [],
      value: ''
    }
  },
  methods: {
    async submitIpt () {
      try {
        const res = await updateRole(this.nowObj.id, this.value)
        console.log(res)
        if (res.data.meta.state === 200) {
          this.$message.success(res.data.meta.msg)
          // 传递数据给父组件关闭弹窗
          this.$emit('updateRole', this.value)
        } else {
          this.$message.error(res.data.meta.msg)
        }
      } catch (err) {
        // this.$message(err)
        console.log(err)
      }
    },
    cancleUpdateRole () {
      this.$emit('cancleUpdateRole', this.value)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  padding: 10px 10px 30px;
}
.select-box {
  display: flex;
  align-items: center;
  p {
    margin-right: 8px;
  }
}
p {
  margin-bottom: 8px;
  font-size: 14px;
}
.btn {
  display: flex;
  justify-content: end;
  margin-bottom: 0;
}
</style>
