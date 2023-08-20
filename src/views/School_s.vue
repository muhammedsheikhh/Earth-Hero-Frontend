<script>
import axios from "axios";

export default {
  data:  function () {
    return {
      schools: []
    };
  },
  created: function() {
    this.indexSchools();
  },
  methods: {
    indexSchools: function() {
      axios.get("/schools").then(response => {
        this.schools = response.data;
      });
    },
  }
};
</script>



<template>
  <div class="report-container" style="margin-left: 250px; margin-right: 250px;">
    <div class="reports-display">
      <div class="section-title">
        <h2>List of Schools</h2>
      </div>
      <div v-for="school in schools" :key="school.id" class="report-card">
        <h2>{{ school.name }}</h2>
        <p><strong>Energy Consumption:</strong> {{ school.energy_consumption }}</p>
        <p><strong>Waste Management:</strong> {{ school.waste_management }}</p>
        <p><strong>Transportation:</strong> {{ school.transportation }}</p>
        <p><strong>Carbon Footprint:</strong> {{ school.carbon_footprint }}</p>
      </div>
    </div>
  </div>
</template>

