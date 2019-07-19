import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: process.env.VUE_APP_NAME,
    user: {},
    clock: moment()
  },
  
  mutations: {		
    mutate(state, payload) {
      state[payload.property] = payload.with;
    }


  },
  actions: {

  }
})
