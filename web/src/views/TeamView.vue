<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task';
import { useProjectStore } from '@/stores/project';
import { useTargetStore } from '@/stores/target';
import { useTeamStore } from '@/stores/team';
import { useProfileStore } from '@/stores/profile';
import { useMemberStore } from '@/stores/member';
import LinkItem from '@/components/LinkItem.vue';
import TaskItem from '@/components/TaskItem.vue';

const profile = useProfileStore();
const task= useTaskStore();
const project = useProjectStore();
const target = useTargetStore();
const team = useTeamStore();
const member = useMemberStore();

const route = useRoute();
const router = useRouter();

const currentStatusLabel = ref('');

const teamWithId = computed(() => team.teamList.filter((p) => p.id === Number(route.params.id))[0]);
const memberList = computed(() => member.memberList.filter((m) => teamWithId.value.members.includes(m.id)))
const targetList = computed(() => target.targetList.filter((t) => t.teams?.includes(teamWithId.value.id)));
const projectList = computed(() => project.projectList.filter((t) => teamWithId?.value?.members.filter((teamId) => t.teams.includes(teamId)).length > 0));
const taskList = computed(() => task.taskList
  .filter((t) => t.team?.id === teamWithId.value.id)
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
      title: "Участники",
      items: memberList.value,
      itemCount: memberList.value.length,
      objectKey: 'member',
    },
    {
      title: "Проекты",
      items: projectList.value,
      itemCount: projectList.value.length,
      objectKey: 'project',
    },
    {
      title: "Цели",
      items: targetList.value,
      itemCount: targetList.value.length,
      objectKey: 'target',
    },
  ]
})

const expireLabel = computed(() => {
  const date = new Date(teamWithId?.value.expire);
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
      <div class="main__header-icon">
        <img class="main__header-image" :src="teamWithId.large">
      </div>
      <h1 class="main__header-title page-title">{{ teamWithId?.title }}</h1>
      <p class="main__header-description page-default" v-if="teamWithId?.description">{{ teamWithId?.description }}</p>
      <p class="main__header-expire" v-if="teamWithId?.expire">{{ expireLabel }}</p>
      <p class="main__header-complexity" v-if="teamWithId?.complexity">{{ teamWithId?.complexity.value }} {{ teamWithId?.complexity.dim }}</p>
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
  margin: calc((100vw - 162px - 2 * var(--content-paddings)) / 2) 0px;
  text-align: center;
  font-size: 94.5px;
}

.main__header-title {
  display: flex;
  flex-direction: column;
}

.main__header-title::before {
  content: 'Название команды';
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
  content: 'Описание команды';
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
