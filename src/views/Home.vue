<template>
  <div class="home">
    <Header/>
    <h1>My Page</h1>
    <p>{{ getData() }}</p>
    <Footer/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../store'
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  data() {
    return {
      productId: 6
    }
  },
  created: function(){
    this.getData()
  },
  methods: {
    getData(){
      const store = useStore(key)
      return store.state
    }
  },
  computed:{
    version(){
      return 1
    }

  }
});
</script>
