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
          placeholder="试试搜索：指南"
          :options="options"
          filterable
        ></el-cascader>
      </div>
      <!-- 底部标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" size="mini" style="margin-bottom: 15px"
            >添加属性</el-button
          >
          <el-table
            :data="tableData"
            style="width: 100%; font-size: 14px"
            border
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="#" prop="id" width="58"> </el-table-column>
            <el-table-column label="分类名称" prop="name"> </el-table-column>
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
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  name: 'sortparams',
  created () { },
  data () {
    return {
      // 级联选择器数据
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      // 底部标签页的数据
      activeName: 'first',
      // 表格数据
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  methods: {
    // 底部标签页点击触发
    handleClick (tab, event) {
      console.log(tab, event)
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
</style>
