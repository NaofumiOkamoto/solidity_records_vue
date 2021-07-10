<template>
  <div>
    <Header />
    <Loading v-show="loadingShow" />
    <div v-show="!loadingShow" class="top_page clearfix">
      <h3 class="top_title">NEW ARRIVALS</h3>
      <div v-for="(product, key) in getProduct.products" :key="key" class="products_box">
        <router-link :to="{ name: 'Product', params: { itemId: product.item_id }}" >
          <img v-if="product.img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 一旦仮画像 -->
          <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
          <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
          <p class="title">artist : {{ product.artist }}</p>
          <p class="title">title : {{ product.title }}</p>
          <p class="price">¥{{ product.price }}</p>
        </router-link>
      </div>
    </div>
    <router-link :to="{ name: 'Collections', params: { category: 'All', name: 'product' } }">
      <div class="view_all_button">VIEW ALL</div>
    </router-link>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'HelloWorld',
  // },
  data(): {
    imgSrc: string;
    loadingShow: boolean;
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      loadingShow: true,
		}
  },
  methods: {
  },
  computed: {
    getProduct(){
      const store = useStore(key)
      store.dispatch('getProducts', 'ORDER BY title DESC LIMIT 10;')
      // store.dispatch('getProducts', '')
      // store.dispatch('filterProdcut', 'ORDER BY Title DESC LIMIT 10;')
      // store.dispatch('filterProdcut', 'WHERE `Body` LIKE "%25Japanese Jazz%25"')
      console.log(store.state)
      console.log(this.imgSrc)
      return store.state
    }
  },
  updated: function(){
      setTimeout(() => {
        this.loadingShow = false
      }, 200);
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
  /* padding: 0 0 20px 0 */
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
.view_button{
  background-color: #2a2a2a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  font-size: 110%;
  margin-bottom: 40px;
}
.view_all_button{
  margin: 10% auto;
  background-color: #000;
  color: #fff;
  text-align: center;
  width: 30%;
}
</style>