import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      name: '关于'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Index',
    redirect: '/index',
    meta: {
      name: '首页'
    },
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/index',
        component: () => import('../views/Home.vue'),
        meta: {
          name: '数据一览'
        }
      },
      {
        path: '/article',
        name: 'article',
        redirect: '/article/create',
        component: () => import('../views/article/Article.vue'),
        meta: {
          name: '文章管理'
        },
        children: [
          {
            path: 'create',
            component: () => import('../views/article/ArticleManage.vue'),
            meta: {
              name: '创建文章'
            }
          }, {
            path: 'tag',
            component: () => import('../views/article/TagManage.vue'),
            meta: {
              name: '标签管理'
            }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
