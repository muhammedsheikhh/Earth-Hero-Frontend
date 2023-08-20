<script>
 import axios from "axios";
 export default {
   data: function () {
     return {
       reports: [],
       newReportParams: {},
     };
   },
   created: function () {
     this.indexReports();
   },
   methods: {
     indexReports: function () {
       axios.get("/reports").then((response) => {
         console.log("reports index", response);
         this.reports = response.data;
       });
     },
     createReport: function () {
      this.newReportParams.recommendations = this.generateRecommendations(this.newReportParams.footprint);
       axios
         .post("/reports", this.newReportParams)
         .then((response) => {
           console.log("reports create", response);
           this.$router.push("/reports");
         })
         .catch((error) => {
           console.log("reports create error", error.response);
         });
     },
     generateRecommendations: function(footprint) {
    let recommendations = '';

    switch (footprint) {
        case "major":
            recommendations = `
                - Reduce Frequency: Try to engage in this activity less often.
                - Eco-friendly Alternatives: Look for sustainable alternatives.
                - Offset Emissions: Consider investing in carbon offsets.
                - Stay Informed: Regularly read about the environmental impacts.
            `;
            break;
        case "minor":
            recommendations = `
                - Sustainable Improvements: Look for ways to make this activity more sustainable.
                - Maintain Awareness: Keep updated with new information.
                - Eco-friendly Products: Choose products made sustainably.
                - Encourage Others: Share your knowledge.
            `;
            break;
        case "regular":
            recommendations = `
                - Balanced Approach: Maintain a balance with this activity.
                - Routine Checks: Periodically review this activity.
                - Localize Activities: Try to reduce transport emissions.
                - Recycle and Reuse: Ensure you're recycling or reusing.
            `;
            break;
    }

    return recommendations;
    }
   },
 };
 </script>
 
 <template>
  <div class="report-container" style="margin-left: 250px; margin-right: 250px;">
   
    <div class="report-generation">
      <div class="section-title">
        <h2>New Report</h2>
    </div>
      
      <div class="input-section">
          <label for="activityId">Activity ID:</label>
          <input type="text" id="activityId" v-model="newReportParams.activity_id" />
          <button style="background-color: black; color: aliceblue;" v-on:click="createReport()">Generate Report</button>
      </div>
    </div>

    <div class="reports-display">
      <div class="section-title">
        <h2>All Reports</h2>
      </div>
      <div v-for="reportObj in reports" :key="reportObj.report.id" class="report-card">
          <h2>Date: {{ reportObj.report.date }}</h2>
          <p><strong>Report Data:</strong> {{ reportObj.report.report_data }}</p>
          <p><strong>Recommendations:</strong> {{ reportObj.report.recommendations }}</p>
          <p><strong>Your School:</strong> {{ reportObj.school.name }}</p>
          <p><strong>Energy Consumption:</strong> {{ reportObj.school.energy_consumption }}</p>
        <p><strong>Waste Management:</strong> {{ reportObj.school.waste_management }}</p>
        <p><strong>Transportation:</strong> {{ reportObj.school.transportation }}</p>
        <p><strong>Carbon Footprint:</strong> {{ reportObj.school.carbon_footprint }}</p>
      </div>
    </div>
  </div>
</template>


 
 <style>
.report-container {
    font-family: Arial, sans-serif;
    margin: 2em;
    color: #333;
}

.report-generation {
    background-color: #f7f7f7;
    padding: 2em;
    margin-bottom: 2em;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.input-section {
    display: flex;
    align-items: center;
    gap: 1em;
}

.input-section label {
    font-size: 1.1em;
    font-weight: bold;
}

.input-section input {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 2;
}

.input-section button {
    padding: 0.5em 1em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.input-section button:hover {
    background-color: #0056b3;
}

.reports-display {
    margin-top: 2em;
}

.report-card {
    background-color: #fff;
    padding: 1.5em;
    margin-bottom: 1em;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.report-card h2 {
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
    font-size: 1.4em;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.report-card {
    /* ... existing styles ... */
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    animation-delay: 0.2s;
}

</style>