<template>
  <div>
    <BreadCrumb :menus="$store.state.menusInfo[2]" index="2"></BreadCrumb>
    <el-button
      type="primary"
      size="small"
      style="margin-top: 15px"
      @click="showSortDialog"
      >添加分类
    </el-button>
    <!-- 下拉树形表格 -->
    <ZkTable
      ZkTable
      :data="data"
      :columns="columns"
      show-index
      :show-row-hover="false"
      :expand-type="false"
      border
      :selection-type="false"
      style="margin: 15px 0"
    >
      <template slot="isOk" scope="scope">
        <div>
          <i
            v-if="!scope.row.cat_deleted"
            class="el-icon-success"
            style="font-size: 16px; color: #24de72"
          ></i>
          <i
            v-else
            class="el-icon-error"
            style="font-size: 16px; color: red"
          ></i>
        </div>
      </template>
      <template slot="ishhh" slot-scope="scope">
        <div>
          <el-tag
            :type="
              scope.row.cat_level === 0
                ? ''
                : scope.row.cat_level === 1
                ? 'success'
                : 'danger'
            "
          >
            {{ scope.row.cat_level | level }}
          </el-tag>
        </div>
      </template>
      <template slot="caozuo">
        <div>
          <el-button type="primary" size="small" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button type="danger" size="small" icon="el-icon-delete"
            >删除</el-button
          >
        </div>
      </template>
    </ZkTable>
    <!-- 分页显示 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 4, 6, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加分类弹窗 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="showSortDialogVisible"
      width="30%"
    >
      <!-- 表单输入 -->
      <el-form :model="sortDialogForm" ref="addSortsForm" label-width="100px">
        <el-form-item
          label="分类名称"
          prop="value"
          :rules="[
            { required: true, message: '输入不能为空', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model.number="sortDialogForm.value"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父类名称">
          <el-cascader
            :props="{ label: 'cat_name', value: 'cat_id', checkStrictly: true }"
            v-model="cascaderValue"
            :options="cascaderData"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanleDefine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getGoodSortData, addGoodsSorts } from '@/api/goodsorts'
export default {
  name: 'goodsorts',
  created () {
    this.getGoodSortData()
  },
  data () {
    return {
      columns: [
        { label: '分类名称', prop: 'cat_name' },
        { label: '是否有效', prop: 'cat_deleted', type: 'template', template: 'isOk' },
        { label: '排序', prop: 'cat_level', type: 'template', template: 'ishhh' },
        { label: '操作', type: 'template', template: 'caozuo' }
      ],
      data: [],
      // 分页显示
      currentPage: 1, // 当前处于第几页
      pagesize: 4, // 当前没页显示几条数据
      total: 0, // 一共有多少条数据
      // 弹窗
      showSortDialogVisible: false, // 分类弹窗是否显示
      sortDialogForm: { // 表单输入的信息
        value: ''
      },
      cascaderValue: '',
      cascaderData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getGoodSortData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getGoodSortData()
    },
    // 请求获取表格数据
    async getGoodSortData () {
      const { data: res } = await getGoodSortData({ pagenum: this.currentPage, pagesize: this.pagesize })
      this.data = res.data.result
      this.total = res.data.total
    },
    // 点击新增按钮显示弹窗
    async showSortDialog () {
      // 获取级联选择器的数据
      const { data: res } = await getGoodSortData({ type: 2 })
      console.log(res.data)
      this.cascaderData = res.data
      // 显示弹窗
      this.showSortDialogVisible = true
      // 清空选择处理
      this.cascaderValue = ''
      this.sortDialogForm.value = ''
    },
    // 关闭新增参数弹窗
    hanleDefine () {
      // 提交表单
      this.$refs.addSortsForm.validate(async (valid) => {
        if (valid) {
          const res = await addGoodsSorts({ cat_level: this.cascaderValue.length, cat_name: this.sortDialogForm.value, cat_pid: this.cascaderValue[this.cascaderValue.length - 1] })
          console.log(res)
          this.$message.success(res.data.meta.msg)
          // 关闭弹窗
          this.showSortDialogVisible = false
          // 重新获取表格数据
          this.getGoodSortData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {},
  watch: {},
  filters: {
    level (val) {
      if (val === 0) {
        return '一级'
      } else if (val === 1) {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
</style>
