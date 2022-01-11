<template>
	<div style="">
		<div style="position:fixed; width: 20%;">
			<Admin />
		</div>
		<div style="display:flex;">
			<div style="width: 20%; height: 10px;"></div>
			<div class="admin_main_box">
				<h1>顧客管理</h1>
				<span>import（まだ）</span>
				<span>export（まだ）</span>
				<el-tabs v-model="activeName" @tab-click="handleClick">
				<!-- 全てタブ -->
					<el-tab-pane label="All" name="all">
						<input class="search_form" type="text" v-model="productKeyword" placeholder="商品を絞り込む">
						<table class="">
							<tr>
								<th></th>
								<th>商品</th>
							</tr>
						</table>
					</el-tab-pane>
					<!-- タブ -->
					<el-tab-pane label="New" name="">
					</el-tab-pane>
					<!-- タブ -->
					<el-tab-pane label="Returning" name="">
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import { useStore } from 'vuex'
// import { key } from '../../store'

// interface Searches {
//   title: Array<string>;
//   artist: string[];
// }

export default defineComponent({
  name: 'AdminOrder',
  data() {
    return {
      // search: {
      //   title: [],
      //   artist: [],
      // } as Searches,
      keyword: ' ',
      activeName: 'all',
    }
  },
});
</script>