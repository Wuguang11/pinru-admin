<template>
  <el-container class="container" v-if="flag" style="over-flow: hidden">
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
          router
        >
          <!-- 第一栏  -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">{{ menus[0].authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" :route="{ path: list[0].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[0].children[0].authName }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第二栏 权限管理-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-turn-off"></i>
              <span slot="title">{{ menus[1].authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" :route="{ path: list[1].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[1].children[0].authName }}</span>
              </el-menu-item>
              <el-menu-item index="2-2" :route="{ path: list[2].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[1].children[1].authName }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第三栏 商品管理-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-suitcase"></i>
              <span slot="title">{{ menus[2].authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" :route="{ path: list[3].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[2].children[0].authName }}</span>
              </el-menu-item>
              <el-menu-item index="3-2" :route="{ path: list[4].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[2].children[1].authName }}</span>
              </el-menu-item>
              <el-menu-item index="3-3" :route="{ path: list[5].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[2].children[2].authName }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第四栏 订单管理-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">{{ menus[3].authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" :route="{ path: list[6].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[3].children[0].authName }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 第四栏 数据分析-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">{{ menus[4].authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" :route="{ path: list[7].path }">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menus[4].children[0].authName }}</span>
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
import { getMenus } from '@/api/home'
export default {
  name: 'Home',
  async created () {
    // 获取二级路由参数
    this.list = this.$router.options.routes[2].children
    // 请求获取列表参数
    try {
      const { data: res } = await getMenus()
      // console.log(res.data)
      this.menus = res.data
      this.$store.commit('updateMenus', res.data)
      // 在data中定义了这个userserverData，页面打开时就会将这个值给渲染进去，但是在发送请求之前就渲染了这个值，导致报错说找不到这个值里面的东西。所以我们需要在请求到值之后再去渲染出来。
      this.flag = true
    } catch (err) {
      this.$message.error('获取数据失败')
    }
  },
  data () {
    return {
      isCollapse: false,
      list: [],
      // 请求获得列表参数
      menus: [],
      // 控制整个界面的显示
      flag: false
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
    background-color: #eaedf1;
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
