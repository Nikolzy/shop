<template>
  <div class="col-12">
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
        :rules="[v => !!v || 'Це поле є обов\'язковим']"
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
        @click="createProduct"
      >
        Створити
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: 'admin-layout',
  data: () => ({
    product: {
      title: '',
      imageURL: null,
      price: '',
      description: '',
      count: 1
    }
  }),
  methods: {
    async createProduct () {
      if (this.validate()) {
        const data = {
          ...this.product,
          imageURL: this.product.imageURL.name
        }
        await this.$store.dispatch('admin/setAdminProduct', data).then(() => {
          this.$dialog.notify.success('Товар успішно створений!', {
            position: 'top-right',
            timeout: 3000
          })
          this.$router.push('/admin/products');
        }).catch(() => {
          this.$dialog.notify.success('При створенні товару виникла помилка! Спробуйте ще раз!', {
            position: 'top-right',
            timeout: 3000
          })
        })
      }
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
