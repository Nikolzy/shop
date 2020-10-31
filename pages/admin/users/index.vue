<template>
  <loading-component v-if="loading"/>
  <div v-else class="col-12">
    <h2>Користувачі</h2>
    <v-btn
      color="green"
      rounded
      dark
      class="mb-5 mt-5"
      to="/admin/users/add"
    >
      + Додати користувача
    </v-btn>
    <v-alert type="warning" v-if="!users.length">
      Користувачів в системі немає.
    </v-alert>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="users"
        :key="users.length"
        :options="options"
        :footer-props="footerProps"
        :loading="loadingDelete"
        class="elevation-3"
        light
      >
        <template v-slot:item.isAdmin="{ item }">
          <v-chip :color="item.isAdmin ? 'primary' : 'warning'" dark>
            {{ item.isAdmin ? 'Адмін' : 'Користувач' }}
          </v-chip>
        </template>
        <template v-slot:item.isOwnPickUp="{ item }">
          <v-chip :color="item.isOwnPickUp ? 'success' : ''" dark>
            {{ item.isOwnPickUp ? 'Так' : 'Ні' }}
          </v-chip>
        </template>
        <template v-slot:item.deliveryAddress="{ item }">
          <v-chip v-if="item.deliveryAddress" color="info" dark>
            {{ displayDeliveryAddress(item.deliveryAddress) }}
          </v-chip>
          <div v-else></div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                v-bind="attrs"
                class="mr-2"
                v-on="on"
                @click="editUser(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Редактировать</span>
          </v-tooltip>
          <div v-if="!item.isCurrentUser">
            <DeleteButtonWithConfirm :message-text="messageText" @deleteItem="deleteItem(item)" />
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DeleteButtonWithConfirm from '@/components/common/DeleteButtonWithConfirm'
import LoadingComponent from '@/components/common/LoadingComponent'

export default {
  components: { LoadingComponent, DeleteButtonWithConfirm },
  layout: 'admin-layout',
  data: () => ({
    messageText: 'Ви дійсно хочете видали користувача?',
    headers: [
      { text: 'UID', value: 'uid' },
      { text: 'Ім\'я', value: 'name' },
      { text: 'Емейл', value: 'email' },
      { text: 'Телефон', value: 'phone' },
      { text: 'Права', value: 'isAdmin' },
      { text: 'Самовивіз', value: 'isOwnPickUp' },
      { text: 'Адреса', value: 'deliveryAddress' },
      { text: 'Дії', value: 'actions', sortable: false },
    ],
    footerProps: {
      'items-per-page-options': [10, 20, 50, 100, 200, -1],
      'items-per-page-text': 'Записей на странице:'
    },
    options: {
      itemsPerPage: 50
    },
    address: [{
      text: 'ЖК Британський Квартал',
      value: 'britishKv'
    }, {
      text: 'Ашан (вул. Академіка Вільямса, 6а, Київ)',
      value: 'ashanVilliams'
    }, {
      text: 'Сільпо (вул. Маршала Конєва, 7, Київ)',
      value: 'silpoKoneva'
    }],
    users: [],
    loading: true,
    loadingDelete: false
  }),
  async mounted () {
    await this.$store.dispatch('admin/getUsers');
    this.users = this.usersInfo;
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      usersInfo: 'admin/getAdminUsers'
    })
  },
  methods: {
    editUser (item) {
      this.$router.push(`/admin/users/${item.uid}/edit`);
    },
    async deleteItem (item) {
      this.loadingDelete = true;
      await setTimeout(() => {
        this.users = this.users.filter(el => el.uid !== item.uid);
        this.$store.dispatch('admin/deleteUserById', item.uid);
        this.$dialog.notify.success('Користувач успішно видалений!', {
          position: 'top-right',
          timeout: 3000
        })
        this.loadingDelete = false;
      }, 1000)
    },
    displayDeliveryAddress (address) {
      if (address) {
        return this.address.find(el => el.value === address).text;
      }
      return '';
    }
  }
}
</script>

<style scoped>

</style>
