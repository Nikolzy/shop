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
      const data = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      await this.$store.dispatch('auth/register', data)
      this.$router.push('/')
    }
  }
}
</script>

