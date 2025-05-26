import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../store/auth'

import Login from '../views/login.vue'
import UTS from '../views/UTS.vue'
import UAS from '../views/UAS.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/uts', component: UTS },
  { path: '/uas', component: UAS },
  {
    path: '/admin',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn && auth.role === 'admin') {
        next()
      } else {
        next('/login')
      }
    }
  },
  { path: '/logout', component: () => import('../views/logout.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})


