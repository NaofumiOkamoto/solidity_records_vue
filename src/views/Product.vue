<template>
  <div class="product">
    <h1>product</h1>
    <hr>
    <p>Production No. {{ id }}</p>
    <Footer/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Product',
  data() {
    return{
     id: 3
    }
  }
});
</script>

