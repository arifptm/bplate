import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


router.beforeEach(
  (to,from,next) => { 
    if(to.matched.some(record => record.meta.forPublic)){
      if(store.state.token){
        next({
          path: '/'
        }) 
      } else next()
    } 

    else if(to.matched.some(record => record.meta.forAuth)){
      if( ! store.state.token){
        next({
          path: '/login'
        }) 
      } else next()
    }
    else next()
  }
)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
