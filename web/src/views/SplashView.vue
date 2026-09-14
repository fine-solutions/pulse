<script setup>
import { ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';

const switchingInterval = 500;
const statusLabel = ref("Загрузка...")
</script>

<template>
  <main class="splash-view">
    <AppLogo class="splash-view__logo" :switching-interval="switchingInterval" />
    <p class="splash-view__label title">{{ statusLabel }}</p>
  </main>
</template>

<style scoped>
.splash-view {
  --logo-size: 15vw;
  --max-logo-size: var(--control-height);
  --logo-wrapper-gap: var(--icon-size);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.splash-view__logo {
  width: var(--logo-size);
  height: var(--logo-size);
  max-width: var(--max-logo-size);
  max-height: var(--max-logo-size);
}

.splash-view__label {
  position: fixed;
  margin: 0;
  bottom: var(--logo-wrapper-gap);
}
</style>
