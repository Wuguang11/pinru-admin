<template>
  <div class="container">
    <BreadCrumb :menus="$store.state.menusInfo[1]" index="1"></BreadCrumb>
    <div class="card">
      <el-table
        :data="tableData"
        style="width: 100%; font-size: 12px"
        border
        stripe
      >
        <el-table-column prop="id" label="#" width="47" higth="23">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <el-tag
              :type="
                scope.row.level === '0'
                  ? 'success'
                  : scope.row.level === '1'
                  ? 'info'
                  : 'danger'
              "
              >{{
                scope.row.level === "0"
                  ? "等级一"
                  : scope.row.level === "1"
                  ? "等级二"
                  : "等级三"
              }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRightListener } from '@/api/rulerlist'
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  name: 'rightslist',
  created () {
    this.getRightListener()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getRightListener () {
      const { data: res } = await getRightListener()
      console.log(res.data)
      this.tableData = res.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.card {
  margin-top: 15px;
  margin-right: 10px;
  background-color: #fff;
  width: 1260px;
  padding: 20px;
}
.container {
  overflow: auto;
}
</style>
