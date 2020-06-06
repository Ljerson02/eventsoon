<template>
    <v-card class="pa-0 ma-0">
        <v-row justify="center">
            <v-col cols="4">
                <h2>
                {{eventInfo.name}}
                </h2>
                <p>
                {{eventInfo.description}}
                </p>
            </v-col>
             <v-col cols="4" aling="center">
                <div class="event-props">
                    <v-icon right>mdi-calendar</v-icon>
                    {{eventInfo.date}}
                </div>
                <div class="event-props">
                    <v-icon right>mdi-map-marker </v-icon>
                    {{eventInfo.address}}
                </div>
                 <div class="event-props" >
                    <v-icon right>mdi-currency-usd</v-icon>
                    {{eventInfo.ticket_price}}
                </div>
            </v-col>
             <v-col cols="3">
                <v-btn v-if="!editMode" @click="buyTicket" color="primary">Comprar</v-btn>
                <v-btn v-if="editMode" @click="editEvent" color="primary">Editar</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Home',

  components: {
  },

  data: () => ({
    //
  }),
  props:{
      eventInfo: Object,
      editMode:{
          type: Boolean,
          default: false
        }
  },
  methods: {
      ...mapActions("tickets", {createTicket: "CREATE_TICKET"}),
      ...mapActions("alert", { createAlert: "CREATE_ALERT" }),
      buyTicket(){
          this.createTicket(this.eventInfo._id)
          .then((result) => {
              if(result.status === 200){
                  this.createAlert({message:"Boleto comprado!", type:"success"});
              }
              else{
                  this.createAlert({message:"Ha ocurrido un error. Intenta mas tarde", type:"error"});
              }
              
          }).catch((err) => {
              console.log(err);
              this.createAlert({message:"Error de conexion", type:"error"});
          });
      },
      editEvent(){
          this.$emit('editEvent', this.eventInfo._id);
      }
  },
};
</script>

<style scoped>
    .event-props{
        font-size: 10px;
    }
</style>