<template>
    <v-row>
        <v-col cols="12" v-for="(ticket, index) in allTickets" :key="index">
            <TicketCard :ticketInfo="ticket" />
        </v-col>
    </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import TicketCard from './TicketCard';
export default {
  name: 'Tickets',
  components: {
      TicketCard
  },
  data(){
      return({
          
      });
  },
  mounted() {
      this.fetchAllTickets();
  },
  methods: {
      ...mapActions("tickets", {fetchAllTickets: "FETCH_ALL_TICKETS"})
  },
  computed: {
      ...mapGetters("tickets",{allTickets: "GET_ALL_TICKETS"} ),
  },
};
</script>

