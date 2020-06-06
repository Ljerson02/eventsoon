export default {
  namespaced: true,
  state: {
    alert: null
  },
  getters: {
    GET_ALERT: state => state.alert
  },
  mutations: {
    SET_ALERT: (state, alert) =>{
        state.alert = alert;
    }
  },
  actions: {
      CREATE_ALERT: ({commit}, alert) =>{
          commit("SET_ALERT", alert);
          setTimeout(() => {
              commit("SET_ALERT", null);
          }, 3000);
      }
  }
};
