<template>
      <div v-if="isSubMenuMain" class="sub_menu_main">
          <!-- <div v-if="isSubMenuMain" class="sub_menu_main"> -->
        <div class="category_text">All Products</div><hr>
        <div class="category_text">New Releases</div><hr>
        <div @click.self="showJazz" class="category_text">Jazz Userd Viny!<div class="next">></div></div><hr>
        <div class="category_text">Soul/Funk/Blues Used Viny<div class="next">></div></div><hr>
        <div class="category_text">Other<div class="next">></div></div><hr>
      </div>
      <div v-else-if="isSubMenuJazz" class="sub_menu_jazz">
      <transition name="submenu">
        <div v-if="isSubMenuJazz" class="sub_menu_in_jazz">
        <p @click="showJazz">back</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        <p>aaaaaaaaaaaaaa</p>
        </div>
      </transition>
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
    showJazz(){
      this.isSubMenuMain = !this.isSubMenuMain
      this.isSubMenuJazz = !this.isSubMenuJazz
    }
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
/* .sub_menu_main{
  width: 100%;
} */
.sub_menu_jazz{
  width: 100%;
}
/* .sub_menu_in_jazz{
}
.submenu-enter-active,
.submenu-leave-active{
  width: 100%;
}
.top-enter, .top-leave-to {
  width: 0%;
} */

</style>