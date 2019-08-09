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
        <v-data-table :headers="inoutsCol" :items="inouts" class="elevation-1">
          <template v-slot:items="props">
            <tr @click="edit(props.item)">
              <td>{{ dateField(props.item.Event.date) }}</td>              
              <td>{{ props.item.note }}</td>
              <td class="text-xs-right">{{ (props.item.amount > 0) ? toMoney(props.item.amount) : '-' }}</td>   
              <td class="text-xs-right">{{ (props.item.amount < 0) ? toMoney(props.item.amount * -1) : '-' }}</td>   
              <td class="text-xs-right">
                <v-icon color="red" @click.stop="deleteDebt(props.item.id)">delete</v-icon>
              </td>   
            </tr>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="save">Reset</v-btn>
          </template>
        </v-data-table>    

      </v-flex>      
    </v-layout>

    <v-dialog v-model="debtDialog" scrollable persistent  :overlay="false" max-width="500px" transition="dialog-transition" >
      <v-card v-if="debtDialog">
        
        <v-card-title >
          {{ dialogTitle }}
          <v-spacer></v-spacer>
          <v-icon @click="closeDialog()">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-select :items="events" v-model="debt.event_id" label="Tanggal" item-text="fDate" item-value="id"></v-select>
          <v-autocomplete :items="members" v-model="debt.member_id" label="Nama" item-text="fullname" item-value="id"></v-autocomplete>
          <v-text-field label="Jumlah pinjaman" v-model="debt.amount"></v-text-field>
          <v-text-field label="Kali Angsuran" v-model="debt.paytimes"></v-text-field>
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
      search: null,
      members:[],
      events:[],
      debtDialog: false,
      apiUrl: process.env.VUE_APP_API_URL,
      inouts:[],
      inout:{},
      inoutsCol: [
        { text: 'Tanggal', value: 'Event.date'},
        { text: 'Keterangan', value: 'note' },
        { text: 'Masuk', value: 'amount', align: 'right' },
        { text: 'Keluar', value: 'amount', align: 'right' },
        { text: 'Hapus', value: '', align: 'right' }
      ],
      dialogTitle: '',
      snackbar:{ value:false, text:''}
    }),

    created(){
      this.getInouts()
      this.getMembersNameList()
      this.getEventDateList()
  
    },

    methods:{
      getInouts(){
        this.axios.get('/inouts')
        .then(inouts=>{
          this.inouts = inouts.data
        })
      },

      getMembersNameList(){
        this.axios.get('/members/name-list')
        .then(members=> this.members = members.data)
      },      

      getEventDateList(){
        this.axios.get('/events/date-list')
        .then(events=> {
          this.events = events.data
          this.events.map(event=> event.fDate = moment(event.date).format('DD-MM-YYYY'))
          })
      },

      create(){
        this.dialogTitle = "Pinjaman baru"
        this.debtDialog = true
        this.debt.paytimes = 10
        this.debt.event_id = (this.events.sort().reverse())[0].id
      },

      save(){
        if(this.debt.id){
          this.axios.patch("/debts/" + this.debt.id, this.debt)
          .then(()=>{
            this.debtDialog = false
            this.getDebts()
            this.snackbar = { value:true, text: "Pinjaman berhasil diperbarui" }
          })

        } else {
          this.axios.post("/debts/create", this.debt)
          .then(debt=>{
            this.snackbar = { value:true, text: "Pinjaman baru berhasil dibuat" }
            this.debtDialog = false
            this.getDebts()
            this.debt = {}
          })
          .catch(err=>{
            this.snackbar = { value:true, text: err.response.data.error }
          })  
        }
        
      },

      deleteDebt(debtId){
        confirm('Yakin ?') && 
        this.axios.delete('/debts/' + debtId)
        .then(()=>{
          this.getDebts()

        })        
      },

      edit(debt){
        this.dialogTitle = "Edit Pinjaman"
        this.debtDialog = true
        Object.assign(this.debt, debt)
        // this.debt.event_id = (this.events.sort().reverse())[0].id        
      },

      closeDialog(){
        this.debtDialog = false
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
