<template>
  <div class="col-12">
    <h2>Додати користувача</h2>
    <v-form ref="form" class="form">
      <v-text-field
        v-model.trim="user.name"
        label="Ім'я"
        :rules="[v => !!v || 'Це поле є обов\'язковим']"
        required
        color="green"
      />
      <v-text-field
        v-model.trim="user.email"
        label="Email"
        :validate-on-blur="true"
        :rules="[v => !!checkEmail(v) || 'Це поле є обов\'язковим']"
        required
        color="green"
      />
      <v-text-field
        v-model="user.password"
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
        v-model="user.phone"
        label="Телефон"
        type="number"
        :min="minNum"
        :max="maxNum"
        :validate-on-blur="true"
        :rules="[v => checkPhoneNumber(v) || 'Введіть корректний мобільний номер']"
        required
        color="green"
      ></v-text-field>
      <v-checkbox
        v-model="user.isAdmin"
        color="green"
        label="Адмін"
      />
      <pop-confirm-button
        button-color="green"
        button-label="Створити"
        type="text"
        :message="message"
        :action="createUser"
        class="mb-5 mt-3"
        color="green"
      />
    </v-form>
  </div>
</template>

<script>
export default {
  layout: 'admin-layout',
  data: () => ({
    user: {
      name: '',
      email: '',
      password: '',
      phone: '',
      isAdmin: false
    },
    message: 'Cтворити користувача?',
    minNum: 10,
    maxNum: 12,
    show: false,
    passwordRules: [
      v => !!v || 'Це поле є обов\'язковим',
      v => !v.replace(/[a-zA-Z0-9]+/, '') || 'Дозволена тільки латиниця та цифри',
      v => (v.trim() && v.trim().length > 8) || 'Пароль повинен бути не менше 8 символів'
    ]
  }),
  methods: {
    async createUser () {
      if (this.validate()) {
        await this.$store.dispatch('auth/register', this.user).then(() => {
          this.$dialog.notify.success('Користувач успішно створений!', {
            position: 'top-right',
            timeout: 3000
          })
          this.$router.push('/admin/users');
        }).catch(() => {
          this.$dialog.notify.error('При створенні користувача виникла помилка! Спробуйте ще раз!', {
            position: 'top-right',
            timeout: 3000
          })
        })
      } else {
        this.$dialog.notify.warning('Заповніть всі обов\'язкові поля!', {
          position: 'top-right',
          timeout: 3000
        })
      }
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
    checkEmail (email) {
      const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(email);
    },
    checkAddress (address) {
      return !!(address || this.user.isOwnPickUp);
    },
    validate () {
      return this.$refs.form.validate();
    }
  }
}
</script>

<style scoped>
.form {
  background: darkgray;
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 20px;
  max-width: 500px;
}
</style>
