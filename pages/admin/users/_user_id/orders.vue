<template>
  <loading-component v-if="loading"/>
  <div v-else class="col-12">
    <h2 class="mb-3">Замовлення користувача "{{ user.name }}"</h2>
    <v-alert type="warning" v-if="!orders.length">
      У користувача немає замовлень.
    </v-alert>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="orders"
        :key="orders.length"
        :options="options"
        :footer-props="footerProps"
        :loading="loadingDelete"
        class="elevation-3"
        light
      >
        <template v-slot:item.order="{ item }">
          <div v-for="el in item.order" class="history-card-info">
            <div v-if="el && el.count"><span>{{ el.title }}</span> x <b>{{ el.count }}</b></div>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingComponent from '@/components/common/LoadingComponent'

export default {
  components: { LoadingComponent },
  layout: 'admin-layout',
  data: () => ({
    messageText: 'Ви дійсно хочете видали користувача?',
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Товари', value: 'order' },
      { text: 'Ціна (грн)', value: 'price' },
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
    loading: true,
    loadingDelete: false
  }),
  async mounted () {
    const { user_id } = this.$route.params;
    await this.$store.dispatch('admin/getUserById', user_id);
    await this.$store.dispatch('admin/getOrderByUserId', user_id);
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      user: 'admin/getUser',
      orders: 'admin/getOrders'
    })
  },
  methods: {
    editUser (item) {

    },
    deleteItem (item) {

    }
  },
  beforeDestroy() {
    this.$store.commit('admin/clearUser');
  }
}
</script>

<style scoped>

</style>
