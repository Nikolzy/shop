<template>
  <loading-component v-if="loading"/>
  <div v-else class="col-12">
    <h2>Налаштування "Контакти"</h2>
    <v-form class="form">
      <div
        v-for="(item, i) in phones"
        :key="i"
        class="d-flex justify-space-between align-center"
      >
        <v-text-field
          v-model="item.phone"
          color="green"
          :label="`Телефон ${i + 1}`"
        >
        </v-text-field>
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="red"
          @click="deletePhoneField(i)"
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <v-btn
        class="mb-2"
        fab
        dark
        x-small
        color="green"
        @click="addPhoneField"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-textarea
        v-model="description"
        label="Опис"
        color="green"
        rows="4"
      ></v-textarea>
      <v-btn
        color="green"
        class="mt-5 mb-4"
        rounded
        dark
        @click="saveSettings"
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
    loading: true,
    phones: [{
      phone: ''
    }],
    description: ''
  }),
  async mounted () {
    await this.$store.dispatch('admin/getGeneralSettings');
    this.phones = this.contacts && this.contacts.phones.length
      ? JSON.parse(JSON.stringify(this.contacts.phones))
      : this.phones
    this.description = this.contacts && this.contacts.description.length
      ? this.contacts.description
      : this.description
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      contacts: 'admin/getContactsGeneralSettings'
    })
  },
  methods: {
    addPhoneField () {
      this.phones.push({ phone: '' });
    },
    deletePhoneField (i) {
      this.phones.splice(i,1);
    },
    async saveSettings () {
      await this.$store.dispatch('admin/setContactsToGeneralSettings', {
        phones: this.phones,
        description: this.description
      }).then(() => {
        this.$dialog.notify.success('Контакти успішно оновлено!', {
          position: 'top-right',
          timeout: 3000
        })
      })
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
