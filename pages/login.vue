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
          <v-btn
            color="green"
            dark
            @click="login"
          >
            Увійти
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .modal {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
  }
  .login_wrapper {
    position: absolute;
    min-width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
