<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  iconColor: {
    type: String,
  },
  switchingInterval: {
    type: Number,
  },
})
</script>

<template>
  <div class="app-logo">
    <AppIcon class="app-logo__icon" :switching-interval="switchingInterval" :icon-color="iconColor" />
  </div>
</template>

<style>
.app-logo {
  width: 100%;
  height: 100%;
}

.app-logo__icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
