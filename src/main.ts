import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import AddCart from '@/components/addCart.vue'
import Hamburger from '@/components/Hamburger.vue'
import Search from '@/components/search.vue'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee, faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FontAwesomeIcon } from "@/plugins/font-awesome";

// library.add(faCoffee, faCheck, faCheckCircle)


const app = createApp(App)
app.use(router)
app.component('Header', Header)
app.component('Footer', Footer)
app.component('AddCart', AddCart)
app.component('Hamburger', Hamburger)
app.component('Search', Search)
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
