<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { useTaskStore } from '@/stores/task';

const MODE = Object.freeze({
  LIST: 'list',
  CARD: 'card',
});

const chapterModes = ref({
  task: MODE.LIST,
})

import TaskItem from '@/components/TaskItem.vue';
import FormInput from '@/components/FormInput.vue';

const profile = useProfileStore();
const task = useTaskStore();

const searchTerm = ref('');

const taskList = computed(() => task.taskList.filter((p) => {
  if (searchTerm.value === '') {
    return true
  }
  return p.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    || p.status.label.toLowerCase().includes(searchTerm.value.toLowerCase())
}))

const chapterList = computed(() => {
  return [
    {
      title: 'Цели',
      items: taskList.value,
      objectKey: 'task',
    }
  ]
})

const router = useRouter();

function search(value) {
  searchTerm.value = value
}

onMounted(() => {
  if (profile.token === '') {
    router.push({ name: 'splash' });
  }
})
</script>

<template>
  <main class="main">
    <FormInput class="main__search" :field-label="Поиск" :field-type="text" field-placeholder="Поиск..." @on-change="search"/>
    <section class="main__section" v-for="(chapter, chapterIndex) in chapterList" :key="chapterIndex">
      <div class="main__header-wrapper">
        <h2 class="main__header-title header">{{ chapter.title }}</h2>
      </div>
      <div class="main__item-wrapper" v-if="chapterModes[chapter.objectKey] === MODE.LIST">
        <TaskItem class="main__item" v-for="(task, index) in taskList" :key="index" :task-target="{ name: 'taskWithId', params: { id: task.id } }" :task-title="task.title" :task-status="task.status" :task-complexity="task.complexity" :task-expire="task.expire" :task-number="task.number" :task-project="task.project.title" :ui-matrix="task.uiMatrix" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  padding: 0px var(--content-paddings);
}

.main__search {
  margin: var(--content-paddings) 0px;
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

.main__header-button-icon {}

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
