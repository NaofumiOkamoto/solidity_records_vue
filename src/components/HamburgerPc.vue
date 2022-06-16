<template>
    <div class="sub_menu_main" style="">
      <!-- 第1階層 -->
      <ul id="firstHamburger" class="">
        <router-link :to="{ name: 'Collections', params: { category: 'All', name: 'product' } }">
          <li class="head_text">All Products</li>
        </router-link>
        <li @click="showThirdGenre(secondCategorys[0])" class="head_text">{{ secondCategorys[0] }} <span class="icon_down">∨</span></li>
        <li @click="showThirdGenre(secondCategorys[1])" class="head_text">{{ secondCategorys[1] }} <span class="icon_down">∨</span></li>
        <li @click="showSecond(categorys[1])" class="head_text">{{ categorys[1] }} <span class="icon_down">∨</span></li>
        <li @click="showSecond(categorys[2])" class="head_text">{{ categorys[2] }} <span class="icon_down">∨</span></li>
      </ul>
      <!-- 3階層 他ジャンル（商品一覧に飛ぶ） -->
      <div v-if="isShowCate" class="list_box">
        <div v-for="(cate, i) in genresArray" :key="cate" class="">
          <router-link :to="{ name: 'Collections', params: { category: 'genre', name: genresNum[i] } }">
            <div @click="isShowCate = false" class="category_text">{{cate}}</div>
          </router-link>
        </div>
      </div>
      <div v-if="isShowOther" class="list_box">
        <div v-for="(cate) in otherCategorys" :key="cate" class="">
          <router-link :to="{ name: 'Collections', params: { category: headerText, name: cate } }">
            <div @click="isShowOther = false" class="category_text">
              {{ cate }} <div style="float: right">></div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Hamburger',
  data(): {
    categorys: string[];
    secondCategorys: string[];
    otherCategorys: string[];
    isShowSecondGenre: boolean;
    isShowSecondLink: boolean;
    isShowThirdGenre: boolean;
    isShowCate: boolean;
    isShowOther: boolean;
    headerText: string;
    genresArray: string[];
    genresNum: number[];
  } {
		return{
      categorys: [
        "genre", // ジャンル!!!
        "format", // フォーマット!!!
        "item_condition", // 状態(新品or中古)!!!
      ],
      secondCategorys: [],
      otherCategorys: [],
      isShowSecondGenre: false,
      isShowSecondLink: false,
      isShowThirdGenre: false,
      isShowCate: false,
      isShowOther: false,
      headerText: "",
      genresArray: new Array(0),
      genresNum: [],
		}
  },
  created(){
    this.showSecond("genre")
  },
  methods: {
    showSecond(cate: string) {
      // genreはDBテーブル違うため処理分ける
      this.headerText = cate
      if ( cate == "genre") {
        this.secondCategorys = []
        this.isShowSecondGenre = true
        const url = '/getGenre?sql=' + 'genre';
        axios.get(url).then((response) => {
          for ( const data in response.data) {
            if ( !this.secondCategorys.includes(response.data[data].main) ){
              this.secondCategorys.push(response.data[data].main)
            }
          }
        });
      } else {
        this.otherCategorys = []
        const url = '/getCategory?sql=' + cate;
        axios.get(url).then((response) => {
          for ( let i = 0; i < response.data.length; i++ ) {
            const cate = String(Object.values(response.data[i])[0])
            if (cate && cate !== "null") {
              this.otherCategorys.push(cate)
            }
          }
        });
        this.isShowOther = true
      }
      this.isShowCate = false
    },
    showThirdGenre(genre: string) {
      this.isShowThirdGenre = true
      this.genresArray = []
      this.genresNum = []
      this.headerText = genre
      const url = '/getGenre?sql=' + "where main = '"+ genre +"'";
      axios.get(url).then((response) => {
        for ( const data in response.data) {
          if ( !this.genresArray.includes(response.data[data].sub) ){
            this.genresArray.push(response.data[data].sub)
            this.genresNum.push(response.data[data].id)
          }
        }
      })
      this.isShowCate = true
      this.isShowOther = false
    },
  }
});
</script>

<style scoped>
.header{
  background-color: #ececec
}
.head_text {
  padding: 3px 10px;
  cursor: pointer;
}
.head_text:hover {
  border-bottom: 1px solid #9e9d9d;
}
#firstHamburger {
  text-align: center;
}
li {
  list-style: none;
  display: inline-block;
}
.sub_menu_main {
  margin: 3% 0;
  font-size: 90%;
}
.list_box {
  background-color: #fff;
  border: 1px solid #9e9d9d;
  padding: 3px 10px
}
.icon_down {
  color: #9e9d9d;
}

</style>