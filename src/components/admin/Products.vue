<template>
	<div style="">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_main_box">
        <h1>商品管理</h1>
        <span>import（まだ）</span>
        <button v-on:click="downloadCSV">export</button>
        <el-button class="add_button" style="">add product（まだ）</el-button>
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全て" name="all">
            <AdminProductsTable :status="''" />
          </el-tab-pane>
          <el-tab-pane label="アクティブ" name="active">
            <AdminProductsTable :status="'Active'" />
          </el-tab-pane>
          <el-tab-pane label="下書き" name="draft">
            下書き
          </el-tab-pane>
        </el-tabs> -->
        <div @click="label" style="display:flex">
          <router-link :to="{ name: 'AdminProducts', params: { status: '' }}">
            <div class="status_tab" :class="{ select_status_tab: productStatus == 'undefined' || productStatus == ''}">全て</div>
          </router-link>
          <router-link :to="{ name: 'AdminProducts', params: { status: 'Active' }}">
            <div class="status_tab" :class="{ select_status_tab: productStatus == 'Active'}">アクティブ</div>
          </router-link>
          <router-link :to="{ name: 'AdminProducts', params: { status: 'Draft' }}">
            <div class="status_tab" :class="{ select_status_tab: productStatus == 'Draft'}">下書き</div>
          </router-link>
        </div>
        <div v-for="(label,key) in productStatus" :key="key">
          <button v-if="label != ''" class="label">
            {{label}}
            <span @click="removeLabel(label)" class="label_cancel"> × </span>
          </button>
        </div>
        <table class="">
          <tr>
            <th></th>
            <th>商品</th>
            <th>ステータス</th>
            <th>在庫</th>
            <th>タイプ</th>
          </tr>
          <tr class="search_result" v-for="(product,key) in searchProducts['products']" :key="key">
            <td style="float:left; margin:5px 5px 0 0;">
              <router-link :to="{ name: 'AdminProduct', params: { itemId: product['item_id'] }}">
                <img v-if="product.img_count == null" class="products_img" src="https://t202001.jgt.jp/records/no_image.png">
                <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
                <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
              </router-link>
            </td>
            <td style="text-align: left">
              <router-link :to="{ name: 'AdminProduct', params: { itemId: product['item_id'] }}">
                {{ product['artist'] }} - {{ product['title']}}
              </router-link>
            </td>
            <td style="">{{ product['product_status'] }} </td>
            <td style="">{{ product['quantity'] }} </td>
            <td style="">{{ product['format'] }} </td>
          </tr>
        </table>
      </div>
    </div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../../store'

interface Searches {
  title: Array<string>;
  artist: string[];
}

export default defineComponent({
  name: 'AdminProducts',
  props: {
    status: String,
  },
  data() {
    return {
      search: {
        title: [],
        artist: [],
      } as Searches,
      keyword: ' ',
      productKeyword: '',
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      searchItem: ['all field', 'artist', 'title', 'label', 'number', 'genre', 'track_list', 'personnel'],
      searchSelected: 'all field',
      // activeName: 'all',
      productStatus: [''],
      labels: [''],
      items: [
        { name: 'りんご', price: '100' },
        { name: 'みかん', price: '50' },
        { name: 'マンゴー', price: '3000' }
      ]
    }
  },
  updated() {
    // this.productStatus = String(this.status) == 'undefined' ? [''] : [String(this.status)]
    // console.log("upupupupuupuppuu")
    // console.log([String(this.status)])
    // this.productStatus = [String(this.status)]
    // this.labels = this.productStatus
  },
  methods: {
    label(){
      this.productStatus = [String(this.status)]
    },
    removeLabel(label: string){
      console.log(label)
      this.productStatus = []
    },
    downloadCSV(){
      const products = this.$store.getters.getProducts
      const label = Object.keys(products[0])
      let csv = '\ufeff' + label.join() + '\n' // ここをカラムにするか、stateのkeyにする
      for (let i = 0; i < products.length; i++){
        let line = ''
        for (let j = 0; j < label.length; j++) {
          line += '"' + String(products[i][label[j]]) + '"' + ','
        }
        line += '\n'
        csv += line
      }
      const blob = new Blob([csv], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'products.csv'
      link.click()
    }
  },
  computed: {
    searchProducts() {
      const store = useStore(key)
      const status = this.productStatus[0]
      store.dispatch('searchProducts', { selected: this.searchSelected, keyword: this.productKeyword, status: status})
      return store.state
    }
  }
});
</script>

<style scoped>
img {
  width:65px;
}
.admin_main_box table {
  display: block;
  overflow-x: scroll;  /*隠れた部分をx方向（=横）にスクロールして表示する*/
  /* white-space: nowrap; 自動で改行しない（←必要であれば） */
  -webkit-overflow-scrolling: touch; /* スマホで滑らかにスクールする */
  border-collapse:  collapse; 
  width:100%;
}
tr {
  border-bottom: solid 1px #e5e5e5;
  text-align: center;
}
th {
  width: 200px;
  text-align: center;
}
tr:hover {
  background-color: #e9eef3;
}
a {
  text-decoration: none;
  color: #000;
}
a:hover{
  color: #000;
}
.add_button {
  background-color: #018b56;
  color: #fff;
}
.status_tab {
  padding: 0 5px;
  border-bottom: solid 1px #cbcbcb;
  margin-bottom: 10px;
}
.select_status_tab {
  border-bottom: solid 3px cadetblue;
}
.label {
  border: solid 1px #cbcbcb;
  background-color: #eaeaea;
  padding: 3px;
  border-radius: 10%;
}
.label_cancel {
  color: rgb(156, 156, 156);
  padding: 0 0 0 5px;

}
</style>