<template>
  <loading-component v-if="loading || !user"/>
  <div v-else>
    <h1>Редагувати користувача</h1>
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
      <v-select
        v-model="user.deliveryAddress"
        v-if="!user.isOwnPickUp"
        :items="address"
        :rules="[v => !!checkAddress(v) || 'Це поле є обов\'язковим']"
        required
        label="Пункт отримання товару"
        color="green"
      />
      <div>
        <v-checkbox
          v-model="user.isOwnPickUp"
          class="mt-0"
          color="green"
        >
          <span slot="label">Заберу сам (вул. Шевченка 69, с. Жуляни)</span>
        </v-checkbox>
      </div>
      <v-checkbox
        v-if="!user.isCurrentUser"
        v-model="user.isAdmin"
        color="green"
        label="Адмін"
      />
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
import LoadingComponent from '@/components/common/LoadingComponent';
import { mapGetters } from 'vuex';

export default {
  components: { LoadingComponent },
  layout: 'admin-layout',
  data: () => ({
    user: {},
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
    loading: true
  }),
  async mounted() {
    const { user_id } = this.$route.params;
    await this.$store.dispatch('admin/getUserById', user_id);
    this.user = { ...this.userInfo };
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      userInfo: 'admin/getEditedUser'
    })
  },
  methods: {
    async updateUser () {
      if (this.validate()) {
        const { user_id } = this.$route.params;
        this.user.isValid = true;
        await this.$store.dispatch('admin/updateUserInfoById', this.user).then(() => {
          this.$dialog.notify.success('Користувач успішно оновлений!', {
            position: 'top-right',
            timeout: 3000
          })
          this.$router.push('/admin/users');
        }).catch(() => {
          this.$dialog.notify.error('При оновлені користувача виникла помилка! Спробуйте ще раз!', {
            position: 'top-right',
            timeout: 3000
          })
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
