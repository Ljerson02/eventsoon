import axios from 'axios';
import router from './../router'

export default {
  namespaced: true,
  state: {
    user: null,
    logged: !!window.localStorage.getItem("_token"),    
    token: window.localStorage.getItem("_token")  
  },
  getters: {
    GET_LOGGED: state => state.logged,
    GET_USER: state => state.user,
    GET_TOKEN: state => state.token
  },
  mutations: {
    SET_USER: state => {
      if (window.localStorage.getItem("_token")) {
        const token = window.localStorage.getItem("_token");
        const jwtDecode = require("jwt-decode");
        state.user = JSON.parse(JSON.stringify(jwtDecode(token)));
        state.logged = true;
      } else {
        state.logged = false;
        state.user = null;
      }
    },
    SET_LOGGED: (state, logged) => {
      state.logged = logged;
    }
  },
  actions: {
    CHECK_LOGGED: ({getters, commit}) =>{
      let isLogged = getters.GET_LOGGED;
      if(isLogged == true){
        commit("SET_USER");
      }
    },
    DO_LOGIN: ({commit}, userInput) => {
        let email = userInput.email;
        let password = userInput.password;
        let jsonPost = JSON.stringify({email, password});
        let headers = { 'Content-Type': 'application/json'}
        return axios
        .post(
            `${process.env.VUE_APP_API}/api/users/login`,
            jsonPost,
            {headers: headers}
        )
        .then(res =>{
            if(res.status === 200){
                window.localStorage.setItem("_token", res.data.token);
                commit("SET_USER");
            }
            return res;
        })
        .catch(err => {
            return (err.response);
        });
    },
    DO_REGISTER: ({commit}, userInput) => {

        let jsonPost = JSON.stringify(userInput);
        let header = { 'Content-Type': 'application/json'}
        return axios
        .post(
            `${process.env.VUE_APP_API}/api/users/register`,
            jsonPost,
            {headers: header}
        )
        .then(res =>{
            if(res.status === 200){
                window.localStorage.setItem("_token", res.data.token);
                commit("SET_USER");
            }
            return res;
        })
        .catch(err => {
            return (err.response);
        });
    },
    DO_LOGOUT: ({ commit }) => {
      window.localStorage.removeItem("_token");
      commit("SET_USER");
      router.push('./login');
    }
  }
};
