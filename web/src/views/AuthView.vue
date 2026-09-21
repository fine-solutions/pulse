<script setup>
import route from '@/router';
import { ref } from 'vue';
import FormInput from '@/components/FormInput.vue';
import FormButton from '@/components/FormButton.vue';

const isRegMode = ref(false);
const isLostMode = ref(false);
const isAuthMode = ref(true);
const isSending = ref(false);
const mode = ref(route.currentRoute.value.name);

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

function sendData() {
  isSending.value = true
}
</script>

<template>
  <main class="auth-view">
    <FormInput class="auth-view__field" field-label="Электронная почта" field-type="email" />
    <FormInput class="auth-view__field" field-label="Пароль" field-type="password" />
    <FormButton class="auth-view__button" button-text="Войти" :is-processing="isSending" @click-action="sendData" />
    <FormButton class="auth-view__button" v-if="isAuthMode" button-text="Регистрация" :button-route="{ name: 'reg' }" :is-link="true" />
    <FormButton class="auth-view__button" v-if="isAuthMode" button-text="Забыли пароль" :button-route="{ name: 'lost' }" :is-link="true" />
  </main>
</template>

<style scoped>
.auth-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--control-gap);
  width: calc(100vw - 0.625em);
  max-width: 227px;
}
</style>
