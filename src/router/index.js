import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('../views/Log.vue')
  },
  {
    path: '/word',
    name: 'Word',
    component: () => import('../views/Word.vue')
  },
  {
    path: '/wordList',
    name: 'WordList',
    component: () => import('../views/WordList.vue')
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('../views/Role.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
