<template>
  <div class="add_cart">
    <div style="">You added to the cart</div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'addCart',
  data() {
    return {
    }
  },
  components: {
  },
  methods: {
  }
});
</script>

<style scoped>
.add_cart{
  position: absolute;
  left: 0;
  top: 0;
  height: 200px;
  width: 100%;
  background: #999;
  z-index: 1;
}
</style>
