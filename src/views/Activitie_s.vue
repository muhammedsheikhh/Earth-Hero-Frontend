<script>
import axios from "axios";
 export default {
   data: function () {
     return {
       activities: [],
       newActivityParams: {}
     };
   },
   created: function () {
     this.indexActivitiess();
   },
   methods: {
     indexActivitiess: function () {
       axios.get("/activities").then((response) => {
         console.log("activities index", response);
         this.activities = response.data;
       });
     },
     createActivity: function() {
            if (['major', 'minor', 'regular'].includes(this.newActivityParams.carbon_footprint)) {
                axios.post("/activities", this.newActivityParams)
                    .then((response) => {
                        console.log("activities create", response);
                        this.$router.push("/goalss");
                    })
                    .catch((error) => {
                        console.log("activities create error", error.response);
                    });
            } else {
                alert("Invalid Carbon Footprint. Please select Major, Minor, or Regular.");
            }
        },
     destroyActivity: function (activity) {
      axios.delete("/activities/" + activity.id).then((response) => {
        console.log("Activity Deleted", response);
        this.$router.push("/activities");
        var index = this.activities.indexOf(activity);
        this.activities.splice(index, 1);
      });
    },
   },
 };
 </script>

 <template>
  
  <div class="row" style="margin-top: 100px;">
    <!-- Create Activity Form -->
    <div class="contact-form col-12 col-md-6 mx-auto">
            <form id="activity-form" method="post" @submit.prevent="createGoal">
                <div class="section-title">
                    <h2 style="padding-top: 50px;"> Create Activity</h2>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Activity Type" class="form-control" v-model="newActivityParams.activity_type" />
                </div>

                <div class="form-group">
                    <input type="date" placeholder="Date" class="form-control" v-model="newActivityParams.date" />
                </div>

                <div class="form-group">
                    <input type="text" placeholder="Details" class="form-control" v-model="newActivityParams.detail" />
                </div>

                <div class="form-group">
                    <label for="carbonFootprint">Carbon Footprint</label>
                    <select class="form-control" v-model="newActivityParams.carbon_footprint" id="carbonFootprint">
                        <option disabled value="">Please select one</option>
                        <option value="major">Major</option>
                        <option value="minor">Minor</option>
                        <option value="regular">Regular</option>
                    </select>
                </div>

                <!-- Optionally, you can add success and error messages here -->
                <div id="activity-success" class="success">Activity Successfully Created!</div>
                <div id="activity-fail" class="error">Error creating activity. Please try again.</div>

                <div id="cf-submit">
                    <button style="background-color: black; color: aliceblue; margin: 10px;" v-on:click="createActivity()" type="submit" id="activity-submit" class="btn btn-transparent">Create Activity</button>
                </div>
            </form>
        </div>
    <!-- ./End Create Activity Form -->
</div>

  

<div class="container">
    <div class="section-title" style="margin-top: 50px; margin-bottom: 0px;">
        <h2>Activities</h2>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <!-- Added <transition-group> for the activities to have a fade effect -->
                    <transition-group name="fade" tag="div" class="row">
                        <div v-for="activity in activities" v-bind:key="activity.id" class="col-md-4 col-sm-6 col-xs-12 hello">
                            <div class="pricing-item">
                                <h3>Activity Type: {{ activity.activity_type }}</h3>
                                <div class="pricing-body">
                                    <div class="price">
                                        <span>Date: {{ activity.date }}</span>
                                    </div>
                                    <h4>Carbon Footprint: {{ activity.carbon_footprint }}</h4>
                                    <h4>Details: {{ activity.detail }}</h4>
                                    <h4>Activity ID: {{ activity.id }}</h4>
                                    <br>
                                    <button style="background-color: black; color: aliceblue;" class="btn btn-transparent" id="cf-submit" v-on:click="destroyActivity(activity)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</div>

 </template>
 <style>
 .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

 
 </style>