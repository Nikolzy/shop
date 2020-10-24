<template>
  <v-card dark>
    <v-card-title>Реєстрація</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          label="Ім'я"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Емейл"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
        ></v-text-field>
      </v-form>
      <div>
        <v-btn
          color="green"
          dark
          rounded
          @click="registration"
        >
          Зареєструватись
        </v-btn>
      </div>
      <div class="d-flex justify-center mt-4">
        <v-btn
          color="primary"
          text
          rounded
          @click="$router.push('/login')"
        >
          В мене вже є акаунт
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  layout: 'empty',
  data: () => ({
    email: '',
    password: '',
    name: ''
  }),
  methods: {
    async registration () {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((data) => {
        console.log(data)
        this.$router.push('/')
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

