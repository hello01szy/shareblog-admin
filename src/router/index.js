import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: '主页',
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/create',
        component: () => import('../views/article/ArticleManage.vue')
      }
    ],
    component: () => import('../views/Main.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
