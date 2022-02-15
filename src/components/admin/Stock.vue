<template>
	<div style="">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_main_box">
        ・追加<br>
        ・同じid入れた時のバリデーション<br>
        <h1>ジャンル</h1>
        <table class="">
          <tr>
            <th>sort_num</th>
            <th>id</th>
            <th>main</th>
            <th>sub</th>
            <th></th>
          </tr>
          <tr class="search_result" v-for="(genre,key) in genres" :key="key">
            <!-- 表示時 -->
            <td v-if="editGenre !== genre.id" class="column_num"> {{ genre.sort_num }} </td>
            <td v-if="editGenre !== genre.id" class="column_num"> {{ genre.id }} </td>
            <td v-if="editGenre !== genre.id" class="column_text">{{ genre.main }} </td>
            <td v-if="editGenre !== genre.id" class="column_text">{{ genre.sub }} </td>
            <td v-if="editGenre !== genre.id" class="column_text"><button @click="edit(genre.id)">edit</button></td>
            <!-- 編集時 -->
            <td v-if="editGenre === genre.id" class="column_num"> <input class="genre_input_num" v-model="genre.sort_num"></td>
            <td v-if="editGenre === genre.id" class="column_num"> <input class="genre_input_num" v-model="genre.id"></td>
            <td v-if="editGenre === genre.id" class="column_text"><input class="genre_input_text" v-model="genre.main"></td>
            <td v-if="editGenre === genre.id" class="column_text"><input class="genre_input_text" v-model="genre.sub"></td>
            <td v-if="editGenre === genre.id" class="column"><button @click="update(genre)">update</button></td>
          </tr>
            <!-- 追加時 -->
            <td v-if="addGenre" class="column_num"> <input class="genre_input_num"  ></td>
            <td v-if="addGenre" class="column_num"> <input class="genre_input_num"  ></td>
            <td v-if="addGenre" class="column_text"><input class="genre_input_text" ></td>
            <td v-if="addGenre" class="column_text"><input class="genre_input_text" ></td>
            <!-- <td v-if="addGenre" class="column"><button @click="update(genre)">update</button></td> -->
            <!-- <el-button @click="addGenre = true" type="primary" plain>Primary</el-button> -->
        </table>
      </div>
    </div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'AdminProduct',
  data() {
    return {
      genres: [{}],
      editGenre: 0,
      addGenre: false,
    }
  },
  created() {
    this.getAllGenre()
  },
  methods: {
    getAllGenre() {
      const url = '/getGenre?sql=genre';
      axios.get(url).then((response) => {
        if (response.status === 200) {
            this.genres = response.data
        }
      })
    },
    addGenreFunc() {
      // if (this.genres.indexOf(this.addGenre) === -1 && this.addGenre !== '') {
      if (this.genres.indexOf(this.addGenre) === -1 && this.addGenre) {
        this.genres.push(this.addGenre)
      }
    },
    edit(genreId: number) {
      this.editGenre = genreId
    },
    update(genre: any) {
      this.editGenre = 0
      const url = '/updateGenre?sql=' + ' sort_num = ' + genre.sort_num + ', id = '+ genre.id + ', main = "' + genre.main + '", sub = "' + genre.sub + '" where id = ' + genre.id;
      console.log('update url', url)
      axios.get(url).then((response) => {
        console.log('response', response.status)
        if (response.status === 200) {
            this.genres = response.data
            alert('success!!')
        }
      }).then((res) => {
        this.getAllGenre()
      })
    }
  }
});
</script>
<style scoped>
tr {
  border-bottom: solid 1px #e5e5e5;
  text-align: left;
}
th {
  width: 200px;
  text-align: center;
}
tr:hover {
  background-color: #e9eef3;
}
.genre_input_num ,.genre_input_num{ 
  width: 100%;
}
.column_num {
  width: 10%
}
.column_text {
  width: 40%
}
</style>