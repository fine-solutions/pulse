<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="app__header"></header>
  <RouterView class="app__main" :key="this.$route.fullPath" />
  <footer class="app__footer"></footer>
</template>

<style>
.app {
  display: grid;
  justify-content: center;
  grid-template-rows: min-content 1fr min-content;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.app__header {}

.app__main {}

.app__footer {}
</style>
