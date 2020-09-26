<template>
  <div class="profile">
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
        :validate-on-blur="true"
        :rules="[v => !!checkEmail(v) || 'Це поле є обов\'язковим']"
        required
      />
      <v-text-field
        v-model="user.phone"
        label="Телефон"
        type="number"
        :min="minNum"
        :max="maxNum"
        :validate-on-blur="true"
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
      isOwnPickUp: false,
      isValid: false
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
    maxNum: 12
  }),
  mounted() {
    this.user = { ...this.$store.getters['user/getUser'] };
  },
  methods: {
    updateUser () {
      if (this.validate()) {
        this.user.isValid = true;
        if (this.user.isOwnPickUp) this.user.deliveryAddress = null;
        this.$store.commit('user/updateUserInfo', this.user);
        this.$router.push('/profile');
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
      this.$refs.form.validate();
      return this.$refs.form.validate();
    }
  }
}
</script>

<style scoped>
  .profile {
    width: 50%;
    transition: all .3s linear;
  }
  @media screen and (max-width: 768px) {
    .profile {
      width: 100%;
    }
  }
</style>
