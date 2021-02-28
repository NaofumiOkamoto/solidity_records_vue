import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Top from '../views/Top.vue'
import Product from '../views/Product.vue'
import Collections from '../views/Collections.vue'
import Checkouts from '../views/Checkouts.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/product/:handle',
    name: 'Product',
    component: Product,
    props: route => ({ handle: String(route.params.handle) })
  },
  {
    path: '/checkouts',
    name: 'Checkouts',
    component: Checkouts
  },
  {
    path: '/collections/:genre',
    name: 'Collections',
    component: Collections,
    props: route => ({ genre: String(route.params.genre) })
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
