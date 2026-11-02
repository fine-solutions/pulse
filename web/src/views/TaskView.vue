<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task';
import { useProjectStore } from '@/stores/project';
import { useTargetStore } from '@/stores/target';
import { useTeamStore } from '@/stores/team';
import { useProfileStore } from '@/stores/profile';
import LinkItem from '@/components/LinkItem.vue';

const profile = useProfileStore();
const task= useTaskStore();
const project = useProjectStore();
const target = useTargetStore();
const team = useTeamStore();

const route = useRoute();
const router = useRouter();

const taskWithId = computed(() => task.taskList.filter((t) => t.id === Number(route.params.id))[0]);
const projectList = computed(() => project.projectList.filter((p) => p.id === taskWithId?.value?.project.id))
const targetList = computed(() => target.targetList.filter((p) => p.id === taskWithId?.value?.target.id))
const teamList = computed(() => team.teamList.filter((p) => p.id === taskWithId?.value?.team.id))

const chapterList = computed(() => {
  return [
    {
      title: "Команда",
      items: teamList.value,
      itemCount: teamList.value.length,
      objectKey: 'team',
    },
    {
      title: "Проект",
      items: projectList.value.slice(0, 4),
      itemCount: projectList.value.length,
      objectKey: 'project',
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
  const date = new Date(taskWithId?.value.expire);
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
      <h1 class="main__header-title page-title">{{ taskWithId?.title }}</h1>
      <p class="main__header-description page-default" v-if="taskWithId?.description">{{ taskWithId?.description }}</p>
      <p class="main__header-status" v-if="taskWithId?.status" :style="getLabelColorStyles(taskWithId?.status.color)">{{ taskWithId?.status.label }}</p>
      <p class="main__header-expire" v-if="taskWithId?.expire">{{ expireLabel }}</p>
      <p class="main__header-complexity" v-if="taskWithId?.complexity">{{ taskWithId?.complexity.value }} {{ taskWithId?.complexity.dim }}</p>
    </header>
    <section class="main__section" v-for="(chapter, chapterIndex) in chapterList" :key="chapterIndex">
      <div class="main__section-wrapper">
        <h2 class="main__section-title header">{{ chapter.title }}</h2>
      </div>
      <div class="main__item-wrapper">
        <LinkItem class="main__item" v-for="(item, itemIndex) in chapter.items" :key="itemIndex" :link-target="{ name: `${ chapter.objectKey }WithId`, params: { id: item.id } }" :link-title="item.title" :link-icon="item.icon" :link-image="item.image" :link-status="item.status" :link-progress="item.progress" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  padding: 0px var(--content-paddings);
}

.main__header-title {
  display: flex;
  flex-direction: column;
}

.main__header-title::before {
  content: 'Название';
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
  content: 'Описание';
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
  content: 'Статус';
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
</style>
