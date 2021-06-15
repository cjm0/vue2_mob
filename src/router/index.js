import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
  base: process.env.VUE_APP_PUBLIC_PATH, // 配置单页应用的基路径
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: 'index' */ '@pages/index/index.vue'),
      meta: { auth: false, title: '北大医疗' }
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */ '@pages/error/index.vue'),
      meta: { auth: false, title: '404页面' }
    }
  ]
});

// 路由跳转前拦截
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const auth = to.meta.auth
  if (auth) { // 需要登录
    next()
  } else {
    next()
  }
  // window.scrollTo(0, 0)
})

export default router;
