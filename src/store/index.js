import Vue from 'vue'
import Vuex from 'vuex'
import User from '../javascript/User'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: new User(null, null, null, null, null, null, null, null, null),
    sid: ""
  },
  mutations: {
    LOGIN(state, payload){
      state.currentUser = payload
    },
    LOGOUT(state){
      state.currentUser = new User(null, null, null, null, null, null, null, null, null)
    }
  },
  actions: {
    login(store, payload){
      store.commit('LOGIN', payload)
    },
    logout(store){
      store.commit('LOGOUT')
    }
  }
})


export default store
