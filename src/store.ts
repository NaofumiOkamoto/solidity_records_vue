import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios';

export interface State {
products: string[];
handle: string[];
title: Array<string>;
html: string;
images: Array<string>;
price: Array<string>;
cartCount: number;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()
// export const cookieKey: InjectionKey<Store<State>> = Symbol('cookieKey')

export const store = createStore<State>({
  state: {
    handle: [],
    title: [],
    html: "",
    images: [],
    price: [],
    cartCount: 0,
    products: []
  },
  mutations: {
    getProducts(state, sql){
      const url = '/getApi?sql=' + sql;
      state.title = []
      axios.get(url).then((response) => {
        // for(let i = 0; i < response.data.length; i++ ){
          state.products = response.data
        // }
      });
    },
		filterProdcut(state, sql){
      const url = '/api?sql=' + sql;
      console.log("filterProduct", url)
      state.handle = []
      state.title = []
      state.images = []
      state.price = []
      axios.get(url).then((response) => {
        for(let i = 0; i < response.data.length; i++ ){
          if ( response.data[i]['Title'] !== '' ){
          state.handle.push(response.data[i]['Handle']);
          state.title.push(response.data[i]['Title']);
          state.images.push(response.data[i]['Image Src']);
          state.price.push(response.data[i]['Variant Price']);
          }
        }
      });
		},
		setCartCount(state, addProductName){
      const cookies = document.cookie
      const cookiesArray = cookies.split(';'); // ;で分割し配列に
      let cartProducts = ""
      state.cartCount = 1
      document.cookie = "cart-products=" + addProductName
      for(const c of cookiesArray){
        const cArray = c.split('='); //さらに=で分割して配列に
        if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
          cartProducts = cArray[1] + "__" + addProductName
          const count = cartProducts.split('__').length
          state.cartCount = count
          document.cookie = "cart-products=" + cartProducts
        }
      }
      alert('カートに商品を入れました。\nカートの中身は' + state.cartCount + "商品あります")
    },
    getCartCount(context) {
      console.log(document.cookie)
    }
  },
  actions: {
		getProducts(context, sql) {
			context.commit('getProducts', sql)
		},
		filterProdcut(context, sql) {
			context.commit('filterProdcut', sql)
		},
    setCartCount(context, addProductName) {
      context.commit('setCartCount', addProductName)
    },
    getCartCount(context) {
      context.commit('getCart')
    }

  },
})