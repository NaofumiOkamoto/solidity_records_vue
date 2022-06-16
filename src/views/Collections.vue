
<template>
  <div class="collections">
    <Header/>
    <h1 class="collection_title" v-if="category === 'genre'">genre - {{ getGenre["genre"][0]["sub"] }}</h1>
    <h1 class="collection_title" v-else>{{ category }} - {{ name }}</h1>
    <div class="flex_sub">
      <div class="sort_select">
        <p>
          <span class="sort_by">sort by</span>
          <select v-model="sort" v-on:change="selectSort" class="select">
            <option v-for="item in Object.keys(sortItem)" v-bind:value="item" :key="item">{{ item }}</option>
          </select>
        </p>
      </div>
      <div class="number_count">
        <p class="" v-if="0 === getProduct.products.length">{{ 0 }}~{{ 0 }}/{{ getProduct.products.length }}件</p>
        <p class="" v-if="paginateMaxNum < getProduct.products.length && 0 < getProduct.products.length">{{ paginateMinNum + 1 }}~{{ paginateMaxNum }}/{{ getProduct.products.length }}件</p>
        <p class="" v-if="paginateMaxNum >= getProduct.products.length && 0 < getProduct.products.length">{{ paginateMinNum + 1 }}~{{ getProduct.products.length }}/{{ getProduct.products.length }}件</p>
      </div>
    </div>
    <h2 @click="isFilter = !isFilter" v-if="!isPC" class="filter_title">Filtter</h2>
    <div :class="{ flex_box: isPC }">
      <div class="filter_box" v-if="isFilter" v-bind:class="{ filter_box_pc: isPC }">
        <!-- -->
        <h3 @click="isItemCondition = !isItemCondition">item condition <span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isItemCondition">
            <div  v-for="item_condition in itemConditions" :key="item_condition">
              <input v-model="filterItemConditionItem" type="checkbox" :id=item_condition :value=item_condition><label :for=item_condition>{{item_condition}}</label>
            </div>
          </div>
        </transition>
        <!-- -->
        <h3 @click="isSleeveCondition = !isSleeveCondition; isVinylCondition = false">sleeve condition<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isSleeveCondition">
            <div  v-for="sleeve_condition in sleeveConditions" :key="sleeve_condition">
              <input v-model="filterSleeveConditionItem" type="checkbox" :id=sleeve_condition :value=sleeve_condition><label :for=sleeve_condition>{{sleeve_condition}}</label>
            </div>
          </div>
        </transition>
        <!-- -->
        <h3 @click="isVinylCondition = !isVinylCondition; isSleeveCondition = false">vinyl condition<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isVinylCondition">
            <div  v-for="vinyl_condition in sleeveConditions" :key="vinyl_condition">
              <input v-model="filterVinylConditionItem" type="checkbox" :id=vinyl_condition :value=vinyl_condition><label :for=vinyl_condition>{{vinyl_condition}}</label>
            </div>
          </div>
        </transition>
        <!-- -->
        <h3 @click="isMusical = !isMusical">musical instruments<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isMusical">
            <div v-for="musical_instrument in musicalInstruments" :key="musical_instrument">
              <input v-model="filterMusicalItem" type="checkbox" :id=musical_instrument :value=musical_instrument><label :for=musical_instrument>{{musical_instrument}}</label>
            </div>
          </div>
        </transition>
        <!-- -->
        <h3 @click="isCountry = !isCountry">country<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isCountry">
            <div v-for="country in countries" :key="country">
              <input v-model="filterCountryItem" type="checkbox" :id=country :value=country><label :for=country>{{country}}</label>
            </div>
          </div>
        </transition>
        <!-- genre -->
        <h3 @click="isMainGenreFilter = !isMainGenreFilter; setGenreHeight()">genre<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div id="main_genre_open" v-show="isMainGenreFilter">
            <div v-for="main in mainGenres" :key="main">
              <p class="a_to_z" v-if="isGenreFilter !== main" @click="isGenreFilter = main; ">{{main}}</p>
              <p class="a_to_z" v-if="isGenreFilter === main" @click="isGenreFilter = ''; closeMainGenre() ">{{main}}</p>
              <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
                <div id="sub_genre_open" v-if="isGenreFilter === main" :height="openMainGenre()">
                  <div v-for="genre in genres" :key="genre">
                    <span v-if="genre.main === main"><input v-model="filterGenreItem" type="checkbox" :id=genre.id :value=genre.id><label :for=genre.id>{{genre.sub}}</label></span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
        <!-- -->
        <h3 @click="isAtoZlabel = !isAtoZlabel">label<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isAtoZlabel">
            <div v-for="az in AtoZlabelInitial" :key="az">
              <p class="a_to_z" v-if="labelAtoZ !== az" @click="labelAtoZ = az">{{az}}</p>
              <p class="a_to_z" v-if="labelAtoZ === az" @click="labelAtoZ = ''">{{az}}</p>
              <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
                <div class="filterOpen" v-if="labelAtoZ == az">
                  <div v-for="label in labels" :key="label">
                    <span v-if="label.slice(0,1) == az"><input v-model="filterLabelItem" type="checkbox" :id=label :value=label><label :for=label>{{label}}</label></span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
        <!-- artist -->
        <h3 @click="isAtoZartist = !isAtoZartist">artist<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isAtoZartist">
            <div v-for="az in AtoZartistInitial" :key="az">
              <p class="a_to_z" v-if="artistAtoZ !== az" @click="artistAtoZ = az">{{az}}</p>
              <p class="a_to_z" v-if="artistAtoZ === az" @click="artistAtoZ = ''">{{az}}</p>
              <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
                <div class="filterOpen" v-if="artistAtoZ == az">
                  <div v-for="artist in artists" :key="artist">
                    <span v-if="artist.slice(0,1) == az"><input v-model="filterArtistItem" type="checkbox" :id=artist :value=artist><label :for=artist>{{artist}}</label></span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
        <!-- release year -->
        <h3 @click="isReleaseYear = !isReleaseYear">release year<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isReleaseYear">
            <div  v-for="ry in releaseYears" :key="ry">
              <input v-model="filterReleaseYearItem" type="checkbox" :id=ry :value=ry><label :for=ry>{{ry}}'s</label>
            </div>
          </div>
        </transition>
        <!-- recording date -->
        <h3 @click="isRecordingDate = !isRecordingDate">recording date<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isRecordingDate">
            <div  v-for="rd in recordingDates" :key="rd">
              <input v-model="filterRecordingDateItem" type="checkbox" :id=rd :value=rd><label :for=rd>{{rd}}'s</label>
            </div>
          </div>
        </transition>
        <!-- stock -->
        <h3 @click="isStock = !isStock">stock<span class="icon_down">∨</span></h3>
        <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
          <div class="filterOpen" v-if="isStock">
            <div  v-for="stock in stocks" :key="stock">
              <input v-model="filterItem" type="checkbox" :id=stock :value=stock><label :for=stock>{{stock}}</label>
            </div>
          </div>
        </transition>
      </div>
      <p></p>
      <div class="top_page clearfix" v-bind:class="{ collection_items_pc: isPC }">
      <Loading v-if="loadingShow" />
        <div v-for="(product, key) in getProduct.products" :key="key" class="products_box" v-bind:class="{ products_box_collection_pc: isPC}">
          <div v-if="paginateMinNum <= key && key < paginateMaxNum">
            <router-link :to="{ name: 'Product', params: { itemId: product.item_id }}" >
              <img v-if="product.img_count == null" class="products_img" src="https://t202001.jgt.jp/records/no_image.png"><!-- 一旦仮画像 -->
              <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
              <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
              <p class="title">【item_id】: <br>{{ product.item_id }}</p>
              <p class="title">【artist】: <br>{{ product.artist }}</p>
              <p class="title">【title】: <br>{{ product.title }}</p>
              <p class="title">【registration_date】: <br>{{ product.registration_date }}</p>
              <p class="price">【price】: <br>{{ product.price }}</p>
              <p v-if="product.quantity === null" class="title sold_out">sold out</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <!-- ToDo: user側のページネーションをadmin側と同じようにlimit使う -->
      <button @click="paginateDown()"> ＜ </button>
      Page {{ paginateMinNum / paginateBaseNum + 1 }} of {{ Math.ceil( productsCount / paginateBaseNum ) }}
      <button @click="paginateUp()"> ＞ </button>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'
