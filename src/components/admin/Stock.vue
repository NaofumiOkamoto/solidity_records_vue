<template>
	<div class="admin_product_page">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_product_page_box">
        <!-- {{ getProduct.products[0]["artist"] }} -->
        <h3>{{ artist}} - {{title}}</h3>
        <el-button class="add_button" style="">add product</el-button>
        <div class="admin_product_edit_box">
          <p>artist        <br> <input class="" type="text" v-model="artist" placeholder=""></p>
          <p>title         <br> <input class="" type="text" v-model="title" placeholder=""></p>
          <p>label         <br> <input class="" type="text" v-model="label" placeholder=""></p>
          <p>number        <br> <input class="" type="text" v-model="number" placeholder=""></p>
          <p>format        <br> <input class="" type="text" v-model="format" placeholder=""></p>
          <p>release_year  <br> <input class="" type="text" v-model="releaseYear" placeholder=""></p>
        </div>
        <div class="admin_product_edit_box">
          media
        </div>
        <el-button type="success">save</el-button>
      </div>
		</div>
	</div>
</template>