import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ProfileEdit from './views/ProfileEdit.vue';
import ProfileCreate from './views/ProfileCreate.vue';
import Report from './views/Report.vue'
import SignInSignUp from './views/auth/SignInSignUp.vue'
import Attendance from './views/dashboard/Attendance.vue'
import FileStoring from './views/dashboard/FileStoring.vue'
import GradesBonus from './views/dashboard/GradesBonues.vue'
import Lessons from './views/dashboard/Lessons.vue'
import Not_Found from './views/404_notfound.vue'
import dashboardHome from './views/dashboard/dashboardHome.vue'
import createStudent from './views/dashboard/createStudent.vue'
import createClass from './views/dashboard/createClass.vue';
import Students from './views/dashboard/students.vue'

import { useAuthStore } from './stores/authStore';



const routes = [
  {
    path: '/profileEdit',
    name: 'profileEdit',
    component: ProfileEdit
  },
  {
    path: '/profileCreate',
    name: 'profileCreate',
    component: ProfileCreate
  },
  {
    path: '/dashboard/home/createStudent',
    name: 'createStudent',
    component: createStudent,
  },
  {
    path: '/dashboard/home/createClass',
    name: 'createClass',
    component: createClass,
  },
  {
    path: '/dashboard/home/Students',
    name: 'Students',
    component: Students,
  },
  {
    path: '/dashboard/home',
    name: 'dashboard',
    component: dashboardHome,
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/',
    name: 'sign',
    component: SignInSignUp
  },
  {
    path: '/dashboard/attendance',
    name: 'attendance',
    component: Attendance
  },
  {
    path: '/dashboard/FileStoring',
    name: 'filestoring',
    component: FileStoring
  },
  {
    path: '/dashboard/grades',
    name: 'grades',
    component: GradesBonus
  },
  {
    path: '/dashboard/lessons',
    name: 'lessons',
    component: Lessons
  },
  {
    path: '/:pathMatch(.*)*',
    component: Not_Found,
    name: 'notfound',
},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});




router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.$state.user === null && to.path !== '/') {
    next('/')
  } else {
    next();
  }
})

export default router;
