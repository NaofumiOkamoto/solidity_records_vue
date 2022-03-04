
<template>
	<div style="">
    <div style="position:fixed; width: 20%;">
      <Admin />
    </div>
    <div style="display:flex;">
      <div style="width: 20%; height: 10px;"></div>
      <div class="admin_main_box">
        <div class="header_right">
          <button class="no_button" v-on:click="exportMordal = true">export</button>
          <button class="no_button" v-on:click="importMordal = true">import</button>
          <router-link :to="{ name: 'AdminProduct', params: { paramsItemId: 'new' }}">
            <el-button class="add_button" style="">add product</el-button>
          </router-link>
        </div>
        <!-- ToDo: インポートできるようにする 丸々反映？ -->
        <h1>顧客管理</h1>
        <!-- export モーダル -->
        <div v-if="exportMordal" id="overlay">
          <div class="mordal">
            <button class="mordal_close batsu" v-on:click="exportMordal = false"></button>
            <p class="mordal_title">Export products</p>
            <hr>
            <p>Export</p>
            <input type="radio" id="all" value="all" v-model="picked" />
            <label for="all">All products（まだ）</label>
            <br>
            <input type="radio" id="select" value="select" v-model="picked" />
            <label for="select">selected:  products（まだ）</label>
            <br>
            <input type="radio" id="match" value="match" v-model="picked" />
            <label for="match">{{searchProducts.products.length}} produts matching your search</label>
            <br>
            <div style="float: right">
              <el-button class="cancel" v-on:click="exportMordal = false">cancel</el-button>
              <el-button class="add_button" v-on:click="downloadCSV">export</el-button>
            </div>
          </div>
        </div>
        <!-- import モーダル -->
        <div v-if="importMordal" id="overlay">
          <div class="mordal">
            <button class="mordal_close batsu" v-on:click="importMordal = false"></button>
            <p class="mordal_title">Import products by csv</p>
            <hr>
            <input @change="fileChange" type="file" id="file_input_expense" name="file_input_expense">
            <div style="float: right">
              <el-button class="cancel" v-on:click="importMordal = false">cancel</el-button>
              <el-button class="add_button" v-on:click="importCSV">importまだ</el-button>
            </div>
          </div>
        </div>
        <!-- タブ -->
        <div @click="label" style="display:flex">
          <router-link :to="{ name: 'AdminCustomer', params: { status: '' }}">
            <div class="status_tab" :class="{ select_status_tab: customerStatus == 'undefined' || customerStatus == ''}">All</div>
          </router-link>
          <router-link :to="{ name: 'AdminCustomer', params: { status: 'new' }}">
            <div class="status_tab" :class="{ select_status_tab: customerStatus == 'new'}">New</div>
          </router-link>
          <router-link :to="{ name: 'AdminCustomer', params: { status: 'returning' }}">
            <div class="status_tab" :class="{ select_status_tab: customerStatus == 'returning'}">Returning</div>
          </router-link>
          <router-link :to="{ name: 'AdminCustomer', params: { status: 'checkouts' }}">
            <div class="status_tab" :class="{ select_status_tab: customerStatus == 'checkouts'}">Abandorned checkouts</div>
          </router-link>
          <router-link :to="{ name: 'AdminCustomer', params: { status: 'japan' }}">
            <div class="status_tab" :class="{ select_status_tab: customerStatus == 'japan'}">From Japan</div>
          </router-link>
          <router-link :to="{ name: 'AdminCustomer', params: { status: 'email' }}">
            <div class="status_tab" :class="{ select_status_tab: customerStatus == 'email'}">Email subscribers</div>
          </router-link>
        </div>
        <!-- fillter label -->
        <div v-for="(label,key) in customerStatus" :key="key">
          <button v-if="label != ''" class="label">
            {{label}}
            <span @click="removeLabel(label)" class="label_cancel"> × </span>
          </button>
        </div>
        <!-- fillter button など -->
        <input class="search_form" type="text" v-model="keyword" placeholder="Search by name or email">
        <el-button plain @click="openFillter = true">More fillters</el-button>
        <el-select @change="sortChange()" v-model="sortSql" class="m-2" placeholder="sort" size="large">
          <el-option v-for="item in sortItem" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <!-- table -->
        <div>
          {{page * limit - limit + 1}} ~ {{page * limit}}
        </div>
        <table class="">
          <tr>
            <th>名前</th>
            <th>email</th>
            <th>order数</th>
            <th>購入金額</th>
          </tr>
          <tr class="search_result" v-for="(customer,key) in searchCustomers['customers']" :key="key">
            <td style="text-align: left">
              <!-- <router-link :to="{ name: 'AdminProduct', params: { paramsItemId: product['item_id'] }}"> -->
                {{ customer['Last Name'] }}  {{ customer['First Name']}}<br>
				<span style="color: #9b9b9b;">{{ customer['Province'] }}</span>
              <!-- </router-link> -->
            </td>
            <td style="">{{ customer['Email'] }} </td>
            <td style="">order数</td><!-- ToDo: order数 -->
            <td style="">購入金額</td><!-- ToDo: 購入金額 -->
          </tr>
        </table>
      <!-- ページネーション -->
        <div id="pagenate_box">
          <el-pagination background layout="prev, pager, next" :total="pagesTotal" @current-change="setPage">
          </el-pagination>
        </div>
      </div>
      <!-- fillterの右側 -->
      <div v-if="openFillter" id="fillter_overlay">
        <div class="fillter_mordal">
          <button class="mordal_close batsu" @click="openFillter = false"></button>
          どの項目でフィルターする？<br>
          本家がよくわからなかったので一旦保留
        </div>
      </div>
    </div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from '../../store'
