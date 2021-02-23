<template>
  <div class="search">
    <div class="form_box clearfix">
      <button @click="back">←</button>
      <input class="search_form" type="text" v-model="keyword">
    </div>
    <!-- <div style="margin-top:77.5px;"></div> -->
    <div class="search_result" v-for="(product,key) in filteredProducts" :key="key">
      <p v-text="product"></p>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Searches {
  title: Array<string>;
}

export default defineComponent({
  name: 'Search',
  data() {
    return {
      search: {
        title: [],
      } as Searches,
      keyword: '',
    }
  },
  methods: {
    back() {
      this.$emit("back")
    }
  },
  created :function() {
      const url = '/api';
      axios.get(url).then((response) => {
        for(let i = 0; i < response.data.length; i++ ){
          if ( response.data[i]['Title'] !== '' ){
          this.search.title.push(response.data[i]['Title']);
          }
        }
      });
  },
  computed: {
    filteredProducts: function(): string[]{
      const products = [];
      for(let i = 0; i < this.search.title.length; i++) {
        const product = this.search.title[i];
        // if(product.indexOf(this.keyword) !== -1) {
        if(product.toLowerCase().includes(this.keyword.toLowerCase()) && this.keyword !== "") {
          console.log(product)
          products.push(product);
        }
      }
      return products;
    }
  }
});
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
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
}
p {
  margin: 0;
  padding: 2%;
  border: solid 1px #999;
}
</style>
