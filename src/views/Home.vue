<template>
  <div class="">
    <Header/>
    <div class="cart">
      <h1>Your Cart</h1>
      <div v-for="(title, key) in cartProduct.titles" :key="key" class="">
        <p>{{ cartProduct.titles[key] }}<button @click="removeCart(cartProduct.titles[key])">remove</button></p>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
interface CartProduct {
  titles: string[];
}

export default defineComponent({
  name: 'Home',
  data() {
    return {
      cartProduct: {
        titles: []
      } as CartProduct
    }
  },
  created: function(){
    this.getCart()
  },
  methods: {
    removeCart(title: string){
      const cookies = document.cookie
      const cookiesArray = cookies.split(';');
      for(const c of cookiesArray){
        const cArray = c.split('=');
        if( cArray[0].indexOf("cart-products") > -1){
          let cartProducts = ""
          const cookieData = cArray[1].split('__')
          for(let i = 0; i < cookieData.length; i++){
            if(cookieData[i] != title && i != cookieData.length - 1){
              cartProducts += cookieData[i] + "__"
            } else if(cookieData[i] != title) {
              cartProducts += cookieData[i]
            }
          }
          if(cartProducts == ""){
            document.cookie = "cart-products=; max-age=0";
          } else {
            document.cookie = "cart-products=" + cartProducts
          }
        }
      }
      this.getCart()
    },
    getCart(){
      const cookies = document.cookie
      const cookiesArray = cookies.split(';'); // ;で分割し配列に
      this.cartProduct.titles = []
      for(const c of cookiesArray){
        const cArray = c.split('='); //さらに=で分割して配列に
        if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
          this.cartProduct.titles = (cArray[1].split('__'))
        }
      }
    }
  },
  computed:{
  }
});
</script>
<style scoped>
.cart{
  width: 90%;
  margin: 0 auto;
}

</style>
