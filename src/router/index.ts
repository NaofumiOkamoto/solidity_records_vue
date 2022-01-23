import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Top from '../views/Top.vue'
import Product from '../views/Product.vue'
import Collections from '../views/Collections.vue'
import Checkouts from '../views/Checkouts.vue'
import Category from '../views/Category.vue'
import Genres from '../views/Genres.vue'
// import Admin from '../views/Admin.vue'
import AdminProduct from '../components/admin/Product.vue'
import AdminProducts from '../components/admin/Products.vue'
import AdminStock from '../components/admin/Stock.vue'
import AdminCustomer from '../components/admin/Customer.vue'
import AdminOrder from '../components/admin/Order.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/admin/products/',
    name: 'AdminProducts',
    component: AdminProducts,
    props: route => ({ status: String(route.params.status)}),
  },
  {
    path: '/admin/product/:paramsItemId',
    name: 'AdminProduct',
    component: AdminProduct,
    props: route => ({  paramsItemId: String(route.params.paramsItemId) }),
  },
  {
    path: '/admin/stock',
    name: 'AdminStock',
    component: AdminStock,
  },
  {
    path: '/admin/order',
    name: 'AdminOrder',
    component: AdminOrder,
    props: route => ({ status: String(route.params.status)}),
  },
  {
    path: '/admin/customer',
    name: 'AdminCustomer',
    component: AdminCustomer,
  },
  {
    path: '/product/:itemId',
    name: 'Product',
    component: Product,
    props: route => ({ itemId: Number(route.params.itemId) }),
    meta: { title: 'ページタイトル', desc: 'ディスクリプションを記述' }
  },
  {
    path: '/checkouts',
    name: 'Checkouts',
    component: Checkouts
  },
  {
    path: '/collections/:category/:name',
    name: 'Collections',
    component: Collections,
    props: route => ({ category: String(route.params.category), name: String(route.params.name) }),
  },
  // {
  //   path: '/category/:category',
  //   name: 'Category',
  //   component: Category,
  //   props: route => ({ category: String(route.params.category) })
  // },
  {
    path: '/category/genres/:genre',
    name: 'Genres',
    component: Genres,
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
  history: createWebHistory(process.env.BASE_URL+ "records/dist"),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // return savedPosition
      return { left: 0, top: 0 }
    } else {
      return { left: 0, top: 0 }
    }
  }
})

export default router
