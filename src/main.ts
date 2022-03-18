import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import AddCart from '@/components/addCart.vue'
import Hamburger from '@/components/Hamburger.vue'
import HamburgerPc from '@/components/HamburgerPc.vue'
import Search from '@/components/search.vue'
import Loading from '@/components/loading.vue'
import Category from '@/components/Category.vue'
import Admin from '@/components/admin/Admin.vue'
import AdminProducts from '@/components/admin/Products.vue'
import AdminProduct from '@/components/admin/Product.vue'
import AdminGenres from '@/components/admin/Genres.vue'
import AdminOrders from '@/components/admin/Orders.vue'
import AdminOrder from '@/components/admin/Order.vue'
import AdminCustomers from '@/components/admin/Customers.vue'
import AdminProductsTable from '@/components/admin/ProductsTable.vue'
import { VueCookieNext } from 'vue-cookie-next'
import "bootstrap/dist/css/bootstrap.min.css"

import { FontAwesomeIcon } from "@/plugins/font-awesome";
import { ElementPlus } from '@/plugins/element'

import { initializeApp } from "firebase/app";
// import './lib/firebase';
// import { getAnalytics } from "firebase/analytics";
// import firebase from 'firebase';

 
const firebaseConfig = {
  apiKey: "AIzaSyA2-GRIZqr95Mbtw4SL7HRG7wkfKmZNtFc",
  authDomain: "solidityrecord.firebaseapp.com",
  projectId: "solidityrecord",
  storageBucket: "solidityrecord.appspot.com",
  messagingSenderId: "738240681855",
  appId: "1:738240681855:web:0bb3797080c480d6d7ec4a",
  measurementId: "G-6BJHM5268J"
};
initializeApp(firebaseConfig);

VueCookieNext.config({
    expire: '1d',
    path: '/',
    domain: '',
    secure: '',
    sameSite: '',
  })

const app = createApp(App)
app.use(router)
app.use(store, key)
app.use(VueCookieNext)
app.use(ElementPlus)
app.component('Header', Header)
app.component('Category', Category)
app.component('Footer', Footer)
app.component('AddCart', AddCart)
app.component('Hamburger', Hamburger)
app.component('HamburgerPc', HamburgerPc)
app.component('Search', Search)
app.component('Loading', Loading)
app.component('Admin', Admin)
app.component('AdminProducts', AdminProducts)
app.component('AdminProduct', AdminProduct)
app.component('AdminGenres', AdminGenres)
app.component('AdminOrders', AdminOrders)
app.component('AdminOrder', AdminOrder)
app.component('AdminCustomers', AdminCustomers)
app.component('AdminProductsTable', AdminProductsTable)
app.component("fa", FontAwesomeIcon)
app.mount('#app')



// 書き方１
// new Vue({
//     render: h => h(App)
// }).$mount("#app")


// 書き方２
// new Vue({
//     render: function(h){
//         return h(App)
//     }
// }).$mount("#app");
