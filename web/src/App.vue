<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import { useProfileStore } from './stores/profile';

import HeaderLayout from '@/components/HeaderLayout.vue';

const profile = useProfileStore();

const MODE = Object.freeze({
  NOT_FOUND: 'notFound',
  SPLASH: 'splash',
  AUTH: 'auth',
  MAIN: 'main',
  PROJECT_LIST: 'project',
  TARGET_LIST: 'target',
  TASK_LIST: 'task',
  TEAM_LIST: 'team',
  PROJECT: 'projectWithId',
  TARGET: 'targetWithId',
  TASK: 'taskWithId',
  TEAM: 'teamWithId',
  MEMBER: 'memberWithId',
  ADD_ENTITY: 'addEntity',
  DEFAULT: 'default'
});

const route = useRoute();
const router = useRouter();
const headerTitle = ref('');

function onStartActionClick() {
  if (route.name === MODE.MAIN) {
    router.push({ name: MODE.MEMBER, params: { id: profile.id } })
  } else if (
    route.name === MODE.PROJECT_LIST
    || route.name === MODE.TARGET_LIST
    || route.name === MODE.TASK_LIST
    || route.name === MODE.TEAM_LIST
  ) {
    router.push({ name: MODE.MAIN })
  } else if (
    route.name === MODE.PROJECT
    || route.name === MODE.TARGET
    || route.name === MODE.TASK
    || route.name === MODE.TEAM
    || route.name === MODE.MEMBER
  ) {
    router.back()
  } else if (route.name === MODE.ADD_ENTITY) {
    if (confirm('При этом действии данные не сохраняться. Вы уверены?')) {
      router.back()
    }
  } else if (route.name === MODE.NOT_FOUND) {
    router.push({ name: 'main' })
  } else {
    alert('Start');
  }
}

function onEndActionClick() {
  alert('Menu');
}

onMounted(() => {
  switch (route.name) {
    case MODE.MAIN:
      headerTitle.value = 'Главная';
      break;
    case MODE.PROJECT_LIST:
      headerTitle.value = 'Проекты';
      break;
    case MODE.TARGET_LIST:
      headerTitle.value = 'Цели';
      break;
    case MODE.TASK_LIST:
      headerTitle.value = 'Задачи';
      break;
    case MODE.TEAM_LIST:
      headerTitle.value = 'Команды';
      break;
    case MODE.PROJECT:
      headerTitle.value = 'Проект';
      break;
    case MODE.TARGET:
      headerTitle.value = 'Цель';
      break;
    case MODE.TASK:
      headerTitle.value = 'Задача';
      break;
    case MODE.TEAM:
      headerTitle.value = 'Команда';
      break;
    case MODE.MEMBER:
      headerTitle.value = 'Участник';
      break;
    case MODE.ADD_ENTITY:
      headerTitle.value = 'Создать';
      break;
    case MODE.AUTH:
      headerTitle.value = 'Вход';
      break;
    default:
      headerTitle.value = 'Пульс';
      break;
  }
})
</script>

<template>
  <HeaderLayout
    class="app__header"
    v-if="route.name !== MODE.SPLASH"
    :header-title="headerTitle"
    :is-authorized="route.name !== MODE.AUTH"
    :is-main-view="route.name === MODE.MAIN"
    @start-action="onStartActionClick"
    @end-action="onEndActionClick"
  />
  <RouterView class="app__main" :key="route.fullPath" />
</template>

<style>
.app {
  display: grid;
  justify-content: center;
  grid-template-rows: min-content 1fr min-content;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.app__header {
  width: 100vw;
}

.app__main {
  width: 100vw;
}
</style>
