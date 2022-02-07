
<template>
    <!-- <div style="height:50px;"><div class="admin_header">solidity records</div></div> -->
    <div class="admin_page">
      <div class="aside">
        <div class="aside_b">
          <router-link :to="{ name: 'AdminProducts'}">
            <div class="main_list">
              <span @click="isManagementProductTab = true">
                <fa class="fa" icon="compact-disc" />商品管理
              </span>
              <span @click="isManagementProductTab = !isManagementProductTab" style="text-align: left;">
                <div v-if="isManagementProductTab" class="icon_updown">^</div>
                <div v-else class="icon_updown">∨</div>
              </span>
            </div>
          </router-link>
          <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
            <div class="filterOpen" v-if="isManagementProductTab">
              <router-link :to="{ name: 'AdminProducts', params: {status: ''}}">
                <div class="sub_list" @click="handleChange('products')">全ての商品</div>
              </router-link>
              <router-link :to="{ name: 'AdminStock'}">
                <div class="sub_list" @click="handleChange('stock')">在庫</div>
              </router-link>
            </div>
          </transition>

          <router-link :to="{ name: 'AdminOrder'}">
            <div class="main_list">
              <span @click="isOrderTab = true">
                <fa class="fa" icon="yen-sign" />注文管理{{isOrderTab}}
              </span>
              <span @click="isOrderTab = !isOrderTab" style="text-align: left;">
                <div v-if="isOrderTab" class="icon_updown">^</div>
                <div v-else class="icon_updown">∨</div>
              </span>
            </div>
          </router-link>
          <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
            <div class="filterOpen" v-if="isOrderTab">
              <div class="sub_list" @click="handleChange('order')">All orders</div>
              <div class="sub_list" @click="handleChange('order')">Abandoned checkouts</div>
            </div>
          </transition>


          <router-link :to="{ name: 'AdminCustomer'}">
            <div class="main_list">
              <span @click="isCustomerTab = true" style="text-align: left;">
                <fa class="fa" icon="users" />顧客管理
              </span>
              <span @click="isCustomerTab = !isCustomerTab" style="text-align: left;">
                <div v-if="isCustomerTab" class="icon_updown">^</div>
                <div v-else class="icon_updown">∨</div>
              </span>
            </div>
          </router-link>
          <transition name="filter" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
            <div class="filterOpen" v-if="isCustomerTab">
              <div class="sub_list" @click="handleChange('customer')">顧客管理</div>
            </div>
          </transition>
        </div>
      </div>
      <!-- <div class="el-main"> -->
        <!-- <div v-if="activeNames == 'products'"><AdminProducts/></div> -->
        <!-- <div v-if="activeNames == 'stock'"><AdminStock/></div> -->
        <!-- <div v-if="activeNames == 'order'"><AdminOrder/></div> -->
        <!-- <div v-if="activeNames == 'customer'"><AdminCustomer/></div> -->
      <!-- </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Admin',
  props: {
    pageName: String,
    itemId: Number
  },
  data(): {
    activeNames: string;
    isManagementProductTab: boolean;
    isOrderTab: boolean;
    isCustomerTab: boolean;
  } {
		return{
    activeNames: 'products',
    isManagementProductTab: true,
    isOrderTab: false,
    isCustomerTab: false,
		}
  },
  created(){
    // if (this.pageName !== "" || this.pageName !== undefined) {
    //   this.activeNames = this.pageName
    // }
  },
  methods: {
    handleChange(val: string){
      this.activeNames = val
    },
    beforeEnter: function(el: { style: { height: string } }) {
      el.style.height = '0';
    },
    enter: function(el: { style: { height: string }; scrollHeight: string }) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function(el: { style: { height: string }; scrollHeight: string }) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function(el: { style: { height: string } }) {
      el.style.height = '0';
    },
  },
});
</script>

<style>
.admin_header {
  position: fixed;
  height: 50px;
  background-color: #eaedf1;
  width: 100%;
  z-index: 100;
}
.admin_page {
  /* display: flex; */
}
.aside {
  background-color: #eaedf1;
  text-align: center;
  width: 100%;
  height: 100vh;
  /* display: flex; */
}
.aside_b {
  /* position:fixed; */
  width: 100%;
}
.main_list, .sub_list {
  text-align: left;
  padding: 7px 0 7px 28px;
}
.main_list {
  padding-left: 0;
}
.main_list:hover, .sub_list:hover {
  background-color: #e5e5e5;
  color: #049e8a
}
.fa {
  width: 8%;
  margin: 0 3%;
}
h1 {
	margin: 0;
}
.filterOpen{
	overflow: hidden;
	transition: height 0.3s;
}
.icon_updown {
  float: right;
  width: 10%;
}
.aside_b a, .admin_product_page_box a{
  text-decoration: none;
  color: #000;
}
.aside_b a:hover{
  text-decoration: underline;
  color: #000;
}
.admin_main_box {
  width: 80%;
  padding: 50px;
}
#overlay{
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;

}
.mordal{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
.mordal_close{
  float: right;
}
.batsu {
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  background-color: #fff;
}
.batsu:hover {
  background-color: #e5e5e5;
}
.batsu::before, .batsu::after { /* 共通設定 */
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px; /* 棒の幅（太さ） */
  height: 30px; /* 棒の高さ */
  background: #333;
}
.batsu::before {
  transform: translate(-50%,-50%) rotate(45deg);
}
.batsu::after {
  transform: translate(-50%,-50%) rotate(-45deg);
}
.mordal_title {
  font-size: 150%;
}
.label {
  border: solid 1px #cbcbcb;
  background-color: #eaeaea;
  padding: 7px;
  border-radius: 10px;
  margin: 0 3px;
}
.label_cancel {
  color: rgb(156, 156, 156);
  padding: 0 0 0 5px;

}
</style>
