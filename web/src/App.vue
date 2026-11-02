<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import HeaderLayout from '@/components/HeaderLayout.vue';
import { onMounted, ref } from 'vue';

const MODE = Object.freeze({
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
  DEFAULT: 'default'
});

const route = useRoute();
const router = useRouter();
const headerTitle = ref('');

function onStartActionClick() {
  if (route.name === MODE.MAIN) {
    alert('Main');
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
  ) {
    router.back()
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
      headerTitle.value = 'Пульс';
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
