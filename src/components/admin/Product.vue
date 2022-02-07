<template>
	<div class="admin_product_page">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_product_page_box">
        <router-link :to="{ name: 'AdminProducts'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </router-link>
        <h3 v-if="paramsItemId !== 'new'">{{ artist}} - {{title}}</h3>
        <h3 v-if="paramsItemId === 'new'">add product</h3>
        <div class="admin_product_edit_box">
          <div style="display:flex;">
            <p class="divided2" v-if="paramsItemId !== 'new'">item_id    <br> <span class="" >{{paramsItemId}}</span></p>
            <p class="divided2" v-else>item_id    <br><input class="" type="text" v-model="itemId" placeholder=""></p>
            <p class="divided2">master_id         <br><input class="" type="text" v-model="masterId" placeholder=""></p>
          </div>
          <p>artist            <br><input class="" type="text" v-model="artist" placeholder=""></p>
          <p>title             <br><input class="" type="text" v-model="title" placeholder=""></p>
          <p>label             <br><input class="" type="text" v-model="label" placeholder=""></p>
          <p>number            <br><input class="" type="text" v-model="number" placeholder=""></p>
          <p>genre             <br><input class="" type="text" v-model="genre" placeholder=""></p>
          format            <br>
          <el-select v-model="format" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in selectFormat" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          country           <br>
          <el-select v-model="country" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in selectCountry" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <p>barcode           <br><input class="" type="test" v-model="barcode" placeholder=""></p>
          <p>trackList         <br><input class="" type="test" v-model="trackList" placeholder=""></p>
          <p>personnel         <br><input class="" type="test" v-model="personnel" placeholder=""></p>
        </div>
        <div class="admin_product_edit_box">
          <div style="display:flex;">
            <p class="divided2">release_year      <br><input class="" type="text" v-model="releaseYear" placeholder=""></p>
            <p class="divided2">recodingDate      <br><input class="" type="test" v-model="recodingDate" placeholder=""></p>
          </div>
          <div style="display:flex;">
            <p class="divided2">registrationDate  <br><input class="" type="test" v-model="registrationDate" placeholder=""></p>
            <p class="divided2">soldDate          <br><input class="" type="test" v-model="soldDate" placeholder=""></p>
          </div>
        </div>
        <div class="admin_product_edit_box" style="">
          <div>
            itemCondition     <br>
            <el-select v-model="itemCondition" class="m-2" placeholder="Select" size="large">
              <el-option v-for="item in selectItemCondition" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div style="display:flex;">
            <div class="divided3">
              sleeveCondition<br>
              <el-select v-model="sleeveCondition" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in selectSleeveCondition" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="divided2">
              sleeveDescription <br>
              <input class="" type="test" v-model="sleeveDescription" placeholder="">
            </div>
          </div>
          <div style="display:flex;">
            <div class="divided3">
              vinylCondition    <br>
              <el-select v-model="vinylCondition" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in selectVinylCondition" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="divided2">
              vinylDescription<br>
              <input class="" type="test" v-model="vinylDescription" placeholder="">
            </div>
          </div>
        </div>
        <div class="admin_product_edit_box" style="">
          <p>quantity          <br><input class="" type="test" v-model="quantity" placeholder=""></p>
          <p>weight            <br><input class="" type="test" v-model="weight" placeholder=""></p>
        </div>
        <div class="admin_product_edit_box" style="">
          <div style="display:flex;">
            <p class="divided2">price             <br><input class="" type="test" v-model="price" placeholder=""></p>
            <p class="divided2">soldPrice         <br><input class="" type="test" v-model="soldPrice" placeholder=""></p>
          </div>
          <div style="display:flex;">
            <p class="divided2">discogsPrice      <br><input class="" type="test" v-model="discogsPrice" placeholder=""></p>
            <p class="divided2">discogsId         <br><input class="" type="test" v-model="discogsId" placeholder=""></p>
          </div>
          <div style="display:flex;">
            <p class="divided2">ebayPrice         <br><input class="" type="test" v-model="ebayPrice" placeholder=""></p>
            <p class="divided2">ebayId            <br><input class="" type="test" v-model="ebayId" placeholder=""></p>
          </div>
        </div>
        <div class="admin_product_edit_box" style="">
          <p>musicalInstrument <br><input class="" type="test" v-model="musicalInstrument" placeholder=""></p>
          <p>youtube           <br><input class="" type="test" v-model="youtube" placeholder=""></p>
          <p>imgCount          <br><input class="" type="test" v-model="imgCount" placeholder=""></p>
        </div>
        <div class="admin_product_edit_box" style="display:flex;">
          <div>
            productStatus     <br>
            <el-select v-model="productStatus" class="m-2" placeholder="Select" size="large">
              <el-option v-for="item in selectProductStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div>
            salesStatus       <br>
            <el-select v-model="salesStatus" class="m-2" placeholder="Select" size="large">
              <el-option v-for="item in selectSalesStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="admin_product_edit_box">
          media
        </div>
        <el-button @click="updateProduct()" type="success">save</el-button>
      </div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../../store'
