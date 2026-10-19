<script setup>
import { computed } from 'vue';

const props = defineProps({
  linkTitle: {
    type: String,
    require: true,
  },
  linkIcon: {
    type: String,
    require: true,
  },
  linkStatus: {
    type: Object,
    require: true,
  },
  linkProgress: {
    type: Object,
    require: true,
  },
});

const statusLabel = computed(() => props.linkStatus?.label ? props.linkStatus.label : 'Все' );
const statusColor = computed(() => props.linkStatus?.color ? props.linkStatus.color : 'default');
const progressDone = computed(() => props.linkProgress?.done ? props.linkProgress.done : 0 );
const progressAll = computed(() => props.linkProgress?.all ? props.linkProgress.all : 0);

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
  <article class="link-item">
    <div class="link-item__icon-wrapper">
      <p class="link-item__icon">{{ props.linkIcon }}</p>
    </div>
    <p class="link-item__status label" :style="getLabelColorStyles(statusColor)">{{ statusLabel }}</p>
    <h3 class="link-item__title title">{{ props.linkTitle }}</h3>
    <div class="link-item__progress-wrapper">
      <div class="link-item__progress-bar" :style="`--progress: ${progressDone * 100 / progressAll}%`">
        <div class="link-item__progress-bg"></div>
      </div>
      <div class="link-item__progress-label subtitle">{{ progressDone }} / {{ progressAll }}</div>
    </div>
  </article>
</template>

<style>
.link-item {
  display: grid;
  grid-template:
    "icon status arrow"
    "icon title arrow"
    "icon progress arrow";
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  column-gap: 12px;
  row-gap: 4px;
  width: 100%;
  padding: 6px 0px;
}

.link-item::after {
  --icon-url: url(/icons/forward.svg);
  grid-area: arrow;
  display: block;
  content: '';
  width: 22px;
  height: 24px;
  background: var(--icon-url) no-repeat;
}

.link-item__icon-wrapper {
  grid-area: icon;
}

.link-item__icon {
  display: block;
  margin: 0;
  padding: 11px;
  text-align: center;
  font-size: 28px;
}

.link-item__status {
  grid-area: status;
  background-color: var(--label-background-color);
  color: var(--label-text-color);
  width: min-content;
  height: min-content;
  margin: 0;
  padding: 1px 3px;
}

.link-item__title {
  grid-area: title;
  margin: 0;
}

.link-item__progress-wrapper {
  --size: 12px;
  --border: 1.5px;
  grid-area: progress;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.link-item__progress-bar {
  content: '';
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: conic-gradient(var(--active-control) var(--progress), var(--button-text) 0deg);
}

.link-item__progress-bg {
  width: calc(var(--size) - 2 * var(--border));
  height: calc(var(--size) - 2 * var(--border));
  border-radius: 50%;
  background-color: var(--button-text);
}

.link-item__progress-label {
  margin: 0;
  color: var(--default-text);
  line-height: 1;
}
</style>
