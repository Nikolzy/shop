<template>
  <v-card dark>
    <v-card-title>Реєстрація</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :rules="[v => !!v || 'Це поле є обов\'язковим']"
          color="green"
          label="Ім'я"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[v => !!checkEmail(v) || 'Це поле є обов\'язковим']"
          color="green"
          label="Емейл"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          color="green"
          label="Пароль"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          color="green"
          label="Телефон"
        ></v-text-field>
      </v-form>
      <div class="mt-3">
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
    name: '',
    phone: '',
    passwordRules: [
      v => !!v || 'Це поле є обов\'язковим',
      v => !v.replace(/[a-zA-Z0-9]+/, '') || 'Дозволена тільки латиниця та цифри',
      v => (v.trim() && v.trim().length > 8) || 'Пароль повинен бути не менше 8 символів'
    ],
    phoneRules: [
      v => !!v || 'Це поле є обов\'язковим',
      v => (v.trim().length === 10 || v.trim().length === 12)
        || 'Телефон обов\'язковий'
    ]
  }),
  methods: {
    async registration () {
      if (this.$refs.form.validate()) {
        const data = {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone
        }
        await this.$store.dispatch('auth/register', data)
        this.$router.push('/')
      }
    },
    checkEmail (email) {
      const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(email);
    }
  }
}
</script>

