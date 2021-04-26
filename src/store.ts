import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios';

export interface State {
products: object[];
// title: string;
// html: string;
// images: Array<string>;
// price: Array<string>;
cartCount: number;
// condition: string;
genre: string[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()
// export const cookieKey: InjectionKey<Store<State>> = Symbol('cookieKey')

export const store = createStore<State>({
  state: {
    // title: "",
    // html: "",
    // images: [],
    // price: [],
    cartCount: 0,
    products: [{}],
    // condition: "",
    genre: []
  },
  mutations: {
    getProducts(state, sql){
      const producUrl = '/getApi?sql=' + sql;
      console.log("store.getProducts.sql : ", producUrl)
      axios.get(producUrl).then((response) => {
        console.log("gerProducts response : ", response)
        state.products = response.data
      });
    },
    getGenre(state, sql){
      const url = '/getGenre?sql=' + sql;
      axios.get(url).then((response) => {
        console.log("store/getGenre")
          console.log("typeOf")
          console.log(response.data)
          console.log(typeof(response.data))
        state.genre = response.data
      });
    },
		// filterProdcut(state, sql){
    //   const url = '/api?sql=' + sql;
    //   console.log("filterProduct", url)
    //   state.images = []
    //   state.price = []
    //   axios.get(url).then((response) => {
    //     for(let i = 0; i < response.data.length; i++ ){
    //       if ( response.data[i]['Title'] !== '' ){
    //       state.title.push(response.data[i]['Title']);
    //       state.images.push(response.data[i]['Image Src']);
    //       state.price.push(response.data[i]['Variant Price']);
    //       }
    //     }
    //   });
		// },
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
		getGenre(context, sql) {
			context.commit('getGenre', sql)
		},
		// filterProdcut(context, sql) {
		// 	context.commit('filterProdcut', sql)
		// },
    setCartCount(context, addProductName) {
      context.commit('setCartCount', addProductName)
    },
    getCartCount(context) {
      context.commit('getCart')
    }

  },
})