<template>
  <v-container fill-height fluid>
    <v-row justify="center" aling="center" class="login-container" >
      <v-col cols="8">
        <p>
          Entra al portal mas grande de eventos en Colombia !
        </p>
      </v-col>
      <v-col cols="8" class="login-form pa-2 ">
        <v-form
          ref="form"
          v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Correo"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :rules="passRules"
            label="Contraseña"
            :type="'password'"
            required
          >
          </v-text-field>

          <v-btn class="ma-2" tile outlined color="primary"  @click="validate" :disabled="!valid">
            Entrar
            <v-icon right>mdi-login </v-icon> 
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="8">
        <p justify="end">
          No tienes una cuenta ?
          <v-btn @click="navigateToRegister()" text color="primary">Registrate</v-btn>
        </p>
      </v-col>
    </v-row>

  </v-container>



</template>

<script>
import { mapActions } from "vuex";
import router from './../../router.js';
export default {
  name: 'Login',
  data(){
    return{
      valid: true,
      password: '',
      passRules: [
        v => !!v || 'Ingresa tu contraseña'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Ingresa tu correo',
        v => /.+@.+\..+/.test(v) || 'Correo no valido',
      ],
      select: null
    }
  },
  components: {
  },
  methods: {
    ...mapActions("auth", { doLogin: "DO_LOGIN", checkLogged: "CHECK_LOGGED" }),
    ...mapActions("alert", { createAlert: "CREATE_ALERT" }),
    async validate () {
      this.$refs.form.validate()
      
      if(this.valid){
        let loginObj = {password: this.password, email: this.email}
        this.doLogin(loginObj)
        .then((result) => {
          if(result.status !== 200){
            this.createAlert({message: "Error. verifique la informacion", type: 'error'});
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    navigateToRegister(){
      router.push('./register');
    }
  },
  computed: {
    
  }
};
</script>

<style scoped>
  .login-container{
    height: 100%
  }
</style>