<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app v-if="fullPage.includes($route.name) === false">
      
      <v-list dense v-for="menu in menus" :key="menu.id">
        <v-list-tile @click="menu.path">
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
      </v-list>

    </v-navigation-drawer>
    <v-toolbar color="primary darken-2" dark fixed app v-if="fullPage.includes($route.name) === false">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $store.state.appNama }}</v-toolbar-title>
    </v-toolbar>
    <v-content>      
      <router-view/>
    </v-content>
    <v-footer color="primary darken-2" app v-if="fullPage.includes($route.name) === false">
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      menus: [],
      fullPage: [ 'login', 'home' ],
    }),

    created(){
      this.menus = [
        { icon: 'people', title: 'Anggota', path: ()=>this.pushTo('members'), showFor: [ 'all' ] },
        { icon: 'event', title: 'Pertemuan', path: ()=>this.pushTo('events'), showFor: [ 'all' ] },
        { icon: 'attach_money', title: 'Tabungan', path: ()=>this.pushTo('savings'), showFor: [ 'all' ] },
        { icon: 'account_balance', title: 'Pinjaman', path: ()=>this.pushTo('debts'), showFor: [ 'all' ] },        
        { icon: 'credit_card', title: 'Cicilan', path: ()=>this.pushTo('installments'), showFor: [ 'all' ] },
        { icon: 'swap_vert', title: 'Dana masuk keluar', path: ()=>this.pushTo('inouts'), showFor: [ 'all' ] },
        { icon: 'assignment', title: 'Laporan', path: ()=>this.pushTo('reports'), showFor: [ 'all' ] },
        // { icon: 'volume_up', title: 'Dashboard', path: ()=>this.logout(), showFor: [ 'all' ] },
        // { icon: 'add', title: 'Account', path: ()=>this.logout(), showFor: [ 'super' ] },
        // { icon: 'lock', title: 'Users', path: ()=>this.logout(), showFor: [ 'super', 'admin' ] },
        // { icon: 'people', title: 'Users', path: ()=>this.$router.push('users'), showFor: [ 'super' ] },
        // { icon: 'exit_to_app', title: 'Logout', path: ()=>this.logout(), showFor: [ 'all' ] },
      ]
    },

    methods:{
      logout(){
        alert('metal')
      },

      pushTo(val){
        this.$router.push('/' + val)
      }
    },

    props: {
      source: String
    }
  }
</script>