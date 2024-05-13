<template>
  <div class="make-report-container">
    <div class="container">
      <div class="row">
        <router-link to="/admin/account-list" class="btn btn-secondary btn-sm float-end back-btn">Back</router-link>
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Create Account</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="role">Role:</label>
                      <select class="form-control" id="role" v-model="userrole" required>
                        <option value="">Select Role</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="department">Department:</label>
                      <select class="form-control" id="department" v-model="department_id" required>
                        <option value="">Select Department</option>
                        <option v-for="(department, index) in departments" :key="index" :value=department.id>
                          {{ department.department_name }}
                        </option>
                        <!-- Add more options for other departments as needed -->
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">Name:</label>
                      <input type="text" class="form-control" id="name" v-model="name" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email">Email:</label>
                      <input type="email" class="form-control" id="email" v-model="email" required>
                      <div v-if="emailError" class="text-danger">{{ emailError }}</div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="password">Password:</label>
                      <input type="password" class="form-control" id="password" v-model="password" required>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-success">Create Account</button>
                <div v-if="registrationSuccess" class="alert alert-success mt-3 text-center">
                  User registered successfully!
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
import axios from 'axios';
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      department_id: '',
      name: '',
      email: '',
      password: '',
      emailError: '',
      registrationSuccess: false,
      departments: [],
      userrole: '' // Changed from role to userRole
    };
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },
  mounted() {
    this.fetchDepartments()
  },
  methods: {
    submitForm() {
      if (this.department_id && this.name && this.email && this.password && this.userRole) { // Include userRole in validation
        const formData = {
          department_id: this.department_id,
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.userRole // Pass userRole to formData
        };
        console.log(formData)
        axios.post('register', formData, {
          headers: {
            Authorization: 'Bearer ' + this.token // Include a space after 'Bearer'
          }
        })
          .then(response => {
            console.log(response);
            this.registrationSuccess = true;
            this.emailError = '';
          })
          .catch(error => {
            if (error.response && error.response.status === 422 && error.response.data.errors) {
              const emailErrors = error.response.data.errors.email;
              if (emailErrors && emailErrors.length > 0 && emailErrors[0] === 'The email has already been taken.') {
                this.emailError = 'The email has already been taken.';
              } else {
                this.emailError = 'Registration failed. Please try again.';
              }
            } else {
              this.emailError = 'An error occurred. Please try again.';
            }
            this.registrationSuccess = false;
          });
      } else {
        console.error('All fields are required');
      }
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
          //console.log(this.name)
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

.btn-secondary {
  font-size: 0.75rem;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.form-control {
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.text-danger {
  color: #dc3545;
}

.alert {
  margin-top: 1rem;
}

.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.back-btn {
  width: 80px;
  /* Adjust the width as desired */
}
</style>
