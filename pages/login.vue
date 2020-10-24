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
        const data = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('auth/login', data)
        this.$router.push('/');
      } catch (e) {
        commit('setError', e)
        throw e;
      }
    }
  }
}
</script>

