import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../store/auth'

import Login from '../views/login.vue'
import Register from '../views/register.vue'
import UTS from '../views/UTS.vue'
import UAS from '../views/UAS.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import Beranda from '../views/Beranda.vue'
import Kontak from '../views/Kontak.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/beranda', component: Beranda },
  { path: '/kontak', component: Kontak },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
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