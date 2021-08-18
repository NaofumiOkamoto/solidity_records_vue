import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios';

export interface State {
products: [
  {
    // itemId: number;
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
title: string[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    cartCount: 0,
    products: [
      {
        // itemId: 0,
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
    genre: [""],
    title: [""]
  },
  mutations: {
    getProducts(state, sql){
      const producUrl = '/getApi?sql=' + sql;
      let genreUrl = '';
      console.log("getProducts url : ", producUrl)
      Promise.resolve()
      .then(() => axios.get(producUrl).then((response) => {
        state.products = response.data
        genreUrl = '/getGenre?sql= where id = ' + response.data[0].genre
        console.log('genreUrl', genreUrl)
      }))
      .then(() => axios.get(genreUrl).then((response) => {
        state.genre = response.data
        console.log('state.genre', state.genre)
      })).catch(function() {
        console.log('error:', 'Not Found')
      })
    },
    // 小ジャンルidで商品を探し出す
    getProductsLike(state, sql) {
      const producUrl = '/getProductsLike?sql=' + sql;
      Promise.resolve()
      .then(() => axios.get(producUrl).then((response) => {
        state.products = response.data
      }))
    },
    // 大ジャンルから商品を探し出す
    getProductsGenreLike(state, sql) {
      let producUrl = '/getProductsGenreLike?sql=';
      const genreUrl = '/getGenre?sql=' + sql.genre;
      console.log(genreUrl)
      Promise.resolve()
      // まず大ジャンルに対応する小ジャンルを取得
      .then(() => axios.get(genreUrl).then((response) => {
        state.genre = response.data
        for (let i = 0; i < response.data.length; i++ ) {
          producUrl += response.data[i]["id"]
          if ( response.data.length !== (i + 1) ) {
            producUrl += "_"
          }
        }
        console.log("productUrl : ", producUrl)
        producUrl += "__" + sql.sort
      }))
      // 小ジャンル一覧(101_102_103....)で情報で対応する商品一覧を取得
      .then(() => axios.get(producUrl).then((response) => {
        console.log(response.data)
        state.products = response.data
      }))
    },
    getGenre(state, sql){
      const url = '/getGenre?sql=' + sql;
      console.log(url)
      axios.get(url).then((response) => {
        state.genre = response.data
      });
    },
		// filterProdcut(state, sql){
    //   const url = '/api?sql=' + sql;
    //   console.log("filterProduct", url)
    //   axios.get(url).then((response) => {
    //     for(let i = 0; i < response.data.length; i++ ){
    //       if ( response.data[i]['title'] !== '' ){
    //       state.title.push(response.data[i]['title']);
    //       }
    //     }
    //   });
		// },
    // ヘッダー検索部分
		searchProducts(state, arg){
      const selected = arg.selected
      const keyword = arg.keyword
      const url = '/searchProducts?sql=' + selected + '_' + keyword;
      axios.get(url).then((response) => {
        state.products = response.data
      });
		},
		// setCartCount(state, addProductName){
    //   const cookies = document.cookie
    //   const cookiesArray = cookies.split(';'); // ;で分割し配列に
    //   let cartProducts = ""
    //   state.cartCount = 1
    //   document.cookie = "cart-products=" + addProductName
    //   for(const c of cookiesArray){
    //     const cArray = c.split('='); //さらに=で分割して配列に
    //     if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
    //       cartProducts = cArray[1] + "__" + addProductName
    //       const count = cartProducts.split('__').length
    //       state.cartCount = count
    //       document.cookie = "cart-products=" + cartProducts
    //     }
    //   }
    //   alert('カートに商品を入れました。\nカートの中身は' + state.cartCount + "商品あります")
    // },
    // getCartCount(context) {
    //   console.log(document.cookie)
    // }
    setCartCount(state, count) {
      state.cartCount = count
    },
    getCartCount(state) {
      const cookiesArray = document.cookie.split(';'); // ;で分割し配列に
      let cartCount = 0
      for(const c of cookiesArray){
        const cArray = c.split('='); //さらに=で分割して配列に
        if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
          cartCount = cArray[1].split('_').length
        }
      }
      state.cartCount = cartCount
    },
    sortProducts(state, sql) {
      console.log("store sortProducts")
      console.log(state.products)
      // state.products.sort()
    }
  },
  actions: {
		getProducts(context, sql) {
			context.commit('getProducts', sql)
		},
		selectGenreProducts(context, sql) {
			context.commit('selectGenreProducts', sql)
		},
		getProductsLike(context, { colmun, value, addSql, sort }) {
      const sql = colmun + '__' + value + '__' + addSql + '__' + sort
			context.commit('getProductsLike', sql)
		},
		getProductsGenreLike(context, { genre, sort } ) {
      const sql = { genre, sort }
			context.commit('getProductsGenreLike', sql)
		},
		getGenre(context, sql) {
			context.commit('getGenre', sql)
		},
    setCartCount(context, count) {
      context.commit('setCartCount', count)
    },
    getCartCount(context) {
      context.commit('getCartCount')
    },
    searchProducts(context, { selected, keyword } ) {
      context.commit('searchProducts', { selected, keyword })
    },
    sortProducts(context, sql) {
      context.commit('sortProducts', sql)
    }
    // getCartCount(context) {
    //   context.commit('getCart')
    // },
		// filterProdcut(context, sql) {
		// 	context.commit('filterProdcut', sql)
		// },

  },
})