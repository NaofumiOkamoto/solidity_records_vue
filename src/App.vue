<template>
  <HelloWorld msg="HelloTyepa" />
</template>

<style>
</style>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HelloWorld from './components/HelloWorld.vue';

  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld
    }
  });
</script>