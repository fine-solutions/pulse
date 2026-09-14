<script setup>
import AppLogo from '@/components/AppLogo.vue';

const switchingInterval = 500;
</script>

<template>
  <main class="splash-view">
    <AppLogo class="splash-view__logo" :switching-interval="switchingInterval" />
  </main>
</template>
