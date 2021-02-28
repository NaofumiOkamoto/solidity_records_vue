
<template>
  <div class="collections">
    <Header/>
    <h1>{{ genre }}</h1>
    <p>{{ getProduct.title.length }}件</p>
    <div class="top_page clearfix">
      <div v-for="(image, key) in getProduct.images" :key="key" class="products_box">
        <router-link :to="{ name: 'Product', params: { handle: getProduct.handle[key] }}" >
          <img class="products_img" v-bind:src=image>
          <p class="title">{{ getProduct.title[key] }}</p>
        </router-link>
        <p class="price">¥{{ getProduct.price[key] }}</p>
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
    genre: String
  },
  computed: {
    getProduct(){
      console.log(this.genre)
      const category = '/' + this.genre
      const store = useStore(key)
      store.dispatch('filterProdcut', 'WHERE `Title` LIKE "%25' + category + '%25"')
      return store.state
    }
  },
});
</script>
