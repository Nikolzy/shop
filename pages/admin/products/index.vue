<template>
  <loading-component v-if="loading"/>
  <div v-else class="col-12">
    <h2>Товари</h2>
    <v-btn
      color="green"
      rounded
      dark
      class="mb-5 mt-5"
      to="/admin/products/add"
    >
      + Додати товар
    </v-btn>
    <v-alert type="warning" v-if="!products.length">
      Товарів не додано.
    </v-alert>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="products"
        :key="products.length"
        :options="options"
        :footer-props="footerProps"
        :loading="loadingDelete"
        class="elevation-3"
        light
      >
        <template v-slot:item.imageURL="{ item }">
          <div class="d-flex justify-center image">
            <v-img :src="`/product_images/${item.imageURL}`" style="width: 50px;"></v-img>
          </div>
        </template>
        <template v-slot:item.description="{ item }">
          <div style="max-width: 350px;">
            {{ displayDescription(item.description) }}
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                v-bind="attrs"
                class="mr-2"
                v-on="on"
                @click="editProduct(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Редактировать</span>
          </v-tooltip>
          <DeleteButtonWithConfirm :message-text="messageText" @deleteItem="deleteItem(item)" />
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
    middleware: 'admin',
    data: () => ({
      messageText: 'Ви дійсно хочете видали продукт?',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Фото', value: 'imageURL' },
        { text: 'Назва', value: 'title' },
        { text: 'Ціна (грн)', value: 'price' },
        { text: 'Опис', value: 'description' },
        { text: 'Дії', value: 'actions' },
      ],
      footerProps: {
        'items-per-page-options': [10, 20, 50, 100, 200, -1],
        'items-per-page-text': 'Записей на странице:'
      },
      options: {
        itemsPerPage: 50
      },
      products: [],
      loading: true,
      loadingDelete: false
    }),
    async mounted () {
      await this.$store.dispatch('admin/getAdminProducts');
      this.products = [...this.productsState];
      this.loading = false;
    },
    computed: {
      ...mapGetters({
        productsState: 'admin/getAdminProducts'
      })
    },
    methods: {
      displayDescription (str) {
        if (str.trim().length > 50) {
          return str.slice(0,50) + '...'
        }
        return str;
      },
      editProduct (item) {
        this.$router.push(`/admin/products/${item.id}/edit`);
      },
      async deleteItem (item) {
        this.loadingDelete = true;
        this.products = this.products.filter(el => el.id !== item.id);
        await setTimeout(() => {
          this.$store.dispatch('admin/deleteProductById', item.id).then(() => {
            this.$dialog.notify.success('Товар успішно видалений!', {
              position: 'top-right',
              timeout: 3000
            })
            this.loadingDelete = false;
          }).catch(() => {
            this.$dialog.notify.success('При видаленні товару виникла помилка! Спробуйте ще раз!', {
              position: 'top-right',
              timeout: 3000
            })
            this.loadingDelete = false;
          })
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
