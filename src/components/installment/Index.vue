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
        <v-data-table :headers="installmentsCol" :items="installments" class="elevation-1" :pagination.sync="pagination" hide-actions>
          <template v-slot:items="props">     
            <tr @click="edit(props.item)">
              <td>{{ props.item.Event.date }}</td>
              <td>{{ props.item.Debt.Member.fullname }}</td>
              <td class="text-xs-right">{{ toMoney(props.item.amount || 0) }}</td>
              <td>{{ (props.item.has_paid === true) ? 'Lunas' : 'Bayar' }}</td>
              <td class="text-xs-right">
                <v-icon color="red">delete</v-icon>
              </td>
            </tr>
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

    <v-dialog v-model="installmentDialog" scrollable persistent  :overlay="false" max-width="500px" transition="dialog-transition" >
      <v-card v-if="installmentDialog">
        
        <v-card-title >
          {{ dialogTitle }}
          <v-spacer></v-spacer>
          <v-icon @click="closeDialog()">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-autocomplete :items="members" v-model="installment.member_id" label="Nama" item-text="fullname" item-value="id"></v-autocomplete>
          <v-text-field label="Jumlah cicilan" v-model="installment.amount"></v-text-field>   
          <v-checkbox  v-model="installment.has_paid" label="Sudah bayar"></v-checkbox>       
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
      search: '',
      installmentDialog: false,
      installments:[],
      installment: {},
      installmentsCol: [        
        { text: 'Tanggal', value: 'Event.date'},
        { text: 'Nama Lengkap', value: 'Debt.Member.fullname' },        
        { text: 'Jumlah', value: 'amount', align: 'right' },
        { text: 'Status', value: 'has_paid' },
        { text: 'Hapus', value: '', align: 'right' }
      ],
      members:[],
      pagination: { rowsPerPage: 25 },      
      snackbar:{ value:false, text:''}
    }),

    created(){
      this.getInstallments()
      this.getMembersNameList()
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
      getInstallments(){
        this.axios.get('/installments')
        .then(installments=>{
          this.installments = installments.data
          this.pagination.totalItems = this.installments.length
        })
      },

      getMembersNameList(){
        this.axios.get('/members/name-list')
        .then(members=> this.members = members.data)
      }, 

      create(){
        this.dialogTitle = "Cicilan baru"
        this.installmentDialog = true
      },

      edit(installment){
        this.dialogTitle = "Update cicilan"
        this.installment = {
          id: installment.id,
          debt_id: installment.Debt.id,
          event_id: installment.Event.id,
          amount: installment.amount,
          has_paid: installment.has_paid,
          member_id: installment.Debt.Member.id
        }        
        this.installmentDialog = true
      },    

      save(){
        if (this.installment.id){

        } else {
          this.axios.post('/installments', this.installment)
          .then(installment=> {
            this.closeDialog()
            this.getInstallments()
            this.snackbar = { value:true, text: "Cicilan baru berhasil dibuat" }
          })
        }
      },

      closeDialog(){
        this.installmentDialog = false
        this.installment = {}
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
