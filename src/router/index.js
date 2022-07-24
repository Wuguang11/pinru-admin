import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/home',
    component: () => import('@/views/home'),
    redirect: 'home/firstpage',
    children: [
      { path: 'userlist', component: () => import('@/views/userlist') },
      { path: 'roleslist', component: () => import('@/views/roleslist') },
      { path: 'rightslist', component: () => import('@/views/rightslist') },
      { path: 'goodslist', component: () => import('@/views/goodslist') },
      { path: 'sortparams', component: () => import('@/views/sortparams') },
      { path: 'goodsorts', component: () => import('@/views/goodsorts') },
      { path: 'orderparams', component: () => import('@/views/orderlist') },
      { path: 'datarepots', component: () => import('@/views/datareports') },
      { path: 'firstpage', component: () => import('@/views/firstpage') },
      { path: 'addgoods', component: () => import('@/views/addgoods') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
