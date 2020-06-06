import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: null,
    allEvents: []
  },
  getters: {
    GET_ALL_EVENTS: state => state.allEvents
  },
  mutations: {
    SET_EVENTS: (state, events) =>{
      state.allEvents = events;
    },
    ADD_EVENT: (state, event)=>{
      state.allEvents.push(event);
    }
  },
  actions: {
    FETCH_ALL_EVENTS: ({commit}) =>{
        let header = {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem("_token")
        }
        return axios
        .get(
          `${process.env.VUE_APP_API}/api/events/showAll`,
          {headers: header}
          )
          .then(res =>{
              if(res.status === 200){
                  commit("SET_EVENTS", res.data.allEvents);
              }
              return res;
          })
          .catch(err => {
              return (err.response);
          });
    },
    CREATE_EVENT: ({commit}, eventData) =>{
      let jsonPost = JSON.stringify(eventData);
      let header = {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem("_token")
      }
      return axios
      .post(
        `${process.env.VUE_APP_API}/api/events/`,
        jsonPost,
        {headers: header}
        )
        .then(res =>{
            if(res.status === 200){
                commit("ADD_EVENT", res.data.event);
            }
            return res;
        })
        .catch(err => {
            return (err.response);
        });
    },
    UPDATE_EVENT:({commit}, event) =>{
      let params = {
        "id": event.eventId
      }
      let jsonPost = JSON.stringify(event.eventData);

      let header = {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem("_token")
      }
      return axios
      .put(
        `${process.env.VUE_APP_API}/api/events/`,
        jsonPost,
        {
          headers: header,
          params: params
        }
        )
        .then(res =>{
            if(res.status === 200){
                commit("ADD_EVENT", res.data.event);
            }
            return res;
        })
        .catch(err => {
            return (err.response);
        });
    }
  }   
};
