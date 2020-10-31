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
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          color="green"
          name="input-10-1"
          label="Пароль"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          :rules="[v => checkPhoneNumber(v) || 'Введіть корректний мобільний номер']"
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
import { mapGetters } from 'vuex';

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
    show: false,
    minNum: 10,
    maxNum: 12
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
    async registration () {
      if (this.$refs.form.validate()) {
        const data = {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone
        }
        await this.$store.dispatch('auth/register', data);
        this.$router.push('/products')
      }
    },
    checkEmail (email) {
      const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(email);
    },
    checkPhoneNumber (number) {
      const phoneLength = number.trim().length;
      const reg = /^[3][8]/;
      if (reg.test(number)) {
        return phoneLength === this.maxNum;
      } else {
        return phoneLength === this.minNum;
      }
    },
    notifyError (error) {
      if (error.includes('email-already-in-use')) {
        this.$dialog.notify.error('Цей емейл вже зареєстрований!', {
          position: 'top-right',
          timeout: 3000
        });
      }
    }
  }
}
</script>

