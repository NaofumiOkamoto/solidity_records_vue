<template>
	<div class="admin_product_page">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_product_page_box">
        <router-link :to="{ name: 'AdminOrders'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </router-link>
        <h3>{{ name }}</h3>
        <div class="admin_product_edit_box">
          <div style="display:flex;"><p class="divided2">{{id}}</p></div>
          <div v-for="(product,key) in orderProducts['products']" :key="key">
            {{ product.title }}
          </div>
        </div>
        <div class="admin_product_edit_box">
          paid
        </div>
        <el-button @click="updateProduct()" type="success">save</el-button>
      </div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../../store'
import axios from 'axios';

export default defineComponent({
  name: 'AdminOrder',
  props: {
    paramsOrderId: String
  },
  data() {
    return {
      email: '',
      id: 0,
      name: '',
      // orderProduct: [{name: 'aaa'}]
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      const url = '/getOrder?sql' + '=where Id = ' + String(this.paramsOrderId);
      axios.get(url).then((response) => {
        this.id = response.data[0]['Id']
        this.name = response.data[0]['Name']
      })
    },
  },
  computed: {
    orderProducts() {
      if (this.name === '') {
        return []
      }
      const store = useStore(key)
      store.dispatch('getOrderProducts', {name: this.name})
      console.log('state', store.state)
      return store.state
    }
  }
});
</script>
<style scoped>
.admin_product_page {
  background-color: #f0efef;
}
.admin_product_page_box {
  padding: 50px;
  width: 80%;
}
.admin_product_edit_box {
  background-color: #fff;
  width: 100%;
  padding: 30px;
  border-radius: 10px 10px;
  margin: 20px 0;
}
.admin_product_edit_box input {
  width: 100%;
}
.bi-arrow-left-square {
  float: left;
  margin-right: 10px;
}
.divided2 {
  width: 45%;
  margin: 1%;
}
.divided3 {
  width: 30%;
  margin: 1%;
}
</style>