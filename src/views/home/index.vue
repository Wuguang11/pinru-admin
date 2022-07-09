<template>
  <el-container class="container">
    <el-header>
      <div class="logo">
        <el-avatar
          :size="58"
          src="https://img0.baidu.com/it/u=1713897638,984364453&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        ></el-avatar>
        品如集团后台管理系统
      </div>
      <el-button plain size="medium" @click="$router.push('/login')"
        >退出登录</el-button
      >
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin: 23px">
          <el-radio-button :label="true">收起</el-radio-button>
          <el-radio-button :label="false">展开</el-radio-button>
        </el-radio-group>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#4f869b"
          text-color="#fff"
          unique-opened
          active-text-color="#fcd217"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          default-active="1-1"
          router
        >
          <!-- 第一栏  -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" :route="{ path: list[0].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第二栏 权限管理-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-turn-off"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" :route="{ path: list[1].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>
              </el-menu-item>
              <el-menu-item index="2-2" :route="{ path: list[2].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第三栏 商品管理-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-suitcase"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" :route="{ path: list[3].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-2" :route="{ path: list[4].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">分类参数</span>
              </el-menu-item>
              <el-menu-item index="3-3" :route="{ path: list[5].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">商品参数</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第四栏 订单管理-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" :route="{ path: list[6].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第四栏 数据分析-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" :route="{ path: list[7].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">数据报表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.list = this.$router.options.routes[2].children
    console.log(this.list)
  },
  data () {
    return {
      isCollapse: false,
      list: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
    background-color: rgb(60, 110, 130);
    .logo {
      padding-left: 15px;
      display: flex;
      align-items: center;
      font-size: 25px;
      color: #fff;
      .el-avatar {
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: rgb(79, 134, 155);
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #fff;
  }
}
// 控制侧边栏收起时弹窗
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 200px;
  color: #fff;
}
//侧边栏字体图标
/deep/.el-submenu__title i {
  color: rgb(204, 204, 204) !important;
  font-size: 18px;
  margin-right: 6px;
}
.el-menu-item i {
  color: rgb(204, 204, 204);
}
// 未激活按钮的颜色
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #3c6e82;
  border-color: #3c6e82;
}
</style>
