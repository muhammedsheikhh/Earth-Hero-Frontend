<script>
import axios from "axios";
 export default {
   data: function () {
     return {
       goals: [],
       newGoalParams: {},
     };
   },
   created: function () {
     this.indexGoals();
   },
   methods: {
     indexGoals: function () {
       axios.get("/goals").then((response) => {
         console.log("goals index", response);
         this.goals = response.data;
       });
     },
     createGoal: function () {
      this.newGoalParams.achivemet = this.computeAchievement(this.newGoalParams.startdate, this.newGoalParams.enddate);
       axios
         .post("/goals", this.newGoalParams)
         .then((response) => {
           console.log("goals create", response);
           this.$router.push("/goals");
         })
         .catch((error) => {
           console.log("goals create error", error.response);
         });
     },
     destroyGoal: function (goal) {
      axios.delete("/goals/" + goal.id).then((response) => {
        console.log("Goal Deleted", response);
        this.$router.push("/goals");
        var index = this.goals.indexOf(goal);
        this.goals.splice(index, 1);
      });
    },
    calculateProgress: function (start, end) {
      let startDate = new Date(start);
      let endDate = new Date(end);
      let currentDate = new Date();

      if (currentDate <= startDate) return 0;
      if (currentDate >= endDate) return 100;

      let totalDuration = endDate - startDate;
      let elapsedDuration = currentDate - startDate;

      return Math.round((elapsedDuration / totalDuration) * 100);
    },
    computeAchievement: function(start, end) {
    let progress = this.calculateProgress(start, end);
    if (progress <= 25) {
      return "Just Started!";
    } else if (progress <= 50) {
      return "On the Way!";
    } else if (progress <= 75) {
      return "Almost There!";
    } else if (progress < 100) {
      return "Finishing Up!";
    } else {
      return "Completed!";
    }
  },
   },
 };
 </script>

 <template>


<div class="row" style="margin-top: 100px;">
  
    <!-- Create Goal Form -->
    <div class="contact-form col-12 col-md-6 mx-auto">
        <form id="goal-form" method="post" @submit.prevent="createGoal">
          <div class="section-title">
            <h2 style="padding-top: 50px;"> Create Goal</h2>
          </div>
            <div class="form-group">
                <input type="text" placeholder="Description" class="form-control" v-model="newGoalParams.description" />
            </div>

            <div class="form-group">
                <input type="date" placeholder="Start Date" class="form-control" v-model="newGoalParams.startdate" />
            </div>

            <div class="form-group">
                <input type="date" placeholder="End Date" class="form-control" v-model="newGoalParams.enddate" />
            </div>

            <!--<div class="form-group">
                <input type="text" placeholder="Status" class="form-control" v-model="newGoalParams.status" />
            </div> 

            <div class="form-group">
                <input type="text" placeholder="Achievement" class="form-control" v-model="newGoalParams.achivemet" />
            </div> -->

            <!-- Optionally, you can add success and error messages here -->
            <div id="goal-success" class="success">Goal Successfully Created!</div>
            <div id="goal-fail" class="error">Error creating goal. Please try again.</div>

            <div id="cf-submit">
                <button style="background-color: black; color: aliceblue; margin: 10px;" type="submit" id="goal-submit" class="btn btn-transparent">Create Goal</button>
            </div>
        </form>
    </div>
    <!-- ./End Create Goal Form -->
</div>
     
<!-- ... (rest of your code) -->

<div class="container">
    <div class="section-title" style="margin-top: 50px; margin-bottom: 0px;">
        <h2>Goals</h2>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div class="row">
                        <!-- For each goal, use the <transition> tag to apply a fade effect -->
                        <transition-group name="fade" tag="div" class="row">
                            <div v-for="goal in goals" v-bind:key="goal.id" class="col-md-4 col-sm-6 col-xs-12 hello">
                                <div class="pricing-item">
                                    <h3>Description:<h5>{{ goal.description }}</h5> </h3>
                                    <div class="pricing-body">
                                        <div class="price">
                                            <span style=" margin-right: 15px;">Start Date: {{ goal.startdate }}</span>
                                            <span>End Date: {{ goal.enddate }}</span>
                                        </div>
                                        <H6>Status: {{ goal.status }}</H6>
                                      <div class="progress">
                                        <div 
                                            class="progress-bar" 
                                            role="progressbar" 
                                            v-bind:style="{ width: calculateProgress(goal.startdate, goal.enddate) + '%' }" 
                                            aria-valuenow="calculateProgress(goal.startdate, goal.enddate)" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100">
                                            {{ calculateProgress(goal.startdate, goal.enddate) }}%
                                        </div>
                                      </div>
                                        
                                        <h4>Achievement: <h5>{{ goal.achivemet }}</h5></h4>
                                        <br>
                                        <button style="background-color: black; color: aliceblue;" class="btn btn-transparent" id="cf-submit" v-on:click="destroyGoal(goal)">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ... (rest of your code) -->



 </template>
 <style>
 .section-title {
    text-align: center;
    margin-bottom: 30px;
}

.contact-form {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 20px;
}

.btn-transparent {
    border: 1px solid black;
    transition: background-color 0.3s, color 0.3s;
}

.btn-transparent:hover {
    background-color: aliceblue;
    color: black;
}

.pricing-item {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.pricing-body {
    padding: 10px 0;
}

.price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}

.success, .error {
    display: none; /* Initially hide them */
    text-align: center;
    margin: 10px 0;
}

.success {
    color: green;
}

.error {
    color: red;
}

.hello {
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}


 </style>
