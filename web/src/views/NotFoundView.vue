<script setup>
import AppLogo from '@/components/AppLogo.vue';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const flickerInterval = 500;
const pushRouteInterval = 5000;
const statusLabel = "Страница не найдена";

const router = useRouter();

onMounted(() => {
  setTimeout(async () => {
    router.push({ name: 'main' })
  }, pushRouteInterval);
});
</script>

<template>
  <main class="not-found">
    <AppLogo class="not-found__logo" :switching-interval="flickerInterval" />
    <p class="not-found__label title">{{ statusLabel }}</p>
  </main>
</template>

<style scoped>
.not-found {
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

.not-found__logo {
  width: var(--logo-size);
  height: var(--logo-size);
  max-width: var(--max-logo-size);
  max-height: var(--max-logo-size);
}

.not-found__label {
  position: fixed;
  margin: 0;
  bottom: var(--logo-wrapper-gap);
}
</style>
