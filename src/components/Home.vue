<template>
  <v-container fluid>
    <v-layout row wrap>      
      <v-flex xs12 >
        <v-list>
          <template v-for="(member, idx) in members">
            <v-list-tile @click="memberDetail(member.id)">
              <v-list-tile-avatar>
                <v-img v-if="member.alias == 'arif'" :src="apiUrl + '/static/members/' + member.image"></v-img>

              </v-list-tile-avatar>

              <v-list-tile-content >
                <v-list-tile-title v-text="member.fullname"></v-list-tile-title>
                <v-list-tile-sub-title v-text="member.alias"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>Simpan: {{ member.saving }}</v-list-tile-action-text>
                <v-list-tile-action-text>Pinjam: {{ member.debt }}</v-list-tile-action-text>                            
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset v-if="idx + 1 < members.length" :key="idx"></v-divider>
          </template>
        </v-list>          

      </v-flex>      
    </v-layout>

    <v-dialog v-model="dlgMember" scrollable  :overlay="false" max-width="500px" transition="dialog-transition" >
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
      
    </v-dialog>

  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {    
    data: () => ({
      members:[],
      member: {},
      dlgMember: false,
      apiUrl: process.env.VUE_APP_API_URL
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

      memberDetail(id){
        this.dlgMember = true
        Object.assign(this.member, this.members.filter(m => m.id == id)[0])
      }

    }
  
  }
</script>

<style>

</style>
