
<template>
  <div class="collections">
    <Header/>
    <Loading v-show="loadingShow" />
    <h1 v-if="category === 'genre'">genre - {{ getGenre["genre"][0]["sub"] }}</h1>
    <h1 v-else>{{ category }} - {{ name }}</h1>
    <h1>{{ getProduct.products.length }}件</h1>
    <p></p>
    <div class="top_page clearfix">
      <div  v-for="(product, key) in getProduct.products" :key="key" class="products_box">
        <router-link :to="{ name: 'Product', params: { itemId: product.item_id }}" >
          <img v-if="product.img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 一旦仮画像 -->
          <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
          <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
          <p class="title">{{ product.artist }}</p>
          <p class="title">{{ product.title }}</p>
          <p class="price">{{ product.price }}</p>
        </router-link>
        <!-- <p class="price">¥{{ getProduct.price[key] }}</p> -->
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'Collections',
  props: {
    category: String,
    name: String,
  },
  data(): {
    imgSrc: string;
    isGenre: boolean;
    loadingShow: boolean;
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      isGenre: false,
      loadingShow: true,
		}
  },
  methods: {
  },
  computed: {
    getGenre(){
      const store = useStore(key)
      store.dispatch('getGenre', 'where id = ' + this.name )
      return store.state
    },
    getProduct(){
      const store = useStore(key)
      if ( this.category === "genre" && this.name !== undefined && this.name.length >= 3 ) {
        console.log("genre id で商品検索")
        store.dispatch('getProductsLike', { colmun: this.category, value: this.name})
      } else if ( this.category === "All" ) {
        console.log("All product で検索")
        store.dispatch('getProducts', '')
      } else if ( this.name === "All" ) {
        console.log("genre : " + this.category +  " で全て検索")
        store.dispatch('getProductsGenreLike', 'where main = "' + this.category + '"')
      } else {
        console.log("genre以外の条件で商品検索")
        store.dispatch('getProducts', 'where `' + this.category + '` = "' + this.name + '"')
      }
      return store.state
    },
  },
  updated: function(){
      setTimeout(() => {
        this.loadingShow = false
      }, 200);
  }
});
</script>

<style scoped>
img{
  width: 90%;
}
</style>
