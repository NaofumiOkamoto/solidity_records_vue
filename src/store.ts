import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios';

export interface State {
handle: string[];
title: Array<string>;
html: string;
images: Array<string>;
price: Array<string>;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    handle: [],
    title: [],
    html: "",
    images: [],
    price: [],
  },
  mutations: {
		filterProdcut(state, sql){
      const url = '/api?sql=' + sql;
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
		}
  },
  actions: {
		filterProdcut(context, sql) {
			context.commit('filterProdcut', sql)
		}
  },
})