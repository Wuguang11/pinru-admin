<template>
  <div v-if="thirdIdArr">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="[101]"
      :props="defaultProps"
    >
    </el-tree>
    <div class="btn">
      <el-button @click="$emit('cancle')">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getTreeList } from '@/api/rolelist'
export default {
  name: 'DistributePower',
  props: {
    thirdIdArr: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getTreeList()
  },
  data () {
    return {
      //
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      thirdId: []
    }
  },
  methods: {
    // 获取树形图数据
    async getTreeList () {
      const { data: res } = await getTreeList()
      // console.log(res)
      try {
        this.data = res.data
        // 使用递归给data数据里面增加label属性
        function changeTreeData (data) {
          data.forEach(item => {
            item.label = item.authName
            if (item.children) {
              changeTreeData(item.children)
            }
          })
          return data
        }
        this.data = changeTreeData(this.data)
        // 获取默认展开的id
        const arr = []
        this.thirdIdArr.forEach(item => {
          item.children.forEach(item1 => {
            item1.children.forEach(item2 => {
              arr.push(item2.id)
            })
          })
        })
        this.thirdId = arr
        this.data = changeTreeData(this.data)
      } catch (err) {
        this.$message(err)
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
.btn {
  display: flex;
  justify-content: end;
  margin-bottom: 0;
  padding: 10px 20px 20px;
}
</style>
