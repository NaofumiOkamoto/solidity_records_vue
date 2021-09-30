<template>
	<div class="footer">
		<div class="footer_contents">
			<p>Legal Notice</p>
			<p>Privacy Policy</p>
			<p>Refund Policy</p>
			<p>Terms of Service</p>
			<p>Shipping Policy</p>
			<p>Contact Us</p>
		</div>
		<hr>
		<div class="footer_box">
			<div class="footer_icon_box">
				<a href="https://www.facebook.com/solidityrecords"> <fa class="footer_icon" icon="facebook" type="fab" /></a>
				<a href="https://twitter.com/solidityrecords"> <fa class="footer_icon" icon="twitter" type="fab" /></a>
				<a href="https://www.instagram.com/solidityrecords/"> <fa class="footer_icon" icon="instagram" type="fab" /></a>
			</div>
		</div>
		<p class="c">© 2021, Solidity Records</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style scoped>
button{
	margin: 0 5px;
}
.footer{
	padding: 10px 0 200px 0;
	background-color: #ececec;
}
.footer_contents p{
	margin: 30px 0;
}
.footer_contents{
	margin: 10%;
}
.footer_icon{
	width: 30px;
	margin: 32px 15px;
	color: #000;
}
.footer_icon_box{
	width: 100%;
	text-align: center;
}
svg{
	width: 30px;
}
.c{
	width: 100%;
	text-align: center;
}
</style>