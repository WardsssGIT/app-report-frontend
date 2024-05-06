<template>
  <div class="make-report-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Department Manager</h2>
      </div>
      <div class="card-body">
        <div class="input-section d-flex justify-content-center">
          <input type="text" v-model="departmentName" placeholder="Enter department name" class="form-control mr-2">
          <button @click="addDepartment" class="btn btn-success">Add Department</button>
        </div>
        <div v-if="showAlert" class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Department added successfully.
          <button type="button" class="close" @click="showAlert = false" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(department, index) in departments" :key="index">
              <td>{{ department.department_name }}</td>
              <td>
                <button @click="archiveDepartment(index)" class="btn btn-secondary action-button">Archive</button>
              </td>
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
      departmentName: '',
      departments: [],
      showAlert: false,
      errorMessage: ''
    };
  },

  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },

  mounted() {
    this.fetchDepartments();
  },

  methods: {
    addDepartment() {
      if (this.departmentName !== '') {
        axios.post('adddepartment', { department_name: this.departmentName }, {
          headers: {
            Authorization: 'Bearer ' + this.token // Include a space after 'Bearer'
          }
        })
          .then(response => {
            console.log(response);
            this.departmentName = '';
            console.log(this.departmentName);
            this.fetchDepartments(); 
            this.showAlert = true; 
          })
          .catch(error => {
            this.errorMessage = 'Error adding department: ' + error.message;
            console.error(this.errorMessage);
          });
      }
    },

    archiveDepartment(index) {
      if (confirm('Are you sure you want to archive this department?')) {
        const departmentId = this.departments[index].id;
        axios.put(`/reports/archive/${departmentId}`, null, {
          headers: {
            Authorization: 'Bearer ' + this.token 
          }
        })
          .then(response => {
            this.fetchDepartments(); 
          })
          .catch(error => {
            this.errorMessage = 'Error archiving department: ' + error.message;
            console.error(this.errorMessage);
          });
      }
    },

    async fetchDepartments() {
      try {
        const response = await axios.get('indexdepartment', {
          headers: {
            Authorization: 'Bearer ' + this.token 
          }
        });
        this.departments = response.data.departments;
        console.log(response.data.departments);
      } catch (error) {
        this.errorMessage = 'Error fetching departments: ' + error.message;
        console.error(this.errorMessage);
      }
    }
  }
};
</script>

<style scoped>
.make-report-container {
  padding: 20px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem;
  margin-top: 25px;
}

.card-title {
  margin-bottom: 0;
  font-size: 24px;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
}

.input-section {
  margin-bottom: 20px;
}

.input-section.d-flex {
  justify-content: center;
  align-items: center;
}

.form-control {
  max-width: 300px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 16px;
}

.btn {
  margin-left: 0.5rem;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.action-button {
  padding: 6px 12px;
  font-size: 14px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.alert {
  margin-top: 1rem;
  border-radius: 4px;
  font-size: 16px;
}
</style>