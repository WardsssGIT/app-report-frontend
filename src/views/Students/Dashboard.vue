<template>
  <div class="announcement-dashboard">
    <h1 class="text-primary">Announcement Dashboard</h1>
    <div class="announcement-form">
      <label for="department">Select Department:</label>
      <select class="form-control" id="department" v-model="department" required>
        <option value="">Select Department</option>
        <option v-for="(department, index) in departments" :key="index" :value="department.id">
          {{ department.department_name }}
        </option>
      </select>
      <label for="announcementText">Announcement:</label>
      <textarea v-model="announcementText" id="announcementText" class="form-control" rows="4"></textarea>
      <button @click="sendAnnouncement" class="btn btn-primary">Send Announcement</button>
    </div>
  </div>
</template>

<script>
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      department: '',
      //selectedDepartment: 'marketing',
      announcementText: '',
      departments: []
    };
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },
  mounted() {
    this.fetchDepartments();
    console.log(this.token);
  },
  methods: {
    sendAnnouncement() {
      // Implement logic to send announcement to the selected department
      console.log(`Announcement sent to ${this.selectedDepartment}: ${this.announcementText}`);
      // You can add further functionality here, like sending the announcement via API
    },
    async fetchDepartments() {
      await axios.get('indexdepartment', {
        headers: {
          Authorization: 'Bearer ' + this.token // Include a space after 'Bearer'
        }
      })
        .then(response => {
          this.departments = response.data.departments;
          console.log(response)
        })
        .catch(error => {
          console.error('Error fetching departments:', error);
          // Handle error if needed
        });
    }
  }
};
</script>

<style scoped>
.announcement-dashboard {
  padding: 20px;
}

.text-primary {
  color: #007bff;
}

.announcement-form {
  margin-top: 20px;
}

.form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>