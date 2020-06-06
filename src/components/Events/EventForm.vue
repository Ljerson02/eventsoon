<template>
<v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>

        <v-card-title>
          <span v-if="!editMode" class="headline">Agregar evento</span>
          <span v-if="editMode" class="headline">Modificar evento</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="10" class="login-form pa-2 ">
                <v-form
                  ref="form"
                  v-model="valid">

                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nombre del evento"
                    required>
                  </v-text-field>
                  
                  <v-text-field
                    v-model="description"
                    :rules="descriptionRules"
                    label="Describe tu evento"
                    required>
                  </v-text-field>

                  <v-text-field
                    v-model="address"
                    :rules="addressRules"
                    label="Direccion"
                    required>
                  </v-text-field>

                  <v-text-field
                    v-model="date"
                    :rules="dateRules"
                    hint="Ejemplo: 01/07/2021"
                    label="Fecha"
                    required>
                  </v-text-field>

                  <v-text-field
                    v-model="ticketPrice"
                    :rules="ticketPriceRules"
                    label="Precio de la boleta"
                    required>
                  </v-text-field>

                   <v-text-field
                    v-model="ticketsAvailable"
                    :rules="ticketsAvailableRules"
                    label="Boletas disponibles"
                    required>
                  </v-text-field>       

                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" :disabled="isLoading" text @click.stop="showDialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" :disabled="isLoading" text @click.stop="validate">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data(){
    return{
      isLoading: false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Ingresa el nombre del evento',
        v => (v && v.length <= 30) || 'Hasta 30 caracteres',
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Agrega una descripcion',
        v => (v && v.length <= 140) || 'Hasta 140 caracteres'
      ],
      address: '',
      addressRules: [
        v => !!v || 'Agrega una direccion'
      ],
      date: '',
      dateRules: [
        v => !!v || 'Agrega una fecha para el evento'
      ],
      ticketPrice: '',
      ticketPriceRules: [
        v => !!v || 'Agrega un precio para la entrada',
        v => !isNaN(v) || 'Debe ingresar numeros'
      ],
      ticketsAvailable: '',
      ticketsAvailableRules: [
        v => !!v || 'Agrega la cantidad de entradas',
        v => !isNaN(v) || 'Debe ingresar numeros'
      ],
    }
  },
  props: {
    show: Boolean,
    maxWidth: String,
    editMode: Boolean,
    eventId: String
  },
  methods: {
    ...mapActions("events", { createEvent: "CREATE_EVENT", updateEvent: "UPDATE_EVENT", fetchAllEvent: "FETCH_ALL_EVENTS"}),
    ...mapActions("alert", { createAlert: "CREATE_ALERT" }),
    async validate () {
      this.$refs.form.validate()
      
      if(this.valid){
        let eventData = {
          name: this.name,
          address: this.address,
          date: this.date,
          description: this.description,
          ticket_price: this.ticketPrice,
          tickets_available: this.ticketsAvailable,
        }
        this.isLoading = true;

        if(this.editMode){
          let mergedEventData = {
            eventData: eventData,
            eventId: this.eventId
          }

          let alert = {
            message: null,
            type: null
          }
          this.updateEvent(mergedEventData)
          .then(res=>{
            if(res.status === 200){
              this.$refs.form.reset();
              this.showDialog = false;
              alert.message = "Evento modificado !";
              alert.type = "success";
            }
            else{
              alert.message = "Error, verifique los campos";
              alert.type = "error";
            }
            this.createAlert(alert);
          })
          .catch(err=>{
            console.log(err);
            this.createAlert({message: "Error, verifique los campos y su conexion", type:"error"});
          })
          .finally(()=>{
            this.isLoading = false;
            this.fetchAllEvent();
          })
        }
        else{
          this.createEvent(eventData)
          .then(res=>{
            if(res.status === 200){
              this.$refs.form.reset();
              this.showDialog = false;
              alert.message = "Evento creado !";
              alert.type = "success";
            }else{
              alert.message = "Error, verifique los campos";
              alert.type = "error";
            }
            this.createAlert(alert);
          })
          .catch(err=>{
            console.log(err);
            this.createAlert({message: "Error, verifique los campos y su conexion", type:"error"});
          })
          .finally(()=>{
            this.isLoading = false;
          })
          }
      }
    }
  },
  computed: {
    maxwidth() {
      return this.maxWidth || 600;
    },
    showDialog: {
      // getter
      get: function() {
        return this.show;
      },
      // setter
      set: function(newValue) {
        this.$emit("change-state", newValue);
      }
    }
  }
};
</script>

<style>
</style>