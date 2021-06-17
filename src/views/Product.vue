<template>
  <div class="" >
    <div @click="isShow = false " >
      <AddCart v-show="isShow" style="position:fixed"/>
      <Header />
      <Loading v-show="loadingShow" />
        <div class="image_box" v-show="!loadingShow">
          <img v-if="getProduct.products[0].img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 画像なしの場合の仮画像 -->
          <img v-else-if="getProduct.products[0].condition == 'New'" class="products_img" v-bind:src="imgSrc + (getProduct.products[0].item_id % 10000) + 'N.jpg' ">
          <img v-else class="products_img" v-bind:src="imgSrc + getProduct.products[0].item_id + '_0' + imgNum +'.jpg' ">

          <div class="sub_img_box">
            <div v-for="i of getProduct.products[0]['img_count']" :key='i' class="sub_img" @click="imgNum = i; selectImg(i)">
              <img v-if="getProduct.products[0].img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 画像なしの場合の仮画像 -->
              <img v-else-if="getProduct.products[0].condition == 'New'" class="products_img" v-bind:src="imgSrc + (getProduct.products[0].item_id % 10000) + 'N.jpg' ">
              <img v-else class="products_img" v-bind:src="imgSrc + getProduct.products[0]['item_id'] + '_' + ('0' + i ).slice(-2) + '.jpg' ">
            </div>
          </div>

          <p style="margin-top: 30%;">{{ getProduct.products[0].title }}</p>

          <div style="margin:0 3%;">
            <div @click="addCart(getProduct.products[0].item_id)" class="add_to_cart">ADD TO CART</div>
            <router-link to="/checkouts"><div class="buy_in_now">BUY IN NOW</div></router-link>
          </div>

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

// interface Product {
//   title: string;
//   body: string;
//   images: Array<string>;
//   image: string;
//   cartCount: number;
// }
export default defineComponent({
  name: 'Product',
  props: {
    itemId: Number
  },
  created() {
    this.setImg();
  },
  methods: {
    closeCart(){
      this.isShow = false;
    },
    addCart(id: number){
      const cookies = document.cookie
      const cookiesArray = cookies.split(';'); // ;で分割し配列に
      let cartProducts = ""
      document.cookie = "cart-products=" + id
      for(const c of cookiesArray){
        const cArray = c.split('='); //さらに=で分割して配列に
        if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
          cartProducts = cArray[1] + "_" + id
          this.cartCount = cartProducts.split('_').length
          document.cookie = "cart-products=" + cartProducts
        }
      }
      this.$store.dispatch('setCartCount', this.cartCount)
      alert('カートに商品を入れました。\nカートの中身は' + this.cartCount +  "商品あります")
    },
    setImg(){
      setTimeout(() => {
        const subImgClass = document.getElementsByClassName('sub_img')
        subImgClass[0].classList.add("select_img")
      }, 200);
    },
    selectImg(i: number){
      const subImgClass = document.getElementsByClassName('sub_img')
      for ( let i = 0; i < subImgClass.length; i++ ) {
        subImgClass[i].classList.remove("select_img")
      }
      subImgClass[i - 1].classList.add("select_img")
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
    imgNum: number;
    isShow: boolean;
    products: object;
    loadingShow: boolean;
    cartCount: number;
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      imgNum: 1,
      isShow: false,
      products: {},
      loadingShow: true,
      cartCount: 1,
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
.sub_img_box{
  display:flex;
  overflow-x:scroll;
  width: 80%;
  margin: 0 auto;
  padding: 3%;
}
.sub_img img{
  width: 74px;
  margin: 3% 1%;
  border: 4px solid #fff;
}
.select_img img{
  border: 4px solid #000;
}
</style>