import { config } from '../const'
import axios from 'axios';

export default defineComponent({
  name: 'Collections',
  props: {
    category: String,
    name: String,
  },
  data(): {
    imgSrc: string;
    productsCount: number;
    sortItem: {[key: string]: string};
    paginateBaseNum: number;
    paginateMinNum: number;
    paginateMaxNum: number;
    isGenre: boolean;
    genreHeight: string;
    loadingShow: boolean;
    isFilter: boolean;
    isItemCondition: boolean;
    isMusical: boolean;
    isCountry: boolean;
    isGenreFilter: string;
    isMainGenreFilter: boolean;
    isLabel: boolean;
    isStock: boolean;
    isSleeveCondition: boolean;
    isVinylCondition: boolean;
    isArtist: boolean;
    isAtoZlabel: boolean;
    isAtoZartist: boolean;
    isRecordingDate: boolean;
    isReleaseYear: boolean;
    labelAtoZ: string;
    artistAtoZ: string;
    // genres: { [key: string]: number }[];
    AtoZlabelInitial: string[];
    AtoZartistInitial: string[];
    mainGenres: string[];
    genres: string[];
    labels: string[];
    artists: string[];
    countries: string[];
    itemConditions: string[];
    musicalInstruments: string[];
    stocks: string[];
    sleeveConditions: string[];
    vinylConditions: string[];
    releaseYears: number[];
    recordingDates: number[];

    filterItem: string[];
    filterItemConditionItem: string[];
    filterSleeveConditionItem: string[];
    filterVinylConditionItem: string[];
    filterMusicalItem: string[];
    filterGenreItem: number[];
    filterCountryItem: string[];
    filterLabelItem: string[];
    filterArtistItem: string[];
    filterReleaseYearItem: number[];
    filterRecordingDateItem: number[];

    sort: string;
    width: number;
    isPC: boolean;
  } {
		return{
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      productsCount: 0,
      sortItem: {'Date, new to old': 'ORDER BY registration_date DESC', 'Date, old to new': 'ORDER BY registration_date ASC', 'Alphabetically,A-Z': 'ORDER BY artist ASC', 'Alphabetically,Z-A': 'ORDER BY artist DESC', 'Price, low to high': 'ORDER BY price ASC', 'Price, high to low': 'ORDER BY price DESC'},
      paginateBaseNum: 10,
      paginateMinNum: 0,
      paginateMaxNum: 10,
      isGenre: false,
      loadingShow: true,
      isFilter: false, // 大元のfilter
      AtoZlabelInitial: [],
      AtoZartistInitial: [],
      labelAtoZ: '',
      artistAtoZ: '',
      genreHeight: '',
      // filter項目表示on off
      isItemCondition: false,
      isMusical: false,
      isCountry: false,
      isGenreFilter: '',
      isMainGenreFilter: false,
      isLabel: false,
      isStock: false,
      isSleeveCondition: false,
      isVinylCondition: false,
      isArtist: false,
      isAtoZlabel: false,
      isAtoZartist: false,
      isRecordingDate: false,
      isReleaseYear: false,
      // filter項目一覧
      mainGenres: [],
      genres: [],
      labels: [],
      artists: [],
      countries: [],
      itemConditions: [],
      musicalInstruments: [],
      stocks: [],
      sleeveConditions: ['EX+', 'EX', 'EX-', 'VG+', 'VG', 'VG-'],
      vinylConditions: [],
      releaseYears: [],
      recordingDates: [],
      // チェックした項目配列
      filterItem: [],
      filterItemConditionItem: [],
      filterSleeveConditionItem: [],
      filterVinylConditionItem: [],
      filterMusicalItem: [],
      filterGenreItem: [],
      filterCountryItem: [],
      filterLabelItem: [],
      filterArtistItem: [],
      filterReleaseYearItem: [],
      filterRecordingDateItem: [],

      sort: 'Date, new to old',//デフォルト値
      width: window.innerWidth,
      isPC: true,
      
		}
  },
  created() {
    this.getAllGenre()
    this.getAllProduct()
    this.handleResize()
    
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
      this.isPC = config.VALUE < this.width
      this.isFilter = config.VALUE < this.width
    },
    getAllGenre() {
      const url = '/getGenre?sql=' + 'genre';
      axios.get(url).then((response) => {
        for ( const data of response.data) {
          if ( !this.genres.includes(data.sub) ){
            this.genres.push(data)
            if ( this.mainGenres.indexOf(data['main'] ) === -1 ) this.mainGenres.push(data['main']);
          }
        }
      })
    },
    getAllProduct() {
      const url = '/getApi?sql=';
      axios.get(url).then((response) => {
        for ( let i = 0; i < response.data.length; i++ ) {
          const data = response.data[i]
          if ( this.labels.indexOf(data['label'] ) === -1 ) this.labels.push(data['label']);
          if ( this.artists.indexOf(data['artist'] ) === -1 ) this.artists.push(data['artist']);
          if ( this.countries.indexOf(data['country'] ) === -1  ) this.countries.push(data['country']);
          if ( this.itemConditions.indexOf(data['item_condition'] ) === -1  ) this.itemConditions.push(data['item_condition']);
          if ( this.musicalInstruments.indexOf(data['musical_instrument'] ) === -1 && data['musical_instrument'] !== null && data['musical_instrument'] !== '' ) this.musicalInstruments.push(data['musical_instrument']);
          if ( this.stocks.indexOf(data['sales_status'] ) === -1 && data['sales_status'] !== null ) this.stocks.push(data['sales_status']);
          // if ( this.sleeveConditions.indexOf(data['sleeve_condition'] ) === -1 && data['sleeve_condition'] !== null ) this.sleeveConditions.push(data['sleeve_condition']);
          if ( this.vinylConditions.indexOf(data['vinyl_condition'] ) === -1 && data['vinyl_condition'] !== null ) this.vinylConditions.push(data['vinyl_condition']);
          const releaseYear = ( data['release_year'] !== null )? Math.floor( parseInt( data['release_year'] ) / 10 ) * 10 : 0
          if ( this.releaseYears.indexOf(releaseYear) === -1 && releaseYear !== 0 ) this.releaseYears.push(releaseYear);
          const recordingDate = ( data['recoding_date'] !== null && data['recoding_date'] !== '' )? Math.floor( parseInt( (data['recoding_date']).slice(0,4) ) / 10 ) * 10 : 0
          if ( this.recordingDates.indexOf(recordingDate) === -1 && recordingDate !== 0 ) this.recordingDates.push(recordingDate);
        }
        this.labels.sort();
        this.artists.sort();
        this.musicalInstruments.sort();
        this.vinylConditions.sort();
        this.releaseYears.sort();
        this.recordingDates.sort();
        this.AtoZlabelInitial = []
        for (const label of this.labels) {
          if ( this.AtoZlabelInitial.indexOf( label.slice(0,1) ) === -1 ) this.AtoZlabelInitial.push(label.slice(0,1))
        }
        for (const artist of this.artists) {
          if ( this.AtoZartistInitial.indexOf( artist.slice(0,1) ) === -1 ) this.AtoZartistInitial.push(artist.slice(0,1))
        }
      })
    },
    beforeEnter: function(el: { style: { height: string } }) {
      el.style.height = '0';
    },
    enter: function(el: { style: { height: string }; scrollHeight: string }) {
      el.style.height = el.scrollHeight + 'px';
      // el.style.height = '100vh';
    },
    beforeLeave: function(el: { style: { height: string }; scrollHeight: string }) {
      el.style.height = el.scrollHeight + 'px';
      el.style.height = '100vh';
    },
    leave: function(el: { style: { height: string } }) {
      el.style.height = '0';
    },
    setGenreHeight(){
      setTimeout(() => {
      const mainGenreHeight: number = document.getElementById('main_genre_open')!.offsetHeight
      this.genreHeight = String(mainGenreHeight)
      }, 0);
    },
    openMainGenre(){
      setTimeout(() => {
        const subGenreHeight: number = document.getElementById('sub_genre_open')!.offsetHeight
        const genreHeight = parseInt(this.genreHeight) + subGenreHeight
        document.getElementById('main_genre_open')!.style.height = String(genreHeight) + 'px'
      }, 30);
    },
    closeMainGenre(){
      setTimeout(() => {
        document.getElementById('main_genre_open')!.style.height = this.genreHeight + 'px'
      }, 0);
    },
    paginateDown() {
      this.loadingShow = true
      setTimeout(() => {
        this.loadingShow = false
      }, 200);
      this.paginateMinNum -= (this.paginateMinNum !== 0)? this.paginateBaseNum : 0
      if ( this.paginateMaxNum === this.productsCount ){
        this.paginateMaxNum -= ( this.productsCount % 10 )
      } else if ( this.paginateMaxNum !== 10) {
        this.paginateMaxNum -= this.paginateBaseNum
      }
      window.scroll(0, 0);   // スクロール位置を移動
      // const duration = 1000;  // 移動速度（1秒で終了）
      // const interval = 25;    // 0.025秒ごとに移動
      // const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
      // const timer = setInterval(() => {
      //     window.scrollBy(0, step);   // スクロール位置を移動
      //     if(window.scrollY <= 0) {
      //         clearInterval(timer);
      //     }
      // }, interval);
    },
    paginateUp() {
      this.loadingShow = true
      this.paginateMinNum += (this.paginateMaxNum < this.productsCount) ? this.paginateBaseNum : 0
      if ( this.paginateMaxNum < this.productsCount) {
        this.paginateMaxNum += this.paginateBaseNum
        this.paginateMaxNum = ( this.paginateMaxNum > this.productsCount ) ? this.productsCount : this.paginateMaxNum
      }
      window.scroll(0, 0);   // スクロール位置を移動
      // const duration = 1000;  // 移動速度（1秒で終了）
      // const interval = 25;    // 0.025秒ごとに移動
      // const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
      // const timer = setInterval(() => {
      //     window.scrollBy(0, step);   // スクロール位置を移動
      //     if(window.scrollY <= 0) {
      //         clearInterval(timer);
      //     }
      // }, interval);
    },
    filterOpen() {
      this.isFilter = !this.isFilter
      this.paginateMinNum = 0
      this.paginateMaxNum = (this.productsCount < 10)? this.productsCount : 10
    },
    selectSort(){
      this.loadingShow = true
      this.paginateMinNum = 0
      this.paginateMaxNum = (this.productsCount < 10)? this.productsCount : 10
      setTimeout(() => {
        this.loadingShow = false
      }, 300);
    }
  },
  computed: {
    getGenre(){
      const store = useStore(key)
      store.dispatch('getGenre', 'where id = ' + this.name )
      return store.state
    },
    getProduct(){
      const store = useStore(key)

      let addSql = ''
      // item condition のチェックした値
      let addItemConditionSql = ''
      if ( this.filterItemConditionItem.length > 0 ) addItemConditionSql = " and `item_condition` = ";
      for ( let i = 0; i < this.filterItemConditionItem.length; i++ ) {
        if ( i !== 0 ) addItemConditionSql += " or `item_condition` = "
        addItemConditionSql += '"' + this.filterItemConditionItem[i] + '"'
      }

      // sleevecondition のチェックした値
      let addSleeveConditionSql = ''
      if ( this.filterSleeveConditionItem.length > 0 ) addSleeveConditionSql = " and `sleeve_condition` = ";
      for ( let i = 0; i < this.filterSleeveConditionItem.length; i++ ) {
        if ( i !== 0 ) addSleeveConditionSql += " or `sleeve_condition` = "
        addSleeveConditionSql += '"' + encodeURIComponent(this.filterSleeveConditionItem[i]) + '"'
      }
      // vinylcondition のチェックした値
      let addVinylConditionSql = ''
      if ( this.filterVinylConditionItem.length > 0 ) addVinylConditionSql = " and (`vinyl_condition` = ";
      for ( let i = 0; i < this.filterVinylConditionItem.length; i++ ) {
        if ( i !== 0 ) addVinylConditionSql += " or `vinyl_condition` = "
        addVinylConditionSql += '"' + encodeURIComponent(this.filterVinylConditionItem[i]) + '"'
        if ( i === this.filterVinylConditionItem.length - 1 ) addVinylConditionSql += ')'
      }
      // musical のチェックした値
      let addMusicalSql = ''
      if ( this.filterMusicalItem.length > 0 ) addMusicalSql = " and (`musical_instrument` = ";
      for ( let i = 0; i < this.filterMusicalItem.length; i++ ) {
        if ( i !== 0 ) addMusicalSql += " or `musical_instrument` = "
        addMusicalSql += '"' + this.filterMusicalItem[i] + '"'
        if ( i === this.filterMusicalItem.length - 1 ) addMusicalSql += ')'
      }
        
      // genre のチェックした値
      let addGenreSql = ''
      if ( this.filterGenreItem.length > 0 ) addGenreSql = "__";
      for ( let i = 0; i < this.filterGenreItem.length; i++ ) {
        addGenreSql += this.filterGenreItem[i]
        if ( i !== this.filterGenreItem.length - 1 ) addGenreSql += '_'
      }

      // musical のチェックした値
      let addCountrySql = ''
      if ( this.filterCountryItem.length > 0 ) addCountrySql = " and (`country` = ";
      for ( let i = 0; i < this.filterCountryItem.length; i++ ) {
        if ( i !== 0 ) addCountrySql += " or `country` = "
        addCountrySql += '"' + this.filterCountryItem[i] + '"'
        if ( i === this.filterCountryItem.length - 1 ) addCountrySql += ')'
      }
      // label のチェックした値
      let addLabelSql = ''
      if ( this.filterLabelItem.length > 0 ) addLabelSql = " and (`label` = ";
      for ( let i = 0; i < this.filterLabelItem.length; i++ ) {
        if ( i !== 0 ) addLabelSql += " or `label` = "
        addLabelSql += '"' + this.filterLabelItem[i] + '"'
        if ( i === this.filterLabelItem.length - 1 ) addLabelSql += ')'
      }

      // release year のチェックした値
      let addReleaseYearSql = ''
      if ( this.filterReleaseYearItem.length > 0 ) addReleaseYearSql = encodeURIComponent(' and (`release_year` LIKE "%');
      for ( let i = 0; i < this.filterReleaseYearItem.length; i++ ) {
        if ( i !== 0 ) addReleaseYearSql += encodeURIComponent(' or `release_year` LIKE "%')
        addReleaseYearSql +=  encodeURIComponent((this.filterReleaseYearItem[i] / 10) + ('%"'))
        if ( i === this.filterReleaseYearItem.length - 1 ) addReleaseYearSql += ')'
      }

      // recording date のチェックした値
      let addRecordingDateSql = ''
      if ( this.filterRecordingDateItem.length > 0 ) addRecordingDateSql = encodeURIComponent(' and (`recoding_date` LIKE "%');
      for ( let i = 0; i < this.filterRecordingDateItem.length; i++ ) {
        if ( i !== 0 ) addRecordingDateSql += encodeURIComponent(' or `recoding_date` LIKE "%')
        addRecordingDateSql +=  encodeURIComponent((this.filterRecordingDateItem[i] / 10) + ('%"'))
        if ( i === this.filterRecordingDateItem.length - 1 ) addRecordingDateSql += ')'
      }

      // artist のチェックした値
      let addArtistSql = ''
      if ( this.filterArtistItem.length > 0 ) addArtistSql = " and (`artist` = ";
      for ( let i = 0; i < this.filterArtistItem.length; i++ ) {
        if ( i !== 0 ) addArtistSql += " or `artist` = "
        addArtistSql += '"' + encodeURIComponent(this.filterArtistItem[i]) + '"'
        if ( i === this.filterArtistItem.length - 1 ) addArtistSql += ')'
      }
      addSql = addItemConditionSql + addSleeveConditionSql + addMusicalSql + addCountrySql + addVinylConditionSql + addLabelSql + addArtistSql + addReleaseYearSql + addRecordingDateSql

      if ( this.category === "genre" && this.name !== undefined && this.name.length >= 3 ) {
        console.log("collection.vue : genre id で商品検索")
        store.dispatch('getProductsLike', { colmun: this.category, value: this.name, addSql: addSql, sort: this.sortItem[this.sort] })
      } else if ( this.category === "All" ) {
        if (addSql === '' && addGenreSql === '') {
          console.log("collection.vue : 全商品検索")
          store.dispatch('getProducts', this.sortItem[this.sort])
        } else {
          console.log("collection.vue : 全商品検索 に フィルタ")
          store.dispatch('getProducts', 'where not item_id = 0' + addSql + addGenreSql + "___" + this.sortItem[this.sort])
        }
      } else if ( this.name === "All" ) {
        console.log("collection.vue : genre : " + this.category +  " で全て検索")
        store.dispatch('getProductsGenreLike', { genre: 'where main = "' + this.category + '"', sort: this.sortItem[this.sort] } )
      } else {
        console.log("collection.vue : genre以外の条件で商品検索")
        store.dispatch('getProducts', 'where `' + this.category + '` = "' + this.name + '"' + addSql + addGenreSql + ' ' +  this.sortItem[this.sort])
      }
      return store.state
    },
  },
  mounted: function () {
    window.addEventListener('load', this.handleResize)
    window.addEventListener('resize', this.handleResize)
  },
  updated: function(){
    setTimeout(() => {
      this.loadingShow = false
    }, 300);
    this.productsCount = this.getProduct.products.length
  },
  watch: {
    productsCount: function(newVal, oldVal){
      this.loadingShow = true
    }
  }
});
</script>

