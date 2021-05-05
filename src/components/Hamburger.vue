<template>
    <div class="sub_menu_main">
      <div class="category_text">All Products （まだ）</div>
      <hr>
      <div :key="cate" v-for="cate in categorys"  class="">
        <router-link :to="{ name: 'Category', params: { category: cate } }">
          <div class="category_text">Search by {{ cate }}</div>
        </router-link>
        <hr>
      </div>

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
        "price", //価格(1000円単位)
        "condition", // 状態(新品or中古)!!!
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
  padding: 10px 20px;
  position: relative;
}
.next{
  position: absolute;
  right: 5%;
  top: 0;
  font-size: 180%;
}
.sub_menu_jazz{
  width: 100%;
}

</style>