import axios from 'axios';

interface Searches {
  title: Array<string>;
  artist: string[];
}

export default defineComponent({
  name: 'AdminProducts',
  props: {
    status: String,
  },
  data() {
    return {
      search: {
        title: [],
        artist: [],
      } as Searches,
      keyword: '',
      productKeyword: '',
      imgSrc: "https://cdn.shopify.com/s/files/1/0415/0791/3886/products/",
      searchItem: ['all field', 'artist', 'title', 'label', 'number', 'genre', 'track_list', 'personnel'],
      searchSelected: 'all field',
      customerStatus: [''],
      labels: [''],
      importMordal: false,
      exportMordal: false,
      picked: 'all',
      workers: [{}],
      openFillter: false,
      page: 1,
      limit: 3, // 何件ずつ取得するか
      pagesTotal: 0,
      sortItem: [
        {label: 'Date, new to old', value: ' ORDER BY registration_date DESC'},
        {label: 'Date, old to new', value: ' ORDER BY registration_date ASC'},
        {label: 'Alphabetically,A-Z', value: ' ORDER BY artist ASC'},
        {label: 'Alphabetically,Z-A', value: ' ORDER BY artist DESC'},
        {label: 'Price, low to high', value: ' ORDER BY price ASC'},
        {label: 'Price, high to low', value: ' ORDER BY price DESC'}
      ],
      sortSql: ' ORDER BY registration_date DESC'
    }
  },
  created() {
    this.getPagesTotal()
  },
  methods: {
    label(){
      this.customerStatus = [String(this.status)]
      this.sortChange()
    },
    removeLabel(label: string){
      this.customerStatus = []
    },
    downloadCSV(){
      const products = this.$store.getters.getProducts
      const label = Object.keys(products[0])
      let csv = '\ufeff' + label.join() + '\n' // ここをカラムにするか、stateのkeyにする
      for (let i = 0; i < products.length; i++){
        let line = ''
        for (let j = 0; j < label.length; j++) {
          line += '"' + String(products[i][label[j]]) + '"' + ','
        }
        line += '\n'
        csv += line
      }
      const blob = new Blob([csv], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'products.csv'
      link.click()
    },
    fileChange: function(e: any) {
      const url = '/getApi?sql='
      axios.get(url).then((response) => {
        console.log('response', response.data.map((obj: any): obj is any => obj['item_id']))
      })
      const file = e.target.files[0];
      const reader = new FileReader();

      const loadFunc = () => {
        const result = reader.result;
        let lines = ['']
        if(typeof result === 'string') {
          lines = result.split('\n')
        }
        const workersArray: object[] = [];
        if(0 < lines.length) {
          lines.forEach(element => {
            const workerData = element.split(",");
            const worker = {
              // カラム情報追加
              itemId: workerData[0],
              masterId: workerData[1],
              artist: workerData[2],
              title: workerData[3],
              label: workerData[4],
              country: workerData[5],
              number: workerData[6],
              barcode: workerData[7],
              format: workerData[8],
              releaseYear: workerData[9],
              recodingDate: workerData[10],
              genre: workerData[11],
              trackList: workerData[12],
              personnel: workerData[13],
              itemCondition: workerData[14],
              sleeveCondition: workerData[15],
              sleeveDescription: workerData[16],
              vinylCondition: workerData[17],
              vinylDescription: workerData[18],
              quantity: workerData[19],
              weight: workerData[21],
              price: workerData[22],
              discogsPrice: workerData[23],
              discogsId: workerData[24],
              ebayPrice: workerData[25],
              ebayId: workerData[26],
              musicalInstrument: workerData[27],
              youtube: workerData[28],
              imgCount: workerData[29],
              registrationDate: workerData[30],
              soldDate: workerData[31],
              soldPrice: workerData[32],
              customerStatus: workerData[33],
              salesStatus: workerData[34],
            };
            workersArray.push(worker);
          });
        }
        this.workers = workersArray;
        // ToDo: ここにupdateかcreate処理をかく
      };
      reader.onload = loadFunc;
      reader.readAsBinaryString(file);
    },
    setPage (val: number) {
      this.page = val
      this.scrollTop()
    },
    getPagesTotal(){
    //   console.log('count', this.searchProductsCount['productsCount'])
    //   const length = this.searchProductsCount['productsCount']
    //   this.pagesTotal = length / this.limit * 10
	// ToDo: customer totalpage
      this.pagesTotal = 100
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto" // smooth,unstant,auto
      })
    },
    sortChange() {
      this.page = 1
      const el: any = document.getElementsByClassName('number')
      const button: any = document.getElementsByClassName('btn-prev')[0]
      for(let i = 0; i < el.length; i++) {
        if (i === 0) {
          button.disabled = true
          button.setAttribute('aria-disabled', true)
          el[i].setAttribute('aria-current', true)
          el[i].className = 'active number'
        } else {
          el[i].setAttribute('aria-current', false)
          el[i].className = 'number'
        }
      }
      // Todo: ちょっど挙動が変(sort変える前のページを選択できなくなる)
    }
  },
  computed: {
    searchCustomers() {
      const store = useStore(key)
      const pageNum = this.page
      const limit = this.limit // 何件とるか
      const ofset = (pageNum - 1) * limit  // 何件目からとるか
      const status = this.customerStatus[0]
      this.getPagesTotal()
      store.dispatch('searchCustomers', { keyword: this.keyword, status: status, limit: limit, ofset: ofset, sort: this.sortSql})
      return store.state
    },
    // searchProductsCount() {
    //   const store = useStore(key)
    //   const status = this.customerStatus[0]
    //   console.log('status', status)
    //   store.dispatch('searchProductsCount', { selected: this.searchSelected, keyword: this.keyword, status: status})
    //   return store.state
    // },
  }
});
</script>

<style scoped>
img {
  width:65px;
}
tr {
  border-bottom: solid 1px #e5e5e5;
  text-align: center;
}
th {
  width: 200px;
  text-align: center;
}
tr:hover {
  background-color: #e9eef3;
}
a {
  text-decoration: none;
  color: #000;
}
a:hover{
  color: #000;
}
.select_status_tab {
  border-bottom: solid 3px cadetblue;
}
#fillter_overlay{
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: right;

}
.fillter_mordal{
  z-index: 2;
  width: 40%;
  height: 100%;
  padding: 1em;
  background:#fff;
}
</style>