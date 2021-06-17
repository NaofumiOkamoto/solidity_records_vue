<template>
    <div class="sub_menu_main" style="position: relative; background-color: #fff;">
      <!-- <Category v-if="isShowGenre" /> -->
      <!-- 第1階層 genre, format, condition -->
      <div id="firstHamburger" class="hamburgerAbsolute" v-if="isShowCate">
        <router-link :to="{ name: 'Collections', params: { category: 'All', name: 'product' } }">
          <div class="category_text_box all" @click="isShowCate = false">
            <div class="category_text">All Products</div>
          </div>
        </router-link>
        <div :key="cate" v-for="cate in categorys"  class="">
            <div @click="showSecond(cate); fadeInLeft('secondHamburger'); fadeOutLeft('firstHamburger')" class="category_text_box">
              <div class="category_text">
                Search by {{ cate }} <div style="float: right">></div>
              </div>
            </div>
        </div>
      </div>
      <!-- 第2階層 -->
      <div id="secondHamburger" class="hamburgerAbsolute">
        <div v-if="isShowSecondGenre || isShowSecondLink" class="category_text_box header">
          <div class="left-space" @click="fadeInRight('firstHamburger'); fadeOutRight('secondHamburger'); toFirstBack(); ">←</div>
          <div class="category_text">{{ headerText }} で絞る</div>
        </div>
        <!-- 主ジャンル（まだ3階層いく） -->
        <div v-if="isShowSecondGenre">
          <div :key="sec" v-for="sec in secondCategorys"  class="">
            <div @click="showThirdGenre(sec); fadeInLeft('thirdHamburger'); fadeOutLeft('secondHamburger')" class="category_text_box">
              <div class="category_text">
                {{ sec }} <div style="float: right">></div>
              </div>
            </div>
          </div>
        </div>
        <!-- ジャンル以外（商品一覧に飛ぶ） -->
        <div v-if="isShowSecondLink">
          <div :key="sec" v-for="sec in secondCategorys"  class="">
          <router-link :to="{ name: 'Collections', params: { category: headerText, name: sec } }">
            <div @click="$emit('isNotHamburger')" class="category_text_box">
              <div class="category_text">
                {{ sec }} <div style="float: right">></div>
              </div>
            </div>
          </router-link>
          </div>
        </div>
      </div>
      <!-- 3階層 他ジャンル（商品一覧に飛ぶ） -->
      <div id="thirdHamburger">
        <div v-if="isShowThirdGenre" >
          <div class="left-space" @click=" fadeInRight('secondHamburger'); fadeOutRight('thirdHamburger'); toSecondBack();">←</div>
          <router-link :to="{ name: 'Collections', params: { category: headerText, name: 'All' } }">
            <div class="category_text_box">
              <div @click="$emit('isNotHamburger')" class="category_text">
                {{headerText}} all products
              </div>
            </div>
          </router-link>
          <div v-for="(cate, i) in genresArray" :key="cate" class="">
            <router-link :to="{ name: 'Collections', params: { category: 'genre', name: genresNum[i] } }">
              <div class="category_text_box">
                <div @click="$emit('isNotHamburger')" class="category_text">
                  {{cate}}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <hr>
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
    isShowSecondGenre: boolean;
    isShowSecondLink: boolean;
    isShowThirdGenre: boolean;
    isShowCate: boolean;
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
      isShowSecondGenre: false,
      isShowSecondLink: false,
      isShowThirdGenre: false,
      isShowCate: true,
      headerText: "",
      genresArray: new Array(0),
      genresNum: [],
		}
  },
  methods: {
    toFirstBack() {
      setTimeout(() => {
        this.isShowCate = true;
        this.isShowSecondGenre = false;
        this.isShowSecondLink = false;
      }, 500);
    },
    toSecondBack() {
      setTimeout(() => {
        this.isShowSecondGenre = true;
        this.isShowThirdGenre = false;
      }, 500);
    },
    fadeInLeft(idName: string){
      console.log(idName)
      const el = document.getElementById(idName)
      if (el) {
        el.classList.remove("fadeOutLeft")
        el.classList.remove("fadeOutRight")
        el.classList.remove("fadeInRight")
        el.classList.add("fadeInLeft")
      }
    },
    fadeOutLeft(idName: string) {
      const el = document.getElementById(idName)
      if (el) {
        el.classList.remove("fadeInLeft")
        el.classList.remove("fadeOutRight")
        el.classList.remove("fadeInRight")
        el.classList.add("fadeOutLeft")
      }
    },
    fadeInRight(idName: string){
      const el = document.getElementById(idName)
      if (el) {
        el.classList.remove("fadeOutLeft")
        el.classList.remove("fadeInLeft")
        el.classList.remove("fadeOutRight")
        el.classList.add("fadeInRight")
      }
    },
    fadeOutRight(idName: string) {
      const el = document.getElementById(idName)
      if (el) {
        el.classList.remove("fadeInRight")
        el.classList.remove("fadeOutLeft")
        el.classList.remove("fadeInLeft")
        el.classList.add("fadeOutRight")
      }
    },
    showSecond(cate: string) {
      // genreはDBテーブル違うため処理分ける
      this.headerText = cate
      this.secondCategorys = []
      if ( cate == "genre") {
        this.isShowSecondGenre = true
        const url = '/getGenre?sql=' + 'genre';
        axios.get(url).then((response) => {
          for ( const data in response.data) {
            if ( !this.secondCategorys.includes(response.data[data].main) ){
              this.secondCategorys.push(response.data[data].main)
            }
          }
        }).then(() => {
          console.log(this.secondCategorys.length)
        });
      } else {
        this.isShowSecondLink = true
        const url = '/getCategory?sql=' + cate;
        axios.get(url).then((response) => {
          for ( let i = 0; i < response.data.length; i++ ) {
            const cate = String(Object.values(response.data[i])[0])
            this.secondCategorys.push(cate)
          }
        }).then(() => {
          console.log(this.secondCategorys.length)
        });
      }

      // this.isShowCate = false
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
      // this.isShowSecondGenre = false
    },
  }
});
</script>

