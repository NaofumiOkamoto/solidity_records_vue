<template>
  <div class="hello">
    <p><button v-on:click="getAPI()">Next Product</button></p>
    <p>{{ record.title }}</p>
    <img v-bind:src=record.url>
    <div v-html=record.html></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'

interface Record {
  title: string;
  year: number;
  url: string;
  html: string;
  count: number;
}

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return{
      record: {
        title: 'jas',
        year: 2020,
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
        count: 1
      } as Record
    }
  },
  methods:{
    getAPI(){
      const num = this.record.count += 1

      const url = '/api?num=' + num.toString();
      console.log('url', url);

      axios.get(url).then((response) => {
        console.log('response', response.data.Title);
        if ( response.data['Title'] !== '' ){
          this.record.title = response.data['Title'];
          this.record.html = response.data['Body (HTML)'];
        }
        this.record.url = response.data['Image Src'];
      });

    },
  },
  computed:{
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  zoom: 13%;
}
</style>
