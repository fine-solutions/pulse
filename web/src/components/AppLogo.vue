<script setup>
import AppIcon from './icons/AppIcon.vue';

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
    <AppIcon icon-color="violet" />
  </div>
</template>

<style scoped>

</style>
