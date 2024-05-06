export const staffRoute = (prop) => [
    {
      path: "/staff/dashboard",
      name: prop + ".dashboard",
      meta: {
        auth: true,
        name: "Dashboard",
        user: "staff",
      },
      component: () => import("../views/Staff/StaffDashboard/Dashboard.vue"),
    },
    // {
    //   path: "/staff/report-list",
    //   name: prop + ".report-list",
    //   meta: {
    //     auth: true,
    //     name: "Report List",
    //     user: "staff",
    //   },
    //   component: () => import("../views"),
    // },
]