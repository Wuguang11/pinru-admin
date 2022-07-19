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
          <UserMangement></UserMangement>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品内容" name="5">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import UserMangement from '@/views/addgoods/components/UserManagement.vue'
export default {
  name: 'AddGoods',
  created () { },
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
      activeName: '1'
    }
  },
  methods: {
    // 侧边栏点击触发
    handleClick (tab, event) {
      console.log(tab, event)
      console.log(tab._uid)
      this.active = this.activeName - 1
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb, UserMangement }
}
</script>

<style scoped lang='less'>
</style>
