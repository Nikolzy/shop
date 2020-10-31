<template>
  <loading-component v-if="loading"/>
  <div v-else class="col-12">
    <h2>Додати товар</h2>
    <v-form ref="form" class="form">
      <v-text-field
        v-model="product.title"
        :rules="[v => !!v.trim().length || 'Це поле є обов\'язковим']"
        label="Назва"
        color="green"
      ></v-text-field>
      <v-file-input
        v-model="product.imageURL"
        chips
        label="Фото"
        color="green"
      ></v-file-input>
      <v-text-field
        v-model="product.price"
        :rules="[v => !!+v || 'Це поле є обов\'язковим']"
        type="number"
        label="Ціна"
        color="green"
      ></v-text-field>
      <v-textarea
        v-model="product.description"
        :rules="[v => !!v.trim().length || 'Це поле є обов\'язковим']"
        label="Опис"
        color="green"
        rows="4"
      ></v-textarea>
      <v-btn
        color="green"
        class="mt-5 mb-4"
        rounded
        dark
        @click="editProduct"
      >
        Зберегти
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingComponent from '@/components/common/LoadingComponent'
export default {
  components: { LoadingComponent },
  layout: 'admin-layout',
  data: () => ({
    product: null,
    loading: true,
    tempImageUrl: ''
  }),
  async mounted () {
    const { product_id } = this.$route.params;
    await this.$store.dispatch('admin/getAdminProductById', product_id);
    this.tempImageUrl = this.editedProduct.imageURL;
    this.product = {
      ...this.editedProduct,
      imageURL: null
    };
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      editedProduct: 'admin/getAdminEditedProduct'
    })
  },
  methods: {
    async editProduct () {
      if (this.validate()) {
        const { product_id } = this.$route.params;
        const data = {
          ...this.product,
          imageURL: (this.product.imageURL && this.product.imageURL.name) || this.tempImageUrl,
          id: +product_id
        };
        await this.$store.dispatch('admin/updateAdminProductById', data).then(() => {
          this.$dialog.notify.success('Товар успішно оновлено!', {
            position: 'top-right',
            timeout: 3000
          })
          this.$router.push('/admin/products');
        }).catch((e) => {
          this.$dialog.notify.error('При редагуванні товару виникла помилка! Спробуйте ще раз!', {
            position: 'top-right',
            timeout: 3000
          })
        })
      }
    },
    validate () {
      return this.$refs.form.validate();
    },
    displayDescription (str) {
      if (str.trim().length > 50) {
        return str.slice(0,50) + '...'
      }
      return str;
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
