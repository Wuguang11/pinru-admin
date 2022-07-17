<template>
  <div>
    <BreadCrumb :menus="$store.state.menusInfo[1]" index="0"></BreadCrumb>
    <div class="card">
      <!-- 按钮 -->
      <el-button
        type="primary"
        class="btn"
        size="small"
        @click="dialogTableVisible = true"
        >添加角色</el-button
      >
      <!-- 主页表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @expand-change="change"
      >
        <el-table-column type="expand" label="#">
          <!-- 下拉一级表格 -->
          <template slot-scope="props">
            <el-table class="inner-tab" :data="props.row.children" border>
              <el-table-column prop="authName" width="275px">
                <template slot-scope="tab">
                  <el-tag>{{ tab.row.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </template>
              </el-table-column>
              <el-table-column prop="id">
                <!-- 下拉二级表格 -->
                <template slot-scope="props2">
                  <el-table
                    class="inner-tab"
                    :data="props2.row.children"
                    border
                  >
                    <el-table-column prop="authName" width="175px">
                      <template slot-scope="tab2">
                        <el-tag type="success">{{ tab2.row.authName }}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </template>
                    </el-table-column>
                    <el-table-column prop="authName">
                      <!-- 下拉三级表格 -->
                      <template slot-scope="props3">
                        <el-tag
                          class="tag-box"
                          v-for="item in props3.row.children"
                          :key="item.id"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(item.id)"
                        >
                          {{ item.authName }}</el-tag
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="#" prop="id" width="48px"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="distributeRuler(scope.row.username, scope.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分配权限弹窗 -->
    <el-dialog title="分配权限" :visible.sync="powerDialogShow">
      <DistributePower
        @cancle="powerDialogShow = false"
        :thirdIdArr="thirdIdArr"
      ></DistributePower>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import DistributePower from '@/views/roleslist/components/DistributePower.vue'
import { getRolesTabInfo, deletUserRuler } from '@/api/rolelist'
export default {
  name: 'roleslist',
  created () {
    this.getTabInfo()
  },
  data () {
    return {
      tableData: [],
      // 展开行的id
      expandId: '',
      // 控制分配权限弹窗是否显示
      powerDialogShow: false,
      // 下拉三级标签id
      thirdIdArr: []
    }
  },
  methods: {
    // 获取表格里的数据
    async getTabInfo () {
      try {
        const { data: res } = await getRolesTabInfo()
        // console.log(res.data)
        this.tableData = res.data
      } catch (error) {
        this.$message.error('获取数据失败，请于后台管理员联系')
      }
    },
    // 删除表格里的标签
    handleClose (tagId) {
      console.log(tagId)
      this.$confirm('此操作将永久删除该用户的权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发请求删除用户权限
        try {
          const res = await deletUserRuler(this.expandId, tagId)
          console.log(res)
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        } catch (err) {
          console.log(err)
          this.$message.error(err)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 表格展开时触发，用来发删除得请求
    change (row) {
      // 拿到展开行的id
      // console.log(row.id)
      this.expandId = row.id
    },
    // 点击分配权限按钮触发
    distributeRuler (username, id) {
      // 显示弹窗
      this.powerDialogShow = true
      console.log(id)
      // 获取三级id
      this.tableData.forEach(item => {
        if (item.id === id) {
          // item.children.forEach(item1 => {
          //   console.log(item1)
          //   item1.children.forEach(item2 => {
          //     item2.chiforEach(item3 => {
          //       arr.push(item3.id)
          //     })
          //   })
          // })
          // function getThirdId (arr) {
          //   const arr1 = []
          //   arr.forEach(item => {
          //     if (item.children) {
          //       getThirdId(item.children)
          //     } else {
          //       arr1.push(item.id)
          //     }
          //   })
          //   return arr1
          // }
          // console.log(getThirdId(item.children))
          this.thirdIdArr = item.children
        }
      })
    }
  },
  computed: {},
  watch: {
    // 监听表格数据获得三级id
    tableData (newval) {
      // const arr = []
      // function getId (data) {
      //   data.forEach(item => {
      //     if (item.children) {
      //       getId(item.children)
      //     } else {
      //       arr.push(item.id)
      //     }
      //   })
      //   return arr
      // }
      // console.log(getId(newval))

      // })
      // this.thirdId = getId(newval)
    }
  },
  filters: {},
  components: { BreadCrumb, DistributePower }
}
</script>

<style scoped lang='less'>
.card {
  margin-top: 15px;
  background-color: #fff;
  width: 1260px;
  padding: 20px;
  .btn {
    height: 40px;
    width: 100px;
    font-size: 14px;
    margin-bottom: 20px;
  }
}
// 表格样式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 900px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/deep/ .el-table__expanded-cell {
  padding: 20px 50px !important;
}
/deep/ .inner-tab .el-table__header-wrapper {
  height: 0;
}
.tag-box {
  margin: 8px;
}
</style>
