<template>
	<div style="">
		<div style="position:fixed; width: 20%;">
			<Admin />
		</div>
		<div style="display:flex;">
			<div style="width: 20%; height: 10px;"></div>
			<div class="admin_main_box">
				<h1>注文管理</h1>
				<span>import（まだ）</span>
				<span>export（まだ）</span>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<!-- 全てタブ -->
					<el-tab-pane label="All" name="all">
						<table class="">
							<tr>
								<th></th>
								<th>{{status}}</th>
							</tr>
						</table>
					</el-tab-pane>
					<!-- タブ -->
					<el-tab-pane label="Unfulfilled" name="">
					</el-tab-pane>
					<!-- タブ -->
					<el-tab-pane label="Unpaid" name="">
					</el-tab-pane>
					<!-- タブ -->
					<el-tab-pane label="Open" name="">
					</el-tab-pane>
					<!-- タブ -->
					<el-tab-pane label="Closed" name="">
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
  props: {
    status: String,
  },
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