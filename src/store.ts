import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios';

export interface State {
products: [
  {
    // id: number;
    // imgCount: number;
    // title: string;
    // artist: string;
    // label: string;
    // country: string;
    // genre: string;
    // number: string;
    // format: string;
    // year: number;
    // recodingDate: string;
    // condition: string;
    // price: number;
    // youtube: string;
    // inventory: number;
    // discogsId: number;
    // numsicalInstrument: string;
  }
];
cartCount: number;
genre: string[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    cartCount: 0,
    products: [
      {
        // id: 0,
        // imgCount: 0,
        // title: "",
        // artist: "",
        // label: "",
        // country: "",
        // genre: "",
        // number: "",
        // format: "",
        // year: 0,
        // recodingDate: "",
        // condition: "",
        // price: 0,
        // youtube: "",
        // inventory: 0,
        // discogsId: 0,
        // numsicalInstrument: "",
      }
    ],
    genre: []
  },
  mutations: {
    getProducts(state, sql){
      const producUrl = '/getApi?sql=' + sql;
      console.log("getProducts url : ", producUrl)
      axios.get(producUrl).then((response) => {
        state.products = response.data
      });
    },
    getProductsLike(state, sql) {
      return new Promise(function(resolve, reject){
        const producUrl = '/getProductsLike?sql=' + sql;
        axios
          .get(producUrl)
          .then((response) => {
            state.products = response.data
            resolve(response);
          })
          .catch(error => reject(error));
      })
    },
    getGenre(state, sql){
      const url = '/getGenre?sql=' + sql;
      axios.get(url).then((response) => {
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
    // getCartCount(context) {
    //   console.log(document.cookie)
    // }
  },
  actions: {
		getProducts(context, sql) {
			context.commit('getProducts', sql)
		},
		selectGenreProducts(context, sql) {
			context.commit('selectGenreProducts', sql)
		},
		getProductsLike(context, { colmun, value }) {
      const sql = colmun + '_' + value
			context.commit('getProductsLike', sql)
		},
		getGenre(context, sql) {
			context.commit('getGenre', sql)
		},
    // getProductsGenreLike(context, sql){
		// 	context.commit('getProductsGenreLike', sql)
    // },
		// filterProdcut(context, sql) {
		// 	context.commit('filterProdcut', sql)
		// },
    setCartCount(context, addProductName) {
      context.commit('setCartCount', addProductName)
    },
    // getCartCount(context) {
    //   context.commit('getCart')
    // }

  },
})