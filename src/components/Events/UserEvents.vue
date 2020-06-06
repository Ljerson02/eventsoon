<template>
    <v-row>
        <v-col cols="12">
        <v-btn color="primary" @click="showEventForm= true">Agregar evento</v-btn>
        </v-col>
        <v-col cols="12" v-for="(event, index) in myEvents" :key="index">
            <EventCard :eventInfo="event" :editMode="true" @editEvent="editEvent" />
        </v-col>
        <EventForm :eventId="eventIdToEdit" :editMode="eventFormEditMode" :show="showEventForm" @change-state="cancelForm($event)" />
    </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import EventCard from './EventCard';
import EventForm from './EventForm';

export default {
  name: 'UserEvents',
  components: {
      EventCard,
      EventForm
  },
  data(){
      return({
          showEventForm: false,
          eventFormEditMode: false,
          eventIdToEdit: null

      });
  },
  mounted() {
      this.fetchAllEvents();
  },
  methods: {
      ...mapActions("events", { fetchAllEvents: "FETCH_ALL_EVENTS"}),
      cancelForm(formState){
          this.eventFormEditMode = false;
          this.eventIdToEdit = null;
          this.showEventForm = formState;
      },
      editEvent(eventId){
          this.eventIdToEdit = eventId;
          this.eventFormEditMode = true;
          this.showEventForm = true;
      }
  },
  computed: {
      ...mapGetters("auth",{getUser: "GET_USER"} ),
      ...mapGetters("events",{allEvents: "GET_ALL_EVENTS"} ),
      myEvents(){
          return this.allEvents.filter(event => event.owner_id == this.getUser._id);
      }
  },
};
</script>