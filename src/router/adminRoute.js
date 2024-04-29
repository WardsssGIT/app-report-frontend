export const adminRoute = (prop) => [
  {
    path: "/admin/dashboard",
    name: prop + ".dashboard",
    meta: {
      auth: true,
      name: "Dashboard",
      user: "admin",
    },
    component: () => import("../views/Students/Dashboard.vue"),
  },
  {
    path: "/admin/report-list",
    name: prop + ".report-list",
    meta: {
      auth: true,
      name: "Report List",
      user: "admin",
    },
    component: () => import("../views/Admin/Report/ListReport.vue"),
  },
  {
    path: "/admin/report-list/create",
    name: prop + ".report-create",
    meta: {
      auth: true,
      name: "Create Report",
      user: "admin",
    },
    component: () => import("../views/Admin/Report/CreateReport.vue"),
  },
  {
    path: "/admin/account-list",
    name: prop + ".account-list",
    meta: {
      auth: true,
      name: "Account List",
      user: "admin",
    },
    component: () => import("../views/Admin/Account/ListAccount.vue"),
  },
  {
    path: "/admin/account-list/create",
    name: prop + ".account-create",
    meta: {
      auth: true,
      name: "Create Account",
      user: "admin",
    },
    component: () => import("../views/Admin/Account/CreateAccount.vue"),
  },
  {
    path: "/admin/department-list/add",
    name: prop + ".department-list",
    meta: {
      auth: true,
      name: "Add Department",
      user: "admin",
    },
    component: () => import("../views/Admin/Manage/AddDepartment.vue"),
  }
  
];
