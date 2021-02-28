<template>
  <div class="product" >
    <div @click="isShow = false " >
      <AddCart v-show="isShow" style="position:fixed"/>
      <Header/>
      <div class="image_box"><img class="" v-bind:src=product.image></div>
      <div class="clearfix">
        <div v-for="(image, key) in product.images" :key="key" class="sub_image_box">
            <img class="sub_img" v-bind:src=image>
        </div>
      </div>
      <p>{{ product.title }}</p>
      <div @click.stop="addCart" class="add_to_cart">ADD TO CART</div>
      <router-link to="/checkouts"><div class="buy_in_now">BUY IN NOW</div></router-link>
      <div v-html="product.body"></div>
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Product {
  title: string;
  body: string;
  images: Array<string>;
  image: string;
}
export default defineComponent({
  name: 'Product',
  props: {
    handle: String
  },
  created: function(){
    this.getTitle();
  },
  watch:{
    $route(to, from) {
      const url = '/api?handle=' + to.params.handle;
      axios.get(url).then((response) => {
        this.product.image = response.data[0]['Image Src']
        this.product.title = response.data[0]['Title']
        this.product.body = response.data[0]['Body']

        const length = response.data.length;
        this.product.images = []
        if ( 0 < length ) {
          for ( let i = 1; i < length; i++ ){
            this.product.images.push(response.data[i]['Image Src'])
          }
        }
      });
    }
  },
  data() {
    return {
      product: {
        image: "",
        title: "",
        body: "",
        images: []
      } as Product,
      isShow: false
    }
  },
  methods: {
    reload() {
      this.$router.push(this.$route.fullPath)
    },
    addCart(){
      this.isShow = true
    },
    closeCart(){
      this.isShow = false;
    },
    getTitle(){
      const url = '/api?sql=where `Handle` = "' + this.handle + '"';
      axios.get(url).then((response) => {
        this.product.image = response.data[0]['Image Src']
        this.product.title = response.data[0]['Title']
        this.product.body = response.data[0]['Body']

        const length = response.data.length;
        if ( 0 < length ) {
          for ( let i = 1; i < length; i++ ){
            this.product.images.push(response.data[i]['Image Src'])
          }
        }
      });
    }
  }
});
</script>

<style scoped>
img{
  width: 90%;
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
    height: 100%;
}
.sub_image_box{
  width: 20%;
  float: left
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

