import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../views/HomePage.vue";
import Sign_up from "../views/Sign_up.vue";
import Log_in from "../views/Log_in.vue";
import Log_out from "../views/Log_out.vue";
import Goal_s from "../views/Goal_s.vue";
import Activitie_s from "../views/Activitie_s.vue";
import Report_s from "../views/Report_s.vue";
import School_s from "../views/School_s.vue";

  const routes = [
  {
      path: "/",
      name: "HomePage",
      component: HomePage,
  },
  { path: "/signup", name: "Signup", component: Sign_up },
  { path: "/login", name: "Login", component: Log_in },
  { path: "/logout", name: "Logout", component: Log_out },
  { path: "/Goals", name: "Goals", component: Goal_s},
  { path: "/Activities", name: "Activities", component: Activitie_s},
  { path: "/Report", name: "Report", component: Report_s},
  { path: "/School", name: "School", component: School_s},
  ];

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  export default router;