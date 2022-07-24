<template>
  <div>
    <el-tree
      ref="myTree"
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkedArr"
      :props="defaultProps"
    >
    </el-tree>
    <div class="btn">
      <el-button @click="$emit('cancle')">取消</el-button>
      <el-button type="primary" @click="onClick">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getTreeList, submitCheckedList } from '@/api/rolelist'
export default {
  name: 'DistributePower',
  props: {
    thirdIdArr: {
      type: Array,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.getTreeList()
  },
  data () {
    return {
      // 数据
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkedArr: []
    }
  },
  methods: {
    // 获取树形图数据
    async getTreeList () {
      this.checkedArr = []
      try {
        const { data: res } = await getTreeList()
        // console.log(res)
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
          item.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              arr.push(item3.id)
            })
          })
        })
        this.checkedArr = arr
      } catch (err) {
        this.$message(err)
      }
    },
    // 点击分配权限
    async onClick () {
      try {
        const obj = {}
        obj.rids = this.$refs.myTree.getCheckedKeys().join(',')
        const res = await submitCheckedList(this.id, obj)
        console.log(res)
        this.$message.success(res.data.meta.msg)
        this.$emit('cancle')
      } catch (err) {
        this.$message.error(err)
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
