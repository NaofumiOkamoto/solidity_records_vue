<template>
  <div class="" >
    <div @click="isShow = false " >
      <AddCart v-show="isShow" style="position:fixed"/>
      <Header/>
      <Loading v-show="loadingShow" />
        <div class="image_box" v-show="!loadingShow">
          <img @load="loaded" v-if="getProduct.products[0].img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 一旦仮画像 -->
          <img @load="loaded" v-else-if="getProduct.products[0].condition == 'New'" class="products_img" v-bind:src="imgSrc + (getProduct.products[0].item_id % 10000) + 'N.jpg' ">
          <img @load="loaded" v-else class="products_img" v-bind:src="imgSrc + getProduct.products[0].item_id + '_01.jpg' ">
          <p>{{ getProduct.products[0].title }}</p>
          <div @click="addCart(product.title)" class="add_to_cart">ADD TO CART</div>
          <router-link to="/checkouts"><div class="buy_in_now">BUY IN NOW</div></router-link>
          <p class="product_info">Artist :
            <router-link :to="{ name: 'Collections', params: { category: 'artist', name: getProduct.products[0]['artist'] } }">
              {{ getProduct.products[0]["artist"] }}
            </router-link>
          </p>
          <p class="product_info">Title : 
            {{ getProduct.products[0]["title"] }}
          </p>
          <p class="product_info">Label : 
            <router-link :to="{ name: 'Collections', params: { category: 'label', name: getProduct.products[0]['label'] } }">
              {{ getProduct.products[0]["label"] }}
            </router-link>
          </p>
          <p class="product_info">Number : 
            {{ getProduct.products[0]["number"] }}
          </p>
          <p class="product_info">Format : 
            <router-link :to="{ name: 'Collections', params: { category: 'format', name: getProduct.products[0]['format'] } }">
              {{ getProduct.products[0]["format"] }}
            </router-link>
          </p>
          <p class="product_info">Release Year : 
            <router-link :to="{ name: 'Collections', params: { category: 'release_year', name: getProduct.products[0]['release_year'] } }">
              {{ getProduct.products[0]["release_year"] }}
            </router-link>
          </p>
          <p class="product_info">Recording Date : 
            {{ getProduct.products[0]["recoding_date"] }}
          </p>
          <p class="product_info">Condition : 
            <router-link :to="{ name: 'Collections', params: { category: 'item_condition', name: getProduct.products[0]['item_condition'] } }">
              {{ getProduct.products[0]["item_condition"] }}
            </router-link>
          </p>
          <p class="product_info">Genre : 
          <span v-for="(genre, key) in getProduct.genre" :key="key">
            <router-link :to="{ name: 'Collections', params: { category: 'genre', name: genre['id'] } }">
            {{ genre.sub }}
            </router-link>
            <span v-if="(key + 1) !== getProduct.genre.length"> , </span>
          </span>
          </p>
        </div>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import axios from 'axios';
import { useStore } from 'vuex'
import { key } from '../store'

interface Product {
  title: string;
  body: string;
  images: Array<string>;
  image: string;
  cartCount: number;
}
export default defineComponent({
  name: 'Product',
  props: {
    itemId: Number
  },
  methods: {
    closeCart(){
      this.isShow = false;
    },
    loaded() {
      console.log("load")
    }
  },
  computed: {
    getProduct(){
      const store = useStore(key)
      store.dispatch('getProducts', 'where item_id = ' + this.itemId)
      return store.state
    },
  },
  data(): {
    imgSrc: string;
    isShow: boolean;
    products: object;
    loadingShow: boolean;
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      isShow: false,
      products: {},
      loadingShow: true,
		}
  },
  updated: function(){
      setTimeout(() => {
        this.loadingShow = false
      }, 200);
  }
});
</script>

<style scoped>
.product {
  width: 90%;
  margin: 0 auto;
}
img{
  width: 90%;
}
.image_calusel {
  width: 100%;
}
.image_box{
  text-align: center;
}
p {
  font-weight: bold;
  font-size: 150%;
}
.product iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 99%;
    height: 315px;
}
.sub_image_box{
  width: 20%;
  float: left
}
.product_info{
  text-align: left;
  font-size: 80%;
  padding: 10px;
}
.add_to_cart{
  border: solid 1px #000;
  text-align: center;
  padding: 10px 0;
  margin: 5px 0;
}
.buy_in_now{
  background-color: #4f4f4f;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  margin: 5px 0;
}
a {
  text-decoration: underline;
  text-decoration-color: #838383;
}
</style>

