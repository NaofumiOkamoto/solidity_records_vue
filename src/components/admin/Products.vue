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
        <span>export（まだ）</span>
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
        <div style="display:flex">
          <router-link :to="{ name: 'AdminProducts', params: { status: '' }}">
            <div class="status_tab">全て</div>
          </router-link>
          <router-link :to="{ name: 'AdminProducts', params: { status: 'Active' }}">
            <div class="status_tab">アクティブ</div>
          </router-link>
          <router-link :to="{ name: 'AdminProducts', params: { status: 'Draft' }}">
            <div class="status_tab">下書き</div>
          </router-link>
        </div>
        {{productStatus}}
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
      productStatus: ''
    }
  },
  updated() {
    this.productStatus = String(this.status)
  },
  computed: {
    searchProducts() {
      const store = useStore(key)
      const status = this.productStatus
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
  text-decoration: underline;
  color: #000;
}
.add_button {
  background-color: #018b56;
  color: #fff;
}
.status_tab {
  border: 1px solid #000;
}
</style>