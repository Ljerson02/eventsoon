import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allTickets: []
  },
  getters: {
    GET_ALL_TICKETS: state => state.allTickets
  },
  mutations: {
    SET_TICKETS: (state, tickets) =>{
        state.allTickets = tickets;
    },
    ADD_TICKET: (state, ticket) =>{
        state.allTickets.push(ticket);
    },
  },
  actions: {
    FETCH_ALL_TICKETS: ({commit}) =>{
        let header = {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem("_token")
        }
        return axios
        .get(
          `${process.env.VUE_APP_API}/api/tickets/`,
          {headers: header}
          )
          .then(res =>{
              if(res.status === 200){
                  commit("SET_TICKETS", res.data.allEvents);
              }
              return res;
          })
          .catch(err => {
              return (err.response);
          });
    },
    CREATE_TICKET: ({commit}, eventId) => {
        let newTicket = {
            event_id: eventId
        }
        let jsonPost = JSON.stringify(newTicket);
        let header = {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem("_token")
        }
        return axios
        .post(
          `${process.env.VUE_APP_API}/api/tickets/`,
          jsonPost,
          {headers: header}
          )
          .then(res =>{
              if(res.status === 200){
                  commit("ADD_TICKET", res.data.ticket);
              }
              return res;
          })
          .catch(err => {
              return (err.response);
          });
    }
  }   
};
