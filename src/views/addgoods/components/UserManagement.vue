<template>
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
            :options="options"
            filterable
            v-model="ruleForm.goods_class"
          ></el-cascader>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getcategories } from '@/api/addgoods'
export default {
  name: 'UserMangement',
  created () {
    this.getcategories()
  },
  data () {
    return {
      ruleForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_class: ''
      },
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
      // 级联选择器数据
      options: []
    }
  },
  methods: {
    // 请求获得分类数据
    async getcategories () {
      const { data: res } = await getcategories()
      function getdata (data) {
        data.forEach(item => {
          item.value = item.cat_id
          item.label = item.cat_name
          if (item.children) {
            getdata(item.children)
          }
        })
      }
      getdata(res.data)
      this.options = res.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
