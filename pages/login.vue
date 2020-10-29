<template>
  <div class="modal">
    <div class="login_wrapper">
      <v-card dark>
        <v-card-title>Логін</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="email"
              color="green"
              label="Емейл"
            ></v-text-field>
            <v-text-field
              v-model="password"
              color="green"
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
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  layout: 'empty',
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters({
      error: 'auth/getAuthError'
    })
  },
  watch: {
    error (value) {
      if (value) {
        this.notifyError(value);
      }
    }
  },
  methods: {
    async login () {
      try {
        const data = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('auth/login', data)
        this.$router.push('/');
      } catch (e) {
        console.log(e)
        throw e;
      }
    },
    notifyError (error) {
      if (error.includes('invalid-email')) {
        this.$dialog.notify.error('Емейл введений неправильно!', {
          position: 'top-right',
          timeout: 3000
        })
      } else if (error.includes('wrong-password')) {
        this.$dialog.notify.error('Емейл або пароль не вірний!', {
          position: 'top-right',
          timeout: 3000
        })
      }
    }
  }
}
</script>

