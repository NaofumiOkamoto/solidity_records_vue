<template>
	<div style="">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_main_box">
        <!-- ToDo: 同じid入れた時のバリデーション<br> -->
        <h1>ジャンル</h1>
        <table class="">
          <tr>
            <th class="column_num">sort<br>num</th>
            <th class="column_num">id</th>
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
          <tr class="search_result">
            <!-- 追加時 -->
            <td v-if="isAddGenre" class="column_num"> 
              <input class="genre_input_num" @blur="validateNum($event, 'sort_num')" v-model="addGenre.sort_num" >
            </td>
            <td v-if="isAddGenre" class="column_num">
              <input class="genre_input_num" @blur="validateNum($event, 'id')" v-model="addGenre.id" id="input_id" >
            </td>
            <td v-if="isAddGenre" class="column_text">
              <input class="genre_input_text" @blur="validateStr($event, 'main')" v-model="addGenre.main" >
            </td>
            <td v-if="isAddGenre" class="column_text">
              <input class="genre_input_text" @blur="validateStr($event, 'main')" v-model="addGenre.sub" >
            </td>
            <!-- ToDo: 追加 -->
            <td v-if="isAddGenre" class="column">
              <button @click="addGenreFunc(addGenre)">add</button>
              <button @click="addGenreFunc(addGenre)">cancel</button>
            </td>
          </tr>
            <el-button v-if="!isAddGenre" @click="isAddGenre = true" type="primary" plain>Primary</el-button>
            <span id="tooltips" class="tooltips">数字で入力してください</span>
            <span id="tooltips_str" class="tooltips">文字を入力してください</span>
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
  data(): {
      genres: [{}];
      editGenre: number;
      addGenre: {[key: string]: string};
      isAddGenre: boolean;
      isValid: boolean;
  } {
    return {
      genres: [{}],
      editGenre: 0,
      addGenre: {'sort_num': '', 'id': '', 'main': '', 'sub': ''},
      isAddGenre: false,
      isValid: false
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
    addGenreFunc(addGenre: object) {
      console.log(addGenre)
      // ToDo: genreのinsert処理
    },
    edit(genreId: number) {
      this.editGenre = genreId
    },
    update(genre: any) {
      this.editGenre = 0
      const url = '/updateGenre?sql=' + ' sort_num = ' + genre.sort_num + ', id = '+ genre.id + ', main = "' + genre.main + '", sub = "' + genre.sub + '" where id = ' + genre.id;
      axios.get(url).then((response) => {
        console.log('response', response.status)
        if (response.status === 200) {
            this.genres = response.data
            alert('success!!')
        }
      }).then((res) => {
        this.getAllGenre()
      })
    },
    validateNum(event: any, key: string) {
      if ((/[0-9]/).test(this.addGenre[key])) { // OKの時
        event.target.style.backgroundColor = "#fff"
        this.isValid = true
      } else {// NGの場合
        event.target.style.backgroundColor = "#fb94e58c" // formの色変え
        const el = document.getElementById('tooltips')
        if (el) {
          el.style.display = 'block'
          event.target.parentElement.insertBefore(el, event.target)
          setTimeout(() => { el.style.display = 'none'}, 3000);
        }
      }
    },
    validateStr(event: any, key: string) {
      if (!(/$^/).test(this.addGenre[key])) {
        event.target.style.backgroundColor = "#fff"
        this.isValid = true
        // Todo: このバリデーション判断どうするか
      } else {
        event.target.style.backgroundColor = "#fb94e58c" // formの色変え
        const el = document.getElementById('tooltips_str')
        if (el) {
          el.style.display = 'block'
          event.target.parentElement.insertBefore(el, event.target)
          setTimeout(() => { el.style.display = 'none'}, 3000);
        }
      }
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
  width: 10%;
  text-align: center;
}
tr:hover {
  background-color: #e9eef3;
}
.column_num, .column_text {
  position: relative;
}
.genre_input_num ,.genre_input_num{ 
  width: 100%;
}
.tooltips {
  position: absolute;
  top: -50%;
  background-color: #ff0000;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  z-index: 2;
  width: 200px;
  display: none;
  font-size: 80%;
  opacity: 50%;
}
.column_text {
  width: 40%
}
</style>