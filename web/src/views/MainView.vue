<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { useProjectStore } from '@/stores/project';
import { useTargetStore } from '@/stores/target';
import { useTeamStore } from '@/stores/team';
import { useTaskStore } from '@/stores/task';

const MODE = Object.freeze({
  LIST: 'list',
  CARD: 'card',
});

const chapterModes = ref({
  team: MODE.CARD,
  project: MODE.CARD,
  target: MODE.CARD,
})

import LinkCard from '@/components/LinkCard.vue';
import LinkItem from '@/components/LinkItem.vue';
import TaskItem from '@/components/TaskItem.vue';

const profile = useProfileStore();
const project = useProjectStore();
const target = useTargetStore();
const team = useTeamStore();
const task = useTaskStore();

const projectList = computed(() => project.projectList)
const targetList = computed(() => target.targetList)
const teamList = computed(() => team.teamList)
const taskList = computed(() => task.taskList)

const chapterList = computed(() => {
  return [
    {
      title: `Команды ${teamList.value.length > 4 ? '(4 / ' + teamList.value.length + ')' : ''}`,
      items: teamList.value,
      itemCount: teamList.value.length,
      objectKey: 'team',
    },
    {
      title: `Проекты ${projectList.value.length > 4 ? '(4 / ' + projectList.value.length + ')' : ''}`,
      items: projectList.value.slice(0, 4),
      itemCount: projectList.value.length,
      objectKey: 'project',
    },
    {
      title: `Цели ${targetList.value.length > 4 ? '(4 / ' + targetList.value.length + ')' : ''}`,
      items: targetList.value,
      itemCount: targetList.value.length,
      objectKey: 'target',
    },
  ]
})

const router = useRouter();

onMounted(() => {
  if (profile.token === '') {
    router.push({ name: 'splash' });
  }
})
</script>

<template>
  <main class="main">
    <section class="main__section" v-for="(chapter, chapterIndex) in chapterList" :key="chapterIndex">
      <div class="main__header-wrapper">
        <h2 class="main__header-title header">{{ chapter.title }}</h2>
        <button class="main__header-button"  v-if="chapterModes[chapter.objectKey] === MODE.CARD" @click="chapterModes[chapter.objectKey] = MODE.LIST">
          <img class="main__header-button-icon" src="/icons/list.svg" alt="">
        </button>
        <button class="main__header-button" v-else-if="chapterModes[chapter.objectKey] === MODE.LIST" @click="chapterModes[chapter.objectKey] = MODE.CARD">
          <img class="main__header-button-icon" src="/icons/cards.svg" alt="">
        </button>
      </div>
      <div class="main__card-wrapper" v-if="chapterModes[chapter.objectKey] === MODE.CARD">
        <LinkCard class="main__card" v-for="(item, itemIndex) in chapter.items" :key="itemIndex" :link-title="item.title" :link-icon="item.icon" :link-image="item.image" :link-status="item.status" :link-progress="item.progress" />
      </div>
      <div class="main__item-wrapper" v-if="chapterModes[chapter.objectKey] === MODE.LIST">
        <LinkItem class="main__item" v-for="(item, itemIndex) in chapter.items" :key="itemIndex" :link-title="item.title" :link-icon="item.icon" :link-image="item.image" :link-status="item.status" :link-progress="item.progress" />
      </div>
      <button class="main__section-button" v-if="chapter.itemCount > 4" @click="router.push({ name: chapter.objectKey })">Смотреть все</button>

    </section>
    <section class="main__section">
      <div class="main__header-wrapper">
        <h2 class="main__header-title header">Задачи</h2>
      </div>
      <div class="main__item-wrapper">
        <TaskItem class="main__item" v-for="(task, index) in taskList" :key="index" :task-title="task.title" :task-status="task.status" :task-complexity="task.complexity" :task-expire="task.expire" :task-number="task.number" :task-project="task.project.title" :ui-matrix="task.uiMatrix" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  padding: 0px var(--content-paddings);
}

.main__header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}

.main__header-title {
  margin: 0;
}

.main__header-button {
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0;
  padding: 0;
}

.main__section-button {
  appearance: none;
  color: var(--button-text);
  background-color: var(--active-control);
  border: none;
  border-radius: 0px;
  width: 100%;
  height: 36px;
  margin: 18px 0px 0px;
}

.main__item-wrapper {
  width: 100%;
}

.main__card-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.main__section {
  width: calc(100vw - 2 * var(--content-paddings));
}
</style>
