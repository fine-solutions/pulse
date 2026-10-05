<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';

const profile = useProfileStore();
const router = useRouter();

onMounted(() => {
  if (profile.settings.token === '') {
    router.push({ name: 'splash' })
  }
})
</script>

<template>
  <main class="main">
    <h1>Main header</h1>
  </main>
</template>
