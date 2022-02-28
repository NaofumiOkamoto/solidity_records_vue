<template>
	<div style="">
		<div style="position:fixed; width: 20%;">
			<Admin />
		</div>
		<div style="display:flex;">
			<div style="width: 20%; height: 10px;"></div>
			<div class="admin_main_box">
        <div class="header_right">
          <button class="no_button" v-on:click="exportMordal = true">export</button>
          <button class="no_button" v-on:click="importMordal = true">import</button>
					<el-button class="add_button" style="">create order</el-button>
        </div>
				<h1>注文管理</h1>
				<span>{{status}}</span>
        <!-- タブ -->
        <div @click="label" style="display:flex">
          <router-link :to="{ name: 'AdminOrder', params: { status: '' }}">
            <div class="status_tab" :class="{ select_status_tab: orderStatus == '' || productStatus == ''}">All</div>
          </router-link>
          <router-link :to="{ name: 'AdminOrder', params: { status: 'Unfulfilled' }}">
            <div class="status_tab" :class="{ select_status_tab: orderStatus == 'Unfulfilled'}">Unfulfilled</div>
          </router-link>
          <router-link :to="{ name: 'AdminOrder', params: { status: 'Unpaid' }}">
            <div class="status_tab" :class="{ select_status_tab: orderStatus == 'Unpaid'}">Unpaid</div>
          </router-link>
          <router-link :to="{ name: 'AdminOrder', params: { status: 'Open' }}">
            <div class="status_tab" :class="{ select_status_tab: orderStatus == 'Open'}">Open</div>
          </router-link>
          <router-link :to="{ name: 'AdminOrder', params: { status: 'Closed' }}">
            <div class="status_tab" :class="{ select_status_tab: orderStatus == 'Closed'}">Closed</div>
          </router-link>
        </div>
        <!-- fillter label -->
        <div v-for="(label,key) in orderStatus" :key="key">
          <button v-if="label != ''" class="label">
            {{label}}
            <!-- <span @click="removeLabel(label)" class="label_cancel"> × </span> -->
          </button>
        </div>
        <!-- table -->
        <div>
          <!-- {{page * limit - limit + 1}} ~ {{page * limit}} -->
        </div>
        <table class="">
          <tr>
            <th>Number</th>
            <th>customer</th>
            <th>total</th>
          </tr>
          <tr class="search_result" v-for="(order,key) in searchOrders['orders']" :key="key">
            <td style="float:left; margin:5px 5px 0 0;">
							{{order['Name']}}
            </td>
            <td style="text-align: left">
							{{order['Billing Name']}}
            </td>
            <td style="text-align: left">
							{{order['Total']}}
            </td>
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
      orderStatus: [''],
    }
  },
	methods: {
    label(){
      this.orderStatus = [String(this.status)]
    },
	},
	computed: {
    searchOrders() {
      const store = useStore(key)
      // const pageNum = this.page
      // const limit = this.limit // 何件とるか
      // const ofset = (pageNum - 1) * limit  // 何件目からとるか
      const status = this.orderStatus[0]
      // this.getPagesTotal()
      // store.dispatch('searchProducts', { selected: this.searchSelected, keyword: this.keyword, status: status, limit: limit, ofset: ofset, sort: this.sortSql})
      store.dispatch('searchOrders', { keyword: this.keyword, status: status })
			console.log(store.state)
      return store.state
    },
	}
});
</script>
<style scoped>

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
.select_status_tab {
  border-bottom: solid 3px cadetblue;
}
.add_button {
  background-color: #018b56;
  color: #fff;
}
</style>