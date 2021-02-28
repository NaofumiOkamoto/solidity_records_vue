<template>
    <div class="sub_menu_main">
        <!-- <div v-if="isSubMenuMain" class="sub_menu_main"> -->
      <!-- <router-link :to="{ name: 'Collections', params: { genre: 'all-products' }}"> -->
        <div class="category_text">All Products （まだ）</div>
      <!-- </router-link> -->
      <hr>
      <router-link :to="{ name: 'Collections', params: { genre: 'New' }}">
        <div class="category_text">New Releases</div>
      </router-link>
      <hr>
      <!-- <router-link :to="{ name: 'Collections', params: { genre: 'recent-arrivals' }}"> -->
        <div class="category_text">Recent Arrivals（まだ）</div>
      <!-- </router-link> -->
      <hr>
      <router-link :to="{ name: 'Collections', params: { genre: 'Used' }}">
        <div class="category_text">Used Vinyl</div>
      </router-link>
      <hr>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hamburger',
  data() {
    return {
      isSubMenuMain: true,
      isSubMenuJazz: false
    }
  },
  methods: {
  }
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
.sub_menu_jazz{
  width: 100%;
}

</style>