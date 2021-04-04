<template>
  <div class="product" >
    <div @click="isShow = false " >
      <AddCart v-show="isShow" style="position:fixed"/>
      <Header/>
        <div class="image_box">
          {{ getProduct.products[0].condition }}
          ^^^^^^^^^^^^^^^^^^
          {{ getProduct.products[0]["condition"] }}
          {{ getProduct.products[0]["condition"] == 'New'}}
          <img v-if="getProduct.products[0]['condition'] == 'New'" class="" v-bind:src="imgSrc + (id % 100000) + 'N.jpg' ">
          <img v-else class="" v-bind:src="imgSrc + id + '_01.jpg' ">
          <p>{{ getProduct.products[0].title }}</p>
          <div @click="addCart(product.title)" class="add_to_cart">ADD TO CART</div>
          <router-link to="/checkouts"><div class="buy_in_now">BUY IN NOW</div></router-link>
          <p class="product_info">Artist : {{ getProduct.products[0]["artist"] }}</p>
          <p class="product_info">Title : {{ getProduct.products[0]["title"] }}</p>
          <p class="product_info">Label : {{ getProduct.products[0]["label"] }}</p>
          <p class="product_info">Number : {{ getProduct.products[0]["number"] }}</p>
          <p class="product_info">Format : {{ getProduct.products[0]["format"] }}</p>
          <p class="product_info">Year : {{ getProduct.products[0]["year"] }}</p>
          <p class="product_info">Recording Date : {{ getProduct.products[0]["recoding_date"] }}</p>
          <p class="product_info">Condition : {{ getProduct.products[0]["condition"] }}</p>
          <h1>genre</h1>
          <!-- {{getGenre.genre}} -->
        </div>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
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
  // setup() {
  //   const store = useStore(key)
  //   return {
  //     // addCart:(title: string) => store.dispatch('setCartCount', title)
  //   }
  // },
  props: {
    id: Number
  },
  methods: {
    closeCart(){
      this.isShow = false;
    },
    // getTitle(handle = null){
      // console.log("getTitle")
      // let url = '/api?sql=where `Handle` = "' + this.handle + '"';
      // if (handle !== null) {
      //   url = '/api?sql=where `Handle` = "' + handle + '"';
      // }
      // axios.get(url).then((response) => {
      //   this.product.image = response.data[0]['Image Src']
      //   this.product.title = response.data[0]['Title']
      //   this.product.body = response.data[0]['Body']

      //   const length = response.data.length;
      //   this.product.images = []
      //   if ( 0 < length ) {
      //     for ( let i = 1; i < length; i++ ){
      //       this.product.images.push(response.data[i]['Image Src'])
      //     }
      //   }
      // });
    // },
  },
  computed: {
    getProduct(){
      const store = useStore(key)
      store.dispatch('getProducts', 'where id = ' + this.id)
      return store.state
    },
    // getGenre(){
    //   const store = useStore(key)
    //   store.dispatch('getGenre', 'where id = ' + this.getProduct.genre)
    //   return store.state.genre
    // },
  },
  // created: function(){
  //   // this.getTitle();
  // },
  // watch:{
  //   $route() {
  //   }
  // },
  // data() {
  //   return {
  //     product: {
  //       image: "",
  //       title: "",
  //       body: "",
  //       images: [],
  //       cartCount: 0
  //     } as Product,
  //     isShow: false
  //   }
  // },
  data(): {
    imgSrc: string;
    isShow: boolean;
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      isShow: false
		}
  },
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
  font-size: 60%;
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
</style>

