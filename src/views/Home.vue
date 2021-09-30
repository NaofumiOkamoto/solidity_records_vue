<template>
  <div style="">
    <Header/>
    <div class="cart">
      <h1>Your Cart</h1>
      <div class="flex_box">
        <p class="header_product" :class="{ header_product_pc: isPC }">PRODUCT</p>
        <p class="header_price" :class="{ header_price_pc: isPC }">PRICE</p>
        <p class="header_qty" :class="{ header_qty_pc: isPC }">QUANTITY</p>
        <p class="header_total" :class="{ header_total_pc: isPC }">TOTAL</p>
      </div>
      <Loading v-if="loadingShow" />
      <section v-for="product in cartProducts" :key="product.id" class="">
        <div class="flex_box">
          <div class="img_box" :class="{ img_box_pc: isPC }">
            <img v-if="product.img_count == null" class="products_img" src="https://t202001.jgt.jp/records/no_image.png"><!-- 一旦仮画像 -->
            <img v-else-if="product.condition == 'New'" class="products_img" v-bind:src="imgSrc + (product.item_id % 10000) + 'N.jpg' ">
            <img v-else class="products_img" v-bind:src="imgSrc + product.item_id + '_01.jpg' ">
          </div>
          <div class="info_box" :class="{ info_box_pc: isPC }">
            <p>artist : {{ product.artist }}</p>
            <p>title : {{ product.title }}</p>
            <button @click="removeCart(product)">remove</button>
          </div>
          <div class="price_number" :class="{ price_number_pc: isPC }">
            <p>¥{{ product.price }}</p>
            <p>Qty: {{ productCount[product.item_id] }}</p>
          </div>
          <div class="price" :class="{ price_pc: isPC }">
            <p>¥{{ product.price }}</p>
          </div>
          <div class="qty" :class="{ qty_pc: isPC }">
            <p>Qty: {{ productCount[product.item_id] }}</p>
          </div>
          <div class="total" :class="{ total_pc: isPC }">
            <p>¥{{ product.price * productCount[product.item_id] }}</p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { config } from '../const'
import axios from 'axios';

export default defineComponent({
  name: 'Home',
  data(): {
    imgSrc: string;
    cartProducts: { [key: string]: string | number }[];
    productCount: { [key: string]: number};
    width: number;
    isPC: boolean;
    loadingShow: boolean;
  }{
    return {
      cartProducts: [],
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      productCount: {},
      width: window.innerWidth,
      isPC: true,
      loadingShow: true,
    }
  },
  created() {
    this.handleResize()
  },
  mounted() {
    this.getCart()
    window.addEventListener('load', this.handleResize)
    window.addEventListener('resize', this.handleResize)
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
    },
    handleResize() {
      this.width = window.innerWidth;
      this.isPC = config.VALUE < this.width
    }
  },
  updated: function(){
    setTimeout(() => {
      this.loadingShow = false
    }, 200);
  },
});
</script>
<style scoped>
h1 {
  text-align: center;
}
p {
  margin: 0;
}
.cart{
  width: 90%;
  margin: 0 auto;
}
.flex_box {
  display: flex;
  padding: 5% 0;
  border-bottom: 1px solid #c2c2c2;
}
img {
  margin-top: 4%;
}
.header_product {
  width: 50%;
  text-align: left;
}
.header_product_pc {
  width: 60%;
}
.header_price {
  width: 50%;
  text-align: right;
}
.header_price_pc {
  width: 15%;
  text-align: right;
}
.header_qty {
  display: none;
}
.header_qty_pc {
  display: block;
  width: 17%;
  text-align: right;
}
.header_total {
  display:none;
}
.header_total_pc {
  display: block;
  width: 13%;
  text-align: right;
}
.img_box {
  width: 25%;
}
.img_box_pc {
  width: 20%;
}
.price, .qty{
  display: none;
}
.price_pc, .qty_pc {
  display: block;
  width: 17%;
  text-align: right;
}
.products_img {
  width: 100px;
}
.info_box {
  width: 50%;
}
.info_box_pc {
  width: 40%;
  text-align: left;
}
.total {
  display: none;
}
.total_pc {
  display: block;
  width: 13%;
  text-align: right;
}
.price_number {
  width: 25%;
  text-align: right;
}
.price_number_pc {
  display: none;
}
button {
}

</style>
