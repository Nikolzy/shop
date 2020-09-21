<template>
  <div>
    <h1>Мій профіль</h1>
    <v-form ref="form">
      <v-text-field
        v-model.trim="user.name"
        label="Ім'я"
        :rules="[v => !!v || 'Це поле є обов\'язковим']"
        required
      />
      <v-text-field
        v-model.trim="user.email"
        label="Email"
        :rules="[v => !!checkEmail(v) || 'Це поле є обов\'язковим']"
        required
      />
      <v-text-field
        v-model="user.phone"
        label="Телефон"
        type="number"
        :min="minNum"
        :max="maxNum"
        :rules="[v => checkPhoneNumber(v) || 'Введіть корректний мобільний номер']"
        required
      ></v-text-field>
      <v-select
        v-model="user.deliveryAddress"
        v-if="!user.isOwnPickUp"
        :items="address"
        :rules="[v => !!checkAddress(v) || 'Це поле є обов\'язковим']"
        required
        label="Пункт отримання товару"
      />
      <div>
        <v-checkbox
          v-model="user.isOwnPickUp"
          class="mt-0"
        >
          <span slot="label">Заберу сам (вул. Шевченка 69, с. Жуляни)</span>
        </v-checkbox>
      </div>
      <pop-confirm-button
        button-color="green"
        button-label="Зберегти"
        type="text"
        :message="message"
        :action="updateUser"
      />
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ProfileEdit',
  data: () => ({
    user: {
      name: '',
      email: '',
      phone: '',
      deliveryAddress: null,
      isOwnPickUp: false
    },
    message: 'Зберегти дані користувача?',
    address: [{
      text: 'Не вибрано',
      value: null
    }, {
      text: 'ЖК Британський Квартал',
      value: 'britishKv'
    }, {
      text: 'Ашан (вул. Академіка Вільямса, 6а, Київ)',
      value: 'ashanVilliams'
    }, {
      text: 'Сільпо (вул. Маршала Конєва, 7, Київ)',
      value: 'silpoKoneva'
    }],
    minNum: 10,
    maxNum: 12,
    isEmailValid: false,
    afterSent: false
  }),
  mounted() {
    this.user = { ...this.$store.getters['user/getUser'] };
  },
  methods: {
    updateUser () {
      this.afterSent = true;
      if (this.validate()) {
        if (this.user.isOwnPickUp) this.user.deliveryAddress = null;
        this.$store.commit('user/updateUserInfo', this.user);
        this.$router.push('/profile');
      }
    },
    checkPhoneNumber (number) {
      const phoneLength = number.trim().length;
      const reg = /^[3][8]/;
      if (reg.test(number)) {
        return this.afterSent ? phoneLength === this.maxNum : true;
      } else {
        return this.afterSent ? phoneLength === this.minNum : true;
      }
    },
    checkEmail (email) {
      const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return this.afterSent ? regExp.test(email) : true;
    },
    checkAddress (address) {
      return !!(address || this.user.isOwnPickUp);
    },
    validate () {
      this.$refs.form.validate();
      return this.$refs.form.validate();
    }
  }
}
</script>
