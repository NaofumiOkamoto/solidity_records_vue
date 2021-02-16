<template>
<div>
  <Header/>
  <div class="top_page clearfix">
    <div v-for="(image, key) in record.images" :key="key" class="products_box">
      <img class="products_img" v-bind:src=image>
      <p class="title">{{ record.title[key] }}</p>
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
        url: 'https://cdn.shopify.com/s/files/1/0415/0791/3886/products/877_01.jpg?v=1612667135',
        html: '<meta charset="utf-8">\n' +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Artist: Carmen McRae</span></p>\n' +
              `<p data-mce-fragment="1"><span data-mce-fragment="1">●Title: Recorded Live At Bubba's</span></p>\n` +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Label: Baybridge Records (Japan)</span></p>\n' +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Number: KUX-163-B</span></p>\n' +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Format: LP</span></p>\n' +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Year: 1981</span></p>\n' +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Recording Date: 1981</span></p>\n' +
              `<p data-mce-fragment="1"><span data-mce-fragment="1">●Track List: A1. Black Magic A2. Superwoman A3. New York State Of Mind A4. Underneath The Apple Tree A5. Thou Swell A6. Send In The Clowns B1. I Just Can't Wait B2. How Long B3. If I Were A Bell B4. My Foolish Heart B5. Secret Love</span></p>\n` +
              '<p data-mce-fragment="1"><span data-mce-fragment="1">●Condition: Used (Sleeve: EX-. with insert and OBI. some light damage on cover. Vinyl: EX-. some light marks. but good shape.)</span><br data-mce-fragment="1"><br data-mce-fragment="1"><span data-mce-fragment="1">-Grading Policy-</span><br data-mce-fragment="1"><span data-mce-fragment="1">M～NM～EX+～EX～EX-～VG+～VG～VG- (8 grades)</span><br data-mce-fragment="1"><br data-mce-fragment="1"><span data-mce-fragment="1">M to EX → Clean copy. </span><br data-mce-fragment="1"><br data-mce-fragment="1"><span data-mce-fragment="1">EX-, VG+ → Some (light) wear and marks. but good shape. </span><br data-mce-fragment="1"><br data-mce-fragment="1"><span data-mce-fragment="1">VG, VG- → Bad condition. some wear and marks.</span><br data-mce-fragment="1"><br data-mce-fragment="1"><span data-mce-fragment="1">You can order by e-mail. Please contact to solidityrecords@gmail.com</span></p>\n' +
              '\n' +
              '<iframe width="560" height="315" src="https://www.youtube.com/embed/4as30GSYIxo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        count: 1,
        images: [],
        price: []
      } as Records
    }
  },
  created :function(){
      const num = this.record.count += 1

      const url = '/api?num=' + num.toString();
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
          this.record.title.push(response.data[i]['Title']);
          this.record.images.push(response.data[i]['Image Src']);
          this.record.price.push(response.data[i]['Variant Price']);
          }
        }
      });

    },
  computed:{
  },
});
</script>

<style>
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
</style>