import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PageView from '@/views/PageView.vue'
import DashboardHome from '@/views/DashboardHome.vue' // nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      component: DashboardView, // solo el layout con sidebar
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: DashboardHome
        },
        {
          path: '',
          name: 'page',
          component: PageView
        }
      ]
    }
  ],
})

// Protección global
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const user = auth.currentUser
    if (!user) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          next()
        } else {
          next('/login')
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
