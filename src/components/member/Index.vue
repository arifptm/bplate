<template>
  <v-container fluid>
    <v-layout row wrap>      
      <v-flex xs12 >
        <v-layout row wrap class="mb-3">
          <v-flex xs5>
            <v-btn color="success" @click="create()">Tambah</v-btn>
          </v-flex>
          <v-flex xs7>
            <v-text-field v-model="search" label="Cari" single-line hide-details class="pt-1" clearable></v-text-field>
          </v-flex>          
        </v-layout>       
        <v-data-table :headers="membersCol" :items="members" class="elevation-1" :pagination.sync="pagination" hide-actions>
          <template v-slot:items="props">            
            <td>{{ props.item.fullname }}</td>
            <td class="text-xs-right" @click.stop="getMemberSaving(props.item.id)">{{ toMoney(props.item.savingSum || 0) }}</td>
            <td class="text-xs-right">{{ (props.item.Debts.length > 0) ? toMoney((props.item.Debts.filter(d=>d.debtSum != 0)[0]).amount) : 0 }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.restSum || 0) }}</td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="">Reset</v-btn>
          </template>
        </v-data-table>    
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>

      </v-flex>      
    </v-layout>


<!--     <v-dialog v-model="dlgMember" scrollable  :overlay="false" max-width="500px" transition="dialog-transition" >
      <v-card v-if="dlgMember">
        <v-img class="white--text" height="200px" :src="apiUrl + '/static/members/' + member.image" circle>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline" v-text="member.fullname"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>            
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Tutup</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog> -->


<!--     <v-dialog v-model="dlgMember" scrollable  :overlay="false" max-width="500px" transition="dialog-transition" >
      <v-card v-if="dlgMember">
        <v-img class="white--text" height="200px" :src="apiUrl + '/static/members/' + member.image" circle>
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline" v-text="member.fullname"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>            
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Tutup</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog> -->


    <v-dialog v-model="memberSavingDialog" scrollable  :overlay="false" max-width="500px" transition="dialog-transition" >
      <v-card v-if="memberSavingDialog">        
        <v-card-title >Tabungan <v-spacer></v-spacer> <v-icon @click="closeMemberSavingDialog()">close</v-icon></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-simple-table>




          <v-simple-table v-for="saving in memberSavings.Savings">
                <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
        <tbody>
      <tr v-for="member.Savings in memberSaving" :key="item.name">
        <td>{{ saving.Event.date }}</td>
        <td>{{ saving.amount }}</td>
      </tr>
    </tbody>
            
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Tutup</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>


    <v-snackbar v-model="snackbar.value" > {{ snackbar.text }}
      <v-btn flat color="primary" @click.native="snackbar.value = false">Close</v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {    
    data: () => ({
      memberSavingDialog: false,
      memberSavings:[],
      search: null,
      members:[],
      member: {},
      pagination: {
        rowsPerPage: 50,        
        totalItems: 50,
      },
      dlgMember: false,
      apiUrl: process.env.VUE_APP_API_URL,      
      membersCol: [        
        { text: 'Nama Lengkap', align: 'left', value: 'fullname' },
        { text: 'Tabungan', value: 'saving', align: 'right' },
        { text: 'Pinjaman', value: 'paid', align: 'right' },
        { text: 'Terhutang', value: 'restSum', align: 'right' }
      ],
      snackbar:{ value:false, text:''}
    }),

    created(){
      this.getMembers()
  
    },

   computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },    

    methods:{
      getMembers(){
        this.axios.get('/members')
        .then(members=>{
          this.members = members.data
        })
      },

      getMemberSaving(id){
        this.axios.get("/members/"+id+"/savings")
        .then(res=>{
          console.log(res.data)
          this.memberSavings= res.data
          this.memberSavingDialog = true
        })
      },

      create(){

      },

      dateField(date){
        return moment(date).format('DD-MM-YYYY')
      },

      toMoney(val){
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      },

      memberDetail(id){
        this.dlgMember = true
        Object.assign(this.member, this.members.filter(m => m.id == id)[0])
      }

    }
  
  }
</script>

<style>

</style>
