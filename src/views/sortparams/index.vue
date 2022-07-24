<template>
  <div>
    <BreadCrumb :menus="$store.state.menusInfo[2]" index="1"></BreadCrumb>
    <el-card style="margin-top: 15px">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 级联选择器 -->
      <div class="block">
        <span class="demonstration">请选择商品分类：</span>
        <el-cascader
          ref="myCascader"
          placeholder="试试搜索"
          :options="options"
          filterable
          :props="{ label: 'cat_name', value: 'cat_id' }"
          @change="getCategoriesData"
        ></el-cascader>
      </div>
      <!-- 底部标签页 -->
      <!-- 动态参数 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 15px"
            :disabled="isBtnClick"
            @click="dialogFormVisible = true"
            >添加参数</el-button
          >
          <el-table
            :data="dynamicTableData"
            style="width: 100%; font-size: 14px"
            border
            @expand-change="expandChange"
          >
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(tag, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  style="margin: 20px"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                  @focus="onFocus(scope.row.attr_id)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" prop="id" width="58" type="index">
            </el-table-column>
            <el-table-column label="分类名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作" prop="desc">
              <template v-slot="scope">
                <el-button
                  size="small"
                  icon="el-icon-edit"
                  type="primary"
                  @click="onEdit(scope.row.attr_id, scope.row.attr_name)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  @click="onDelete(scope.row.attr_id)"
                  >删除</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </el-tab-pane>
        <!-- 静态参数 -->
        <el-tab-pane label="静态参数" name="second">
          <el-button
            type="primary"
            size="mini"
            style="margin-bottom: 15px"
            :disabled="isBtnClick"
            @click="dialogFormVisible = true"
            >添加属性</el-button
          >
          <el-table
            :data="staticTabData"
            style="width: 100%; font-size: 14px"
            border
            @expand-change="expandChange"
          >
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(tag, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  @tab-click="onClick(scope.row.attr_id)"
                  style="margin: 20px"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                  @focus="onFocus(scope.row.attr_id)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" prop="id" width="58" type="index">
            </el-table-column>
            <el-table-column label="分类名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作" prop="desc">
              <template>
                <el-button size="small" icon="el-icon-edit" type="primary"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" icon="el-icon-delete"
                  >删除</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增参数/新增属性按钮弹窗 -->
    <el-dialog
      :title="isStatic ? '添加静态属性' : '添加动态属性'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="isStatic ? '静态属性' : '动态属性'" prop="value">
          <el-input v-model="ruleForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑按钮弹窗 -->
    <el-dialog
      :title="isStatic ? '修改静态属性' : '修改动态属性'"
      :visible.sync="dialogEditFormShow"
    >
      <el-form
        :model="editForm"
        status-icon
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="isStatic ? '静态属性' : '动态属性'" prop="value">
          <el-input v-model="editForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submiteditForm('editForm')"
            >提交</el-button
          >
          <el-button @click="editForm.value = ''">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getGoodsCategories, getTableData, saveTagInfo, addparams, editParams, deleteParams } from '@/api/sortaparams'
export default {
  name: 'sortparams',
  created () {
    this.getGoodsCategories()
  },
  data () {
    return {
      // 渲染级联选择器需要的数据
      options: [],
      // 级联选择器选中的数据
      CategoriesData: [],
      // 底部标签页的数据
      activeName: 'first',
      // 控制按钮是否可以被点击
      isBtnClick: true,
      // 控制是否是静态参数表格
      isStatic: false,
      // 动态参数表格数据
      dynamicTableData: [],
      // 静态参数表格的数据
      staticTabData: [],
      // 表格展开行的id
      extendId: '',
      // 标签部分
      inputVisible: false, // 输入框是否显示
      inputValue: '', // 标签输入框输入的内容
      dialogFormVisible: false, // 点击添加按钮弹窗显示
      // 新增 弹窗表单内容
      ruleForm: {
        value: ''
      },
      rules: {
        value: [
          { required: true, message: '输入不能为空', trigger: 'blur' }
        ]
      },
      // 编辑弹窗
      dialogEditFormShow: false,
      editForm: {
        value: ''
      },
      // 点击编辑按钮获取的id
      editId: ''
    }
  },
  methods: {
    // 获取级联选择器商品分类数据
    async getGoodsCategories () {
      try {
        const { data: res } = await getGoodsCategories()
        // console.log(res.data)
        this.options = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 获取级联选择器中的数据
    getCategoriesData (val) {
      // console.log(val)
      this.CategoriesData = val
      if (val.length === 3) {
        // 按钮可点击
        this.isBtnClick = false
        // 获取动态参数表格的数据
        this.getdynamicTableData()
        // 获取静态参数表格的数据
        this.getStaticTabData()
      } else {
        this.isBtnClick = true
        this.$message.error('请选择三级分类')
        this.dynamicTableData = []
      }
    },
    // 底部标签页点击触发
    async handleClick (tab, event) {
      this.isStatic = !this.isStatic
      console.log(tab._uid)
      if (this.CategoriesData.length !== 3) {
        this.dynamicTableData = []
        return this.$message.error('请选择三级分类')
      } else {
        // console.log(11)
        this.getStaticTabData()
      }
    },
    // 获取动态参数表格的数据
    async getdynamicTableData () {
      try {
        const { data: res } = await getTableData(this.CategoriesData[2], { sel: 'many' })
        // console.log(res.data)
        res.data.forEach(item => {
          // console.log(11)
          // 处理获取到的数据 在标签上使用
          if (item.attr_vals === '') {
            item.attr_vals = []
          } else {
            item.attr_vals = item.attr_vals.split(' ').splice(1, 1)
          }
        })
        // console.log(res.data)
        this.dynamicTableData = res.data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取静态参数表格的数据
    async getStaticTabData () {
      try {
        const { data: res } = await getTableData(this.CategoriesData[2], { sel: 'only' })
        // console.log(res.data)
        res.data.forEach(item => {
          // console.log(11)
          if (item.attr_vals === '') {
            item.attr_vals = []
          } else {
            item.attr_vals = item.attr_vals.split(' ').splice(1, 1)
          }
        })
        this.staticTabData = res.data
      } catch (error) {
        console.log(error)
      }
    },
    // 标签方法 删除标签触发
    handleClose (tag) {
      if (!this.isStatic) {
        console.log('动态')
        this.dynamicTableData.forEach(async item => {
          console.log(item)
          if (item.attr_id === this.extendId) {
            console.log(item)
            item.attr_vals.splice(item.attr_vals.indexOf(tag), 1)
            // console.log(item.attr_vals)
            const str = item.attr_vals.join(' ')
            // console.log(str)
            try {
              // 请求保存标签的数据
              const res = await saveTagInfo(item.cat_id, item.attr_id, { attr_name: tag, attr_sel: 'many', attr_vals: str })
              // console.log(res)
              this.$message.success(res.data.meta.msg)
            } catch (error) {
              this.$message.error(error)
            }
          }
        })
      } else {
        this.staticTabData.forEach(async item => {
          console.log(item)
          if (item.attr_id === this.extendId) {
            if (!item.attr_vals) {
              item.attr_vals = []
            }
            item.attr_vals.splice(item.attr_vals.indexOf(tag), 1)
            // console.log(item.attr_vals)
            const str = item.attr_vals.join(' ')
            // console.log(str)
            try {
              // 请求保存标签的数据
              const res = await saveTagInfo(item.cat_id, item.attr_id, { attr_name: tag, attr_sel: 'only', attr_vals: str })
              // console.log(res)
              this.$message.success(res.data.meta.msg)
            } catch (error) {
              this.$message.error(error)
            }
          }
        })
      }
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 报存标签内容
    handleInputConfirm (id) {
      const inputValue = this.inputValue
      if (inputValue) {
        if (!this.isStatic) {
          // console.log(this.dynamicTableData.attr_vals)
          this.dynamicTableData.forEach(async item => {
            if (item.attr_id === this.extendId) {
              if (!item.attr_vals) {
                item.attr_vals = []
              }
              console.log(11)
              item.attr_vals.push(inputValue)
              // console.log(item.attr_vals)
              const str = item.attr_vals.join(' ')
              // console.log(str)
              try {
                // 请求保存标签的数据
                // 请求保存标签的数据
                const res = await saveTagInfo(item.cat_id, item.attr_id, { attr_name: inputValue, attr_sel: 'many', attr_vals: str })
                // console.log(res)
                this.$message.success(res.data.meta.msg)
              } catch (error) {
                this.$message.error(error)
              }
            }
          })
        } else {
          this.staticTabData.forEach(async item => {
            if (item.attr_id === this.extendId) {
              if (!item.attr_vals) {
                item.attr_vals = []
              }
              console.log(11)
              item.attr_vals.push(inputValue)
              // console.log(item.attr_vals)
              const str = item.attr_vals.join(' ')
              // console.log(str)
              try {
                // 请求保存标签的数据
                // 请求保存标签的数据
                const res = await saveTagInfo(item.cat_id, item.attr_id, { attr_name: inputValue, attr_sel: 'many', attr_vals: str })
                // console.log(res)
                this.$message.success(res.data.meta.msg)
              } catch (error) {
                this.$message.error(error)
              }
            }
          })
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 表格展开时触发
    expandChange (row) {
      console.log(row.attr_id)
      this.extendId = row.attr_id
    },
    onFocus (id) {
      console.log(id)
      this.extendId = id
    },
    // 新增弹出框表单方法
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.isStatic) {
            const res = await addparams(this.CategoriesData[2], { attr_sel: 'only', attr_name: this.ruleForm.value })
            this.$message.success(res.data.meta.msg)
          } else {
            const res = await addparams(this.CategoriesData[2], { attr_sel: 'many', attr_name: this.ruleForm.value })
            this.$message.success(res.data.meta.msg)
          }
          this.dialogFormVisible = false
          // 重新获取数据
          if (this.isStatic) {
            this.getStaticTabData()
          } else {
            this.getdynamicTableData()
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 编辑弹出框表单方法
    onEdit (id, name) {
      this.dialogEditFormShow = true
      this.editForm.value = name
      // console.log(id)
      this.editId = id
    },
    submiteditForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // if (this.isStatic) {
          //   const res = await addparams(this.CategoriesData[2], { attr_sel: 'only', attr_name: this.ruleForm.value })
          //   this.$message.success(res.data.meta.msg)
          // } else {
          const res = await editParams(this.CategoriesData[2], this.editId, { attr_sel: 'many', attr_name: this.editForm.value })
          this.$message.success(res.data.meta.msg)
          // }
          this.dialogEditFormShow = false
          // 重新获取数据
          // if (this.isStatic) {
          //   this.getStaticTabData()
          // } else {
          this.getdynamicTableData()
          // }
        } else {
          return false
        }
      })
    },
    reseteditForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 点击删除按钮删除
    onDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteParams(this.CategoriesData[2], id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getdynamicTableData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.block {
  margin: 15px 0;
  .demonstration {
    font-size: 14px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
// 标签
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
