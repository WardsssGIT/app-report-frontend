<template>
  <div class="make-report-container">
    <div class="container">
      <div class="row">
        <router-link to="/admin/report-list" class="btn btn-secondary btn-sm float-end back-btn">Back</router-link>
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Make Report</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Date_of_report">Date of Report:</label>
                      <input type="date" class="form-control" id="Date_of_report" v-model="report.Date_of_report" required>
                      <small class="form-text text-muted">Ser. No.: N2024ACA002</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Report_name">Report Name:</label>
                      <input type="text" class="form-control" id="Report_name" v-model="report.Report_name" required>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Report_type">Report Type:</label>
                      <input type="text" class="form-control" id="Report_type" v-model="report.Report_type" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Department_involved">Department Involved:</label>
                      <select class="form-control" id="Department_involved" v-model="report.Department_involved" required>
                        <option value="">Select a department</option>
                        <option v-for="department in departments" :key="department.id" :value="department.name">{{ department.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="Description">Description:</label>
                  <textarea class="form-control" id="Description" rows="5" v-model="report.Description" required></textarea>
                </div>
                <div v-if="submitError" class="alert alert-danger">{{ submitError }}</div>
                <div class="form-group">
                  <button type="submit" class="btn btn-success">Submit</button>
                  <button type="button" class="btn btn-primary" @click="saveAsTemporary">Save as Temporary</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'CreateReport',
  data() {
    return {
      report: {
        Date_of_report: '',
        Report_name: '',
        Report_type: '',
        Description: '',
        Department_involved: '',
      },
      departments: [],
      submitError: ''
    };
  },
  mounted() {
    this.fetchDepartments();
    console.log(this.token);
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },
  methods: {
    fetchDepartments() {
      axios.get('departments')
        .then(response => {
          this.departments = response.data;
        })
        .catch(error => {
          console.error('Error fetching departments:', error);
        });
    },
    submitForm() {
      for (let key in this.report) {
        if (!this.report[key]) {
          this.submitError = 'Please fill out all fields.';
          return;
        }
      }
      const headers = {
        Authorization: `Bearer ${this.token}`
      };
      axios.post('reports-upload', this.report, { headers })
        .then(() => {
          this.resetForm();
          alert('Report submitted successfully!');
          this.fetchdata(); // Ensure this function exists or replace it with an appropriate one
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data);
            this.submitError = error.response.data.message;
          } else {
            this.submitError = 'An error occurred.';
          }
        });
    },
    resetForm() {
      for (let key in this.report) {
        this.report[key] = '';
      }
      this.submitError = '';
    },
    saveAsTemporary() {
      axios.post('save-temporary-report', this.report)
        .then(() => {
          alert('Report saved as temporary.');
        })
        .catch(error => {
          console.error('Error saving report as temporary:', error);
          alert('An error occurred while saving the report as temporary.');
        });
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
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem;
  margin-top: 25px;
}

.card-title {
  margin-bottom: 0;
}

.card-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn {
  margin-left: 0.5rem;
}

.back-btn {
  width: 80px; /* Adjust the width as desired */
}
</style>
