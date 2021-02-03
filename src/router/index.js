import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRouter from './Login';

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes:[
    ...loginRouter,
    {
      path: '/transaction',
      name: 'Transaction',
      component: resolve => require(['@/views/Transaction'], resolve),
    }
  ]
})

export default router
