<template>
  <div class="about">
    <Header/>
    <h1>about</h1>
    <p>{{getProduct.products}}</p>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'about',
  computed: {
    getProduct(){
      const store = useStore(key)
      store.dispatch('getProducts', 'ORDER BY title DESC LIMIT 10;')
      return store.state
    }
  }
});
</script>