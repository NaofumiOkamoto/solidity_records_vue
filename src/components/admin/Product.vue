<template>
	<div class="admin_product_page">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_product_page_box">
        <!-- {{ getProduct.products[0]["artist"] }} -->
        <el-icon><arrow-left /></el-icon>
        <h3 v-if="paramsItemId !== 'new'">{{ artist}} - {{title}}</h3>
        <h3 v-if="paramsItemId === 'new'">add product</h3>
        <div class="admin_product_edit_box">
          <p v-if="paramsItemId === 'new'">item_id <br> <input class="" type="text" v-model="itemId" placeholder=""></p>
          <p v-else>item_id<br> <span class="" >{{paramsItemId}}</span></p>
          <p v-if="paramsItemId === 'new'">master_id <br> <input class="" type="text" v-model="master_id" placeholder=""></p>
          <p v-else>master_id<br> <span class="" >{{masterId}}</span></p>
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
  // computed: {
  //   getProduct(){
  //     const store = useStore(key)
  //     store.dispatch('getProducts', 'where item_id = ' + this.itemId)
  //     this.product = "aaa"
  //     return store.state
  //   },
  // },
  methods: {
    getProduct() {
      if(this.paramsItemId !== 'new'){
        const url = '/getApi?sql= where item_id = ' + this.paramsItemId;
        console.log('getApi url', url)
        axios.get(url).then((response) => {
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
        let url = '/updateProduct?sql= '
        url += 'artist = "' + this.artist + '", '
        url += 'title = "' + this.title + '", '
        url += 'label = "' + this.label + '", '
        url += 'number = "' + this.number + '", '
        url += 'format = "' + this.format + '", '
        url += 'release_year = "' + this.releaseYear + '", '
        url += 'recoding_date = "' + this.recodingDate 
        url += '" where item_id = ' + this.paramsItemId;
        console.log('url', url)
        axios.get(url).then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            alert("success!!")
          }
        })
      }
    },
    createProduct() {
      if(this.paramsItemId === 'new'){
        let url = '/updateProduct?sql= '
        url += 'artist = "' + this.artist + '", '
        url += 'title = "' + this.title + '", '
        url += 'label = "' + this.label + '", '
        url += 'number = "' + this.number + '", '
        url += 'format = "' + this.format + '", '
        url += 'release_year = "' + this.releaseYear + '", '
        url += 'recoding_date = "' + this.recodingDate 
        url += '" where item_id = ' + this.paramsItemId;
        console.log('url', url)
        axios.get(url).then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            alert("success!!")
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
</style>