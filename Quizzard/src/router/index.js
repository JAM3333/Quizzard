// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'quizcreator',
        name: 'QuizCreator',
        component: () => import('@/views/QuizCreator.vue'),
      },
      {
        path: 'testing',
        name: 'FunctionalityTest',
        component: () => import('@/views/FunctionalityTest.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
