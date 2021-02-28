<template>
<div>
  <Header />
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
  name: 'HelloWorld',
  computed: {
    getProduct(){
      const store = useStore(key)
      store.dispatch('filterProdcut', 'ORDER BY Title DESC LIMIT 10;')
      // store.dispatch('filterProdcut', 'WHERE `Body` LIKE "%25Japanese Jazz%25"')
      return store.state
    }
  }
});
</script>

<style>
#app {
  margin: 0 2%;
}
.top_page{
  display: flex;
  flex-wrap: wrap;
}
.products_box{
  width: 50%;
}
.products_img {
  width: 80%;
}
.title{
  width: 90%;
  font-size: 80%;
  margin: 5px 0 0 0;
}
.price{
  margin: 0 0 10px 0;
}
iframe{
  width: 100%;
  height: 100%;
}
a{
  text-decoration: none;
  color: #000;
}
a:hover{
  text-decoration: underline;
}
</style>