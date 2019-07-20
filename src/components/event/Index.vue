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
        <v-data-table :headers="eventsCol" :items="events" class="elevation-1">
          <template v-slot:items="props">            
            <td>{{ dateField(props.item.date) }}</td>
            <td>{{ toMoney(props.item.Member.fullname) }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.debt || 0) }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.saving || 0) }}</td>
            <td class="text-xs-right">{{ toMoney(props.item.taken || 0) }}</td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="">Reset</v-btn>
          </template>
        </v-data-table>    
      </v-flex>      
    </v-layout>

    <v-dialog v-model="eventDialog" scrollable persistent :overlay="false" max-width="500px" transition="dialog-transition" >
      <v-card v-if="eventDialog">        
        <v-card-title >
          {{ dialogTitle }}
          <v-spacer></v-spacer>
          <v-icon @click="closeDialog()">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>

          <v-menu v-model="menuDate" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="formattedEventDate" label="Tanggal" readonly v-on="on" ></v-text-field>
            </template>
            <v-date-picker v-model="event.date" @input="menuDate = false"></v-date-picker>
          </v-menu>

          <v-select :items="members" v-model="event.member_id" label="Nama" item-text="fullname" item-value="id"></v-select>  
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="save()">Simpan</v-btn>
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
      apiUrl: process.env.VUE_APP_API_URL,    
      search:  null,
      events:[],
      event: {},
      members:[],
      eventDialog: false,      
      eventsCol: [        
        { text: 'Tanggal', value: 'date' },
        { text: 'Tuan rumah', value: 'member' },
        { text: 'Pinjaman', value: 'debt', align: 'right' },
        { text: 'Tabungan', value: 'saving', align: 'right' },
        { text: 'Saldo', value: '', align: 'right' }
      ],
      menuDate: false,
      dialogTitle: '',
      snackbar:{ value:false, text:''}
    }),

    created(){
      this.getEvents()
      this.getMembersName()
  
    },

    computed: {
      formattedEventDate () {
        return this.event.date ? moment(this.event.date).format('DD/MM/YYYY') : ''
      }
    },

    methods:{
      getEvents(){
        this.axios.get('/events')
        .then(events=>{
          this.events = events.data
        })
      },

      getMembersName(){
        this.axios.get('/members/name-list')
        .then(members=> this.members = members.data)
      },

      create(){
        this.eventDialog = true
        this.dialogTitle = "Pertemuan RT Baru"
      },

      save(){
        this.axios.post('/events/create', this.event)
        .then(()=> {
          this.getEvents()
          this.closeDialog()
        })
        .catch(err => {
          this.snackbar = { value:true, text: err.response.data }
        })
      },

      closeDialog(){
        this.eventDialog = false
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
