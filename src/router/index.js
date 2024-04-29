import { createRouter, createWebHistory } from "@ionic/vue-router";
import { clientRoute } from "./clientRoute";
import { studentRoute } from "./student-route.js";
import { adminRoute } from "./adminRoute.js";
import store from "../store/index";
import {
  IS_USER_AUTHENTICATE_GETTER,
  GET_USER_TYPE, AUTO_LOGIN_ACTION,
} from "@/store/storeConstants";
store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
const authRoute = (prop) => [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login", // Keep only one route pointing to the login component
    name: prop + ".login",
    meta: {
      auth: false,
      name: "Login",
      user: "guest",
    },
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "forget-password",
    name: prop + ".student-forget-password",
    meta: {
      auth: false,
      name: "Student Forget Password",
      user: "guest",
    },
    component: () => import("../views/Page/HomeView.vue"),
  },
];
const routes = [
  {
    path: "/",
    name: "client-layout",
    component: () => import("@/components/layouts/AuthLayout.vue"),
    children: authRoute("client-layout"),
  },
  /* {
     path: '/',
     name: 'client-layout',
     component: () => import('@/components/layouts/GuestLayout.vue'),
     children: clientRoute('client-layout')
   }, */

  /* {
     path: '/student',
     name: 'student-layout',
     component: () => import('@/components/layouts/MainLayout.vue'),
     children: studentRoute('student-layout')
   }, */
  {
    path: "/admin",
    name: "admin-layout",
    component: () => import("@/components/layouts/MainLayout.vue"),
    children: adminRoute("admin-layout"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

function studentUserMiddleware(to, from, next) {
  // Regular user middleware logic
  // console.log('Student user middleware')
  if (to.meta.user !== "admin") {
    next("/admin/dashboard");
  } else {
    next();
  }
}

function applicantUserMiddleware(to, from, next) {
  // Admin user middleware logic
  // console.log('Applicant user middleware')
  if (to.meta.user !== "applicant") {
    next("/applicant/dashboard");
  } else {
    next();
  }
}
// router.beforeEach((to, from, next) => {
//   const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
//   const isAuthType = store.getters[`auth/${GET_USER_TYPE}`]
//   document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`
//   if (isAuth) {
//     if (isAuthType === 'admin') {
//       studentUserMiddleware(to, from, next)
//     } else if (isAuthType === 'applicant') {
//       applicantUserMiddleware(to, from, next)
//     }
//   } else {
//     if (to.meta.user !== 'guest') {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })
export default router;