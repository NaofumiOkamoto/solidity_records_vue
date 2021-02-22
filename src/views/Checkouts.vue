<template>
  <div class="home">
    <Header/>
    <h1>checkout page</h1>
    <Footer/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  data() {
    return {
      productId: 6
    }
  },
  components: {
    // HelloWorld,
  },
  methods: {
    toAbout(){
      this.$router.push({ path: "about" })
    },
    toProduct(){
      this.$router.push({ path: "/product/" + this.productId })
    }

  }
});
</script>
