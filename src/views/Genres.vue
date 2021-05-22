<template>
  <div class="category" >
    <Header/>
    <router-link :to="{ name: 'Collections', params: { category: genre, name: 'All' } }">
      <div class="category_text_box">
        <div class="category_text">
          {{genre}} 
          all products
          </div>
      </div>
    </router-link>
    <div v-for="(cate, i) in genresArray" :key="cate" class="">
      <router-link :to="{ name: 'Collections', params: { category: 'genre', name: genresNum[i] } }">
        <div class="category_text_box">
          <div class="category_text">
            {{cate}}
          </div>
        </div>
      </router-link>
    </div>
    <hr>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Genres',
  props: {
    genre: String,
  },
  created: function(){
    this.getGenreList()
  },
  methods: {
    getGenreList() {
      this.genresArray = []
      this.genresNum = []
        const url = '/getGenre?sql=' + "where main = '"+ this.genre +"'";
        console.log("url", url)
        axios.get(url).then((response) => {
          for ( const data in response.data) {
            console.log("respontse", response)
            if ( !this.genresArray.includes(response.data[data].sub) ){
              this.genresArray.push(response.data[data].sub)
              this.genresNum.push(response.data[data].id)
            }
          }
        })
    },
  },
  data(): {
    genresArray: string[];
    genresNum: number[];
  } {
		return{
      genresArray: [],
      genresNum: [],
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

