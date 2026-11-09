<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task';
import { useProjectStore } from '@/stores/project';
import { useTargetStore } from '@/stores/target';
import { useTeamStore } from '@/stores/team';
import { useProfileStore } from '@/stores/profile';
import LinkItem from '@/components/LinkItem.vue';
import TaskItem from '@/components/TaskItem.vue';

const profile = useProfileStore();
const task= useTaskStore();
const project = useProjectStore();
const target = useTargetStore();
const team = useTeamStore();

const route = useRoute();
const router = useRouter();

const currentStatusLabel = ref('');

const projectWithId = computed(() => project.projectList.filter((p) => p.id === Number(route.params.id))[0]);
const targetList = computed(() => target.targetList.filter((p) => p.id === projectWithId?.value?.target));
const teamList = computed(() => team.teamList.filter((t) => projectWithId?.value?.teams.filter((teamId) => teamId === t.id).length > 0));
const taskList = computed(() => task.taskList
  .filter((t) => projectWithId?.value?.tasks.filter((taskId) => taskId === t.id).length > 0)
  .filter((t) => {
    if (currentStatusLabel.value === '') {
      return true
    }

    return t.status.label === currentStatusLabel.value
  })
);
const statusList = computed(() => task.taskList.reduce((list, t) => {
  if (list.filter((i) => i.label === t.status.label).length === 0) {
    list.push(t.status)
  }
  return list
}, []));

const chapterList = computed(() => {
  return [
    {
      title: "Команды",
      items: teamList.value,
      itemCount: teamList.value.length,
      objectKey: 'team',
    },
    {
      title: "Цель",
      items: targetList.value,
      itemCount: targetList.value.length,
      objectKey: 'target',
    },
  ]
})

const expireLabel = computed(() => {
  const date = new Date(projectWithId?.value.expire);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
})

function getLabelColorStyles(labelColor) {
  if (labelColor === 'default') {
    return '';
  }

  let colorStyles = '';
  colorStyles += `--label-background-color: var(--label-${labelColor});`;
  colorStyles += '--label-text-color: var(--button-text);';

  return colorStyles;
}

onMounted(() => {
  if (profile.token === '') {
    router.push({ name: 'splash' });
  }
})
</script>

<template>
  <main class="main">
    <header class="main__header-section">
      <p class="main__header-icon">{{ projectWithId.icon }}</p>
      <h1 class="main__header-title page-title">{{ projectWithId?.title }}</h1>
      <p class="main__header-description page-default" v-if="projectWithId?.description">{{ projectWithId?.description }}</p>
      <p class="main__header-status" v-if="projectWithId?.status" :style="getLabelColorStyles(projectWithId?.status.color)">{{ projectWithId?.status.label }}</p>
      <p class="main__header-expire" v-if="projectWithId?.expire">{{ expireLabel }}</p>
      <p class="main__header-complexity" v-if="projectWithId?.complexity">{{ projectWithId?.complexity.value }} {{ projectWithId?.complexity.dim }}</p>
    </header>
    <section class="main__section" v-for="(chapter, chapterIndex) in chapterList" :key="chapterIndex">
      <div class="main__section-wrapper">
        <h2 class="main__section-title header">{{ chapter.title }}</h2>
      </div>
      <div class="main__item-wrapper">
        <LinkItem class="main__item" v-for="(item, itemIndex) in chapter.items" :key="itemIndex" :link-target="{ name: `${ chapter.objectKey }WithId`, params: { id: item.id } }" :link-title="item.title" :link-icon="item.icon" :link-image="item.image" :link-status="item.status" :link-progress="item.progress" />
      </div>
    </section>
    <section class="main__section" v-if="taskList.length > 0">
      <div class="main__section-wrapper">
        <h2 class="main__section-title header">Задачи</h2>
      </div>
      <div class="main__status-list">
        <button class="main__status-wrapper" @click="currentStatusLabel = ''">
          <span class="main__section-title">Все</span>
        </button>
        <button class="main__status-wrapper" v-for="(status, statusIndex) in statusList" :key="statusIndex" @click="currentStatusLabel = status.label">
          <span class="main__section-title" :style="getLabelColorStyles(status.color)">{{ status.label }}</span>
        </button>
      </div>
      <div class="main__item-wrapper">
        <TaskItem class="main__item" v-for="(task, index) in taskList" :key="index" :task-target="{ name: 'taskWithId', params: { id: task.id } }" :task-title="task.title" :task-status="task.status" :task-complexity="task.complexity" :task-expire="task.expire" :task-number="task.number" :task-project="task.project.title" :ui-matrix="task.uiMatrix" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0px var(--content-paddings);
}

.main__header-section {
  width: 100%;
}

.main__header-icon {
  margin: calc((100vw - 2 * var(--content-paddings)) / 2) 0px;
  text-align: center;
  font-size: 94.5px;
}

.main__header-title {
  display: flex;
  flex-direction: column;
}

.main__header-title::before {
  content: 'Название проекта';
  font-family: var(--regular-font-family);
  font-weight: normal;
  font-size: 12px;
  line-height: 14.5px;
  color: var(--default-text);
}

.main__header-description {
  display: flex;
  flex-direction: column;
}

.main__header-description::before {
  content: 'Описание проекта';
  font-family: var(--regular-font-family);
  font-weight: normal;
  font-size: 12px;
  line-height: 14.5px;
  color: var(--default-text);
}

.main__header-status {
  display: flex;
  color: var(--label-text-color);
  background-color: var(--label-background-color);
  width: min-content;
  height: min-content;
  margin: 0;
  margin-top: 2em;
  padding: 1px 3px;
}

.main__header-status::before {
  content: 'Тип проекта';
  position: absolute;
  font-family: var(--regular-font-family);
  font-weight: normal;
  font-size: 12px;
  line-height: 14.5px;
  color: var(--default-text);
  background-color: var;
  margin-top: -16.5px;
  margin-left: -3px;
}

.main__header-expire {
  display: flex;
  flex-direction: column;
}

.main__header-expire::before {
  content: 'Выполнить до';
  font-family: var(--regular-font-family);
  font-weight: normal;
  font-size: 12px;
  line-height: 14.5px;
  color: var(--default-text);
}

.main__header-complexity {
  display: flex;
  flex-direction: column;
}

.main__header-complexity::before {
  content: 'Сложность';
  font-family: var(--regular-font-family);
  font-weight: normal;
  font-size: 12px;
  line-height: 14.5px;
  color: var(--default-text);
}

.main__section-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 36px;
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
  cursor: pointer;
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

.main__status-list {
  display: flex;
  gap: calc(var(--content-paddings) / 2);
  margin: calc(var(--content-paddings) * 2) 0px;
}

.main__status-wrapper > .main__section-title {
  display: flex;
  align-items: center;
  color: var(--label-text-color);
  height: min-content;
  margin: 0;
  padding: calc(var(--content-paddings) / 2) var(--content-paddings);
  border: 1px solid var(--label-background-color);
}

.main__status-wrapper:first-child {
  --label-background-color: transparent;
}

.main__status-wrapper:first-child > .main__section-title {
  border: 1px solid var(--label-black);
}

.main__status-wrapper {
  appearance: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.main__status-wrapper > .main__section-title:first-child {
  background-color: var(--label-background-color);
  width: min-content;
}
</style>
