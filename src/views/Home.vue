<template>
  <div class="">
    <Header/>
    <div class="cart">
      <h1>Your Cart</h1>
      <section v-for="product in cartProducts" :key="product.id" class="">
        <p>{{ product.title }}<button @click="removeCart(product)">remove</button></p>
      </section>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Home',
  data(): {
    cartProducts: { [key: string]: string }[];
  }{
    return {
      cartProducts: []
    }
  },
  mounted() {
    this.getCart()
  },
  methods: {
    removeCart(product: { [key: string]: string }){
      this.cartProducts.splice( this.cartProducts.indexOf(product), 1 )
      let ids = ""
      for(let i = 0; i < this.cartProducts.length; i++) {
        if ( i < this.cartProducts.length -1 ) {
          ids += this.cartProducts[i]['id'] + "_"
        } else {
          ids += this.cartProducts[i]['id']
        }
      }
      if ( ids === "" ) {
        document.cookie = "cart-products=; max-age=0";
      } else {
        document.cookie = "cart-products=" + ids
      }
      // const cookies = document.cookie
      // const cookiesArray = cookies.split(';');
      // for(const c of cookiesArray){
      //   const cArray = c.split('=');
      //   if( cArray[0].indexOf("cart-products") > -1){
      //     let cartProducts = ""
      //     const cookieData = cArray[1].split('_')
      //     for(let i = 0; i < cookieData.length; i++){
      //       if(cookieData[i] != "1" && i != cookieData.length - 1){
      //         cartProducts += cookieData[i] + "_"
      //       } else if(cookieData[i] != "1") {
      //         cartProducts += cookieData[i]
      //       }
      //     }
      //     if(cartProducts == ""){
      //       document.cookie = "cart-products=; max-age=0";
      //     } else {
      //       document.cookie = "cart-products=" + cartProducts
      //     }
      //   }
      // }
    },
    getCart: function(){
        const cookies = document.cookie
        const cookiesArray = cookies.split(';'); // ;で分割し配列に
        let cartProduct: string[] = []
        for(let i = 0; i < cookiesArray.length; i++){
          const cArray = cookiesArray[i].split('='); //さらに=で分割して配列に
          if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
            cartProduct = cArray[1].split('_') // valueがわを取り出す
          }
        }
        for(let i = 0; i < cartProduct.length; i++){
          const url = '/getApi?sql=where item_id = ' + cartProduct[i];
          axios.get(url).then((response) => {
            const hash = {'title': response['data'][0]['title'], id : response['data'][0]['item_id']}
            this.cartProducts.push(hash)
          })

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
