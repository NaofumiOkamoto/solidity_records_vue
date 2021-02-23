<template>
<div>
  <Header />
  <div class="top_page clearfix">
    <div v-for="(image, key) in record.images" :key="key" class="products_box">
      <router-link :to="{ name: 'Product', params: { handle: record.handle[key] }}" >
        <img class="products_img" v-bind:src=image>
        <p class="title">{{ record.title[key] }}</p>
      </router-link>
      <p class="price">¥{{ record.price[key] }}</p>
    </div>
  </div>
  <Footer/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

  interface Records {
    handle: string[];
    title: Array<string>;
    year: number;
    url: string;
    html: string;
    count: number;
    images: Array<string>;
    price: Array<string>;
  }

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return{
      record: {
        title: [],
        year: 0,
        url: '',
        html: '',
        count: 1,
        images: [],
        price: [],
        handle: []
      } as Records
    }
  },
  created :function(){

      const url = '/api';
      console.log('url', url);

      axios.get(url).then((response) => {
        //////////////////////////////////////
        // if ( response.data['Title'] !== '' ){
        //   this.window.title = response.data['Title'];
        //   this.window.html = response.data['Body (HTML)'];
        // }
        //////////////////////////////////////

        // const lenght = response.data.length;

        for(let i = 0; i < 10; i++ ){
          if ( response.data[i]['Title'] !== '' ){
          this.record.handle.push(response.data[i]['Handle']);
          this.record.title.push(response.data[i]['Title']);
          this.record.images.push(response.data[i]['Image Src']);
          this.record.price.push(response.data[i]['Variant Price']);
          }
        }
      });

  },
});
</script>

<style>
#app {
  margin: 0 2%;
}
.clearfix::after {
   content: "";
   display: block;
   clear: both;
}
.products_box{
  float: left;
  width: 50%;
}
.products_img {
  zoom: 8%;
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