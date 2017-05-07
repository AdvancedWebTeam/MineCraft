import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Plain from '@/components/Plain'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'Hello',
      component: Hello
    },*/
    {
      path: '/',
      name: 'Plain',
      component: Plain
    }
  ]
})
