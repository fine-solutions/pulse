import { createRouter, createWebHistory } from 'vue-router';
import SplashView from '../views/SplashView.vue';
import MainView from '@/views/MainView.vue';
import AuthView from '../views/AuthView.vue';
import ProjectListView from '@/views/ProjectListView.vue';
import ProjectView from '@/views/ProjectView.vue';
import TeamListView from '@/views/TeamListView.vue';
import TeamView from '@/views/TeamView.vue';
import TargetListView from '@/views/TargetListView.vue';
import TargetView from '@/views/TargetView.vue';
import TaskListView from '@/views/TaskListView.vue';
import TaskView from '@/views/TaskView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/start',
      name: 'splash',
      component: SplashView,
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/auth/reg',
      name: 'reg',
      component: AuthView,
    },
    {
      path: '/auth/lost',
      name: 'lost',
      component: AuthView,
    },
    {
      path: '/auth/code',
      name: 'code',
      component: AuthView,
    },
    {
      path: '/auth/pass',
      name: 'pass',
      component: AuthView,
    },
    {
      path: '/project',
      name: 'project',
      component: ProjectListView,
    },
    {
      path: '/project/:id',
      name: 'projectWithId',
      component: ProjectView,
    },
    {
      path: '/team',
      name: 'team',
      component: TeamListView,
    },
    {
      path: '/team/:id',
      name: 'teamWithId',
      component: TeamView,
    },
    {
      path: '/target',
      name: 'target',
      component: TargetListView,
    },
    {
      path: '/target/:id',
      name: 'targetWithId',
      component: TargetView,
    },
    {
      path: '/task',
      name: 'task',
      component: TaskListView,
    },
    {
      path: '/task/:id',
      name: 'taskWithId',
      component: TaskView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    }
  ],
});

export default router;
