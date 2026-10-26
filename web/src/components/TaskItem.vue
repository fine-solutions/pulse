<script setup>
import { computed } from 'vue';

const props = defineProps({
  taskTitle: {
    type: String,
    require: true,
  },
  taskStatus: {
    type: Object,
    require: true,
  },
  taskNumber: {
    type: Number,
    require: true,
  },
  taskProject: {
    type: String,
    require: true,
  },
  taskExpire: {
    type: Number,
    require: false,
  },
  taskComplexity: {
    type: Object,
    require: false,
  },
  uiMatrix: {
    type: Number,
    require: true,
  },
});

const statusLabel = computed(() => props.taskStatus?.label ? props.taskStatus.label : 'Все' );
const expireLabel = computed(() => {
  const date = new Date(props.taskExpire);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
})
const statusColor = computed(() => props.taskStatus?.color ? props.taskStatus.color : 'default');
const uiMatrixView = computed(() => {
  switch (props.uiMatrix) {
    case 1:
      return {
        icon: '/icons/to-do.svg',
        label: 'важно / срочно',
      }
    case 2:
      return {
        icon: '/icons/to-plan.svg',
        label: 'важно / несрочно',
      }
    case 3:
      return {
        icon: '/icons/to-remove.svg',
        label: 'неважно / несрочно',
      }
    case 4:
      return {
        icon: '/icons/to-delegate.svg',
        label: 'неважно / срочно',
      }
  }
  return {
    icon: undefined,
    label: '',
  }
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
</script>

<template>
  <article class="task-item">
    <header class="task-item__status-wrapper">
      <p class="task-item__status label" :style="getLabelColorStyles(statusColor)">{{ statusLabel }}</p>
      <div class="task-item__info-wrapper">
        <p class="task-item__status label" v-if="props.taskExpire">
          {{ expireLabel }}
          <img src="/icons/expired.svg" height="18" alt="">
        </p>
        <p class="task-item__status label" v-if="props.taskComplexity">{{ props.taskComplexity?.value }} {{ props.taskComplexity?.dim }}</p>
      </div>
    </header>
    <h3 class="task-item__title title">{{ props.taskTitle }}</h3>
    <footer class="task-item__state-wrapper">
      <div class="task-item__state-info">
        <span class="subtitle">#{{ props.taskNumber }} @{{ props.taskProject }}</span>
      </div>
      <div class="task-item__state-uim">
        <span class="subtitle">{{ uiMatrixView.label }}</span>
        <img :src="uiMatrixView.icon" alt="">
      </div>
    </footer>
  </article>
</template>

<style>
.task-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  padding: 6px 0px;
  width: calc(100vw - 2 * var(--content-paddings));
}

.task-item__status {
  display: flex;
  align-items: center;
  color: var(--label-text-color);
  height: min-content;
  margin: 0;
  padding: 1px 3px;
}

.task-item__status-wrapper > .task-item__status:first-child {
  background-color: var(--label-background-color);
  width: min-content;
}

.task-item__info-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.task-item__title {
  margin: 0;
}

.task-item__status-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 19px;
  width: 100%;
}

.task-item__state-wrapper {
  grid-area: state;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 19px;
  color: var(--default-text);
  width: calc(100vw - 2 * var(--content-paddings));
}

.task-item__state-info,
.task-item__state-uim {
  align-items: center;
  white-space: nowrap;
}

.task-item__state-uim {
  display: flex;
  align-items: center;
}

.task-item__state-info {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
