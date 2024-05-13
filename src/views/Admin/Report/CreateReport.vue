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
                      <input type="date" class="form-control" id="Date_of_report" v-model="report.date_of_report"
                        required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Report_name">Report Name:</label>
                      <input type="text" class="form-control" id="Report_name" v-model="report.report_name" required>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="Report_type">Report Type:</label>
                      <input type="text" class="form-control" id="Report_type" v-model="report.report_type" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="department">Department:</label>
                      <select class="form-control" id="department" v-model="report.department_id" placeholder="Select Department" required>
                        <option value="">Select Department</option>
                        <option v-for="(department, index) in departments" :key="index" :value="department.id">
                          {{ department.department_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="Description">Description:</label>
                  <textarea class="form-control" id="Description" rows="5" v-model="report.description"
                    required></textarea>
                </div>
                <!-- Submit error message -->
                <div v-if="submitError" class="alert alert-danger">{{ submitError }}</div>
                <!-- Success message -->
                <div v-if="submitSuccess" class="alert alert-success">{{ submitSuccess }}</div>
                <!-- Loading animation -->
                <div v-if="loading" class="loading-overlay">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div class="form-group">
                  <!-- Submit button with loading state -->
                  <button :disabled="loading" type="submit" class="btn btn-success">{{ loading ? 'Submitting...' : 'Submit' }}</button>
                  <button :disabled="loading" type="button" class="btn btn-primary" @click="saveAsTemporary">{{ loading ? 'Saving...' : 'Save as Temporary' }}</button>
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
        date_of_report: '',
        report_type: '',
        report_name: '',
        department_id: '',
        description: ''
      },
      departments: [],
      submitError: '',
      submitSuccess: '', // Added
      loading: false
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
    submitForm() {
      this.loading = true; // Show loading animation
      axios.post('reports-upload', this.report, {
        headers: {
          Authorization: 'Bearer ' + this.token 
        }
      })
        .then(() => {
          this.submitSuccess = 'Report submitted successfully'; // Added
          this.resetForm();
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data);
            this.submitError = error.response.data.message;
          } else {
            this.submitError = 'An error occurred.';
            console.log(this.report);
          }
        })
        .finally(() => {
          this.loading = false; // Hide loading animation
        });
    },
    async fetchDepartments() {
      this.loading = true; // Show loading animation
      try {
        const response = await axios.get('indexdepartment', {
          headers: {
            Authorization: 'Bearer ' + this.token 
          }
        });
        this.departments = response.data.departments;
        this.report.department = ''; 
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        this.loading = false; // Hide loading animation
      }
    },
    resetForm() {
      for (let key in this.report) {
        this.report[key] = '';
      }
      this.submitError = '';
    },
    saveAsTemporary() {
      this.loading = true; // Show loading animation
      axios.post('temporary-data', this.report, {
        headers: {
          Authorization: 'Bearer ' + this.token 
        }
      })
        .then(() => {
        })
        .catch(error => {
          console.error('Error saving report as temporary:', error);
        })
        .finally(() => {
          this.loading = false; // Hide loading animation
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
  width: 80px;
  /* Adjust the width as desired */
}

/* Loading animation overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>