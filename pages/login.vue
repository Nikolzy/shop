<template>
  <div class="modal">
    <div class="login_wrapper">
      <v-card dark>
        <v-card-title>Логін</v-card-title>
        <v-card-text>
          <v-form ref="form">
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
              @click="login"
            >
              Увійти
            </v-btn>
          </div>
          <div class="d-flex justify-center mt-4">
            <v-btn
              color="primary"
              text
              rounded
              @click="$router.push('/registration')"
            >
              Зареєструватись
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  layout: 'empty',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async login () {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((data) => {
          console.log(data)
          this.$router.push('/')
        }).catch(e => {
          console.log(e)
        });
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    }
      // this.$store.dispatch('auth/register', data);
      // this.$router.push('/')   }
  }
}
</script>

