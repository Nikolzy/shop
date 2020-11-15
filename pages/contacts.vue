<template>
  <loading-component v-if="loading"/>
  <div v-else>
    <h1>Контакти</h1>
    <div class="mt-8 ml-5" v-if="contacts.phones && contacts.phones.length">
      <p v-for="(item, i) in contacts.phones" :key="i">
        {{ item.phone }}
      </p>
    </div>
    <div v-if="contacts.description.length">
      <p>
        {{ contacts.description }}
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import LoadingComponent from '@/components/common/LoadingComponent'

  export default {
    name: 'Contacts',
    components: { LoadingComponent },
    data: () => ({
      contacts: {},
      loading: true
    }),
    async mounted() {
      await this.$store.dispatch('settings/getGeneralSettings');
      this.contacts = JSON.parse(JSON.stringify(this.contactsData));
      this.loading = false;
    },
    computed: {
      ...mapGetters({
        contactsData: 'settings/getContactsGeneralSettings'
      })
    }
  }
</script>
