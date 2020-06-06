<template>
  <v-app>
    <Alert/>
    <v-content v-if="!getLogged">

      <v-row id="login-row-container">
        <v-col cols="7" class="mr-0 pa-0">
          <LoginBrand/>
        </v-col>
        <v-col cols="5">
          <router-view>
          </router-view>
        </v-col>
      </v-row>

    </v-content>

    <v-content fill-height v-if="getLogged">
       <v-container primary fluid class="dashboard-header">
        <v-row class="fill-height ma-0" justify="center" aling="center">

          <v-col class="ma-0 pa-0" cols="2">
            <v-img
              :src="require('./assets/eventdoonLogo.png')"
              class="my-1"
              contain
              height="80"
            />
          </v-col>

          <v-col cols="8">
          </v-col>

          <v-col cols="2">
            <v-row class="fill-height ma-0">
              <v-col>
                <v-btn class="ma-2" text color="white" @click="doLogout">
                  Salir
                  <v-icon right>mdi-power</v-icon> 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

        </v-row>
       </v-container>

      <v-tabs vertical>
        <v-tab v-for="(tabLink, index) in tabsLink" :key="index">
          <v-icon left>{{tabLink.icon}}</v-icon>
          {{tabLink.text}}
        </v-tab>

        <v-tab-item>
          <Events/>
        </v-tab-item>

        <v-tab-item>
          <UserEvents/>
        </v-tab-item>

        <v-tab-item>
          <Tickets/>
        </v-tab-item>
    </v-tabs>

    </v-content>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import LoginBrand  from './components/LoginBrand';
import Events from './components/Events';
import UserEvents from './components/Events/UserEvents';
import Tickets from './components/Tickets';
import Alert from './components/Alert';

export default {
  name: 'App',
  data() {
    return {
      isLogged: false,
      tabsLink: [
        { text: 'Eventos', icon: 'mdi-calendar-range' },
        { text: 'Mis Eventos', icon: 'mdi-account-check' },
        { text: 'Mis Boletos', icon: 'mdi-ticket-confirmation-outline' },
      ]
    }
  },
  beforeMount() {
    this.checkLogged();
  },
  mounted() {
  },
  methods: {
    ...mapActions("auth", { doLogout: "DO_LOGOUT", checkLogged: "CHECK_LOGGED"})
  },
  computed: {
    ...mapGetters("auth",{ getLogged: "GET_LOGGED", getUser: "GET_USER"} ),

  },
  components: {
    LoginBrand,
    Events,
    UserEvents,
    Tickets,
    Alert
  },
};
</script>

<style lang="less">
  #login-row-container{
    height: 100%
  }
  
  .dashboard-header{
    height: 120px
  }
  .image-container{
    height: 100px;
    overflow: hidden;
    padding: 0px;
  }
  .header-img{
    height: 100px;
  }
  .dashboard-container{
    height: 85%;
  }
</style>