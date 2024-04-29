export const studentRoute = (prop) => [{
    path: '/',
    name: prop + '.dashboard',
    meta: {
      auth: true,
      name: 'Dashboard',
      user: 'student'
    },
    component: () => import('../views/Students/Dashboard.vue')
  },
  {
    path: '/student/dashboard',
    name: prop + '.dashboard',
    meta: {
      auth: true,
      name: 'Dashboard',
      user: 'student'
    },
    component: () => import('../views/Students/Dashboard.vue')
  },
  {
    path: '/student/enrollment/overview',
    name: prop + '.enrollment-overview',
    meta: {
      auth: true,
      name: 'Enrollment Overview',
      user: 'student'
    },
    component: () => import('../views/Students/Dashboard.vue')
  },
  {
    path: '/student/enrollment/history',
    name: prop + '.enrollment-history',
    meta: {
      auth: true,
      name: 'Enrollment History',
      user: 'student'
    },
    component: () => import('../views/Students/Dashboard.vue')
  },
  {
    path: '/student/enrollment/certification',
    name: prop + '.enrollment-certification',
    meta: {
      auth: true,
      name: 'Enrollment Certification',
      user: 'student'
    },
    component: () => import('../views/Students/Dashboard.vue')
  },
  {
    path: '/student/enrollment/registration',
    name: prop + '.enrollment-registration',
    meta: {
      auth: true,
      name: 'Enrollment Registration',
      user: 'student'
    },
    component: () => import('../views/Students/Dashboard.vue')
  },
  /*  {
     path: '/student/payment/current-payment',
     name: prop + '.current-payment',
     meta: {
       auth: true,
       name: 'Payment Overview',
       user: 'student'
     },
     component: () => import('../views/student/payment/overview.vue')
   },
   {
     path: '/student/payment/payment-history',
     name: prop + '.payment-history',
     meta: {
       auth: true,
       name: 'Payment Assessment History',
       user: 'student'
     },
     component: () => import('../views/student/dashboard.vue')
   },
   {
     path: '/student/payment/payment-history',
     name: prop + '.payment-history',
     meta: {
       auth: true,
       name: 'Payment History',
       user: 'student'
     },
     component: () => import('../views/student/dashboard.vue')
   },
   {
     path: '/student/payment/student-card',
     name: prop + '.student-card',
     meta: {
       auth: true,
       name: 'Student Card',
       user: 'student'
     },
     component: () => import('../views/student/dashboard.vue')
   },
   {
     path: '/student/onboard/mopm',
     name: prop + '.onboard-mopm',
     meta: {
       auth: true,
       name: 'MOPM',
       user: 'student'
     },
     component: () => import('../views/student/onboard/mopm/mopm-view.vue')
   },
   {
     path: '/student/onboard/enrollment',
     name: prop + '.onboard-enrollment',
     meta: {
       auth: true,
       name: 'Onboard Training Enrollment',
       user: 'student'
     },
     component: () => import('../views/student/onboard/enrollment/enrollment-overview.vue')
   },
   {
     path: '/student/onboard/mopm/view',
     name: prop + '.onboard-mopm-view',
     meta: {
       auth: true,
       name: 'Performance Report View',
       user: 'student'
     },
     component: () => import('../views/student/onboard/mopm/performance-report-view.vue')
   },
   {
     path: '/student/onboard/assessment/view',
     name: prop + '.onboard-assessment-view',
     meta: {
       auth: true,
       name: 'Assessment',
       user: 'student'
     },
     component: () => import('../views/student/onboard/assessment/AssessmentView.vue')
   },
   {
     path: '/student/onboard/assessment/questioner',
     name: prop + '.onboard-questioner-view',
     meta: {
       auth: true,
       name: 'Examination',
       user: 'student'
     },
     component: () => import('../views/student/onboard/assessment/QuestionerView.vue')
   },
   {
     path: '/student/onboard/document-requerments',
     name: prop + '.onboard-document-requerments',
     meta: {
       auth: true,
       name: 'Pre Onboard Requirments',
       user: 'student'
     },
     component: () => import('../views/student/onboard/DocumentaryRequirements.vue')
   },
   {
     path: '/student/onboard/profile',
     name: prop + '.onboard-profile',
     meta: {
       auth: true,
       name: 'Onboard Profile',
       user: 'student'
     },
     component: () => import('../views/student/onboard/OnboardProfile.vue')
   },
   {
     path: '/student/classroom',
     name: prop + '.subjects-view',
     meta: {
       auth: true,
       name: 'Subject List',
       user: 'student'
     },
     component: () => import('../views/student/classroom/SubjectListView.vue')
   },
   {
     path: '/student/classroom/view/:subject',
     name: prop + '.subject-view-subject',
     meta: {
       auth: true,
       name: 'Subject View',
       user: 'student'
     },
     component: () => import('../views/student/classroom/SubjectsView.vue')
   },
   {
     path: '/student/classroom/view/:subject/topic/:lesson',
     name: prop + '.subject-view-lesson',
     meta: {
       auth: true,
       name: 'Lesson View',
       user: 'student'
     },
     component: () => import('../views/student/classroom/LessonView.vue')
   },
   {
     path: '/student/classroom/semestral-grades',
     name: prop + '.semestral-grade-view',
     meta: {
       auth: true,
       name: 'Semestral Grade',
       user: 'student'
     },
     component: () => import('../views/student/classroom/SemestralGradeView.vue')
   },
   {
     path: '/student/update-information',
     name: prop + '.update-information',
     meta: {
       auth: true,
       name: 'Student Update Information',
       user: 'student'
     },
     component: () => import('../views/student/enrollment/components/registration-form.vue')
   },
   {
     path: '/student/comprehesive-examination',
     name: prop + '.comprehesive-examination',
     meta: {
       auth: true,
       name: 'Comprehensive Examination',
       user: 'student'
     },
     component: () => import('@/views/student/comprehensive-examination/ComprehensiveView.vue')
   }, {
     path: '/student/comprehesive-examination/view',
     name: prop + '.comprehesive-examination-view',
     meta: {
       auth: true,
       name: 'Comprehensive Examination',
       user: 'student'
     },
     component: () => import('@/views/student/comprehensive-examination/ExaminationView.vue')
   }, {
     path: '/student/bma-applications',
     name: prop + '.mobile-applications',
     meta: {
       auth: true,
       name: 'BMA App',
       user: 'student'
     },
     component: () => import('@/views/student/MobileApplicationView.vue')
   } */
]