import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import events from './events'
import tickets from './tickets'
import alert from './alert'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    auth,
    events,
    tickets,
    alert
  },
  state: {

  },
  mutations: {
  },
  actions: {
  }
});