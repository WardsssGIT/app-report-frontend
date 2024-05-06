<template>
  <div class='card'>
    <div class="card-header">
      <label for="" class="text-primary h4 float-start">Report's List</label>
      <router-link :to="{ name: 'admin-layout.report-create' }" class="btn btn-primary btn-sm float-end">Create
        Reports</router-link>
    </div>
    <div class="card-body">
      <div class="table">
        <table class="table">
          <thead>
            <tr>
              <th>Date of Report</th>
              <th>Report Name</th>
              <th>Report Type</th>
              <th>Department Involved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="tableM">
            <tr v-for="(report, index) in reports" :key="index">
              <td>{{ report.date_of_report }}</td>
              <td>{{ report.report_name }}</td>
              <td>{{ report.report_type }}</td>
              <td>{{ report.department.department_name }}</td> <!-- Call getDepartmentName method -->
              <td>
                <button @click="archiveReport(report.id, index)"
                  class="btn btn-secondary action-button">Archive</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_USER_TOKEN } from '@/store/storeConstants.js';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'ListReport',
  data() {
    return {
      reports: [],
      departments: [] // Add departments array
    };
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN
    })
  },
  mounted() {
    this.fetchReports(); // Rename method to fetch reports
    this.fetchDepartments(); // Fetch departments
  },
  methods: {
    archiveReport(reportId, index) {
      if (confirm('Are you sure you want to archive this report?')) {
        axios.put(`/reports/archive/${reportId}`, null, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
          .then(response => {
            this.reports.splice(index, 1); // Remove the archived report from the list
          })
          .catch(error => {
            this.errorMessage = 'Error archiving report: ' + error.message;
            console.error(this.errorMessage);
          });
      }
    },
    async fetchReports() { // Rename method to fetchReports
      try {
        const response = await axios.get('reports', {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });
        this.reports = response.data;
        console.log(response)
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    },
    async fetchDepartments() { // Fetch departments
      try {
        const response = await axios.get('indexdepartment', {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });
        this.departments = response.data;
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }
  }
};
</script>
