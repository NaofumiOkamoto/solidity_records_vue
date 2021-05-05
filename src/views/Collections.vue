
<template>
  <div class="collections">
    <Header/>
    <h1>{{ category }}</h1>
    <h1 v-if="category === 'genre'">{{ getGenre.genre[0].sub }}</h1>
    <h1>{{ getProduct.products.length }}件</h1>
    <p></p>
    <div class="top_page clearfix">
      <div v-for="(product, key) in getProduct.products" :key="key" class="products_box">
        <router-link :to="{ name: 'Product', params: { id: product.id }}" >
          <img v-if="product['condition'] == 'New'" class="" v-bind:src="imgSrc + (product['id'] % 100000) + 'N.jpg' ">
          <img v-else class="" v-bind:src="imgSrc + product['id'] + '_01.jpg' ">
          <img class="products_img" v-bind:src=image>
          <p class="title">{{ product }}</p>
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
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      isGenre: false,
		}
  },
  computed: {
    getProduct(){
      const store = useStore(key)
      if ( this.category === "genre" && this.name !== undefined && this.name.length >= 3) {
        store.dispatch('getProductsLike', { colmun: this.category, value: this.name})
      } else {
        store.dispatch('getProducts', 'where ' + this.category + ' = "' + this.name + '"')
      }
      return store.state
    },
    getGenre(){
      const store = useStore(key)
      store.dispatch('getGenre', 'where id = ' + this.name )
      return store.state
    }
  },
});
</script>

<style scoped>
img{
  width: 90%;
}
</style>
