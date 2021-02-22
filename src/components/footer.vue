<template>
	<div class="footer">
		<hr>
		<div class="footer_icon_box">
			<router-link to="/home"> <fa class="footer_icon" icon="facebook" type="fab" /></router-link>
			<router-link to="/home"> <fa class="footer_icon" icon="twitter" type="fab" /></router-link>
			<router-link to="/home"> <fa class="footer_icon" icon="instagram" type="fab" /></router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  computed:{
  },
});
</script>

<style scoped>
button{
	margin: 0 5px;
}
.footer{
	position: relative;
	margin: 0 0 200px 0
}
.footer_icon{
	width: 30px;
	margin: 0 10px;
	color: #000;
}
.footer_icon_box{
	position: absolute;
	top: 50px;
	right: 5%;
}
svg{
	width: 30px;
}
</style>