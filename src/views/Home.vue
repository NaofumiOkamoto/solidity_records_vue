<template>
  <div class="home">
    <Header/>
    <h1>My Page</h1>
    <button @click="setCookie('naofumi'); getCookie()">setCookie</button>
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
      const store = useStore(key);
      return store.state
    },
    setCookie(name: string){
      document.cookie = "cart-product=" + name
    },
    getCookie(){
      const cookies = document.cookie
      const cookiesArray = cookies.split(';')
      alert(cookiesArray)
    }

  },
  computed:{
    version(){
      return 1
    }

  }
});
</script>
