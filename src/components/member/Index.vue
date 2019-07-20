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
        <v-data-table :headers="membersCol" :items="members" class="elevation-1">
          <template v-slot:items="props">            
            <td>{{ props.item.fullname }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.savingSum || 0) }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.debt || 0) }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.restSum || 0) }}</td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="">Reset</v-btn>
          </template>
        </v-data-table>    

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

  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {    
    data: () => ({
      members:[],
      member: {},
      dlgMember: false,
      apiUrl: process.env.VUE_APP_API_URL,      
      membersCol: [        
        { text: 'Nama Lengkap', align: 'left', value: 'fullname' },
        { text: 'Tabungan', value: 'saving', align: 'right' },
        { text: 'Pinjaman', value: 'paid', align: 'right' },
        { text: 'Terhutang', value: 'rest', sortable: false, align: 'right' }
      ],
    }),

    created(){
      this.getMembers()
  
    },

    methods:{
      getMembers(){
        this.axios.get('/members')
        .then(members=>{
          this.members = members.data
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
