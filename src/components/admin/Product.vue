<template>
	<div class="admin_product_page">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_product_page_box">
        <!-- {{ getProduct.products[0]["artist"] }} -->
        <h3>{{ artist}} - {{title}}</h3>
        <div class="admin_product_edit_box">
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
        <el-button type="success">save</el-button>
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
    itemId: String
  },
  data() {
    return {
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
      if(this.itemId !== 'new'){
        const url = '/getApi?sql= where item_id = ' + this.itemId;
        axios.get(url).then((response) => {
          this.artist = response.data[0]["artist"]
          this.title = response.data[0]["title"]
          this.label = response.data[0]["label"]
          this.number = response.data[0]["number"]
          this.format = response.data[0]["format"]
          this.releaseYear = response.data[0]["release_year"]
          this.recodingDate = response.data[0]["recoding_date"]
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