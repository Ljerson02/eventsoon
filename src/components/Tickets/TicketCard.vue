<template>
    <v-card class="pa-0 ma-0">
        <v-row justify="center">
            <v-col cols="4">
                <h2>
                {{ticketInfo.event_name}}
                </h2>
                <p>
                Boleto valido para:
                </p>
                <p>
                {{getUser.fullname}}
                </p>

            </v-col>
             <v-col cols="4" aling="center">
                <div class="event-props">
                    <v-icon right>mdi-calendar</v-icon>
                    {{ticketInfo.date}}
                </div>
                <div class="event-props">
                    <v-icon right>mdi-map-marker </v-icon>
                    {{ticketInfo.address}}
                </div>
                 <div class="event-props" >
                    <v-icon right>mdi-currency-usd</v-icon>
                    {{ticketInfo.ticket_price}}
                </div>
            </v-col>
            <v-col cols="3">
                <div class="image-container">
                    <img class="mr-1 qr-img" :src="require('./../../assets/qr.png')" />
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Home',

  components: {
  },

  data: () => ({
    //
  }),
  props:{
      ticketInfo: Object
  },
  computed: {
      ...mapGetters("auth",{getUser: "GET_USER"} )
  },
};
</script>

<style scoped>
  .image-container{
    height: 70px; /* height of container */
    width: 70px;
    overflow: hidden;
    padding: 0px;
  }
  .qr-img{
    height: 70px;
    width: 70px;
  }
    .event-props{
        font-size: 10px;
    }
</style>