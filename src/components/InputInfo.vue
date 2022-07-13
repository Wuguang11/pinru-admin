<template>
  <div style="margin-top: 15px" class="container">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      class="input-with-select"
      clearable
      @clear="$emit('input', '')"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="$emit('input', input)"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      input: ''
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 头部输入框区域
.input-with-select .el-input-group__prepend {
  width: 100px;
  background-color: #fff;
}
:deep(.el-input-group--append .el-input__inner, .el-input-group__prepend) {
  width: 340px;
}
:deep(.el-input-group) {
  width: 390px;
}
.container {
  display: flex;
}
</style>
