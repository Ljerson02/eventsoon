import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'

import store from "./store/auth";


Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (store.state.logged) {
    next()
    return
  }
  next('/login')
}

const ifAuthenticated = (to, from, next) => {
  if (!store.state.logged) {
    next()
    return
  }
  next('/')
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifNotAuthenticated
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: ifAuthenticated
    }
  ]
});

export default router;