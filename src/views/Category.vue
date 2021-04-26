<template>
  <div class="category" >
    <Header/>
    <p>{{ category }}で絞る</p>
    <div v-for="cate in categorys" :key="cate" class="products_box">
      <router-link :to="{ name: 'Collections', params: { category: category, name: cate } }">
        <p>{{cate}}</p>
      </router-link>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Category',
  props: {
    category: String,
  },
  beforeRouteUpdate (to, from, next) {
      next();
      this.getCategoryList(String(to.params.category))
  },
  created: function(){
    this.getCategoryList(String(this.category))
  },
  methods: {
    getCategoryList(cate: string) {
      this.categorys = []
      if( cate === "genre" ) {
        const url = '/getGenre?sql=' + cate;
        axios.get(url).then((response) => {
          for ( const data in response.data) {
            if ( !this.categorys.includes(response.data[data].main) ){
              this.categorys.push(response.data[data].main)
            }
          }
        })
      } else {
        const url = '/getCategory?sql=' + cate;
        axios.get(url).then((response) => {
          for ( let i = 0; i < response.data.length; i++ ) {
            const cate = String(Object.values(response.data[i])[0])
            this.categorys.push(cate)
          }
        })
      }
    },
  },
  data(): {
    categorys: string[];
  } {
		return{
      categorys: [],
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

