<template>
	<div class="admin_product_page">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_product_page_box">
        <el-icon><arrow-left /></el-icon>
        <h3 v-if="paramsItemId !== 'new'">{{ artist}} - {{title}}</h3>
        <h3 v-if="paramsItemId === 'new'">add product</h3>
        <div class="admin_product_edit_box">
          <p v-if="paramsItemId === 'new'">item_id <br> <input class="" type="text" v-model="itemId" placeholder=""></p>
          <p v-else>item_id<br> <span class="" >{{paramsItemId}}</span></p>
          <p>master_id <br> <input class="" type="text" v-model="masterId" placeholder=""></p>
          <p>artist        <br> <input class="" type="text" v-model="artist" placeholder=""></p>
          <p>title         <br> <input class="" type="text" v-model="title" placeholder=""></p>
          <p>label         <br> <input class="" type="text" v-model="label" placeholder=""></p>
          <p>number        <br> <input class="" type="text" v-model="number" placeholder=""></p>
          <p>format        <br> <input class="" type="text" v-model="format" placeholder=""></p>
          <p>release_year  <br> <input class="" type="text" v-model="releaseYear" placeholder=""></p>
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
      number: '',
      format: '',
      releaseYear: '',
      recodingDate: '',
      itemCondition: '',
    }
  },
  created() {
    this.getProduct()
    console.log(this.paramsItemId)
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
        })
      }
    },
    updateProduct() {
      if(this.paramsItemId !== 'new'){
        const url = '/updateProduct?sql= ' + this.createUrl()
        axios.get(url).then((response) => {
          if (response.status === 200) {
            alert("success!!")
          }
        })
      } else {
        const url = '/createProduct?sql= ' + this.createUrl()
        axios.get(url).then((response) => {
          if (response.status === 200) {
            alert("success!!")
          }
        })
      }
    },
    createUrl() {
      let url = this.itemId !== ''      ? 'item_id = "'      + this.itemId + '", '      : 'item_id = NULL, '
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
</style>