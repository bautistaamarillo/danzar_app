import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/InfoCategory',
    name: 'InfoCategory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InfoCategoryView.vue')
  },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    
    component: () => import(/* webpackChunkName: "testeo" */ '../views/StudentView.vue')
  },
  {
    path: '/InfoItem',
    name: 'InfoItem',

    component: () => import('../views/InfoItemView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
