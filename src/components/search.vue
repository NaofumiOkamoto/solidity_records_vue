<template>
  <div class="search">
    <div class="form_box clearfix">
      <button @click="back">←</button>
      <input class="search_form" type="text" v-model="keyword" placeholder="Search by artist or title">
    </div>
    <div style="margin-top:20%;">
      <div style="background-color:#fff; padding: 5px;">検索結果 : {{ searchProducts['products'].length }}件</div>
      <div class="search_result" v-for="(product,key) in searchProducts['products']" :key="key">
        <router-link :to="{ name: 'Product', params: { itemId: product['item_id'] }}">
          <div style="float:left; margin:5px 5px 0 0;">
            <img v-if="product.img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 一旦仮画像 -->
            <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
            <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
          </div>
          <p style="" @click="back">{{ product['artist'] }} <br> {{ product['title']}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'

interface Searches {
  title: Array<string>;
  artist: string[];
}

export default defineComponent({
  name: 'Search',
  data() {
    return {
      search: {
        title: [],
        artist: [],
      } as Searches,
      keyword: '',
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
    }
  },
  methods: {
    back() {
      this.$emit("back")
    },
  },
  computed: {
    searchProducts() {
      console.log("filter")
      const store = useStore(key)
      console.log("keyword", this.keyword)
      if (this.keyword) {
        store.dispatch('searchProducts', this.keyword)
      }
      return store.state
    }
  }
});
</script>

<style scoped>
.clearfix::after {
   content: "";
   display: block;
   clear: both;
}
img {
  width:65px;
}
.search{
  position: absolute;
  left: 0;
  top: 0;
  /* height: 200px; */
  width: 100%;
  z-index: 1;
}
.form_box{
  position: fixed;
  background: #999;
  width: 100%;
}
.search_form{
  width: 75%;
  height: 40px;
  margin: 5% 2%;
  padding: 0 10px;
  border: none;
  border-radius: 15px;
  outline: none;
  font-size: 120%;
}
button {
  width: 40px;
  height: 40px;
  font-size: 120%;
}
.search_result{
  background-color: #fff;
  margin: 0;
  font-size: 80%;
  height: 80px;
  border-top: solid 1px #999;
  border-bottom: solid 1px #999;
}
/* p {
  margin: 0;
  padding: 2%;
  border: solid 1px #999;
} */
</style>