<style scoped>
img{
  width: 90%;
}
.flex_box, .flex_sub {
  display: flex;
  margin: 2% 5% 5% 3%;
}
.flex_sub {
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}
.filter_title {
  text-align: center;
}
.filterOpen{
	overflow: hidden;
	transition: height 0.3s;
	background-color: #fff;
}
.filter_box {
  width: 90%;
  margin: 20px auto;
  overflow: scroll;
  height: 350px;
  /* background-color: #f8f7f7; */
}
.filterOpen, #main_genre_open {
  padding: 4% 5%;
}
h3 {
  /* background-color: #f8f7f7; */
  background-color: #fff;
  border-bottom: solid 1px #d4d4d4;
  margin: 0;
  padding: 4% 8%;
  font-size: 90%;
}
.a_to_z {
  margin: 1% 0;
  padding: 0 10%;
  background-color: #f5f5f5;
  border-top: solid 4px #fff;
}
#main_genre_open {
  border-bottom: solid 8px #fff;
}
.select {
  font-size: 16px;
  border: none
}
.products_box_collection_pc {
  width: 20%;
}
.filter_box_pc {
  width: 30%;
  overflow: auto;
  height: auto;
}
.icon_down {
  color: #9e9d9d;
  float: right;
}
.collection_title {
  text-align: center;
  margin: 4% 0 7% 0;
}
.sort_select {
  width: 50%;
}
.number_count {
  width: 50%;
  text-align: right;
}
.sort_by {
  font-size: 90%;
  margin-right: 15px;
}
.collection_items_pc {
  width: 70%;
}
</style>
