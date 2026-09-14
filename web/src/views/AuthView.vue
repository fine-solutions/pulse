<script setup>
import route from '@/router';
import { ref } from 'vue';

const isRegMode = ref(false);
const isLostMode = ref(false);
const isAuthMode = ref(true);
const mode = ref(route.currentRoute.value.name)


switch (mode.value) {
case 'reg':
  isRegMode.value = true
  isLostMode.value = false
  isAuthMode.value = false
  break
case 'lost':
  isRegMode.value = true
  isLostMode.value = true
  isAuthMode.value = false
  break
default:
  isRegMode.value = false
  isLostMode.value = false
  isAuthMode.value = true
}
</script>

<template>
  <main class="auth-view">
    <label class="auth-view__label">
      <span class="auth-view__label-span">Электронная почта</span>
      <input class="auth-view__input" type="email">
    </label>
    <label v-if="!isLostMode" class="auth-view__label">
      <span class="auth-view__label-span">Пароль</span>
      <input class="auth-view__input" type="password">
    </label>
    <button class="auth-view__button">Войти</button>
    <router-link v-if="isAuthMode" class="auth-view__link" :to="{ name: 'auth', params: { mode: 'lost' } }">Забыли пароль</router-link>
    <router-link v-if="isAuthMode" class="auth-view__link" :to="{ name: 'auth', params: { mode: 'reg' } }">Регистрация</router-link>
  </main>
</template>
