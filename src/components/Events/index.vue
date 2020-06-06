<template>
    <v-row>
        <v-col cols="12" v-for="(event, index) in allEvents" :key="index">
            <EventCard :eventInfo="event" />
        </v-col>
    </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import EventCard from './EventCard';
export default {
  name: 'Events',
  components: {
      EventCard
  },
  data(){
      return({
          
      });
  },
  mounted() {
      this.fetchAllEvents();
  },
  methods: {
      ...mapActions("events", { fetchAllEvents: "FETCH_ALL_EVENTS"})
  },
  computed: {
      ...mapGetters("auth",{getUser: "GET_USER"} ),
      ...mapGetters("events",{allEvents: "GET_ALL_EVENTS"} ),
  },
};
</script>