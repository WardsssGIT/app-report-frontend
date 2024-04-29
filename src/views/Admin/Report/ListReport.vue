<template>
    <div class='card'>
      <div class="card-header">
        <label for="" class="text-primary h4 float-start">Report's List</label>
        <router-link :to="{name:'admin-layout.report-create'}" class="btn btn-primary btn-sm float-end">Create Reports</router-link>
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
                <td>{{ report.Date_of_report }}</td>
                <td>{{ report.Report_name }}</td>
                <td>{{ report.Report_type }}</td>
                <td>{{ report.Department_involved }}</td>
                <td>
                  <router-link :to="{ name: 'View Reports', params: { data: report.id } }" button
                    class="btn btn-primary btn-view">View</router-link>
                  <router-link :to="{ name: 'Edit Reports', params: { data: report.id } }" button
                    class="btn btn-success btn-edit">Edit</router-link>
                  <button class="btn btn-danger btn-remove" @click="remove(report.id)">Remove</button>
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
    name: 'ListReport'
}
</script>