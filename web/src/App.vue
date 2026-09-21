<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header></header>
  <RouterView :key="this.$route.fullPath" />
  <footer></footer>
</template>
