<template>
  <div style="">
    <Header/>
    <div class="cart">
      <h1>Your Cart</h1>
      <section v-for="product in cartProducts" :key="product.id" class="">
        <div class="img_box">
          <img v-if="product.img_count == null" class="products_img" src="@/assets/no_image.png"><!-- 一旦仮画像 -->
          <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
          <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
          <div class="info_box">
            <p>artist : {{ product.artist }}</p>
            <p>title : {{ product.title }}</p>
            <p>price : ¥{{ product.price }}</p>
            <p>quantity: {{ productCount[product.item_id] }}</p>
          </div>
          <button @click="removeCart(product)">remove</button>
        </div>
        <hr>
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
    imgSrc: string;
    cartProducts: { [key: string]: string | number }[];
    productCount: { [key: string]: number};
  }{
    return {
      cartProducts: [],
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      productCount: {},
    }
  },
  mounted() {
    this.getCart()
  },
  methods: {
    // カート内の商品削除
    removeCart(product: { [key: string]: string | number}){
      this.cartProducts.splice( this.cartProducts.indexOf(product), 1 )
      let ids = ""
      for(let i = 0; i < this.cartProducts.length; i++) {
        if ( i < this.cartProducts.length -1 ) {
          ids += this.cartProducts[i]['item_id'] + "_"
        } else {
          ids += this.cartProducts[i]['item_id']
        }
      }
      if ( ids === "" ) {
        document.cookie = "cart-products=; max-age=0";
      } else {
        document.cookie = "cart-products=" + ids
      }
      this.$store.dispatch('getCartCount')
    },
    // カート内の商品取得
    getCart: function(){
      const cookiesArray = document.cookie.split(';'); // ;で分割し配列に
      let cartProduct: string[] = []
      for(let i = 0; i < cookiesArray.length; i++){
        const cArray = cookiesArray[i].split('='); //さらに=で分割して配列に
        if( cArray[0].indexOf("cart-products") > -1){ // 取り出したいkeyと合致したら
          cartProduct = cArray[1].split('_') // valueがわを取り出す
        }
      }
      // 商品毎に数量をカウント
      for(let j = 0; j < cartProduct.length; j++){
        const elm = cartProduct[j]
        this.productCount[elm] = (this.productCount[elm] || 0) + 1
      }
      // 重複を削除
      cartProduct = cartProduct.filter((element, index, self) => 
                    self.findIndex(product => product === element ) === index
                    );
      // item_id から商品情報を取得
      for(let i = 0; i < cartProduct.length; i++){
        const url = '/getApi?sql=where item_id = ' + cartProduct[i];
        axios.get(url).then((response) => {
          const hash = response['data'][0]
          this.cartProducts.push(hash)
        })
      }
    }
  },
});
</script>
<style scoped>
.cart{
  width: 90%;
  margin: 0 auto;
}
.img_box {
  position: relative;
  height: 170px;
}
img {
  position: absolute;
  width: 30%;
  margin-top: 4%;
}
.info_box {
  position: absolute;
  left: 35%;
}
button {
  position: absolute;
  right: 0%;
  bottom: 10%;
}

</style>