import axios from 'axios';

interface Searches {
  title: Array<string>;
  artist: string[];
}

export default defineComponent({
  name: 'AdminProduct',
  props: {
    paramsItemId: String
  },
  data() {
    return {
      itemId: '',
      masterId: '',
      artist: '',
      title: '',
      label: '',
      country: '',
      number: '',
      barcode: '',
      format: '',
      releaseYear: '',
      recodingDate: '',
      genre: '',
      trackList: '',
      personnel: '',
      itemCondition: '',
      sleeveCondition: '',
      sleeveDescription: '',
      vinylCondition: '',
      vinylDescription: '',
      quantity: '',
      weight: '',
      price: '',
      discogsPrice: '',
      discogsId: '',
      ebayPrice: '',
      ebayId: '',
      musicalInstrument: '',
      youtube: '',
      imgCount: '',
      registrationDate: '',
      soldDate: '',
      soldPrice: '',
      productStatus: '',
      salesStatus: '',
      selectTests: [
        {
          value: 'LP',
          label: 'LP',
        },
        {
          value: '2LP',
          label: '2LP',
        },
        {
          value: 'Gatefold LP',
          label: 'Gatefold LP',
        },
      ],
      selectFormat: [{}],
      selectCountry: [{}],
      selectItemCondition: [{}],
      selectSleeveCondition: [{}],
      selectVinylCondition: [{}],
      selectProductStatus: [{}],
      selectSalesStatus: [{}],
    }
  },
  created() {
    this.getProduct()
    this.getNotDuplicateData()
  },
  methods: {
    getProduct() {
      if(this.paramsItemId !== 'new'){
        const url = '/getApi?sql= where item_id = ' + this.paramsItemId;
        console.log('getApi url', url)
        axios.get(url).then((response) => {
          this.itemId = response.data[0]["item_id"]
          this.masterId = response.data[0]["master_id"]
          this.artist = response.data[0]["artist"]
          this.title = response.data[0]["title"]
          this.label = response.data[0]["label"]
          this.number = response.data[0]["number"]
          this.format = response.data[0]["format"]
          this.releaseYear = response.data[0]["release_year"]
          this.recodingDate = response.data[0]["recoding_date"]
          this.genre = response.data[0]["genre"]
          this.country = response.data[0]["country"]
          this.barcode = response.data[0]["barcode"]
          this.trackList = response.data[0]["track_list"]
          this.personnel = response.data[0]["personnel"]
          this.itemCondition = response.data[0]["item_condition"]
          this.sleeveCondition = response.data[0]["sleeve_condition"]
          this.sleeveDescription = response.data[0]["sleeve_description"]
          this.vinylCondition = response.data[0]["vinyl_condition"]
          this.vinylDescription = response.data[0]["vinyl_description"]
          this.quantity = response.data[0]["quantity"]
          this.weight = response.data[0]["weight"]
          this.price = response.data[0]["price"]
          this.discogsPrice = response.data[0]["discogs_price"]
          this.discogsId = response.data[0]["discogs_id"]
          this.ebayPrice = response.data[0]["ebay_price"]
          this.ebayId = response.data[0]["ebay_id"]
          this.musicalInstrument = response.data[0]["musical_instrument"]
          this.youtube = response.data[0]["youtube"]
          this.imgCount = response.data[0]["imgCount"]
          this.registrationDate = response.data[0]["registration_date"]
          this.soldDate = response.data[0]["sold_date"]
          this.soldPrice = response.data[0]["sold_price"]
          this.productStatus = response.data[0]["product_status"]
          this.salesStatus = response.data[0]["sales_status"]
        })
      }
    },
    updateProduct() {
      if(this.paramsItemId !== 'new'){
        const url = '/updateProduct?sql= ' + this.createUpdateUrl()
        axios.get(url).then((response) => {
          if (response.status === 200) {
            alert("success!!")
          }
        })
      } else {
        const url = '/createProduct?sql= ' + this.createInsertUrl()
        axios.get(url).then((response) => {
          if (response.status === 200) {
            alert("success!!")
            this.$router.push({name: 'AdminProduct', params: { paramsItemId: this.itemId }})
          }
        })
      }
    },
    createUpdateUrl() {
      let url = this.itemId !== ''   ? 'item_id = "'      + this.itemId + '", '      : 'item_id = NULL, '
      url += this.masterId !== ''    ? 'master_id = "'    + this.masterId + '", '    : 'master_id = NULL, '
      url += this.artist !== ''      ? 'artist = "'       + this.artist + '", '      : 'artist = NULL, '
      url += this.title !== ''       ? 'title = "'        + this.title + '", '       : 'title = NULL, '
      url += this.label !== ''       ? 'label = "'        + this.label + '", '       : 'label = NULL, '
      url += this.number !== ''      ? 'number = "'       + this.number + '", '      : 'number = NULL, '
      url += this.format !== ''      ? 'format = "'       + this.format + '", '      : 'format = NULL, '
      url += this.releaseYear !== '' ? 'release_year = "' + this.releaseYear + '", ' : 'release_year = NULL, '
      url += this.recodingDate !== '' ? 'recoding_date = "' + this.recodingDate + '"' : 'recoding_date = NULL, '
      url += ' where item_id = ' + this.paramsItemId;
      return url
    },
    createInsertUrl() {
      let url = '(item_id, master_id, artist, title, label, number, format, release_year, recoding_date) VALUES ('
      url += this.itemId !== ''       ? this.itemId + ','       : 'NULL, '
      url += this.masterId !== ''     ? this.masterId + ','     : 'NULL, '
      url += this.artist !== ''       ? this.artist + ','       : 'NULL, '
      url += this.title !== ''        ? this.title + ','        : 'NULL, '
      url += this.label !== ''        ? this.label + ','        : 'NULL, '
      url += this.number !== ''       ? this.number + ','       : 'NULL, '
      url += this.format !== ''       ? this.format + ','       : 'NULL, '
      url += this.releaseYear !== ''  ? this.releaseYear + ','  : 'NULL, '
      url += this.recodingDate !== '' ? this.recodingDate + ',' : 'NULL'
      url += ');'
      return url
    },
    getNotDuplicateData() {
        const colum = ['format', 'country', 'item_condition', 'sleeve_condition', 'vinyl_condition', 'product_status', 'sales_status']
        const data = [this.selectFormat, this.selectCountry, this.selectItemCondition, this.selectSleeveCondition, this.selectVinylCondition, this.selectProductStatus, this.selectSalesStatus]
        for( let i = 0; i < colum.length; i++ ) {

          const url = '/getNotDuplicateData?sql= ' + colum[i]
          axios.get(url).then((response) => {
            if (response.status === 200) {
              for (const format of response.data) {
                const fo: string = Object.values(format).join()
                if (fo !== '') { data[i].push({value: fo, label: fo}) }
              }
            }
          })
        }
    }
  }
});
</script>
<style scoped>
.admin_product_page {
  background-color: #f0efef;
}
.admin_product_page_box {
  padding: 50px;
  width: 80%;
}
.admin_product_edit_box {
  background-color: #fff;
  width: 100%;
  padding: 30px;
  border-radius: 10px 10px;
  margin: 20px 0;
}
.admin_product_edit_box input {
  width: 100%;
}
.bi-arrow-left-square {
  float: left;
  margin-right: 10px;
}
.divided2 {
  width: 45%;
  margin: 1%;
}
.divided3 {
  width: 30%;
  margin: 1%;
}
</style>