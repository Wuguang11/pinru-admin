<template>
  <div>
    <BreadCrumb :menus="$store.state.menusInfo[3]" index="0"></BreadCrumb>
    <el-card style="margin-top: 15px">
      <InputInfo></InputInfo>
      <!-- 列表展示 -->
      <el-table
        stripe
        :data="tableData"
        border
        style="width: 100%; font-size: 12px; margin: 15px 0"
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格（元）">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款" v-slot="scope">
          <template>
            <el-button
              type="success"
              size="small"
              v-if="scope.row.order_pay === '0'"
              >已支付</el-button
            >
            <el-button type="danger" size="small" v-else>未支付</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="update_time" label="下单时间"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import BreadCrumb from '@/components/BreadCrumb.vue'
import InputInfo from '@/components/InputInfo.vue'
import { getOrderTabData } from '@/api/orderlist'
export default {
  name: 'orderlist',
  created () {
    this.getOrderTabData()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getOrderTabData () {
      try {
        const res = await getOrderTabData({ query: '', pagenum: 1, pagesize: 10 })
        console.log(res)
        this.tableData = res.data.data.goods
        this.tableData.forEach(item => {
          item.update_time = moment(item.update_time * 1000).format('YYYY-MM-DD')
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb, InputInfo }
}
</script>

<style scoped lang='less'>
</style>
