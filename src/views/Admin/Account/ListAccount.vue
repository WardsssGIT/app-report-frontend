<template>
  <div class="card">
    <div class="card-header">
      <label for="" class="text-primary h4 float-start">Account List</label>
      <router-link :to="{name:'admin-layout.account-create'}" class="btn btn-primary btn-sm float-end">Create Account</router-link>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="text-center">ID Number</th>
              <th class="text-center">Name</th>
              <th class="text-center">Email</th>
              <th class="text-center">Department</th>
              <th class="text-center">Date of Account Creation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td class="text-center">{{ account.id }}</td>
              <td class="text-center">{{ account.name }}</td>
              <td class="text-center">{{ account.email }}</td>
              <td class="text-center">{{ account.department_name }}</td>
              <td class="text-center">{{ formatDate(account.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      accounts: []
    };
  },
  mounted() {
    this.fetchUserAccounts();
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },
  methods: {
    async fetchUserAccounts() {
      try {
        const response = await axios.get('useraccounts', { headers: {
            Authorization: 'Bearer ' + this.token // Include a space after 'Bearer'
          }}); // Adjust the URL based on your API route
        this.accounts = response.data.useraccounts;
        console.log(response)
      } catch (error) {
        console.error('Error fetching user accounts:', error);
      }
    },
    formatDate(date) {
      // Implement your date formatting logic here
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.table td {
  text-align: center;
}
</style>