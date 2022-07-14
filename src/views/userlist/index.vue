<template>
  <div>
    <!-- 头部面包屑 -->
    <BreadCrumb :menus="$store.state.menusInfo[0]" index="0"></BreadCrumb>
    <div class="card">
      <!-- 头部输入框 -->
      <div class="ipt-box">
        <InputInfo
          button="添加用户"
          @input="getIpt"
          @cancle="dialogTableVisible = $event"
        ></InputInfo>
        <el-button
          type="primary"
          class="btn"
          size="small"
          @click="dialogTableVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 列表展示 -->
      <el-table
        stripe
        :data="tableData"
        border
        style="width: 100%; font-size: 12px; margin: 15px 0"
      >
        <el-table-column prop="id" label="#" width="50" height="48">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="247">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="247">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="247">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="247">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeState(scope.row.mg_state, scope.row.id)"
            >
            </el-switch
          ></template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editUserInfo(scope.row.username, scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deletUser(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="
                changeUserRole(
                  scope.row.username,
                  scope.row.role_name,
                  scope.row.id
                )
              "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页显示 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogTableVisible">
      <AddUsers
        @getDialogIpt="getDialogIpt"
        @closeDialog="dialogTableVisible = $event"
      ></AddUsers>
    </el-dialog>
    <!-- 编辑用户弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="dialogShow">
      <EditUsers :username="dialogUsername" @editUser="getEditUser"></EditUsers>
    </el-dialog>
    <!-- 分配角色弹窗 -->
    <el-dialog title="分配角色" :visible.sync="changeRoleShow" width="600px">
      <ChangeRole
        :nowObj="nowObj"
        @updateRole="updateRole"
        @cancleUpdateRole="changeRoleShow = false"
      ></ChangeRole>
    </el-dialog>
  </div>
</template>

<script>
import { getPageInfo, filterPageInfo, addUser, changeUserState, editUser, delUser } from '@/api/userlist'
import BreadCrumb from '@/components/BreadCrumb.vue'
import InputInfo from '@/components/InputInfo.vue'
import AddUsers from '@/views/userlist/components/AddUsers.vue'
import EditUsers from '@/views/userlist/components/EditUsers.vue'
import ChangeRole from '@/views/userlist/components/ChangeRole.vue'
export default {
  name: 'userlist',
  created () {
    this.getPageData()
  },
  data () {
    return {
      // 输入框传递过来的数据
      ipt: '',
      // 表格数据
      tableData: [{
        id: '1',
        username: '王小虎',
        mobile: '上海',
        role_name: '普陀区',
        mg_state: true
      }],
      // 分页显示的数据
      pagenum: 1, // 展示当前的页面 默认为1
      pagesize: 5, // 当前的分页尺寸
      total: 0,
      // 控制添加用户弹窗显示
      dialogTableVisible: false,
      // 控制编辑用户显示
      dialogShow: false,
      // 传递给编辑用户弹窗的数据
      dialogUsername: '',
      // 点击编辑按钮的用户id
      editUserId: '',
      // 控制分配角色弹窗的显示
      changeRoleShow: false,
      // 传递给弹窗的数据
      nowObj: {}
    }
  },
  methods: {
    // 分页显示的方法
    // 切换每页显示几条数据时触发
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getPageData()
    },
    // 点击切换页码时触发
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getPageData()
    },
    // 请求获取表格数据
    async getPageData () {
      // 获取当前页的数据
      try {
        const { data: res } = await getPageInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
        this.tableData = res.data.users
        this.total = res.data.total
      } catch (err) {
        this.$message.error('获取表格用户信息失败')
      }
    },
    // 筛选表格数据
    async filterTabInfo () {
      try {
        const { data: res } = await filterPageInfo({ query: this.ipt, pagenum: this.pagenum, pagesize: this.pagesize })
        // console.log(res)
        this.tableData = res.data.users
        this.total = res.data.total
      } catch (err) {
        this.$message.error('筛选表格用户信息失败')
      }
    },
    // 点击搜索按钮筛选数据的回调
    getIpt (val) {
      this.ipt = val
      this.filterTabInfo()
    },
    // 获得弹窗的数据触发
    async getDialogIpt (val) {
      this.dialogTableVisible = false
      try {
        const res = await addUser(val)
        this.$message(res.data.meta.msg)
        // 重新获取本页数据
        this.getPageData()
      } catch (err) {
        this.$message.error('添加用户失败,请重试')
      }
    },
    // switch开关状态改变触发
    async changeState (val, id) {
      try {
        const res = await changeUserState(id, val)
        console.log(res.data.meta)
        this.$message.success(res.data.meta.msg)
      } catch (err) {
        this.$message.error('修改状态失败')
      }
    },
    // 编辑区域
    // 点击编辑按钮触发
    editUserInfo (val, id) {
      // this.$message(val)
      this.dialogShow = true
      this.dialogUsername = val
      this.editUserId = id
      // console.log(this.editUserId)
    },
    // 编辑用户弹窗的回调
    async getEditUser (val) {
      this.dialogShow = false
      console.log(val)
      // 发送请求修改用户数据
      const { data: res } = await editUser(this.editUserId, val)
      this.$$message.success('修改用户数据成功')
      // 修改表格的数据
      this.tableData.forEach(item => {
        if (item.id === this.editUserId) {
          item.mobile = res.data.mobile
          item.email = res.data.email
        }
      })
    },
    // 删除用户
    deletUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // console.log(id)
        // 发请求删除用户
        const res = await delUser(id)
        // 重新获取本页数据
        this.getPageData()
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 改变用户角色
    changeUserRole (username, roleName, id) {
      this.changeRoleShow = true
      this.nowObj.username = username
      this.nowObj.roleName = roleName
      this.nowObj.id = id
    },
    // 改变用户角色子组件传递数据的回调
    updateRole () {
      this.changeRoleShow = false
      // 重新获取本页数据
      this.getPageData()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb, InputInfo, AddUsers, EditUsers, ChangeRole }
}
</script>

<style scoped lang='less'>
// 头部输入框区域
.btn {
  height: 40px;
  width: 100px;
  margin-left: 20px;
  margin-bottom: -15px;
  font-size: 14px;
}
.ipt-box {
  display: flex;
  align-items: center;
}
.card {
  margin-top: 15px;
  background-color: #fff;
  width: 1260px;
  padding: 10px 20px 20px;
}
//
:deep(.el-table__row) {
  height: 53px;
}
</style>
