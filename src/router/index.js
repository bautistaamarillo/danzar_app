import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
<<<<<<< HEAD
    path: '/InfoCategory',
    name: 'InfoCategory',
=======
    path: '/dashboard',
    name: 'dashboard',
    
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  },
  {
    path: '/about',
    name: 'about',
>>>>>>> af2a9fd7f72dae4628219ab17650938cff0b9be1
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InfoCategoryView.vue')
  },
  {
    path: '/testeo',
    name: 'testeo',
    
    component: () => import(/* webpackChunkName: "testeo" */ '../views/TestView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
