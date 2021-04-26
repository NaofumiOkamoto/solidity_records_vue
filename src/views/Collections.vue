
<template>
  <div class="collections">
    <Header/>
    <h1>{{ category }}</h1>
    <!-- <p>{{ getProduct.title.length }}件</p> -->
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
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
		}
  },
  computed: {
    getProduct(){
      console.log("this.category", this.category)
      console.log("this.name", this.name)
      const store = useStore(key)
      store.dispatch('getProducts', 'WHERE `' + this.category + '` = "' + this.name + '"')
      console.log("store.state", store.state)
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
