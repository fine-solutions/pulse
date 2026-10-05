<script setup>
const props = defineProps({
  isMainView: {
    type: Boolean,
    default: false,
  },
  isAuthorized: {
    type: Boolean,
    default: false,
  },
  headerTitle: {
    type: String,
    default: 'Пульс'
  }
})

const emit = defineEmits([
  'startAction',
  'endAction',
])

function onStartButtonClick() {
  emit('startAction')
}

function onEndButtonClick() {
  emit('endAction')
}
</script>

<template>
  <header class="header-layout">
    <button class="header-layout__button" v-if="props.isAuthorized" @click="onStartButtonClick">
      <img class="header-layout__icon" v-if="props.isMainView" src="/icons/settings.svg" alt="">
      <img class="header-layout__icon" v-else src="/icons/back.svg" alt="">
    </button>
    <h1 class="header-layout__title panel-header">{{ props.headerTitle }}</h1>
    <button class="header-layout__button" v-if="props.isAuthorized" @click="onEndButtonClick">
      <img class="header-layout__icon" src="/icons/menu.svg" alt="">
    </button>
  </header>
</template>

<style scoped>
.header-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: var(--control-height);
  background-color: var(--panel-bg);
  padding: 0px 10px;
}

.header-layout__button {
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.header-layout__icon {
  display: block;
}

.header-layout__title {
  text-align: center;
  width: 100%;
}
</style>
