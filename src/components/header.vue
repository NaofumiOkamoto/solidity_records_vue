<template>
	<div style="position: relative;">
		<Search v-if="isSearch" @back="search"/>
		<div class="header">
			<div class="progress">進捗状況 : 19％くらい</div>
			<router-link to="/"><img @click="isNotHamburger" class="top_logo" src="../assets/top_logo.jpg"></router-link>
			<div class="header_icon_box">
				<fa @click.stop="search" class="header_icon" icon="search" />
				<router-link to="/about"><fa class="header_icon" icon="user" /></router-link>
				<span>{{ $store.state.cartCount }}</span>
				<router-link to="/home"> <fa class="header_icon" icon="shopping-cart" /></router-link>
				<fa @click="hamburger" class="header_icon" icon="bars" />
			</div>
		</div>
		<div style="width: 100%; position: absolute;">
		<transition name="hamburgerMenu" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
			<Hamburger ref="wrapper" class="hamburgerComponent" v-if="isHamburger" v-on:isNotHamburger="isNotHamburger"/>
		</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'Header',
  props: {
  },
  data() {
		return{
			isHamburger: false,
			isSearch: false,
		}
  },
  created() {
      this.$store.dispatch('getCartCount')
  },
  methods: {
	hamburger(){
		this.isHamburger = !this.isHamburger
	},
	isNotHamburger(){
		this.isHamburger = false
	},
	search(){
		this.isSearch = !this.isSearch
	},
	beforeEnter: function(el: { style: { height: string } }) {
		el.style.height = '0';
	},
	enter: function(el: { style: { height: string }; scrollHeight: string }) {
		// el.style.height = el.scrollHeight + 'px';
		el.style.height = 'auto'
	},
	beforeLeave: function(el: { style: { height: string }; scrollHeight: string }) {
		el.style.height = el.scrollHeight + 'px';
		// el.style.height = 'auto'
	},
	leave: function(el: { style: { height: string } }) {
		el.style.height = '0';
	},

},
});
</script>

<style scoped>
.top_logo{
	zoom: 60%;
	margin-left: 0%;
}
.header{
	margin: 0 5%;
	position: relative;
}
.header_icon_box{
	position: absolute;
	top: 40%;
	right: 5%;
}
svg{
	width: 20px;
	margin: 0 12px;
}
.header_icon{
	color: #000;
}
.hamburgerComponent{
	/* overflow: hidden; */
	transition: height 0.5s;
	background-color: #fff;
}
.hamburgerMenu-enter-active{
	animation-duration: 0.5s;
	animation-name: hamburger_opend;
}
.hamburgerMenu-leave-active{
	animation-duration: 0.5s;
	animation-name: hamburger_closed;
}
@keyframes hamburger_opend {
	0% {opacity: 0;}
	100%{opacity: 1;}
}
@keyframes hamburger_closed {
	0% {opacity: 1;}
	100%{opacity: 0;}
}
</style>