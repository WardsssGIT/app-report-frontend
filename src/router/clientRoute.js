export const clientRoute = (prop) => [{
        path: '/',
        name: prop + '.home',
        meta: {
            auth: false,
            name: 'Home',
            user: 'guest'
        },
        component: () => import('../views/Page/HomeView.vue')
    },
    {
        path: '/admission',
        name: prop + '.admission',
        meta: {
            auth: false,
            name: 'Admission',
            user: 'guest'
        },
        component: () => import('../views/Page/AdmissionView.vue')
    },
    {
        path: '/achievements',
        name: prop + '.achievements',
        meta: {
            auth: false,
            name: 'Achievements',
            user: 'guest'
        },
        component: () => import('../views/Page/AchievementsView.vue')
    },
    {
        path: '/news-and-events',
        name: prop + '.newsAndEvents',
        meta: {
            auth: false,
            name: 'News and Events',
            user: 'guest'
        },
        component: () => import('@/views/Page/NewsAndEvents.vue')
    },
    {
        path: '/onboard-training',
        name: prop + '.onboardTraining',
        meta: {
            auth: false,
            name: 'Onboard Training',
            user: 'guest'
        },
        component: () => import('@/views/Page/OnboardTraining.vue')
    },
    {
        path: '/disciple-and-drills',
        name: prop + '.disciplineAndDrills',
        meta: {
            auth: false,
            name: 'Discipline & Drills',
            user: 'guest'
        },
        component: () => import('@/views/Page/DisciplineAndDrills.vue')
    },
    {
        path: '/research',
        name: prop + '.research',
        meta: {
            auth: false,
            name: 'Research',
            user: 'guest'
        },
        component: () => import('@/views/Page/Research.vue')
    },
    {
        path: '/admin/login',
        name: prop + '.admin-login',
        meta: {
            auth: false,
            name: 'Admin Login',
            user: 'guest'
        },
        component: () => import('../views/Auth/Login.vue')
    },
    {
        path: '/student/forget-password',
        name: prop + '.student-forget-password',
        meta: {
            auth: false,
            name: 'Student Forget Password',
            user: 'guest'
        },
        component: () => import('../views/Page/HomeView.vue')
    },
    {
        path: '/applicant/login',
        name: prop + '.applicant-login',
        meta: {
            auth: false,
            name: 'Applicant Login',
            user: 'guest'
        },
        component: () => import('../views/Page/HomeView.vue')
    }
]