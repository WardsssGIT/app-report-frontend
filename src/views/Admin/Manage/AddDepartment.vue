<template>
    <div class="make-report-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Department Manager</h2>
        </div>
        <div class="card-body">
          <div class="input-section d-flex justify-content-center">
            <input type="text" v-model="newDepartment" placeholder="Enter department name" class="form-control mr-2">
            <button @click="addDepartment" class="btn btn-success">Add Department</button>
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
                <td>{{ department.name }}</td>
                <td>
                  <button @click="editDepartment(index)" class="btn btn-secondary action-button">Archive</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newDepartment: '',
        departments: []
      };
    },
    methods: {
        addDepartment() {
    if (this.newDepartment.trim() !== '') {
      this.departments.push({ name: this.newDepartment });
      this.newDepartment = '';
      this.$parent.fetchDepartments(); // Call the fetchDepartments method in the parent component
    }
      },
      editDepartment(index) {
        const newName = prompt('Enter new department name:');
        if (newName !== null && newName.trim() !== '') {
          this.departments[index].name = newName;
        }
      },
      removeDepartment(index) {
        if (confirm('Are you sure you want to remove this department?')) {
          this.departments.splice(index, 1);
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
  }
  
  input[type="text"] {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn {
    margin-left: 0.5rem;
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
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    color: #fff;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .action-button {
    padding: 6px 12px;
    font-size: 14px;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>