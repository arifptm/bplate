import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import User from './components/user/Index.vue'
import Admin from './components/Admin.vue'

import Event from './components/event/Index.vue'
import Member from './components/member/Index.vue'
import Debt from './components/debt/Index.vue'
import Saving from './components/saving/Index.vue'
import Report from './components/report/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home, meta: { forPublic: true, forAuth: true }},
    { path: '/admin', name: 'admin', component: Admin, meta: { forPublic: false, forAuth: true }},
    { path: '/login', name: 'login', component: Login, meta: { forPublic: true, forAuth: false } },
    { path: '/register', name: 'register', component: Register, meta: { forPublic: true, forAuth: false } },
    { path: '/users', name: 'users', component: User, meta: { forPublic: false, forAuth: true } },

    { path: '/events', name: 'events', component: Event, meta: { forPublic: true, forAuth: true }},
    { path: '/members', name: 'members', component: Member, meta: { forPublic: true, forAuth: true }},
    { path: '/debts', name: 'debts', component: Debt, meta: { forPublic: true, forAuth: true }},
    { path: '/savings', name: 'savings', component: Saving, meta: { forPublic: true, forAuth: true }},
    { path: '/reports', name: 'reports', component: Report, meta: { forPublic: true, forAuth: true }}

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    
  ]
})