<style scoped>
.header{
  background-color: #ececec
}
.hamburgerAbsolute {
  position: absolute;
  background-color: #fff;
  width: 100%;
}
.left-space {
  float: left;
  width: 30px;
  height: 43px;
  border-right: 1px solid #9e9d9d;
  padding: 21px 0 0 15px;
}
.category_show {
  color: red;
  height: 0
}
.category_text {
  padding: 20px 20px 20px 60px;
}
.category_text_box {
  border-top: 1px solid #9e9d9d;
}
#firstHamburger, #secondHamburger {
  border-bottom: 1px solid #9e9d9d;
}
.category_text_box:hover{
  background-color: #f9e9e9;
}
.next{
  position: absolute;
  right: 5%;
  top: 0;
  font-size: 180%;
}
hr {
  margin: 0;
}
.sub_menu_jazz{
  width: 100%;
}
.fadeInLeft{
    animation-name: fadeInLeft;
    animation-duration: 0.6s;
    animation-fill-mode:forwards;
}
@keyframes fadeInLeft {
  from {
      transform: translateX(400px);
  }
  to {
      transform: translateX(0);
  }
}
.fadeOutLeft{
    animation-name: fadeOutLeft;
    animation-duration: 0.6s;
    animation-fill-mode:forwards;
}
@keyframes fadeOutLeft {
  from {
      transform: translateX(0);
  }
  to {
      transform: translateX(-400px);
  }
}

.fadeInRight{
    animation-name: fadeInRight;
    animation-duration: 0.6s;
    animation-fill-mode:forwards;
}
@keyframes fadeInRight {
  from {
      transform: translateX(-400px);
  }
  to {
      transform: translateX(0);
  }
}
.fadeOutRight{
    animation-name: fadeOutRight;
    animation-duration: 0.6s;
    animation-fill-mode:forwards;
}
@keyframes fadeOutRight {
  from {
      transform: translateX(0);
  }
  to {
      transform: translateX(400px);
  }
}

</style>