<template>
  <div class="category" >
    <Header/>
    <p>{{ category }}で絞る</p>
    <div v-for="cate in categorys" :key="cate" class="products_box">
      <p @click="reload">{{cate[category]}}</p>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
// import { useStore } from 'vuex'
// import { key } from '../store'

interface Product {
  title: string;
  body: string;
  images: Array<string>;
  image: string;
  cartCount: number;
}
export default defineComponent({
  name: 'Category',
  props: {
    category: String
  },
  // watch:{
  //   $route(to, from) {
  //     console.log("route")
  //     this.$router.push({ path: '/category/genre'})
  //     this.getCategoryList
  //   }
  // },
  beforeRouteUpdate (to, from, next) {
    console.log("to", to)
    console.log("to.fullPath", to.fullPath)
    console.log("from", from)
    console.log("this.category", this.category)
    console.log("this.categorys", this.categorys)
    console.log("next", next)
    // this.category = to.params.category
      // this.$router.go({ name: 'Category'})
      // this.categorys = ["a", "b"]
      // console.log(this.categorys)
      // this.categorys = ["a", "b"]
      this.getCategoryList
      next(this.getCategoryList)
  },
  created: function(){
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      console.log("getCategoryList")
      const url = '/getCategory?sql=' + this.category;
      axios.get(url).then((response) => {
        this.categorys = response.data
      })
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

