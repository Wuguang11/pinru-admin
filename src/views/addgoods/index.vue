<template>
  <div>
    <!-- 面包屑 -->
    <BreadCrumb :menus="menus" :index="index"></BreadCrumb>
    <!-- 卡片区域 -->
    <el-card style="margin-top: 15px">
      <!-- 提示信息 -->
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        center
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :active="active"
        finish-status="success"
        style="margin: 20px 0"
        space="210px"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 侧边的标签页 -->
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        tab-position="left"
      >
        <el-tab-pane label="基本信息" name="1">
          <div style="display: auto">
            <el-form
              label-position="top"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="ruleForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="ruleForm.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model.number="ruleForm.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model.number="ruleForm.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="good_class">
                <div class="block">
                  <el-cascader
                    :props="{ label: 'cat_name', value: 'cat_id' }"
                    :options="options"
                    filterable
                    v-model="ruleForm.goods_class"
                  ></el-cascader>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <div v-for="item in goodsParamsData" :key="item.attr_id">
            <p style="margin: 10px 0">{{ item.attr_name }}</p>
            <el-checkbox
              v-for="(item1, index) in item.attr_vals"
              :key="index"
              v-model="checked1"
              :label="item1"
              border
            ></el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <div v-for="item in goodsAttributeData" :key="item.attr_id">
            <p style="margin: 15px 0">{{ item.attr_name }}</p>
            <el-input v-model="item.attr_vals"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5"
          ><editor-bar
            :catchData="catchData"
            :content="editorContent"
          ></editor-bar
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import EditorBar from '@/components/EditorItem.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getcategories, getGoodsAttribute } from '@/api/addgoods'
export default {
  name: 'AddGoods',
  created () {
    // 获取基本信息的数据
    this.getcategories()
    // 获取产品参数的信息
    this.getGoodsParams()
    // 获取商品信息
    this.getGoodsAttribute()
  },
  data () {
    return {
      menus: {
        authName: '商品管理',
        children: [{
          authName: '添加商品'
        }]
      },
      index: 0,
      // 控制步骤条的步骤
      active: 0,
      // 控制侧边栏的标签页
      activeName: '1',
      // 基本信息部分数据
      // 基本信息输入的内容
      ruleForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_class: ''
      },
      // 基本信息表单验证规则
      rules: {
        goods_name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '商品价格不能为空', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
        ],
        goods_class: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
        ]
      },
      //  级联选择器数据
      options: [],
      // 商品参数部分数据
      checked1: true,
      goodsParamsData: [],
      // 商品属性部分数据
      goodsAttributeData: [],
      // 图片上传部分数据
      fileList: []

    }
  },
  methods: {
    // 侧边栏点击触发
    handleClick (tab, event) {
      console.log(tab, event)
      console.log(tab._uid)
      this.active = this.activeName - 1
    },

    // 请求获得基本信息分类数据
    async getcategories () {
      const { data: res } = await getcategories()
      this.options = res.data
    },
    // 商品参数部分请求数据
    async getGoodsParams () {
      const { data: res } = await getGoodsAttribute(6, { sel: 'many' })
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals.split(' ')
      })
      this.goodsParamsData = res.data
      // console.log(res.data)
    },
    async getGoodsAttribute () {
      const { data: res } = await getGoodsAttribute(6, { sel: 'only' })
      console.log(res.data)
      this.goodsAttributeData = res.data
    },
    // 图片上传的回调
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // 监听富文本的输入
    catchData (e) {
      console.log('e=====?>', e)
    },
    // 富文本中的内容
    editorContent (e) {
      console.log('e=====?>', e)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb, EditorBar }
}
</script>

<style scoped lang='less'>
</style>
