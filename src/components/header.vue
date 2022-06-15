<template>
	<div style="position: relative;">
		<Search v-if="isSearch" @back="search"/>
		<div class="header">
			<div class="progress">進捗状況 : 30％くらい</div>
			<router-link to="/"><img @click="isNotHamburger" class="top_logo" src="https://t202001.jgt.jp/records/top_logo.jpg"></router-link>
			<div class="header_icon_box">
				<router-link :to="{ name: 'AdminProducts', params: { status: 'Active' }}"><fa class="header_icon" icon="user-cog" /></router-link>
				<fa @click.stop="search" class="header_icon" icon="search" />
				<router-link to="/about"><fa class="header_icon" icon="user" /></router-link>
				<span>{{ $store.state.cartCount }}</span>
				<router-link to="/cart"> <fa class="header_icon" icon="shopping-cart" /></router-link>
				<fa v-if="!isPC" @click="hamburger" class="header_icon" icon="bars" />
			</div>
		</div>
		<HamburgerPc ref="wrapper" v-if="isPC" class="header_hamburger header_hamburger_pc" />
		<div class="header_hamburger">
			<transition name="hamburgerMenu" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" >
				<Hamburger ref="wrapper" class="hamburgerComponent" v-if="isHamburger && !isPC" v-on:isNotHamburger="isNotHamburger"/>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { config } from '../const'

export default defineComponent({
  name: 'Header',
  props: {
  },
  data() {
	return{
		isHamburger: false,
		isSearch: false,
		width: window.innerWidth,
		isPC: true,
	}
  },
  created() {
      this.$store.dispatch('getCartCount')
			this.handleResize()
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
	handleResize() {
		this.width = window.innerWidth;
		this.isPC = config.VALUE < this.width
	}

  },
  mounted: function () {
    window.addEventListener('load', this.handleResize)
    window.addEventListener('resize', this.handleResize)
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
.header_hamburger {
	width: 100%;
	position: absolute;
}
.header_hamburger_pc {
	top: 0px;
	width: 40%;
	left: 27%;
	right: 30%;

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