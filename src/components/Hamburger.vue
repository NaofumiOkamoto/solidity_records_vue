<template>
    <div class="sub_menu_main">
      <router-link :to="{ name: 'Collections', params: { category: 'All', name: 'product' } }">
        <div class="category_text_box all">
          <div class="category_text">All Products</div>
        </div>
      </router-link>
      <div :key="cate" v-for="cate in categorys"  class="">
        <router-link :to="{ name: 'Category', params: { category: cate } }">
          <div class="category_text_box">
            <div class="category_text">
              Search by {{ cate }}
              <div style="float: right">></div>
            </div>
          </div>
        </router-link>
      </div>
      <hr>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hamburger',
  data(): {
    categorys: string[];
  } {
		return{
      categorys: [
        "genre", // ジャンル!!!
        // "label", // レーベル
        // "artist", // アーティスト
        "format", // フォーマット!!!
        // "year", // リリース年(10年単位)
        // "recoding_dute", // 録音年(10年単位)
        // "price", //価格(1000円単位)
        "item_condition", // 状態(新品or中古)!!!
        // 第二段階 ジャンル 全て or 小ジャンル
        // 表示される
        // チェック項目でさらに絞れる
        // アーティスト絞り込みは無し だけども、個別ページからリンク
        // 他も個別ページから飛べる
        //新品は100000番台から
      ]
		}
  },
  methods: {
  }
});
</script>

<style>
.category_text {
  padding: 20px 20px 20px 60px;
}
.category_text_box {
  border-top: 1px solid #9e9d9d;
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

</style>