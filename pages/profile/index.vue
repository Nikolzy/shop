<template>
  <div class="profile">
    <h1>Мій профіль</h1>
    <v-form ref="form">
      <v-text-field
        v-model.trim="user.name"
        label="Ім'я"
        :disabled="true"
      />
      <v-text-field
        v-model.trim="user.email"
        label="Email"
        :disabled="true"
      />
      <v-text-field
        v-model="user.phone"
        label="Телефон"
        type="number"
        :disabled="true"
      ></v-text-field>
      <v-select
        v-model="user.deliveryAddress"
        v-if="!user.isOwnPickUp"
        :items="address"
        :disabled="true"
        label="Пункт отримання товару"
      />
      <div v-if="!user.deliveryAddress">
        <v-checkbox
          v-model="user.isOwnPickUp"
          class="mt-0"
          :disabled="true"
        >
          <span slot="label">Заберу сам (вул. Шевченка 69, с. Жуляни)</span>
        </v-checkbox>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          @click="$router.push('/profile/edit')"
          dark
          color="orange"
        >
          Редагувати
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data: () => ({
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
      }]
    }),
    computed: {
      user() {
        return this.$store.getters['user/getUser'];
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
