import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import '@/utils/filters'
// 引入全局element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入表格树
import ZkTable from 'vue-table-with-tree-grid'
Vue.component('ZkTable', ZkTable)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
