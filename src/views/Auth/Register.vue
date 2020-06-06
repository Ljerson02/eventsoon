<template>
  <v-container fill-height fluid>
    <v-row justify="center" aling="center" class="login-container" >
      <v-col cols="8">
        <p justify="end">
          Bien hecho, ya casi eres uno de nosotros !
        </p>
      </v-col>
      <v-col cols="8" class="login-form pa-2 ">
        <v-form
          ref="form"
          v-model="valid">
          
          <v-text-field
            v-model="fullName"
            :rules="fullNameRules"
            label="Nombre"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="nickName"
            :rules="nickNameRules"
            label="Apodo"
            required
          >
          </v-text-field>

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
            Registrar
            <v-icon right>mdi-login </v-icon> 
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="8">
        <p justify="end">
          Ya tienes una cuenta ?
          <v-btn @click="navigateToLogin()" text color="primary">Ingresa</v-btn>
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
  components: {
  },
 data: () => ({
    valid: true,
    fullName: '',
    fullNameRules: [
    v => !!v || 'Agrega tu nobre completo',
    v => (v && v.length <= 20) || 'Hasta 20 caracteres',
    ],
    nickName: '',
    nickNameRules: [
    v => !!v || 'Agrega tu apodo',
    v => (v && v.length <= 15) || 'Hasta 15 caracteres',
    ],
    email: '',
    emailRules: [
    v => !!v || 'Ingresa tu correo',
    v => /.+@.+\..+/.test(v) || 'Correo no valido',
    ],
    password: '',
    passRules: [
    v => !!v || 'Ingresa tu contraseña'
    ]
}),
methods: {
    ...mapActions("auth", { doRegister: "DO_REGISTER", checkLogged: "CHECK_LOGGED" }),
    ...mapActions("alert", { createAlert: "CREATE_ALERT" }),
    validate () {
        this.$refs.form.validate()
        if(this.valid){
   
        let userData = {
            fullname : this.fullName,
            email : this.email,
            nickname:this.nickName,
            password : this.password,
            passwordConfirmation : this.password,
        }

        this.doRegister(userData)
        .then((result) => {
          if(result.status !== 200){
            this.createAlert({message:"Error, puede que el correo ya esta en uso", type:"error"});
          }
          
        }).catch((err) => {
          console.log(err);
          this.createAlert({message:"Error de conexion", type:"error"});
        });
        }
    },
    navigateToLogin(){
      router.push('./login');
    }
}

};
</script>

<style scoped>
  .login-container{
    height: 100%
  }
</style>