<template>
  <div>
    <Header />
    <div class="top_page clearfix">
      <h3 class="top_title">NEW ARRIVALS</h3>
      <div v-for="(image, key) in getProduct.images" :key="key" class="products_box">
        <router-link :to="{ name: 'Product', params: { handle: getProduct.handle[key] }}" >
          <img class="products_img" v-bind:src=image>
          <p class="title">{{ getProduct.title[key] }}</p>
        </router-link>
        <p class="price">¥{{ getProduct.price[key] }}</p>
      </div>
      <div class="view_all_button">
        <button>VIEW ALL</button>
        <h3>About Us</h3>
        <p>We are based in Tokyo, Japan. Specialize in Jazz & Black Music vinyl records & etc. We can ship anywhere in the world.</p>
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
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
body{
  margin: 0;
}
.top_page{
  margin: 0 0 5% 0;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.top_title{
  width: 100%;
  margin: 9%;
  text-align: center;
}
.products_box{
  width: 50%;
  margin: 0 0 20px 0
}
.products_img {
  width: 80%;
}
.title, .price{
  width: 80%;
  font-size: 80%;
  margin: 5px auto;
  text-align: left;
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
.view_all_button{
  width: 100%;
  text-align: center;
  margin-top: 10%;
  padding: 0 6%;
}
button{
  background-color: #2a2a2a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  font-size: 110%;
  margin-bottom: 40px;
}
</style>