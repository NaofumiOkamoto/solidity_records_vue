<template>
	<div style="">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_main_box">
        <h1>商品管理{{activeName}}</h1>
        <span>import（まだ）</span>
        <span>export（まだ）</span>
        <el-button class="add_button" style="">add product（まだ）</el-button>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 全てタブ -->
          <el-tab-pane label="全て" name="all">
            <AdminProductsTable />
          </el-tab-pane>
          <!-- アクティブタブ -->
          <el-tab-pane label="アクティブ" name="active">
            <AdminProductsTable :active="true" />
          </el-tab-pane>
          <!-- 下書きタブ -->
          <el-tab-pane label="下書き" name="draft">
            下書き
          </el-tab-pane>
        </el-tabs>
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
      activeName: 'all',
    }
  },
  methods: {
    back() {
      this.$emit("back")
    },
  },
  computed: {
    searchProducts() {
      const store = useStore(key)
      if  (this.productKeyword && this.searchSelected != 'genre') {
        store.dispatch('searchProducts', { selected: this.searchSelected, keyword: this.productKeyword})
      } else if (this.keyword && this.searchSelected != 'genre') {
        store.dispatch('searchProducts', { selected: this.searchSelected, keyword: this.keyword})
      } else {
        store.dispatch('getGenreBySearch', this.keyword)
      }
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
</style>