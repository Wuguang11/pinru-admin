<template>
  <div style="overflow: auto">
    <!-- 头部面包屑 -->
    <BreadCrumb :menus="$store.state.menusInfo[2]" index="0"></BreadCrumb>
    <div class="card">
      <!-- 头部输入框 -->
      <div class="ipt-box">
        <InputInfo @input="getIpt"></InputInfo>
        <el-button
          type="primary"
          class="btn"
          size="small"
          @click="$router.push('addgoods')"
          >添加商品</el-button
        >
      </div>
      <!-- 列表展示 -->
      <el-table
        stripe
        :data="tableData"
        border
        style="width: 100%; font-size: 12px; margin: 15px 0"
      >
        <el-table-column prop="goods_id" label="#" width="50" height="48">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" width="127">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="127">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="127">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页显示 -->
      <div class="block">
        <el-pagination
          :current-page="pagenum"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import BreadCrumb from '@/components/BreadCrumb.vue'
import InputInfo from '@/components/InputInfo.vue'
import { getGoodInfoList, filterPageInfo } from '@/api/goodslist'
export default {
  name: 'goodslist',
  created () {
    this.getPageData()
  },
  data () {
    return {
      // 输入框传递过来的数据
      ipt: '',
      // 表格数据
      tableData: [],
      // 分页显示的数据
      pagenum: 1, // 展示当前的页面 默认为1
      pagesize: 5, // 当前的分页尺寸
      total: 0,
      // 创建的时间
      time: null
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
      // console.log(this.pagenum, this.pagesize)
      try {
        const { data: res } = await getGoodInfoList({ pagenum: this.pagenum, pagesize: this.pagesize })
        this.tableData = res.data.goods
        this.tableData.forEach(item => {
          item.add_time = moment(item.add_time * 1000).format('YYYY-MM-DD')
        })
        this.total = res.data.total
      } catch (err) {
        this.$message.error('获取表格商品信息失败')
      }
    },
    // 点击搜索按钮筛选数据的回调
    getIpt (val) {
      this.ipt = val
      this.filterTabInfo()
    },

    // 筛选表格数据
    async filterTabInfo () {
      try {
        const { data: res } = await filterPageInfo({ query: this.ipt, pagenum: this.pagenum, pagesize: this.pagesize })
        // console.log(res)
        this.tableData = res.data.goods
        this.tableData.forEach(item => {
          item.add_time = moment(item.upd_time * 1000).format('YYYY-MM-DD')
        })
        this.total = res.data.total
      } catch (err) {
        this.$message.error('筛选表格商品信息失败')
      }
    }

  },
  computed: {
    // add_time () {
    //   return 11
    // }
  },
  watch: {},
  filters: {
  },
  components: { BreadCrumb, InputInfo }
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
