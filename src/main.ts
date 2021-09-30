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
import { VueCookieNext } from 'vue-cookie-next'

import { FontAwesomeIcon } from "@/plugins/font-awesome";

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
app.component('Header', Header)
app.component('Category', Category)
app.component('Footer', Footer)
app.component('AddCart', AddCart)
app.component('Hamburger', Hamburger)
app.component('HamburgerPc', HamburgerPc)
app.component('Search', Search)
app.component('Loading', Loading)
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
