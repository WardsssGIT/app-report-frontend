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
              <td>{{ report.department ? report.department.department_name : '' }}</td>
              <td>
                <button @click="approvedReport(report.id, index)"
                  class="btn btn-success btn-sm action-button">Approve</button>
                <button @click="disapprovedReport(report.id, index)"
                  class="btn btn-success btn-sm action-button btn-dissaproved">Disapproved</button>
                <button @click="viewReport(report.id, index)"
                  class="btn btn-secondary btn-sm action-button">View</button>
                <button @click="archiveReport(report.id, index)"
                  class="btn btn-secondary btn-sm action-button">Archive</button>
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
      departments: [], // Add departments array
      pdfUrl: ''
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
    approvedReport(reportId, index) {
      if (confirm('Are you sure you want to approve this report?')) {
        axios.post(`/reports/approve/${reportId}`, null, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
          .then(response => {
            this.reports.splice(index, 1); // Assuming the backend responds with the updated report data after approval
            // You can update the report in the UI with the updated data
            this.reports[index] = response.data;
          })
          .catch(error => {
            this.errorMessage = 'Error approving report: ' + error.message;
            console.error(this.errorMessage);
          });
      }
    },
    disapprovedReport(reportId, index) {
      if (confirm('Are you sure you want to disapproved this report?')) {
        axios.post(`/reports/disapprove/${reportId}`, null, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
          .then(response => {
            this.reports.splice(index, 1); // Assuming the backend responds with the updated report data after approval
            // You can update the report in the UI with the updated data
            this.reports[index] = response.data;
          })
          .catch(error => {
            this.errorMessage = 'Error disapproving report: ' + error.message;
            console.error(this.errorMessage);
          });
      }
    },
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
    viewReport(reportId) {
      axios.get(`/reports/{reportId}/pdf/${reportId}`, {
        headers: {
          Authorization: 'Bearer ' + this.token
        },
        responseType: 'blob' // Set response type to 'blob' to handle binary data
      })
        .then(response => {
          // Create a Blob object from the response data
          const blob = new Blob([response.data], { type: 'application/pdf' });

          // Create a URL for the Blob object
          const url = URL.createObjectURL(blob);

          // Open the PDF in a new tab
          window.open(url, '_blank');
        })
        .catch(error => {
          console.error('Error fetching PDF:', error);
          // Handle error
        });
    },


    async fetchReports() { // Rename method to fetchReports
      try {
        const response = await axios.get('show-reports', {
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

<style scoped>
.pdfviewer {
  display: none;
}

.btn {
  margin-right: 10px;
}

.btn-dissaproved {
  background-color: rgb(228, 84, 84);
  border-style: none;
  color: white;
}

.table {
  border-collapse: collapse;
  width: 100%;  
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
  text-align: center;
  /* Center align text in table headers */
}

.btn {
  margin-right: 10px;
}

.btn-dissaproved {
  background-color: rgb(228, 84, 84);
  border-style: none;
  color: white;
}

.table td {
  text-align: center;
}
</style>