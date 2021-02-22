<template>
    <div>
        <div class="category_text">All Products</div>
        <hr>
        <div class="category_text">New Releases</div>
        <hr>
        <div class="category_text">Jazz Userd Viny!<div class="next">></div></div>
        <hr>
        <div class="category_text">Soul/Funk/Blues Used Viny<div class="next">></div></div>
        <hr>
        <div class="category_text">Other<div class="next">></div></div>
        <hr>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hamburger',
});
</script>

<style scoped>
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

</style>